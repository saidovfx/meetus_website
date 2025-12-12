import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { X } from "lucide-react";
import profilePicture from "../../../images/profile.jpeg";
import { setSelectedUsers } from "../../../features/search.feauture/search";
import { t } from "i18next";
export default function AddCollaboratorRole({ user, open, onClose }) {
  const [role, setRole] = useState("web-developer");
  const [inputVisible, setInputVisible] = useState(false);
  const reportError = useRef("");
  const dispatch = useDispatch();

  const handleOptionChange = (value) => {
    if (value === "other") return setInputVisible(true) ,setRole('');
    setInputVisible(false);

    setRole(value);
  };

  const handleAdd = () => {
    if (role !== "" && user?._id) {
      
      let selectedUser={}
      selectedUser.userId=user?._id
      selectedUser.role=role
      selectedUser.username=user?.username
      selectedUser.fullname=user?.fullname
      selectedUser.profileImgUrl=user?.profileImgUrl


      dispatch(
        setSelectedUsers(selectedUser)
      );
      onClose();
    } else {
      reportError.current = "You need to select user and its role to continue";
    }
  };

  return (
    <>
      <dialog className={`modal ${open ? "modal-open" : ""}`}>
        <div className="modal-box   bg-white w-full max-w-lg rounded-xl">
          
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-blue-500 text-xl">{t('posts.collaborator')}</h3>
            <button
              onClick={onClose}
              className="btn btn-sm btn-circle btn-ghost"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <img
              src={user?.profileImgUrl || profilePicture}
              className="w-14 h-14 rounded-full object-cover border"
            />
            <div>
              <h3 className="font-semibold text-gray-800">@{user?.username}</h3>
              <p className="text-sm text-gray-700">{user?.fullname}</p>
            </div>
          </div>

          <label className="label">
            <span className="label-text font-medium">
            {t('posts.collaboratorSelectRole')}
            </span>
          </label>

          <select
            value={role}
            onChange={(e) => handleOptionChange(e.target.value)}
            className="select text-black bg-white select-bordered w-full"
          >
            <option value="web-developer">Web Developer</option>
            <option value="ui-ux">UI/UX Designer</option>
            <option value="graphic-design">Graphic Designer</option>
            <option value="other">Other</option>
          </select>

          {inputVisible && (
            <div className="mt-3">
              <p className="text-sm mb-1 text-gray-600">
                {t('posts.collaboratorWriteRole')}
              </p>
              <input
                type="text"
                className="input text-gray-700 bg-white input-bordered w-full"
                placeholder={t('posts.egRole')}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
          )}

          {reportError.current !== "" && (
            <p className="text-red-500 text-sm mt-2">{reportError.current}</p>
          )}

          <div className="modal-action">
            <button className="btn btn-ghost" onClick={onClose}>
             {t('posts.cancel')}
            </button>
            <button className="btn btn-primary text-white" onClick={handleAdd}>
              {t('posts.collaborator')}
            </button>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button onClick={onClose}>close</button>
        </form>
      </dialog>
    </>
  );
}
