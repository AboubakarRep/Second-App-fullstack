
import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import { UserList } from './UserList'


export const AddUser = () => {
  const USER_API_BASE_URL = "http://localhost:8080/api/v1/users" //url for save user, adduser

  //we need to have one state as well to handle that particular user so whenever there is a new update in the user 
  const [responseUser, setResponseUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    emailId: ""
  }
    )
  //useState for save data in ui adduser to database
  const [user, setUser] = useState({ //default value for this state
    id: "",
    firstName: "",
    lastName: "",
    emailId: ""
  }) //we have to define in my input file
  //isOpen is a state
  const [isOpen, setisOpen] = useState(false)

  //we define couple of methods
  function closeModal(){
    setisOpen(false) //at this time, now is at false
  }

  function openModal(){ //we have to use the funtion on button
    setisOpen(true) //at this time, now is at false
  }
  //we have to create function, whenever i do any change those values would be updating in my state
  const handleChange = (event: any) => {
    const value = event.target.value; //whatever the event it is happening in that event object get the value for the target; example: target First Name
    //now we need to set the user
    setUser({...user, [event.target.name]: value}) //example name is firstname, whatever the existing value we have, we have to keep those values and we want to update those values, we use user for ...user for other properties, current vaue, plus new value with event target will be updated 
  }

  //function saveUser for button
  const saveUser = async (e) => { //async because we are going call api
    e.preventDefault(); //we don't want to refresh the page
    //we want to call save api
    const response = await fetch(USER_API_BASE_URL, { //we add configuration in fetch url
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user), //whatever user state is created that i am passing as a body
    });
      if(!response.ok){
        throw new Error("Something went wrong");
      }

      //oyherwise
      const _user = await response.json(); //whe i get the user back
      //whatever the record we are getting back as a response we wills et 
      setResponseUser(_user); //our state is updated; this state we will pass as a props to the user list; look at the bottom of the code
      //we calling reset
      reset(e)

    };

    //for reset
    const reset = (e: { preventDefault: any }) => {
      e.preventDefault();
      setUser({ //reset value
        id: "", 
        firstName: "",
        lastName: "",
        emailId: ""
      })
      setisOpen(false); //because we want to close the modal  
    }
  
  return (
    <> {/**add fragment because in react it can only have one parent */}
    <div className='container mx-auto my-8'> {/**x-auto for make sure it'is in the center */}
        <div className='h-12'>
            <button onClick={openModal} className='rounded bg-slate-600 text-white px-6 py-2 font-semibold'>Add User</button>
        </div>
    </div>
    {/**we need to animate button with transition */}
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
        <div className='min-h-screen px-4 text-center'>
          <Transition.Child
           as={Fragment}
           enter="ease-out duration-300"
           enterFrom="opacity-0"
           enterTo="opacity-100"
           leave="ease-in duration-200"
           leaveFrom="opacity-100"
           leaveTo="opacity-0"
          >
            <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all  transform bg-white shadow-xl rounded-md'>
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900" >Add New User</Dialog.Title>
              <div className='flex max-w-md mx-auto'>
                <div className='py-2'>
                  <div className='h-14 my-4'>
                    <label className="block text-gray-600 text-sm font-normal">First Name</label>
                    <input onChange={(e) => handleChange(e)} /**value for connect ui to database with help of const user, usestate */ value={user.firstName} type="text" name='firstName' className='h-10 w-96 border mt-2 px-2 py-2' />
                  </div>  
                  <div className='h-14 my-4'>
                    <label className="block text-gray-600 text-sm font-normal">Last Name</label>
                    <input onChange={(e) => handleChange(e)} value={user.lastName} type="text" name='lastName' className='h-10 w-96 border mt-2 px-2 py-2' />
                  </div> 
                  <div className='h-14 my-4'>
                    <label className="block text-gray-600 text-sm font-normal">Email Id</label>
                    <input /**for handle and updating value in ui to database */ onChange={(e) => handleChange(e)} value={user.emailId} type="text" name='emailId' className='h-10 w-96 border mt-2 px-2 py-2' />
                  </div> 
                  <div className='h-14 my-4 space-x-4 pt-4'>
                    <button onClick={saveUser} className='rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6'>Save</button>
                    <button onClick={reset} className='rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6'>Close</button>
                  </div>
                </div> 
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>

    {/**once transition is done, here i'll just define userlist and we want to pass the prop*/} 
    <UserList user={responseUser}/>  {/**in the user list we can take user as a props */}
    </>
  )
}
