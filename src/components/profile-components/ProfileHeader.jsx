import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import backgroundImage from "../../images/meetus_background.png";
import profileImage from "../../images/profile.jpeg";
import businessImage from "../../images/bussness.png";
import { t } from "i18next";
import Modal from "./Modal";
import { useState } from "react";
import { getCollaborator } from "../../features/notification.features/post.notifictaion/collaborator.notication.js";
import CollaboratorNotification from "../notification/Tools/CollaboratorNotification.jsx";
export default function ProfileHeader() {
  const dispatch=useDispatch()
  const { user } = useSelector((state) => state.user);
  const {collaborators} =useSelector(state=>state.collaborator)
const [isModalOpen,setIsModalOpen]=useState(false)
console.log(collaborators);

useEffect(()=>{
  dispatch(getCollaborator())
},[])
  return (
    <div className="relative w-full ">
      {collaborators.length>0 && 
      collaborators.map((item)=>(
       <CollaboratorNotification  collaborator={item} />
      ))
      
      }
      <div className="relative h-[14rem] md:h-[16rem] w-full">
        <img
          src={user?.coverImgUrl ? user.coverImgUrl : backgroundImage}
          alt="cover"
          className="h-full w-full object-cover rounded-b-2xl shadow-sm"
        />

        {user?.role === "business" && (
          <img
            src={businessImage}
            alt="business"
            className="absolute top-4 right-5 w-16 h-16 rounded-full shadow-lg ring-2 ring-primary bg-white p-1"
          />
        )}
      </div>
      <div className="absolute left-4 sm:left-8 -bottom-10 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="relative">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full ring-4 ring-white shadow-lg overflow-hidden -mt-10 sm:-mt-12" onClick={()=>setIsModalOpen(true)}>
            <img
              src={user?.profileImgUrl ? user.profileImgUrl : profileImage}
              alt="profile"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

<Modal
    isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageUrl={user?.profileImgUrl ? user?.profileImgUrl : profileImage}
        userId={user?._id}
/>

        <div className="flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-5">
            <h3 className="text-2xl font-semibold text-gray-800">
              {user?.fullname || "Full Name"} <br />
                 <p className="text-gray-500 text-lg mt-1">
            @{user?.username || "username"}
          </p>

            </h3>

            <div className="flex items-center gap-6 text-gray-700 text-sm">
              <div className="flex flex-col text-center">
                <p className="text-gray-500">{t('profile.followers')}</p>
                <p className="font-semibold">{user?.followers?.length || 0}</p>
              </div>

              <div className="flex flex-col text-center">
                <p className="text-gray-500">{t('profile.following')}</p>
                <p className="font-semibold">{user?.following?.length || 0}</p>
              </div>

              <div className="flex flex-col text-center">
                <p className="text-gray-500">{user?.role==="business" ? t('profile.vacancy'):t('profile.projects')}</p>
                <p className="font-semibold">{user?.posts?.length || 0}</p>
              </div>
            </div>
          </div>

       
        </div>
      </div>

      <div className="pb-28 sm:pb-6"></div>
    </div>
  );
}
