"use client";

import { signIn, useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { User, getUserByEmail } from "@/server/admin/users";
import Link from "next/link";

export default function NavBar() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [userData, setUserData] = useState<User>();

  const getUserData = async () => {
    if (session) {
      const res = await getUserByEmail(session!.user!.email!);
      setUserData(res);
      console.log(userData._id)
    }
  }

  useEffect(() => {
    getUserData();
  }, [session]);
  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <Link href="/">Resolutions</Link>
        {userData && <Link href={"/user/"+userData._id}>User</Link>}
        <Link href="/">Resolutions</Link>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
