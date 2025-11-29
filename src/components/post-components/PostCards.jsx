import { Heart, MessageCircle, MoreHorizontal, Bookmark, Github, Globe } from "lucide-react";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import profileImage from "../../images/profile.jpeg";
import ZoomableImage from "./ZoomImage";
import { useSelector } from "react-redux";
export default function PostCard({ item }) {
  const [expanded, setExpanded] = useState(false);
  const { user } = useSelector((state) => state.user);

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 1, 
    slidesToScroll: 1,
    arrows: true,
    dotsClass: "slick-dots slick-dots-lg",
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full border border-gray-200 pb-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 bg-white">

  <div className="flex items-center justify-between px-4 py-3">
  <div className="flex items-center gap-3">
    <img
      src={
        item.userId === user._id && user?.profileImgUrl
          ? user.profileImgUrl
          : profileImage
      }
      alt="User Avatar"
      className="w-10 h-10 rounded-full border-2 border-gray-300 object-cover"
    />

    <h3 className="text-[14px] font-semibold text-gray-900">
      {item.userId === user._id ? user?.fullname : "Unknown User"}
    </h3>
  </div>

  <MoreHorizontal className="cursor-pointer text-gray-600" size={20} />
</div>

{item?.images?.length > 0 && (
  <div className="px-4">
    <Slider {...sliderSettings}>
      {item.images.map((img, index) => (
        <div key={index} className="flex justify-center">
          <ZoomableImage src={img.imageUrl} alt={`Post image ${index}`} />
        </div>
      ))}
    </Slider>
  </div>
)}



      <div className="px-4 pt-3 text-[14px] text-gray-800">
        <span className="font-medium">{user?.username || "User"}</span>{" "}
        {expanded ? item.desc : item.desc?.slice(0, 90)}
        {item.desc?.length > 90 && (
          <span
            className="text-gray-500 cursor-pointer ml-2"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? " show less" : "...more"}
          </span>
        )}
      </div>

    

      <div className="px-4 pt-3 flex justify-between items-center">
        <div className="hidden md:flex gap-4">
          <Heart className="cursor-pointer hover:text-red-500" size={22} />
          <MessageCircle className="cursor-pointer hover:text-blue-500" size={22} />
        </div>
        <div className="hidden md:block">
          <Bookmark className="cursor-pointer hover:text-gray-900" size={22} />
        </div>
      </div>

      <div className="px-4 pt-2 text-[14px] font-medium text-gray-900 hidden md:block">
        {item?.likes?.length || 0} likes
      </div>

      {(item.githubLink || item.link) && (
        <div className="px-4 pt-2 flex gap-4">
          {item.githubLink && (
            <a href={item.githubLink} target="_blank" rel="noopener noreferrer">
              <Github size={18} className="text-gray-600 hover:text-black" />
            </a>
          )}
          {item.link && (
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <Globe size={18} className="text-gray-600 hover:text-black" />
            </a>
          )}
        </div>
      )}
        {item.tags && item.tags.length > 0 && (
        <div className="px-4 pt-2 flex flex-wrap gap-2">
          {item.tags.map((tag, idx) => (
            <span key={idx} className="text-[12px] text-blue-600 bg-blue-100 px-2 py-1 rounded">{tag}</span>
          ))}
        </div>
      )}

      <p className="text-[11px] text-gray-500 px-4 pt-2 uppercase">
        {new Date(item.createdAt).toLocaleDateString()}
      </p>

      <style>
        {`
          .slick-dots-lg li button:before {
            font-size: 14px; 
            color: #3b82f6;
          }
          .slick-dots-lg li.slick-active button:before {
            color: #1d4ed8;
          }
        `}
      </style>
    </div>
  );
}
