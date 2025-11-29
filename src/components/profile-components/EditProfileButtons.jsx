import React, { useState } from "react";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import { UserPen, UserPlus, MapPin, Share2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../../features/navigator.features/navigator";
import SocialModal from "./SocialModal";




export default function EditProfileButtons() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-full flex flex-col items-start mt-4 px-3">
      <p className="text-gray-700 text-sm sm:text-base mb-1 pl-3">
        {user?.bio
          ? user.bio.length > 150
            ? user.bio.slice(0, 150) + "..."
            : user.bio
          : t("profile.notSet") || "Not set"}
      </p>

      <div className="flex items-center gap-2 mb-3 pl-3">
        <MapPin size={16} className="text-red-500" />
        <span className="text-gray-700 text-sm sm:text-base">
          {user?.location
            ? user.location.length > 50
              ? user.location.slice(0, 50) + "..."
              : user.location
            : t("profile.notSet") || "Not set"}
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-start gap-3 w-full">
        <button
          onClick={() => dispatch(changePage({ page: "edit" }))}
          className="flex items-center gap-2 border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg transition-all text-sm sm:text-base"
        >
          <UserPen size={18} className="text-gray-600" />
          {t("profile.editProfile") || "Edit Profile"}
        </button>

        {user?.role === "job" && (
          <button
            onClick={() => navigate("/add-contact")}
            className="flex items-center gap-2 border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg transition-all text-sm sm:text-base"
          >
            <UserPlus size={18} className="text-gray-600" />
            {t("profile.addContact") || "Add Contact"}
          </button>
        )}

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg transition-all text-sm sm:text-base"
        >
          <Share2 size={18} className="text-gray-600" />
          {t("profile.title") || "Social Links"}
        </button>
      </div>

      {showModal && <SocialModal user={user} onClose={() => setShowModal(false)} />}
    </div>
  );
}
