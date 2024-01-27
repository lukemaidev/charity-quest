"use client"

import { useSession } from "next-auth/react"

export default function NavBar() {
    const { data: session, status } = useSession()
    return(<div>
        Something
    </div>)
}