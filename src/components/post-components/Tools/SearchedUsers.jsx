import profilePicture from '../../../images/profile.jpeg';
import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import AddCollaboratorRole from './AddCollaboratorRole.jsx';
export default function SearchedUsers({ users }) {
  const [open,setOpen]=useState(false)
  const [selectedUser,setSelectedUser]=useState()

  const handleSelect=(user)=>{
    setSelectedUser(user)
    setOpen(true)

  }
  const onClose=()=>{
    setOpen(false)
  }

  return (
    <div className="space-y-3">
      {users.map((user) => (
        <div
          key={user?._id}
          className="flex items-center justify-between bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center gap-3">
            <img
              src={user?.profileImgUrl || profilePicture}
              alt={user?.username}
              className="w-12 h-12 rounded-full object-cover border border-gray-200"
            />
            <div>
              <p className="font-semibold text-gray-800">@{user?.username}</p>
              <p className="text-sm text-gray-500">{user?.fullname}</p>
            </div>
          </div>

          <button onClick={()=>handleSelect(user)} className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-lg text-sm shadow hover:bg-blue-600 transition-colors duration-200">
            <UserPlus size={16} /> Add
          </button>
        </div>
      ))}

      <AddCollaboratorRole user={selectedUser} open={open} onClose={onClose}/>
    </div>
  );
}
