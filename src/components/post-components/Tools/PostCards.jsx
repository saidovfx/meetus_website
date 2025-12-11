import {
  Heart,
  MessageCircle,
  MoreHorizontal,
  Bookmark,
  Github,
  Globe,
} from "lucide-react";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ZoomableImage from "../ZoomImage";
import CustomVideoPlayer from "./VideoController";
import { useSelector } from "react-redux";
import CollaboratorsModal from "./CollaboratorsModal";
import profileImg from "../../../images/profile.jpeg";

export default function PostCard({ item }) {
  const [expanded, setExpanded] = useState(false);
  const [openColModal, setOpenColModal] = useState(false);
  const { user } = useSelector((state) => state.user);

  const collaborators = item?.collaborators || [];
  const showPreview = collaborators.slice(0, 2);
  const more = collaborators.length - 2;

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dotsClass: "slick-dots slick-dots-lg",
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 mb-6 overflow-hidden">

      <div className="flex items-center justify-between px-4 py-3 bg-white border-b">
        <div className="flex items-center gap-3">
          <img
            src={item?.userId?.profileImgUrl || profileImg}
            className="w-12 h-12 rounded-full border object-cover"
          />
          <div>
            <h3 className="text-[15px] font-semibold text-gray-900">
              {item?.userId?.username || item?.userId?.username || "User"}
            </h3>
            <p className="text-xs text-gray-500">{item?.category}</p>

            {collaborators.length > 0 && (
              <div
                className="flex items-center gap-1 mt-1 cursor-pointer"
                onClick={() => setOpenColModal(true)}
              >
                {showPreview.map((c, i) => (
                c.accepted ?   <img
                    key={i}
                    src={c?.userId?.profileImgUrl || profileImg}
                    className="w-6 h-6 rounded-full border object-cover"
                  />:null
                ))}
                {more > 0 && (
                  <span className="text-[11px] px-2 py-[1px] bg-gray-200 rounded-full text-gray-700">
                    +{more} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        <MoreHorizontal className="text-gray-600 cursor-pointer" />
      </div>

      {item?.images?.length > 0 && (
        <div className="bg-gray-50 py-3">
          <Slider {...sliderSettings}>
            {item.images.map((img , index) => (
              <div
                key={index}
                className="flex justify-center items-center px-3"
              >
                <div className="w-full max-w-[360px] h-[360px] bg-white rounded-xl overflow-hidden shadow-sm border">
                  <ZoomableImage
                    src={img.imageUrl}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}

      {item.videoUrl && (
        <div className="px-4 py-3">
          <CustomVideoPlayer src={item.videoUrl} />
        </div>
      )}

      {item?.title && (
        <h2 className="px-4 pt-3 text-lg font-bold text-gray-900">{item.title}</h2>
      )}

      <div className="px-4 pt-2 pb-2 text-[14px] text-gray-800 leading-[1.5]">
        {expanded
          ? item.fullDescription || item.shortDescription
          : (item.shortDescription || "").slice(0, 150)}
        {item.shortDescription?.length > 150 && (
          <button
            className="text-blue-600 ml-2 hover:underline text-[13px]"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "less" : "more"}
          </button>
        )}
      </div>

      <div className="px-4 pt-2 flex justify-between items-center">
        <div className="flex gap-5">
          <Heart
            size={24}
            className="cursor-pointer hover:text-red-500 transition-all"
          />
          <MessageCircle
            size={24}
            className="cursor-pointer hover:text-blue-500 transition-all"
          />
        </div>
        <Bookmark
          size={24}
          className="cursor-pointer hover:text-black transition-all"
        />
      </div>

      <p className="px-4 pt-1 pb-2 text-[13px] font-semibold text-gray-900">
        {item?.likes?.length || 0} likes
      </p>

      {(item.github || item.link || item.live) && (
        <div className="px-4 pt-1 pb-2 flex gap-4 items-center">
          {item.github && (
            <a
              href={item.github}
              target="_blank"
              className="text-gray-600 hover:text-black"
            >
              <Github size={18} />
            </a>
          )}
          {(item.link || item.live) && (
            <a
              href={item.link || item.live}
              target="_blank"
              className="text-gray-600 hover:text-black"
            >
              <Globe size={18} />
            </a>
          )}
        </div>
      )}

      {item?.status && (
        <p className="px-4 pt-1 pb-1 text-[12px] text-gray-500 uppercase">{item.status}</p>
      )}

      {item?.skills?.length > 0 && (
        <div className="px-4 pt-1 pb-2 flex flex-wrap gap-2">
          {item.skills.map((skill, idx) => (
            <span
              key={idx}
              className="text-[12px] px-2 py-1 bg-green-100 text-green-700 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {item.tags?.length > 0 && (
        <div className="px-4 pt-2 pb-3 flex flex-wrap gap-2">
          {item.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] px-2 py-[3px] bg-blue-100 text-blue-700 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

 
      <CollaboratorsModal
        open={openColModal}
        onClose={() => setOpenColModal(false)}
        item={item}
        user={user}
        collaborators={collaborators}
      />

      <style>
        {`
          .slick-dots-lg li button:before {
            font-size: 13px;
            color: #60a5fa;
          }
          .slick-dots-lg li.slick-active button:before {
            color: #2563eb;
          }
        `}
      </style>
    </div>
  );
}
