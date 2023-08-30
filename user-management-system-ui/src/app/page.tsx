"use client"
import type { NextAuthOptions } from 'next-auth'
import Head from "next/head";
import { UserList } from "../../components/UserList";
import { AddUser } from "../../components/AddUser";
import { getSession, useSession } from "next-auth/react";

import { NavBar } from "../../components/NavBar";
import { Login } from "../../components/Login";
import { getServerSession } from "next-auth";
import { authOptions } from '../../pages/api/auth/[...nextauth]';




export default function Home() { //prop session is injected in home, we returning as a prop
  const {status, data: session} = useSession()
  //if we have session, if we are logged in
  //if there is no session, return login page
  if (status !== "authenticated") return <Login />
  return ( 
    <div>
      <Head>
        <title>User Management System Made By Aboubakar</title>
      </Head>

      <NavBar />
      
      <main>
      <AddUser />
      {/* <UserList /> */}
      </main>
    </div>
  )
  
}

//we define server side rendering for session provider
//when we start our application if we have session available then we can go to the application
//but if you don't have session available then redirect back to the authentication page where we will do the facebook
//authentication and from the facebook authentication once we get session back directly inject yhe session

//we want to get the session directly when the page loads itself we want the session directly from the server
//when the page is loading, we don't want that page is loaded and then the session is loaded

//server side rendering


 async function getServerSideProps(context) {
  //we have to use getsession
  const session = await getServerSession(context.req, context.res, authOptions)
  // const session = await getSession(context)
  //once we get the session we will return the props
  // return {
  //   props: {session}
  // }


  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     },
  //   }
  // }

  return {
    props: {
      session,
    },
  }
}





