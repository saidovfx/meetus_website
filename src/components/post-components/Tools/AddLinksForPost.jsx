import { t } from "i18next";
import { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { ArrowLeft } from 'lucide-react'
import { addPostLinkDetails ,arrowBack} from "../../../features/post.feautures/post.details";
import router from "../../../config/router.app";
import { useNavigate } from "react-router-dom";
export default function AddLinksForPost() {
  const { reportWarning ,category } = useSelector((state) => state.postDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [youtube, setYoutube] = useState("");
  const [link, setLink] = useState("");
  const [live, setLive] = useState("");
  const [github, setGithub] = useState("");

  const goBack = () => {
    dispatch(arrowBack());
    navigate(-1);
  };

  const handleSubmit = () => {
    dispatch(addPostLinkDetails({youtube, link, live, github}));
  };

  return (
    <div className="min-h-screen bg-[#f4faff] px-5 py-6 flex flex-col gap-5">

      <div className="flex items-center gap-3 cursor-pointer" onClick={goBack}>
        <ArrowLeft className="w-5 h-5 text-[#1ec9f4]" />
        <h4 className="text-lg font-semibold text-[#1a1f36]">Additional links</h4>
      </div>

      <p className="text-sm text-[#333] leading-6">
        Add your useful project links here. For example, a live demo, a YouTube tutorial,
        a GitHub repository or any other helpful link for companies or investors.
      </p>

      <div className="flex flex-col gap-4">

        <div className="flex flex-col gap-1">
          <label className="text-sm text-[#1a1f36]">Live demo link</label>
          <input
            type="url"
            value={live}
            onChange={(e) => setLive(e.target.value)}
            className="bg-white border border-[#d3e7f9] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1ec9f4]"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-[#1a1f36]">YouTube</label>
          <input
            type="url"
            value={youtube}
            onChange={(e) => setYoutube(e.target.value)}
            className="bg-white border border-[#d3e7f9] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1ec9f4]"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-[#1a1f36]">GitHub</label>
          <input
            type="url"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            className="bg-white border border-[#d3e7f9] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1ec9f4]"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-[#1a1f36]">Additional link</label>
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="bg-white border border-[#d3e7f9] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1ec9f4]"
          />
        </div>

        {reportWarning !== "" && (
          <p className="text-red-500 text-sm">{reportWarning}</p>
        )}

        <button
          onClick={handleSubmit}
          className="bg-[#1ec9f4] text-white rounded-xl py-2 text-sm active:scale-95 transition"
        >
          Save links
        </button>

      </div>
    </div>
  );
}



