'use client';

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface ProviderProps {
    children: ReactNode;
    session: any; // Replace 'any' with the type of your session object
}

export const Provider: React.FC<ProviderProps> = (props) => (
    <SessionProvider session={props.session}>
        {props.children}
    </SessionProvider>
);