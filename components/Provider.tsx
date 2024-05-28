import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface ProviderProps {
    children: ReactNode;
    session?: any; 
}

export const Provider: React.FC<ProviderProps> = (props) => (
    <SessionProvider session={props.session}>
        {props.children}
    </SessionProvider>
);