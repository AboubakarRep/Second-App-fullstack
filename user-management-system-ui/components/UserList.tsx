
import React, { useEffect, useState } from 'react'
import { User } from './User'
import { EditUser } from './EditUser';


export const UserList = ({user}) => {
    
    //Api to fetch data
    const USER_API_BASE_URL = "http://localhost:8080/api/v1/users"

    //use useState for data
    const [users, setUsers] = useState(null) //by default null
    //use State for loading
    const [loading, setLoading] = useState(true) //by default true

    //useState userId for get Id for editUser
    const [userId, setUserId] = useState(null) //value null by default

    //useState for update userlist for ui
    const [responseUser, setResponseUser] = useState(null) //by default it is null

    //useEffect hook to fetch data
    useEffect(() => {
        const fetchData =async () => {
            setLoading(true);
            try {
                const response = await fetch(USER_API_BASE_URL, { //configuration to fetch data
                    method: "GET",
                    headers:{
                        "Content-Type": "application/json"
                    }
                })
                //get Users
                const users = await response.json();
                setUsers(users) //once we get users, we will set the users to our state
            } catch (error) {
                console.log(error);
            }
            setLoading(false) //false because the loading is completed 
        }
        //call this function here
        fetchData();
    },[user, responseUser]) //we use user as dependency to log my data; //responseUser as a dependency for editUser to update userList inui
    //whenever there is an update in response user or user it will call the data and it will update data
    

    //for delete user in tbody
    const deleteUser = (e:any, id:any) => {
        e.preventDefault();
        //we do fetch api
        fetch(USER_API_BASE_URL + "/" + id, { //related to the method deleteMapping make on spring boot
                //methods and other
                method: "DELETE",
        })
        .then((res) => {
            if(users) {//if we have users
                //now we want to remove users in ui, because side of backend is done,we want for ui
                setUsers((prevElement: any) => { //take previous element
                    //user id "id" that we are passing that should not exist in the list, you are just removing that and passing back the list of user
                    return prevElement.filter((user: { id: any; }) => user.id !== id) //after delete record in backend wa have to filtering data from records currently in ui, for filtering what id of user is deleted from backend and delete from ui
                })
            }       
        }) 
    }

    //editUser
    const editUser = (e: any, id: any) => { //we want to get this particular id and we want to pass this id to the component that we are going to create, we use usestate:userId for that
        e.preventDefault();
        //when we get editUser, we will update setUserId to id
        setUserId(id);


    }
  return (
    <>
    <div className='container mx-auto my-8'>
        <div className='flex shadow border-b'>
            <table className='min-w-full'>
                <thead className='bg-gray-50'>
                    <tr>
                    {/* tracking wide for separate letters */}
                        <th className='text-left font-medium text-gray-500 uppercase py-3 px-6'>First Name</th> 
                        <th className='text-left font-medium text-gray-500 uppercase py-3 px-6'>Last Name</th>
                        <th className='text-left font-medium text-gray-500 uppercase py-3 px-6'>EmailId</th>
                        <th className='text-right font-medium text-gray-500 uppercase py-3 px-6'>Actions</th>
                    </tr>
                </thead>
                {!loading &&( //once loading is completed then only we have to show "tbody"
                <tbody className='bg-white'>
                    {users?.map((user: any) => (  // it will call User Component
                       
                    //on the User Component we need to pass userObject in map method, using the props   
                   <User/**the key i want to use in user.js is user */ user={user} /**prop i'am passing user in map*/
                   key={user.id} //because every component should have key, this key will be unique
                //for deleteuser
                    deleteUser={deleteUser}
                    //for editUser
                    editUser={editUser /**we have to create in this tsx the editUser */}
                   /> 
                ))}
                </tbody>
                )}
            </table>
        </div>
    </div>
    <EditUser  /**this user Id can take as a prop in editUser file in const editUser */ userId={userId}
    //we pass as an input parameter as a props we will pass the response user method
    setResponseUser= {setResponseUser} //this method will update this state in the parent component, here
    />
    </> //it is fragments 
  )
}
