import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';
import { usernameRegex } from '../../config/testRegex';
import Stuck_image from '../../images/login_image.png';
import {  } from 'lucide-react'; 
import { complete_myprofile } from '../../features/auth.features/complete.user.auth';
export default function CompleteProfile() {
  const complData = useSelector((state) => state.complete);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [warning, setWarning] = useState(complData?.reportError || '');
  const loading = complData?.loading;

  useEffect(() => {
    // if (complData?.success) {
    //   navigate('/home'); // muvaffaqiyatli bo‘lsa boshqa sahifaga o‘tgizish
    // }
  }, [complData, navigate]);

  const handleUsernameChange = (value) => {
    if (usernameRegex.test(value) || value === '') {
      setUsername(value);
      setWarning('');
    }
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    setWarning('');
  };

  const handleComplete = () => {
    if (!username || !password) {
      setWarning(t('serverError.usernameWorse'));
      return;
    }
    if (password.length < 6) {
      setWarning(t('serverError.passwordLength'));
      return;
    }

    // Dispatch action (misol uchun)
     dispatch(complete_myprofile({ username, password }))
  };

  const getInputClass = () =>
    `input input-bordered w-full bg-white text-gray-700 focus:border-[#00bfff] transition-all duration-200`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e6f0fa] px-4 py-10">
      <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-3xl overflow-hidden max-w-5xl w-full">
        {/* Form */}
        <div className="flex-1 p-8 md:p-10 flex flex-col justify-center space-y-5">
          <h1 className="text-3xl md:text-5xl font-bold text-[#1a1f36] text-center md:text-left">
            {t('completeProfile.title', 'Complete your user information')}
          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-md text-center md:text-left">
            {t(
              'completeProfile.desc',
              'Please create a username and password that you want. We will use it to display your profile clearly and securely.'
            )}
          </p>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium">{t('signup.username', 'Username')}</label>
            <input
              type="text"
              value={username}
              onChange={(e) => handleUsernameChange(e.target.value)}
              placeholder={t('signup.usernameplace', 'Enter username')}
              className={getInputClass()}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium">{t('signup.password', 'Password')}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              placeholder={t('signup.passwordplace', 'Create your password')}
              className={getInputClass()}
            />
          </div>

          {warning && <p className="text-red-500 text-sm mt-1">{warning}</p>}

          <button
            onClick={handleComplete}
            disabled={loading}
            className="btn w-full bg-[#00bfff] hover:bg-[#1ec9f4] text-white font-semibold mt-3 border-none"
          >
            {loading ? <Loader2 className="animate-spin mx-auto" /> : t('completeProfile.submit', 'Complete information')}
          </button>
        </div>

        <div className="flex-1 hidden md:flex justify-center items-center bg-[#f8fbff]">
          <img
            src={Stuck_image}
            alt="Complete profile illustration"
            className="w-4/5 max-w-md object-contain drop-shadow-md"
          />
        </div>
      </div>
    </div>
  );
}
