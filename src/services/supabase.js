import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL and Anon Key são necessários. Verifique o arquivo .env.local')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Helper functions para autenticação
export const auth = {
    signUp: async ({ email, password, ...userData }) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: userData // Dados adicionais do usuário
            }
        })
        if (error) throw error
        return data
    },

    signIn: async ({ email, password }) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })
        if (error) throw error
        return data
    },

    signOut: async () => {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
    },

    resetPassword: async (email) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email)
        if (error) throw error
    },

    updatePassword: async (newPassword) => {
        const { data, error } = await supabase.auth.updateUser({
            password: newPassword
        })
        if (error) throw error
        return data
    },

    // Função para obter o usuário atual
    getCurrentUser: async () => {
        const { data: { user }, error } = await supabase.auth.getUser()
        if (error) throw error
        return user
    },

    // Função para obter a sessão atual
    getSession: async () => {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) throw error
        return session
    }
}

// Helper functions para gerenciamento de times
export const teams = {
    // Criar um novo time
    createTeam: async ({ name, leader_id }) => {
        const { data, error } = await supabase
            .from('teams')
            .insert([{ name, leader_id }])
            .select()
            .single()
        if (error) throw error
        return data
    },

    // Buscar todos os times
    getAllTeams: async () => {
        const { data, error } = await supabase
            .from('teams')
            .select(`
                *,
                leader:leader_id (
                    id,
                    email,
                    user_metadata
                )
            `)
        if (error) throw error
        return data
    },

    // Buscar um time específico por ID
    getTeamById: async (id) => {
        const { data, error } = await supabase
            .from('teams')
            .select(`
                *,
                leader:leader_id (
                    id,
                    email,
                    user_metadata
                )
            `)
            .eq('id', id)
            .single()
        if (error) throw error
        return data
    },

    // Atualizar um time
    updateTeam: async (id, updates) => {
        const { data, error } = await supabase
            .from('teams')
            .update(updates)
            .eq('id', id)
            .select()
            .single()
        if (error) throw error
        return data
    },

    // Deletar um time
    deleteTeam: async (id) => {
        const { error } = await supabase
            .from('teams')
            .delete()
            .eq('id', id)
        if (error) throw error
    },

    // Buscar membros de um time
    getTeamMembers: async (team_id) => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('team_id', team_id)
        if (error) throw error
        return data
    }
}

// Helper functions para gerenciamento de templates de formulários
export const formTemplates = {
    // Criar um novo template
    createTemplate: async ({
        title,
        description,
        criteria,
        created_by,
        status = 'active'
    }) => {
        const { data, error } = await supabase
            .from('form_templates')
            .insert([{
                title,
                description,
                criteria,
                created_by,
                status,
                created_at: new Date().toISOString()
            }])
            .select()
            .single()
        if (error) throw error
        return data
    },

    // Buscar todos os templates ativos
    getAllTemplates: async () => {
        const { data, error } = await supabase
            .from('form_templates')
            .select(`
                *,
                creator:created_by (
                    id,
                    email,
                    user_metadata
                )
            `)
            .order('created_at', { ascending: false })
        if (error) throw error
        return data
    },

    // Buscar um template específico por ID
    getTemplateById: async (id) => {
        const { data, error } = await supabase
            .from('form_templates')
            .select(`
                *,
                creator:created_by (
                    id,
                    email,
                    user_metadata
                )
            `)
            .eq('id', id)
            .single()
        if (error) throw error
        return data
    },

    // Atualizar um template
    updateTemplate: async (id, updates) => {
        const { data, error } = await supabase
            .from('form_templates')
            .update({
                ...updates,
                updated_at: new Date().toISOString()
            })
            .eq('id', id)
            .select()
            .single()
        if (error) throw error
        return data
    },

    // Desativar um template (soft delete)
    deactivateTemplate: async (id) => {
        const { data, error } = await supabase
            .from('form_templates')
            .update({
                status: 'inactive',
                updated_at: new Date().toISOString()
            })
            .eq('id', id)
            .select()
            .single()
        if (error) throw error
        return data
    }
}

