'use client'

import { usePathname } from 'next/navigation';
import Login from './login/page';

export const LayoutProvider = ({ children }) => {
    const pathname = usePathname();
    return (
        <>
       {pathname === "/login" ? <Login /> : children}

        </>
    )
};