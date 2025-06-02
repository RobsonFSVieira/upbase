# Configuração do Supabase

## Tabelas Criadas

### profiles
```sql
create table profiles (
  id uuid references auth.users primary key,
  email text unique not null,
  name text not null,
  matricula text unique not null,
  turno text not null,
  role text not null default 'colaborador',
  team_id uuid references teams,
  status text not null default 'pending',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

### teams
```sql
create table teams (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  leader_id uuid references profiles,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

### form_templates
```sql
create table form_templates (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  created_by uuid references profiles,
  status text not null default 'draft',
  questions jsonb not null default '[]',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

### evaluations
```sql
create table evaluations (
  id uuid default uuid_generate_v4() primary key,
  template_id uuid references form_templates,
  evaluator_id uuid references profiles,
  evaluated_id uuid references profiles,
  status text not null default 'pending',
  responses jsonb not null default '[]',
  score numeric,
  cycle text not null,
  due_date timestamptz,
  completed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

### evaluation_cycles
```sql
create table evaluation_cycles (
  id uuid default uuid_generate_v4() primary key,
  code text not null unique,
  start_date timestamptz not null,
  end_date timestamptz not null,
  status text not null default 'draft',
  settings jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

### evaluation_feedback
```sql
create table evaluation_feedback (
  id uuid default uuid_generate_v4() primary key,
  evaluation_id uuid references evaluations,
  author_id uuid references profiles,
  content text not null,
  created_at timestamptz default now()
);
```

## Políticas de Segurança (RLS)

### profiles
```sql
-- Visualização: Usuários autenticados podem ver perfis
create policy "Usuários podem ver perfis"
  on profiles for select
  using ( auth.role() = 'authenticated' );

-- Inserção: Apenas administradores podem criar perfis
create policy "Admins podem criar perfis"
  on profiles for insert
  using ( auth.user_id in (
    select id from profiles where role = 'admin'
  ));

-- Atualização: Usuários podem atualizar próprio perfil
create policy "Usuários podem atualizar próprio perfil"
  on profiles for update
  using ( auth.user_id = id );
```

### teams
```sql
-- Visualização: Todos podem ver times
create policy "Visualização pública de times"
  on teams for select
  using ( true );

-- Inserção: Apenas líderes e admins podem criar times
create policy "Líderes podem criar times"
  on teams for insert
  using ( 
    exists (
      select 1 from profiles
      where id = auth.user_id
      and role in ('leader', 'admin')
    )
  );

-- Atualização: Apenas líder do time ou admin pode atualizar
create policy "Líderes podem atualizar seus times"
  on teams for update
  using (
    exists (
      select 1 from profiles
      where id = auth.user_id
      and (
        role = 'admin'
        or id = leader_id
      )
    )
  );
```

### evaluation_cycles
```sql
create policy "Apenas admins podem gerenciar ciclos"
  on evaluation_cycles
  using ( auth.user_id in (
    select id from profiles where role = 'admin'
  ));
```

## Views

### active_evaluations
```sql
create view active_evaluations as
select 
  e.*,
  ft.title as template_title,
  p1.name as evaluator_name,
  p2.name as evaluated_name
from evaluations e
join form_templates ft on e.template_id = ft.id
join profiles p1 on e.evaluator_id = p1.id
join profiles p2 on e.evaluated_id = p2.id
where e.status != 'archived';
```

-- Nova view para relatórios
```sql
create view evaluation_metrics as
select 
  p.id as profile_id,
  p.name,
  p.team_id,
  t.name as team_name,
  count(e.id) as total_evaluations,
  avg(e.score) as average_score,
  max(e.completed_at) as last_evaluation_date
from profiles p
left join teams t on p.team_id = t.id
left join evaluations e on p.id = e.evaluated_id
where e.status = 'completed'
group by p.id, p.name, p.team_id, t.name;
```

## Funções

### handle_new_user()
```sql
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name, role)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'name',
    'colaborador'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger para criar perfil automaticamente
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

-- Adicionar novas colunas à tabela evaluations
alter table evaluations add column cycle_id uuid references evaluation_cycles;
alter table evaluations add column feedback_required boolean default false;
alter table evaluations add column self_assessment boolean default false;

-- Adicionar novas colunas à tabela profiles
alter table profiles add column last_evaluation_date timestamptz;
alter table profiles add column next_evaluation_date timestamptz;
alter table profiles add column settings jsonb default '{}';