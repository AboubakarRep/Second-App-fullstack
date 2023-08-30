
import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState, useEffect } from 'react'


{/** some elements from addUser  */}
export const EditUser = ({userId, setResponseUser}) => { 
    const USER_API_BASE_URL = "http://localhost:8080/api/v1/users" //url for save user, adduser
      //useState for save data in ui adduser to database
  const [user, setUser] = useState({ //default value for this state
    id: "",
    firstName: "",
    lastName: "",
    emailId: ""
  }) //we have to define in my input file
  //isOpen is a state
  const [isOpen, setIsOpen] = useState(false)

  //we define couple of methods
  function closeModal(){
    setIsOpen(false) //at this time, now is at false
  }

  function openModal(){ //we have to use the funtion on button
    setIsOpen(true) //at this time, now is at false
  }
  //we have to create function, whenever i do any change those values would be updating in my state
  const handleChange = (event: any) => {
    const value = event.target.value; //whatever the event it is happening in that event object get the value for the target; example: target First Name
    //now we need to set the user
    setUser({...user, [event.target.name]: value}) //example name is firstname, whatever the existing value we have, we have to keep those values and we want to update those values, we use user for ...user for other properties, current vaue, plus new value with event target will be updated 
  }

  //we use useEfect for fetch data based on prop userId pass as a prop on the top
  useEffect(() => {
    const fetchData = async () =>  {
        try {
            const response = await fetch(USER_API_BASE_URL + "/" + userId, {
                method: "GET",
                headers: {
                    "Content_Type": "application/json"
                },
            });
        //we need to get the response after get call fetch data api get api for particular user id
        const _user = await response.json()
        setUser(_user)
        setIsOpen(true)
        } catch (error) {
            console.log(error)
        }
    };
    if(userId){ //if there is userId, call fetchData
        fetchData();
    }
  }, [userId]); //userId as a dependency


    //for reset
    const reset = (e: { preventDefault: any }) => {
        e.preventDefault();
        setIsOpen(false); //because we want to close the modal  
      }

      //for updateUser function
      const updateUser = async (e:any) => {
        e.preventDefault();
        const response = await fetch(USER_API_BASE_URL + "/" + userId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user),
        });
        //after call method for save data
        if(!response.ok){
            throw new Error("Something went wrong")
        }
        //else
        const _user = await response.json();
        //once we get the data we will use this method to update this state, the state of the parent is changed and the model is closed
        setResponseUser(_user)
        reset(e) //modal is closed, it will fetch the data and everything should work 
      }
  return (
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
            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900" >Update User</Dialog.Title>
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
                  <button onClick={updateUser} className='rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6'>Update</button>
                  <button onClick={reset} className='rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6'>Close</button>
                </div>
              </div> 
            </div>
          </div>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition>
  )
}