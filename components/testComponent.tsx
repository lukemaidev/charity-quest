"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { User, createUser, deleteUser, getAllUsers, getUserById, updateUser } from "@/server/admin/users";

export default function TestComponent() {
  const { data: session, status } = useSession()
  const [users, setUsers] = useState<User[]>([]);

  useEffect(()=>{
    getAllUsers().then((res) => {
      setUsers(res);
      console.log(res);
    })

    getUserById('65a3468d2ab16d604c391b2d').then((res) => {
      console.log(res);
    }) 

    //Creating user works
    // const testUser ={
    //   userName: "testUser",
    //   email: "test@gmail.com",
    //   userType: "user",
    //   resolutionIds: [],
    // } 
    // createUser(testUser).then((res) => {
    //   console.log(res);
    // })


    //Deleting user works
    // deleteUser('65b6323fb2c01c5e1c18e3b5').then((res) => {
    //   console.log(res);
    // })


    // //Updating user works
    updateUser('65b6323eb2c01c5e1c18e3b4', {userName: "testUser2"}).then((res) => {
      console.log("Updating ",res);
    })
  },[])
  if (status === "authenticated") {
    return <p>Signed in as {session.user?.email}</p>
  }

  return <div></div>
}