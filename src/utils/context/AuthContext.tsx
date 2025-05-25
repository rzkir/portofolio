"use client"

import { createContext, useContext, useEffect, useState } from 'react'

import { User, Session } from '@supabase/supabase-js'

import { supabase } from '../supabase/supabase'

import { useRouter } from 'next/navigation'

import { toast } from 'sonner'

import { AuthContextType } from '@/types/auth'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setUser(session?.user ?? null)
            setLoading(false)
        })

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            setUser(session?.user ?? null)
            setLoading(false)
        })

        return () => subscription.unsubscribe()
    }, [])

    const signUp = async (email: string, password: string, fullName: string) => {
        try {
            // Split full name into first and last name
            const [firstName, ...lastNameParts] = fullName.split(' ')
            const lastName = lastNameParts.join(' ')

            // Sign up with Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        first_name: firstName,
                        last_name: lastName,
                        role: 'user', // Default role for new users
                    },
                },
            })

            if (authError) {
                if (authError.message.includes('already registered')) {
                    toast.error('This email is already registered. Please use a different email or try logging in.')
                } else {
                    toast.error(authError.message)
                }
                return
            }

            if (!authData.user) {
                throw new Error('Failed to create user account')
            }

            // Store additional user data in the accounts table
            const { error: accountError } = await supabase
                .from('accounts')
                .insert([
                    {
                        id: authData.user.id,
                        email: email,
                        first_name: firstName,
                        last_name: lastName,
                        role: 'user'
                    }
                ])

            if (accountError) {
                // If account creation fails, try to delete the auth user
                await supabase.auth.admin.deleteUser(authData.user.id)
                throw new Error('Failed to create user profile')
            }

            toast.success('Account created successfully! Redirecting to login...', {
                duration: 2000,
            })

            setTimeout(() => {
                router.push('/signin')
            }, 2000)
        } catch (error: any) {
            toast.error(error.message || 'An unexpected error occurred. Please try again.')
        }
    }

    const signIn = async (email: string, password: string) => {
        try {
            const { error, data } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) {
                if (error.message.includes('Invalid login credentials')) {
                    toast.error('Invalid email or password')
                } else if (error.message.includes('Email not confirmed')) {
                    toast.error('Please verify your email first')
                } else {
                    toast.error(error.message)
                }
                return
            }

            // Get user role from accounts table
            const { data: accountData, error: accountError } = await supabase
                .from('accounts')
                .select('role')
                .eq('id', data.user.id)
                .single()

            if (accountError) {
                toast.error('Failed to fetch user role')
                return
            }

            const userRole = accountData?.role || 'user'

            if (userRole === 'admins') {
                toast.success('Welcome back, Admin!', {
                    duration: 2000,
                })
                router.push('/dashboard')
            } else {
                toast.success('Welcome back!', {
                    duration: 2000,
                })
                router.push('/')
            }

            return data.user
        } catch {
            toast.error('An unexpected error occurred. Please try again.')
        }
    }

    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut()
            if (error) {
                toast.error(error.message)
                return
            }

            toast.success('Logged out successfully!', {
                duration: 2000,
            })

            setTimeout(() => {
                router.push('/signin')
            }, 2000)
        } catch {
            toast.error('An unexpected error occurred. Please try again.')
        }
    }

    const resetPassword = async (email: string) => {
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            })

            if (error) {
                toast.error(error.message)
                return
            }

            toast.success('Password reset link has been sent to your email!', {
                duration: 3000,
            })

            setTimeout(() => {
                router.push('/signin')
            }, 3000)
        } catch {
            toast.error('An unexpected error occurred. Please try again.')
        }
    }

    const changePassword = async (newPassword: string) => {
        try {
            const { error } = await supabase.auth.updateUser({ password: newPassword });
            if (error) {
                toast.error(error.message);
                return false;
            }
            toast.success('Password updated successfully!');
            return true;
        } catch {
            toast.error('An unexpected error occurred. Please try again.');
            return false;
        }
    };

    const value = {
        user,
        session,
        loading,
        signUp,
        signIn,
        signOut,
        resetPassword,
        changePassword,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}