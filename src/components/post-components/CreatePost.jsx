import React, { useState, useEffect, useRef } from "react";
import { X, Upload, FileText, Tag, MapPin, Sparkles, HelpCircle, ArrowRight ,FileSpreadsheet, ArrowLeft} from "lucide-react";
import toast from "react-hot-toast";
import { MediaPreview } from "./ModalPreview";
import { TagsInput } from "./ModalPreview";
import { useDispatch, useSelector } from "react-redux";
import { createProject_images, createProject_video } from "../../features/post.feautures/post.project";
import router from "../../config/router.app";
import { useNavigate } from "react-router-dom";
import { setDraft } from "../../features/post.feautures/post.details";
import { t } from "i18next";
export default function CreatePost() {
   const {selectedUsers}=useSelector(state=>state.search)
const fullState =useSelector((state)=>state.postDetails)


  const [title, setTitle] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [mediaType, setMediaType] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [video, setVideo] = useState();

  const navigate=useNavigate()
  const dispatch = useDispatch();
  const { project_loading, project_success } = useSelector((state) => state.project);

  const fileInputRef = useRef(null);

  useEffect(() => setWordCount(shortDescription.length), [shortDescription]);
  useEffect(() => setIsSubmitting(project_loading), [project_loading]);

useEffect(()=>{
  setTitle(fullState?.title ||"")
  setSelectedFiles(fullState?.images || [])
  setVideo(fullState?.video ||"")
  setTags(fullState.tags ||[])
 setFullDescription(fullState.fullDescription ||"")
 setShortDescription(fullState.shortDescription||"")
 setMediaType(fullState.mediaType ||"")
},[])


useEffect(()=>{
  dispatch(setDraft({
    video,title,
    images:selectedFiles,
    title,
    shortDescription,
    fullDescription,
    tags,
    mediaType
  }))
},[title,shortDescription,fullDescription,selectedFiles,mediaType,tags,video,mediaType])










  const handleUploadClick = () => {
    fileInputRef.current.value = "";
    fileInputRef.current.click();
  };




  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isImage = file.type.startsWith("image");
    const isVideo = file.type.startsWith("video");

    if (isVideo) {
      if (mediaType && selectedFiles.length) return toast.error("Remove previous media first.");
      setVideo(file);
      setSelectedFiles([file]);
      setMediaType("video");
      toast.success("Video selected!");
    }

    if (isImage) {
      if (mediaType === "video" && selectedFiles.length) return toast.error("Remove video first to upload images.");
      if (selectedFiles.length >= 5) return toast.error("Maximum 5 images allowed.");
      setSelectedFiles((prev) => [...prev, file]);
      setMediaType("image");
      toast.success("Image added!");
    }
  };

  const handleRemoveFile = (i) => {
    const newFiles = selectedFiles.filter((_, idx) => idx !== i);
    setSelectedFiles(newFiles);
    if (!newFiles.length) setMediaType("");
  };

  const addTag = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (tags.includes(tagInput.trim().toLowerCase())) return toast.error("Tag exists");
      if (tags.length >= 10) return toast.error("Max 10 tags");
      setTags([...tags, tagInput.trim().toLowerCase()]);
      setTagInput("");
    }
  };

  const removeTag = (i) => setTags(tags.filter((_, idx) => idx !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return toast.error("Enter a title");

    const payload = {
      title,
      shortDescription,
      fullDescription,
      link:fullState?.link,
      github:fullState?.github,
      location,
      tags,
      category:fullState?.category,
      collaborators:selectedUsers,
      status:'published',
      youtube:fullState?.youtube,
      live:fullState?.live,
    };

    if (mediaType === "video") {
      console.log(video);
      
      dispatch(createProject_video({data:payload, file:video}));
    } else {
      dispatch(createProject_images({data:payload,   file: mediaType === "image" ? selectedFiles : video ?   [video] : [],}));
    }
  };




  return (
<div className="min-h-screen bg-gradient-to-br from-white to-[#e6f0fa] p-4 md:p-6">
  <div className="max-w-6xl mx-auto bg-white rounded-3xl p-6 md:p-10">
<div className="space-y-2 md:space-y-3 text-center px-2">
  <h4 className="text-2xl md:text-3xl font-bold text-[#1a1f36]">
    {t("posts.createPost")}
  </h4>

  <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-xl mx-auto">
    {t("posts.createPostDesc")}
  </p>
</div>



    <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
      <div className="lg:w-2/3 space-y-6">

        <div>
          {selectedFiles.length ? (
            <MediaPreview files={selectedFiles} video={video} type={mediaType} removeFile={handleRemoveFile} />
          ) : (
            <div
              onClick={handleUploadClick}
              className="border-2 border-dashed border-[#bcd7f5] rounded-2xl p-12 text-center cursor-pointer bg-[#f8fbff] hover:bg-[#e6f0fa] transition-all duration-200"
            >
              <Upload className="w-16 h-16 mx-auto mb-4 text-[#4fc3f7]" />
              <p className="text-[#1a1f36]">{t('posts.selectMediaDesc')}</p>
            </div>
          )}
          <button 
            onClick={handleUploadClick} 
            className="flex items-center justify-center w-full mt-3 px-4 py-2 bg-gradient-to-r from-[#4fc3f7] to-[#0288d1] text-white rounded-xl text-sm hover:opacity-90 transition duration-200">
            <Upload className="w-5 h-5 mr-2" /> {t('posts.uploadFile')}
          </button>
          <input type="file" accept="image/*,video/*" multiple ref={fileInputRef} onChange={handleFileChange} className="hidden" />
        </div>

        <div>
          <FileText className="w-5 h-5 text-[#4fc3f7] mb-1" />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t('posts.postTitle')}
            className="w-full p-3  border-t-0 border-l-0 border-r-0 rounded-xl bg-[#f8fbff] border border-[#aab5c4] focus:outline-none "
            required
          />
        </div>

        <div>
          <FileText className="w-5 h-5 text-[#4fc3f7] mb-1" />
          <textarea
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            placeholder={t('posts.shortDescription')}
            className="w-full h-28 p-3 rounded-xl border-b-0 border-r-0 border-t-0 bg-[#f8fbff] border border-[#9da9b6] focus:outline-none "
          />
          <div className={`text-sm ${wordCount < 350 ? "text-warning" : "text-success"}`}>
            {wordCount}/350 words
          </div>
        </div>


        <div>
      <FileSpreadsheet className="w-5 h-5 text-gray-500 mb-1" />

          <textarea
            value={fullDescription}
            onChange={(e) => setFullDescription(e.target.value)}
            placeholder={t('posts.fullDescription')}
            className="w-full h-40 p-3 rounded-xl  border-b-0 border-r-0 border-t-0 bg-[#f8fbff] border border-[#bcd7f5] focus:outline-none "
          />
        </div>

     

  
        <TagsInput tags={tags} tagInput={tagInput} setTagInput={setTagInput} addTag={addTag} removeTag={removeTag} />
<>

  <div
    onClick={() => navigate(router.collaborator)}
    className="flex items-center justify-between px-3 py-3 rounded-lg 
               bg-gray-50 hover:bg-gray-100 cursor-pointer select-none
               transition duration-150 w-full"
  >
    <span className="text-[14px] text-gray-500 font-normal">
     {t('posts.collaborator')}
    </span>
    <div className="flex items-center gap-2">
      <span className="text-[13px] text-gray-500">{selectedUsers?.length}</span>
      <ArrowRight size={18} className="text-gray-400" />
    </div>
  </div>

  <div
    onClick={() => navigate(router.addpostlink)}

    className="flex items-center justify-between px-3 py-3 rounded-lg 
               bg-gray-50 hover:bg-gray-100 cursor-pointer select-none
               transition duration-150 w-full"
  >
    <span className="text-[14px] text-gray-500 font-normal">
     {t('posts.additionalLink')}
    </span>
    <ArrowRight size={18} className="text-gray-400" />
  </div>


  <div
  onClick={()=>navigate(router.addcategorypost)}
    className="flex items-center justify-between px-3 py-3 rounded-lg 
               bg-gray-50 hover:bg-gray-100 cursor-pointer select-none
               transition duration-150 w-full"
  >
    <span className="text-[14px] text-gray-500 font-normal">
     {t('posts.category')}
    </span>
    <div className="flex items-center gap-2">
      <ArrowRight size={18} className="text-gray-400" />
    </div>
  </div>


</>



      
        <div className="flex gap-4 mt-4">
          <button type="submit" className={`flex-1 px-4 py-2 bg-gradient-to-r from-[#4fc3f7] to-[#0288d1] text-white rounded-xl text-sm hover:opacity-90 transition duration-200 ${isSubmitting ? "loading" : ""}`} disabled={isSubmitting}>
            <Sparkles className="w-5 h-5 mr-2" /> {isSubmitting ? t('posts.creating') : t('posts.publish')}
          </button>
          <button type="button" className="flex-1 px-4 py-2 border border-[#bcd7f5] rounded-xl text-[#1a1f36] hover:bg-[#f0f7ff] transition-all duration-200" onClick={() => {
            setTitle(""); setShortDescription(""); setFullDescription(""); setTags([]); setTagInput(""); setSelectedFiles([]); setMediaType(""); toast("Cleared 🗑️");
          }}>
            <X className="w-5 h-5 mr-2" /> {t('posts.clear')}
          </button>
        </div>
      </div>

    </form>
  </div>
</div>


  );
}
