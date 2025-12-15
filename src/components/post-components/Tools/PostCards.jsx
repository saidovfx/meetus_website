import { useState } from "react";
import { Heart, MessageCircle, MoreHorizontal, Bookmark } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ZoomableImage from "../ZoomImage";
import CollaboratorsModal from "./CollaboratorsModal";
import profileImg from "../../../images/profile.jpeg";
import { useSelector } from "react-redux";

export default function PostCard({ item }) {
  const {user}=useSelector(state=>state.user)
  const [expanded, setExpanded] = useState(false);
  const [openColModal, setOpenColModal] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);

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
    <div className="w-full max-w-[360px] bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 mb-6 overflow-hidden mx-auto">

      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center gap-3">
          <img
            src={item?.userId?.profileImgUrl || profileImg}
            className="w-12 h-12 rounded-full border object-cover"
          />
          <div>
            <h3 className="text-[15px] font-semibold text-gray-900">
              {item?.userId?.username || "User"}
            </h3>
            <p className="text-xs text-gray-500">{item?.category}</p>

            {collaborators.length > 0 && (
              <div
                className="flex items-center gap-1 mt-1 cursor-pointer"
                onClick={() => setOpenColModal(true)}
              >
                {showPreview.map((c, i) => (
                  c.accepted && (
                    <img
                      key={i}
                      src={c?.userId?.profileImgUrl || profileImg}
                      className="w-6 h-6 rounded-full border object-cover"
                    />
                  )
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

      {item?.images?.length > 0 ? (
      <div className="w-full h-[300px] relative bg-gray-50 rounded-xl">
    <Slider {...sliderSettings}>
      {item.images.map((img, index) => (
        <div key={index} className="w-full h-[300px]">
          <img
            src={img.imageUrl}
            alt={`post-image-${index}`}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      ))}
    </Slider>

    <style>
      {`
        .slick-dots {
          bottom: 8px;
        }
        .slick-dots li button:before {
          font-size: 12px;
          color: #60a5fa;
        }
        .slick-dots li.slick-active button:before {
          color: #2563eb;
        }
      `}
    </style>
  </div>

      ) : item?.videoUrl ? (
        <div className="w-full h-[300px] overflow-hidden bg-black relative cursor-pointer">
          {!playVideo && (
            <>
              <video
                src={item.videoUrl}
                className="w-full h-full object-cover opacity-90"
                muted
                playsInline
              />
              <div
                className="absolute inset-0 flex items-center justify-center"
                onClick={() => setPlayVideo(true)}
              >
                <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center text-black text-2xl font-bold">
                  ►
                </div>
              </div>
            </>
          )}
          {playVideo && (
            <video
              src={item.videoUrl}
              className="w-full h-full object-cover"
              controls
              autoPlay
              playsInline
            />
          )}
        </div>
      ) : null}

      {item?.title && (
        <h2 className="px-4 pt-3 text-lg font-bold text-gray-900 line-clamp-2">
          {item.title}
        </h2>
      )}
      {item?.shortDescription && (
        <p className="px-4 pt-1 text-[14px] text-gray-800 line-clamp-3">
          {item.shortDescription}
        </p>
      )}

      <div className="px-4 py-2 flex justify-between items-center text-gray-700">
        <div className="flex gap-4">
          <Heart size={22} className="cursor-pointer hover:text-red-500 transition" />
          <MessageCircle size={22} className="cursor-pointer hover:text-blue-500 transition" />
        </div>
        <Bookmark size={22} className="cursor-pointer hover:text-black transition" />
      </div>

      {item?.fullDescription && (
        <div className="px-4 pb-2 text-[14px] text-gray-800 max-h-[120px] overflow-y-auto">
          {item.fullDescription}
        </div>
      )}

      {(item.github || item.link || item.live) && (
        <div className="px-4 pb-3 flex gap-3 flex-wrap">
          {item.github && (
            <a
              href={item.github}
              target="_blank"
              className="px-3 py-1 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300 transition"
            >
              GitHub
            </a>
          )}
          {(item.link || item.live) && (
            <a
              href={item.link || item.live}
              target="_blank"
              className="px-3 py-1 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300 transition"
            >
              Link
            </a>
          )}
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
