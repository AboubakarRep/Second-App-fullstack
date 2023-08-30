

import { signOut, useSession } from "next-auth/react"
import Image from "next/image"




export const NavBar = () => {
  //we want to get session
  const { data: session, status } = useSession();
  return (
    // <div className="bg-gray-800">
    //   <div className="h-16 px-8 flex items-center">
    //     <p className="text-white font-bold flex-auto">User Management Sytem Made by Aboubakar</p>
    //     {session &&( //if session is there then create div 
    //       <div className="flex items-center sm:space-x-2 justify-end">
    //         <Image onClick={signOut} className="rounded-full cursor-pointer" title="Click to Logout" width="30" height="30" src={session.user?.image} alt="Fb Image" ></Image>
    //         <p className="text-white font-bold">{session?.user?.name}</p> {/** if session is there then dot user dot name  */}
    //       </div>
    //     )}
    //   </div>
    // </div>



    <div className="bg-gray-800">
      <div className="h-16 px-8 flex items-center">
        <p className="text-white font-bold flex-auto">User Management System By Aboubakar </p>
        {session && (
          
          <>
          <div className="flex items-center sm:space-x-2 justify-end">
            <Image
              onClick={signOut}
              className="rounded-full cursor-pointer"
              src={session?.user?.image}
              height="30"
              width="30"
              title="Click to Logout" alt="Facebook Image"></Image>
            <p className="text-white font-bold">{session?.user?.name}</p>
          </div>
          
          </>
        )}
      </div>
    </div>
  )
}















