
import React from 'react'

import { signIn, signOut, useSession } from 'next-auth/react'
import  { NavBar } from './NavBar'
import { sign } from 'crypto'


export const Login = () => {
   const {status} = useSession();
  return (
    <div>
      <NavBar />
      <div className="container mx-auto my-8">
        <div className="h-12">
          {status ==="authenticated" ? (
          <button
            onClick={signOut}
            className="rounded bg-blue-600 text-white px-6 py-2 font-semibold">
            Sign Out
          </button>
          ) : (
            <button
            onClick={signIn}
            className="rounded bg-blue-600 text-white px-6 py-2 font-semibold">
            Sign In
          </button>
          )}
        </div>
      </div>
    </div>
  )
}
