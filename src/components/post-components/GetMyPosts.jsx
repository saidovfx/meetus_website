import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "./Tools/PostCards";
import { get_myproject } from "../../features/post.feautures/post.project";
import Image from '../../images/login_image.png'
import { t } from "i18next";
import { changePage } from "../../features/navigator.features/navigator";
export default function GetMyPosts() {
  const dispatch = useDispatch();
  const { getproject_loading, myprojects } = useSelector((state) => state.project);

  useEffect(() => {
    dispatch(get_myproject());
  }, []);

  if (getproject_loading)
    return (
      <div className="grid gap-6 
                      grid-cols-1 
                      sm:grid-cols-2 
                      lg:grid-cols-3">
        <div className="animate-pulse space-y-3">
          <div className="bg-gray-200 h-40 w-full rounded-lg"></div>
          <div className="bg-gray-200 h-4 w-32 rounded"></div>
          <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
        </div>

        <div className="animate-pulse space-y-3">
          <div className="bg-gray-200 h-40 w-full rounded-lg"></div>
          <div className="bg-gray-200 h-4 w-32 rounded"></div>
          <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
        </div>

           <div className="animate-pulse space-y-3">
          <div className="bg-gray-200 h-40 w-full rounded-lg"></div>
          <div className="bg-gray-200 h-4 w-32 rounded"></div>
          <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
        </div>
      </div>
    );

if (!myprojects?.posts?.length)
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6">
      <p className="text-2xl sm:text-3xl font-semibold text-gray-800">
      {t('posts.noPosts')}
      </p>

      <img 
        src={Image} 
        alt="No posts illustration" 
        className="w-64 sm:w-80 h-auto object-contain"
      />

      <p className="text-gray-500 text-center max-w-xs sm:max-w-md">
      {t('posts.noPostsDesc')}
      </p>

      <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" onClick={()=>dispatch(changePage({page:"createPost"}))}>
    {t('posts.createPosts')}
      </button>
    </div>
  );
console.log(myprojects.posts);


  return (
   <div className="max-w-7xl mx-auto p-4">
    
      <div className="grid 
                      grid-cols-1 
                      sm:grid-cols-2 
                      lg:grid-cols-3">
        {myprojects.posts.map((item) => (
          <PostCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}
