import React, { useState } from "react";
import ProfileHeader from "../../components/profile-components/ProfileHeader";
import EditProfileButtons from "../../components/profile-components/EditProfileButtons";
import GetMyPosts from "../../components/post-components/GetMyPosts";
import GetMyProjects from "../../components/post-components/GetMyProjects";

export default function ProfileMain() {
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <ProfileHeader />

      <div className="mt-10 sm:mt-12 px-6 sm:px-12 flex flex-wrap gap-4 justify-start">
        <EditProfileButtons />
      </div>

      <div className="mt-6 px-6 sm:px-12">
        <div className="tabs tabs-boxed w-full justify-start">
          <a
            className={`tab ${activeTab === "posts" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("posts")}
          >
            Posts
          </a>
          <a
            className={`tab ${activeTab === "projects" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("projects")}
          >
            Projects
          </a>
        </div>
      </div>

      <div className="mt-4 px-6 sm:px-12">
        {activeTab === "posts" && <GetMyPosts />}
        {activeTab === "projects" && <GetMyProjects />}
      </div>
    </div>
  );
}
