import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import { useDispatch,useSelector } from "react-redux";
import {} from 'lucide-react'
import { get_post } from "../../features/post.feautures/get.post.js";
import { PostSkeleton } from "../../components/post-components/Tools/PostSkeleton.jsx";
import profileImg from '../../images/profile.jpeg'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "react-router-dom";
export default function PostViewPage() {
const {postId} =useParams()
    const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dotsClass: "slick-dots slick-dots-lg",
  };

    const navigate=useNavigate()

    const {post,loading,reportError,success} =useSelector(state=>state.getpost)
console.log(post);

    const dispacth=useDispatch()
    useEffect(()=>{
      dispacth(get_post({postId}))
    })
if(loading){
  return <PostSkeleton/>
}

if(reportError!==""){
  <>
  
  <h1>
    Something went wrong please try again !
  </h1>
  </>
}

return (
  <div className="w-full flex justify-center px-3 py-4">
    <div className="w-full max-w-[720px] bg-base-100 rounded-2xl shadow-md overflow-hidden">

      {/* ===== HEADER ===== */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <img
            src={post?.userId?.profileImgUrl || profileImg}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h4 className="font-semibold text-sm">
              {post?.userId?.fullname || post?.userId?.username}
            </h4>
            <p className="text-xs text-base-content/60">
              @{post?.userId?.username}
            </p>
          </div>
        </div>

        <button className="btn btn-sm btn-primary rounded-full">
          Follow
        </button>
      </div>

      {/* ===== MEDIA ===== */}
      {post?.images?.length > 0 && (
        <div className="w-full relative bg-base-200">
          <Slider {...sliderSettings}>
            {post.images.map((img, index) => (
              <div key={index} className="w-full h-[260px] sm:h-[360px]">
                <img
                  src={img.imageUrl}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </Slider>
        </div>
      )}

      {post?.videoUrl && (
        <div className="w-full h-[260px] sm:h-[360px] bg-black">
          <video
            src={post.videoUrl}
            controls
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* ===== ACTIONS ===== */}
      <div className="flex items-center gap-4 px-4 py-3">
        <button className="btn btn-ghost btn-sm">❤️</button>
        <button className="btn btn-ghost btn-sm">💬</button>
        <button className="btn btn-ghost btn-sm">🔗</button>
      </div>

      {/* ===== BODY ===== */}
      <div className="px-4 pb-4 space-y-3">

        {post?.title && (
          <h2 className="text-base font-semibold">
            {post.title}
          </h2>
        )}

        {post?.shortDescription && (
          <p className="text-sm text-base-content/80">
            {post.shortDescription}
          </p>
        )}

        {post?.fullDescription && (
          <p className="text-sm leading-relaxed">
            {post.fullDescription}
          </p>
        )}

        {/* ===== TAGS ===== */}
        {post?.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {post.tags.map((tag, i) => (
              <span
                key={i}
                className="badge badge-outline badge-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* ===== GITHUB ===== */}
        {post?.github && (
          <a
            href={post.github}
            target="_blank"
            className="btn btn-link btn-sm px-0"
          >
            🔗 View on GitHub
          </a>
        )}
      </div>
    </div>
  </div>
);

}
