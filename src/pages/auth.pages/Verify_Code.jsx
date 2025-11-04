import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verify_code, code_repeat } from "../../features/auth.features/signup.user";
import { Loader2 } from "lucide-react";
import Stuck_mail from "../../images/mail.png";
import router from "../../config/router.app";

export default function Verify_Code() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const codeData = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [warning, setWarning] = useState("");
  const [timeLeft, setTimeLeft] = useState(180);

  const loading = codeData.pending_verify;

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (codeData.success_verify !== true) {
      setWarning(codeData.reportError_verify);
    } else if (codeData.repeat_success !== true) {
      setWarning(codeData.repeat_reportError);
    }
  }, [codeData]);

  const handleVerifyCode = () => {
    if (code.length < 6) {
      return setWarning(t("serverError.codeWorse"));
    }
    dispatch(verify_code({ code }));

    
  };

  const handleRepeat = () => {
    if (!codeData.repeatOnce && timeLeft <= 0) {
      dispatch(code_repeat());
      setTimeLeft(180);
    }
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f4f8fc] px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center text-center gap-6">
        <img src={Stuck_mail} alt="verify" className="w-36 h-36 md:w-44 md:h-44" />

        <h1 className="text-3xl font-semibold text-[#1a1f36]">
          {t("verifyCode.verifyCode")}
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          {t("verifyCode.desc")}
        </p>

        <input
          type="text"
          placeholder={t("verifyCode.verifyCode")}
          value={code}
          maxLength={6}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, "");
            setCode(val);
          }}
          className={`input input-bordered w-full bg-white text-gray-800 text-center text-lg tracking-widest py-3 rounded-xl shadow-md transition-all ${
            warning ? "border-red-500 focus:border-red-500" : "border-[#00bfff] focus:border-[#0288d1]"
          }`}
        />

        {warning && (
          <p className="text-red-500 text-sm">{warning}</p>
        )}

        <button
          onClick={handleVerifyCode}
          disabled={loading}
          className="mt-4 w-full px-6 py-3 bg-[#00bfff] text-white font-semibold rounded-xl shadow hover:bg-[#0096e6] transition disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" /> {t("loading")}
            </span>
          ) : (
            t("verifyCode.confirmCode")
          )}
        </button>

        <p className="text-gray-700 mt-3">
          {timeLeft > 0 ? (
            <>
              ⏱ {t("verifyCode.warning")}:{" "}
              <span className="font-semibold text-[#0288d1]">
                {formatTime(timeLeft)}
              </span>
            </>
          ) : (
            t("verifyCode.timeExpired")
          )}
        </p>

        <button
          onClick={handleRepeat}
          disabled={codeData.repeatOnce || timeLeft > 0}
          className={`text-sm font-semibold transition ${
            codeData.repeatOnce || timeLeft > 0
              ? "text-gray-400 cursor-not-allowed"
              : "text-[#00bfff] hover:text-[#0096e6]"
          }`}
        >
          {t("verifyCode.sendAgain")}
        </button>
      </div>
    </div>
  );
}
