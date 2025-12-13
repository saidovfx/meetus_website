import { useState,useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import { X } from "lucide-react"
import toast from "react-hot-toast";
import { useDispatch,useSelector } from "react-redux";
import profileImg from '../../../images/profile.jpeg'
export default function CollaboratorNotification({collaborator}) {
 const dispatch=useDispatch() 
 
  return (
<div className="
  relative
  w-full
  max-w-[720px]
  bg-white
  shadow-[0_8px_30px_rgba(0,0,0,0.08)]
  rounded-2xl
  mx-auto my-4
  px-5 py-4
  flex flex-col lg:flex-row
  lg:items-center lg:justify-between
  gap-4
">

  {/* ❌ CLOSE BUTTON — ALWAYS TOP RIGHT */}
  <button
    className="
      absolute top-3 right-3
      p-2
      rounded-full
      hover:bg-gray-100
      transition
      z-10
    "
  >
    <X size={18} className="text-gray-400" />
  </button>

  {/* LEFT */}
  <div className="flex items-start gap-4 max-w-full pr-10">
    <img
      src={collaborator?.ownerId?.profileImgUrl || profileImg}
      alt="user"
      className="w-12 h-12 rounded-full object-cover bg-gray-100 shrink-0"
    />

    <div className="max-w-[420px]">
      <p className="text-sm text-gray-800 leading-snug">
        <span className="font-semibold">
          {collaborator?.ownerId?.fullname || t('profile.fullname')}
        </span>{" "}
        {t('posts.invitedMessage')}
      </p>

      <p className="text-xs text-gray-500 mt-0.5">
        @{collaborator?.ownerId?.username || t('profile.username')}
      </p>
    </div>
  </div>

  {/* RIGHT */}
  <div className="
    flex items-center gap-3
    justify-end
    flex-wrap
  ">
    <button className="text-sm text-gray-500 hover:text-gray-700 transition whitespace-nowrap">
      {t('posts.message')}
    </button>

    <button className="text-sm text-gray-500 hover:text-gray-700 transition whitespace-nowrap">
      {t('posts.seePost')}
    </button>

    <button className="
      px-4 py-2
      text-sm font-semibold
      text-white
      rounded-xl
      bg-blue-600
      hover:bg-blue-700
      transition
      whitespace-nowrap
    ">
      {t('posts.acceptPost')}
    </button>
  </div>

</div>




  )
}
