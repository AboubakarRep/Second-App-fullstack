

import React from 'react'

export const User = ({user, deleteUser, editUser}) => { //user, deleteUser and editUser are props
  return (
    <tr key={user.id}>
    <td className='text-left px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-500'>{user.firstName}</div>
    </td>
    <td className='text-left px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-500'>{user.lastName}</div>
    </td>
    <td className='text-left px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-500'>{user.emailId}</div>
    </td>
    <td className='text-right px-6 py-4 whitespace-nowrap'>
        <a onClick={(e:any, id:any) =>/**editUser will come as a prop; to the top */ editUser(e, user.id)} className='text-indigo-600 hover:text-indigo-800 hover:cursor-pointer px-4'>Edit</a>
        <a onClick={(e:any, id:any) => deleteUser(e, user.id)} className='text-indigo-600 hover:text-indigo-800 hover:cursor-pointer'>Delete</a>
    </td>
</tr>
  )
}
