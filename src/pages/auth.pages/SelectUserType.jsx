import React, { useState } from "react";
import Stuck_Image from "../../images/image2.png";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectType } from "../../features/auth.features/signup.user";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import router from "../../config/router.app";

export default function SelectUserType() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
const selected=useSelector(state=>state.auth)

  const [selectedType, setSelectedType] = useState(selected?.userType)

  const handleSelect = (type) => setSelectedType(type);

  const handleSubmit = () => {
    if (!selectedType) {
      toast.error(t('authSelect.error'));
      return;
    }
    dispatch(selectType({type:selectedType}));
    navigate(router.signup)
    
  };
    

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e6f0fa] px-4 py-10">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-10 transition-transform duration-300 hover:scale-[1.01]">
        
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-5">
          <h2 className="text-3xl md:text-5xl font-bold text-[#1a1f36]">
            {t("authSelect.welcome")}
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-md">
            {t("authSelect.desc")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <button
              onClick={() => handleSelect("job")}
              className={`btn w-44 ${
                selectedType === "job"
                  ? "bg-[#00bfff] text-white border-none"
                  : "bg-[#f7fbff] text-[#00bfff] border border-[#00bfff] hover:bg-[#00bfff] hover:text-white"
              }`}
            >
              {t("authSelect.job")}
            </button>

            <button
              onClick={() => handleSelect("business")}
              className={`btn w-44 ${
                selectedType === "business"
                  ? "bg-[#00bfff] text-white border-none"
                  : "bg-[#f7fbff] text-[#00bfff] border border-[#00bfff] hover:bg-[#00bfff] hover:text-white"
              }`}
            >
              {t("authSelect.business")}
            </button>
          </div>

          <p className="text-sm text-gray-500 max-w-md mt-3 leading-snug">
            {t("authSelect.warning")}
          </p>

          <button
            onClick={handleSubmit}
            className="btn bg-gradient-to-r from-[#4fc3f7] to-[#0288d1] text-white w-56 md:w-64 border-none mt-4 hover:shadow-md hover:scale-[1.02] transition-transform duration-300"
          >
            {t("authSelect.submit")}
          </button>
        </div>

        <div className="flex-1 hidden md:flex justify-center items-center">
          <img
            src={Stuck_Image}
            alt="Select user type illustration"
            className="w-[90%] max-w-sm object-contain drop-shadow-md"
          />
        </div>
      </div>
    </div>
  );
}
