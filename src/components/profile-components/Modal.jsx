import React, { useState, useRef } from "react";
import { X, Upload, Trash2, Pencil } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { delete_profile_image, upload_images } from "../../features/profile.features/rename.user.profile";
import toast from "react-hot-toast";
import { t } from "i18next";
export default function Modal({ isOpen, onClose, imageUrl, userId }) {
  const { user } = useSelector((state) => state.user);
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const isOwner = user?._id === userId;
  const canDelete = imageUrl?.startsWith("https");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleUploadClick = () => fileInputRef.current.click();
    const handleDispatchUpload = () => {
    if (!selectedFile) {
       toast.error(t('profile.pleaseSelectImg'));
    return;
    }

  
  if (!selectedFile.type.startsWith("image/")) {
       toast.error(t('profile.pleaseSelectImg'));
    setSelectedFile(null);
    return;
  }

  dispatch(upload_images({ file: selectedFile }));
  setSelectedFile(null); 
  onClose();
};



const handleDelete=()=>{
    dispatch(delete_profile_image())
        setSelectedFile(null);
    onClose();
}


  const handleClose = () => {
    setSelectedFile(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center bg-gray-500 hover:bg-gray-400 transition"
      >
        <X className="text-white" size={20} />
      </button>

      <div className="relative flex flex-col items-center">
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden shadow-lg mb-4 border-4 border-white">
          <img
            src={selectedFile ? URL.createObjectURL(selectedFile) : imageUrl}
            alt="profile"
            className="object-cover w-full h-full"
          />

          {isOwner && (
            <button
              onClick={handleUploadClick}
              className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-600 transition shadow-lg"
            >
              <Pencil size={20} color="white" />
            </button>
          )}
        </div>

        {isOwner && (
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        )}

        <div className="flex gap-4">
          {isOwner && selectedFile && (
            <button
              onClick={handleDispatchUpload}
              className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-600 transition"
            >
              <Upload size={20} color="white" />
            </button>
          )}
          {canDelete && (
            <button onClick={()=>handleDelete()} className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600 transition">
              <Trash2 size={20} color="white" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
