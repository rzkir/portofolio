import React from 'react'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Sign Up',
    description: 'Sign Up to your account',
}

import SigninLayout from "@/hooks/(auth)/signup/SignupLayout"

export default function SignInPage() {
    return (
        <SigninLayout />
    )
}
