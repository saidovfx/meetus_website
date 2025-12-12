import { X } from "lucide-react";
import profileImg from '../../../images/profile.jpeg';
import { useState } from "react";
import { t } from "i18next";
export default function CollaboratorsModal({ open, onClose,item, user,collaborators }) {
  const [followedUsers, setFollowedUsers] = useState([]);
  if (!open) return null;

  const toggleFollow = (userId) => {
    setFollowedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const filteredCollaborators=collaborators.filter((user)=>user.accepted)
  const isArray=Array.isArray(item)?item:[item]
  const collaboratorArray=[...filteredCollaborators,...isArray]

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-5 relative overflow-y-auto max-h-[80vh]">
        
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <X size={22} />
        </button>

        <h2 className="text-xl font-semibold mb-5 text-gray-900">
         {t('posts.postCategory')}
        </h2>

        <div className="flex flex-col gap-4">
          {collaboratorArray.map((c, i) => {
          const user1 = c?.userId;
            const isFollowed = followedUsers.includes(user?._id);
           return (
              <div
                key={i}
                className="flex items-center justify-between gap-3 border-b pb-3"
              >
                
                <div className="flex items-center gap-3">
                  <img
                    src={user1?.profileImgUrl || profileImg}
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{user?.fullname || t('posts.unkown')}</p>
                    <p className="text-xs text-gray-600">{c.role || t('posts.contributor')}</p>
                  </div>
                </div>

               {item.userId !==user.userId && <button
                  onClick={() => toggleFollow(user1?._id)}
                  className={`px-4 py-1 text-sm rounded-full font-semibold transition
                    ${isFollowed ? 'bg-gray-200 text-gray-700' : 'bg-blue-600 text-white hover:bg-blue-700'}
                  `}
                >
                  {isFollowed ? "Following" : "Follow"}
                </button>}
              </div>
            ) 
          })}
        </div>
      </div>
    </div>
  );
}
