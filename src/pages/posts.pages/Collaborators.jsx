import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft } from "lucide-react";
import { changePage } from "../../features/navigator.features/navigator";
import { search } from "../../features/search.feauture/search";
import SearchedUsers from "../../components/post-components/Tools/SearchedUsers";
import { useNavigate } from "react-router-dom";
import router from "../../config/router.app";
import profilePicture from '../../images/profile.jpeg'
import { X } from "lucide-react";
import { removeSelectedUser } from "../../features/search.feauture/search";
import { t } from "i18next";
export default function Collaborators() {
  const dispatch = useDispatch();
  const { searchedUser,selectedUsers, loading, reportError } = useSelector(state => state.search);
const [value,setValue]=useState('')
    const navigate=useNavigate()

const handleSearch=(text)=>{
  setValue(text)
  dispatch(search({text}))
}
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div
        onClick={() => navigate(router.stuckNavigator)}
        className="flex items-center gap-2 p-4  cursor-pointer"
      >
        <ArrowLeft size={22} />
        <p className="font-semibold text-lg text-gray-800">{t('posts.collaborator')}</p>
      </div>

      <div className="p-4 space-y-4">

        <div className="border-l-4 border-blue-400 bg-blue-50 p-3 rounded-md text-gray-700 text-sm">
        {t('posts.collDesc')}
        </div>

        <div className="relative">
          <input
            type="text"
            className="w-full p-3 pl-4 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            placeholder={t('posts.search')}
            value={value}
            onChange={(e)=>handleSearch(e.target.value)}
          />
        </div>
        {reportError && (
          <p className="text-red-500 text-sm">{reportError}</p>
        )}

      {selectedUsers?.length > 0 && (
  <div className="p-3 rounded-xl border"
       style={{ 
         backgroundColor: "#ffffff",
         borderColor: "#cfe2f7"
       }}>
    <p
      className="text-sm font-semibold mb-2"
      style={{ color: "#1a1f36" }}
    >
      {t('posts.selected')}({selectedUsers.length})
    </p>

    <div className="flex flex-wrap gap-2">
      {selectedUsers?.map((user) => (
        <div
          key={user.userId}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full shadow-sm transition-all"
          style={{
            backgroundColor: "#e6f0fa",
            border: "1px solid #cfe2f7"
          }}
        >
          <img
            src={user.profileImgUrl || profilePicture}
            alt={user.username}
            className="w-8 h-8 rounded-full object-cover"
          />

          <span className="text-sm font-medium"
                style={{ color: "#1a1f36" }}>
            @{user.username}
          </span>

          <button
            onClick={() =>
              dispatch(removeSelectedUser({ userId: user.userId }))
            }
            className="btn btn-xs btn-circle"
            style={{
              backgroundColor: "#4fc3f7",
              color: "white",
              border: "none"
            }}
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  </div>
)}




   {
    value!==""  &&    searchedUser?.length > 0   && (
          <SearchedUsers users={searchedUser} />
        )
   }

        {loading && (
<>

 <div className="flex w-full sm:w-64 md:w-72 flex-col gap-4 p-4 bg-[#e6f0fa] rounded-xl">
  <div className="flex items-center gap-4">
    <div className="h-16 w-16 shrink-0 rounded-full bg-[#d0e4f7] animate-pulse"></div>
    <div className="flex flex-col gap-3 w-full">
      <div className="h-4 w-1/2 bg-[#d0e4f7] rounded animate-pulse"></div>
      <div className="h-4 w-2/3 bg-[#d0e4f7] rounded animate-pulse"></div>
    </div>
  </div>
</div> <div className="flex w-full sm:w-64 md:w-72 flex-col gap-4 p-4 bg-[#e6f0fa] rounded-xl">
  <div className="flex items-center gap-4">
    <div className="h-16 w-16 shrink-0 rounded-full bg-[#d0e4f7] animate-pulse"></div>
    <div className="flex flex-col gap-3 w-full">
      <div className="h-4 w-1/2 bg-[#d0e4f7] rounded animate-pulse"></div>
      <div className="h-4 w-2/3 bg-[#d0e4f7] rounded animate-pulse"></div>
    </div>
  </div>
</div> <div className="flex w-full sm:w-64 md:w-72 flex-col gap-4 p-4 bg-[#e6f0fa] rounded-xl">
  <div className="flex items-center gap-4">
    <div className="h-16 w-16 shrink-0 rounded-full bg-[#d0e4f7] animate-pulse"></div>
    <div className="flex flex-col gap-3 w-full">
      <div className="h-4 w-1/2 bg-[#d0e4f7] rounded animate-pulse"></div>
      <div className="h-4 w-2/3 bg-[#d0e4f7] rounded animate-pulse"></div>
    </div>
  </div>
</div> <div className="flex w-full sm:w-64 md:w-72 flex-col gap-4 p-4 bg-[#e6f0fa] rounded-xl">
  <div className="flex items-center gap-4">
    <div className="h-16 w-16 shrink-0 rounded-full bg-[#d0e4f7] animate-pulse"></div>
    <div className="flex flex-col gap-3 w-full">
      <div className="h-4 w-1/2 bg-[#d0e4f7] rounded animate-pulse"></div>
      <div className="h-4 w-2/3 bg-[#d0e4f7] rounded animate-pulse"></div>
    </div>
  </div>
</div> <div className="flex w-full sm:w-64 md:w-72 flex-col gap-4 p-4 bg-[#e6f0fa] rounded-xl">
  <div className="flex items-center gap-4">
    <div className="h-16 w-16 shrink-0 rounded-full bg-[#d0e4f7] animate-pulse"></div>
    <div className="flex flex-col gap-3 w-full">
      <div className="h-4 w-1/2 bg-[#d0e4f7] rounded animate-pulse"></div>
      <div className="h-4 w-2/3 bg-[#d0e4f7] rounded animate-pulse"></div>
    </div>
  </div>
</div>
</>

        )}
      </div>
    </div>
  );
}
