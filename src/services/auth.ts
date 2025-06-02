import { supabase } from '../lib/supabase'
import { AuthError, AuthResponse } from '@supabase/supabase-js'

interface UserData {
    name: string
    matricula: string
    turno: string
}

export const authService = {
    async signUp(email: string, password: string, userData: UserData): Promise<AuthResponse> {
        try {
            const response = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: userData
                }
            })
            if (response.error) throw response.error
            return response
        } catch (error) {
            throw error as AuthError
        }
    },

    async signIn(email: string, password: string): Promise<AuthResponse> {
        try {
            const response = await supabase.auth.signInWithPassword({
                email,
                password
            })
            if (response.error) throw response.error
            return response
        } catch (error) {
            throw error as AuthError
        }
    }
}
