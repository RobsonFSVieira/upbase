export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    email: string
                    name: string
                    matricula: string
                    turno: string
                    role: 'admin' | 'leader' | 'colaborador'
                    team_id: string | null
                    status: 'pending' | 'active' | 'inactive'
                    settings: Record<string, any>
                    created_at: string
                    updated_at: string
                }
                Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>
                Update: Partial<Database['public']['Tables']['profiles']['Insert']>
            }
            teams: {
                Row: {
                    id: string
                    name: string
                    leader_id: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: Omit<Database['public']['Tables']['teams']['Row'], 'created_at' | 'updated_at'>
                Update: Partial<Database['public']['Tables']['teams']['Insert']>
            }
            // ...outros tipos de tabelas...
        }
        Views: {
            active_evaluations: {
                Row: {
                    // campos da view
                }
            }
            evaluation_metrics: {
                Row: {
                    // campos da view
                }
            }
        }
    }
}