// Helper functions para gerenciamento de profiles
export const profiles = {
    // Solicitar mudança no perfil (para colaboradores)
    requestProfileUpdate: async ({ profileId, changes }) => {
        const { data, error } = await supabase
            .from('profiles')
            .update({
                pending_changes: changes,
                change_status: 'pending',
                change_requested_at: new Date().toISOString()
            })
            .eq('id', profileId)
            .select()
            .single()
        if (error) throw error
        return data
    },

    // Aprovar ou rejeitar mudanças (para líderes)
    reviewProfileChanges: async ({ profileId, approve = true }) => {
        const { data: profile, error: fetchError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', profileId)
            .single()

        if (fetchError) throw fetchError

        if (approve && profile.pending_changes) {
            // Aplicar as mudanças e limpar o status
            const { data, error } = await supabase
                .from('profiles')
                .update({
                    ...profile.pending_changes,
                    pending_changes: null,
                    change_status: null,
                    change_reviewed_at: new Date().toISOString(),
                    change_reviewed_by: auth.user().id
                })
                .eq('id', profileId)
                .select()
                .single()
            if (error) throw error
            return data
        } else {
            // Rejeitar as mudanças
            const { data, error } = await supabase
                .from('profiles')
                .update({
                    pending_changes: null,
                    change_status: 'rejected',
                    change_reviewed_at: new Date().toISOString(),
                    change_reviewed_by: auth.user().id
                })
                .eq('id', profileId)
                .select()
                .single()
            if (error) throw error
            return data
        }
    },

    // Obter profiles com mudanças pendentes (para líderes)
    getPendingProfileChanges: async () => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('change_status', 'pending')
        if (error) throw error
        return data
    }
}

// RLS Policies
export const rlsPolicies = {
    // Política para permitir que usuários vejam apenas seus próprios dados de perfil
    profiles: {
        // Permitir que o usuário autenticado veja seu próprio perfil
        select: `
            id,
            email,
            user_metadata,
            role,
            team_id,
            created_at,
            updated_at,
            -- Permitir que o usuário veja o status de suas próprias mudanças
            change_status,
            pending_changes
        `,
        // Permitir que o usuário autenticado insira novos dados de perfil
        insert: `
            id,
            email,
            user_metadata,
            role,
            team_id,
            created_at,
            updated_at
        `,
        // Permitir que o usuário autenticado atualize apenas seu próprio perfil
        update: `
            id = auth.uid() AND (
                -- Líder pode atualizar diretamente
                exists (
                    select 1 from profiles p 
                    where p.id = auth.uid() and p.role = 'lider'
                )
                OR 
                -- Colaborador só pode solicitar mudanças via pending_changes
                (
                    (coalesce(change_status, '') != 'pending') AND
                    (pending_changes is not null)
                )
            )
        `,
        // Permitir que o usuário autenticado delete seu próprio perfil
        delete: `id = auth.uid()`
    },

    // Política para permitir que usuários vejam apenas os times aos quais pertencem
    teams: {
        // Permitir que o usuário autenticado veja os times aos quais pertence
        select: `
            id,
            name,
            leader_id,
            created_at,
            updated_at,
            -- Incluir informações do líder do time
            leader:leader_id (
                id,
                email,
                user_metadata
            )
        `,
        // Permitir que o usuário autenticado insira novos times
        insert: `
            id,
            name,
            leader_id,
            created_at,
            updated_at
        `,
        // Permitir que o usuário autenticado atualize apenas os times que lidera
        update: `
            id = auth.uid() AND (
                -- Apenas líderes podem atualizar os times
                exists (
                    select 1 from profiles p 
                    where p.id = auth.uid() and p.role = 'lider'
                )
            )
        `,
        // Permitir que o usuário autenticado delete apenas os times que lidera
        delete: `
            id = auth.uid() AND (
                -- Apenas líderes podem deletar os times
                exists (
                    select 1 from profiles p 
                    where p.id = auth.uid() and p.role = 'lider'
                )
            )
        `
    },

    // Política para permitir que usuários vejam apenas os templates de formulário que criaram
    form_templates: {
        // Permitir que o usuário autenticado veja seus próprios templates
        select: `
            id,
            title,
            description,
            criteria,
            created_by,
            status,
            created_at,
            updated_at,
            -- Incluir informações do criador do template
            creator:created_by (
                id,
                email,
                user_metadata
            )
        `,
        // Permitir que o usuário autenticado insira novos templates
        insert: `
            id,
            title,
            description,
            criteria,
            created_by,
            status,
            created_at,
            updated_at
        `,
        // Permitir que o usuário autenticado atualize apenas seus próprios templates
        update: `
            id = auth.uid() AND (
                -- Apenas os criadores podem atualizar os templates
                exists (
                    select 1 from profiles p 
                    where p.id = auth.uid() and p.role = 'criador'
                )
            )
        `,
        // Permitir que o usuário autenticado delete apenas seus próprios templates
        delete: `
            id = auth.uid() AND (
                -- Apenas os criadores podem deletar os templates
                exists (
                    select 1 from profiles p 
                    where p.id = auth.uid() and p.role = 'criador'
                )
            )
        `
    }
}