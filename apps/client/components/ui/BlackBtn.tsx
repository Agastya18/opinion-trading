"use client"
import { useSession } from "next-auth/react";
import Link from "next/link";

interface BlackBtnProps {
    text: string;
}

export const BlackBtn = ({text}: BlackBtnProps) => {
    const {data} = useSession();
 
    return (
        <Link href={!data?.user ? "/auth/signin" : "/events"}>
        <button className="bg-black text-white rounded-lg p-2 px-10 border text-sm font-bold">{text}</button>
        </Link>
    );
}