import React from 'react'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Sign In',
    description: 'Sign in to your account',
}

import SigninLayout from "@/hooks/(auth)/signin/SignInLayout"

export default function SignInPage() {
    return (
        <SigninLayout />
    )
}
