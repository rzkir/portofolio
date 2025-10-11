import React, { Fragment } from 'react'

import Contact from '@/hooks/contacts/Contact'

import { ContactsSchema, ContactsBreadcrumbSchema } from "@/lib/Script";

export default function page() {

    return (
        <Fragment>
            <ContactsBreadcrumbSchema />
            <ContactsSchema />
            <Contact />
        </Fragment>
    );
}