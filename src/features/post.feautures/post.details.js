import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { t } from "i18next";
import {
  Globe,
  Smartphone,
  Code,
  Server,
  Layers,
  Palette,
  ShoppingCart,
  FileText,
  Cloud,
  MessageSquare,
  Brain,
  BarChart3,
  PlugZap,
  Gamepad2,
  Monitor,
  Wifi,
  Settings2,
  CloudUpload,
  User,
  GraduationCap,
  Megaphone,
  Edit3,
  Brush,
  Film,
  Camera,
  BadgeCheck,
  Briefcase,
  UsersRound,
  Languages,
  CircleEllipsis,
} from "lucide-react";
import toast from "react-hot-toast";

const initialState = {
  youtube: "",
  live: "",
  link: "",
  github: "",
  category: "",
  skills: [],
  location: "",
  status: "",
  reportWarning: "",
  video: "",
  images: [],
  tags: [],
  title: "",
  shortDescription: "",
  fullDescription: "",
  mediaType: "",
};

const postDetailsSlice = createSlice({
  name: "post-details",
  initialState,
  reducers: {
    addPostLinkDetails: (state, action) => {
      const { youtube, link, live, github } = action.payload;

      if (github && !github.startsWith("https://github.com/")) {
        state.reportWarning = "GitHub link must start with https://github.com/";
        return;
      }

      if (link && !link.startsWith("https://")) {
        state.reportWarning = "Link must start with https://";
        return;
      }

      if (
        youtube &&
        !youtube.includes("youtube.com") &&
        !youtube.includes("youtu.be")
      ) {
        state.reportWarning = "Invalid YouTube URL";
        return;
      }

      if (live && !live.startsWith("https://")) {
        state.reportWarning = "Live link must start with https://";
        return;
      }

      state.github = github;
      state.link = link;
      state.live = live;
      state.youtube = youtube;

      state.reportWarning = "";
    },

    addPostArrayDetails: (state, action) => {
      const skills = action.payload.skills;

      if (skills.length === 0) {
        state.reportWarning = "You don't have selected any skills";
        return;
      }

      state.skills = skills;
      state.reportWarning = "";
    },

    addPostCategoryDetails: (state, action) => {
      const category = action.payload;
      state.category = category;
      state.reportWarning = "";
    },
    addPostLocationDetails: (state, action) => {
      const location = action.payload.location;
      state.location = location;
      state.reportWarning = "";
    },
    addPostStatusDetails: (state, action) => {
      const status = action.payload.status;
      state.status = status;
      state.reportWarning = "";
    },
    setDraft: (state, action) => {
      return { ...state, ...action.payload };
    },

    arrowBack: (state, _) => {
      state.reportWarning = "";
    },
  },
});

export const {
  addPostArrayDetails,
  addPostCategoryDetails,
  addPostLinkDetails,
  addPostLocationDetails,
  addPostStatusDetails,
  arrowBack,
  setDraft,
} = postDetailsSlice.actions;
export default postDetailsSlice.reducer;
