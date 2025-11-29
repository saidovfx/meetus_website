import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Home, Briefcase, Users, MessageCircle, Clock, Settings } from 'lucide-react';
import { changePage } from '../../features/navigator.features/navigator.js';
import { useNavigate } from 'react-router-dom';
import ProfileMain from './ProfileMain';
import Jobs from '../jobs.pages/Jobs.jsx';
import Company from '../company.pages/Company.jsx';
import Chats from '../messages.pages/Chats.jsx';
import History from '../history.pages/History.jsx';
import EditProfile from './EditProfile.jsx';
import RenameUsername from '../../components/profile-components/RenameUsername.jsx';
import { t } from 'i18next';
import EditEmail from '../../components/profile-components/EditEmail.jsx';
import EditPhone from '../../components/profile-components/EditPhone.jsx';
import EditBio from '../../components/profile-components/EditBio.jsx';
import EditLocation from '../../components/profile-components/EditLocation.jsx';
import RenameFullname from '../../components/profile-components/EditFullname.jsx';
import EditBirthdate from '../../components/profile-components/EditBirthdate.jsx';
import AddSocialLink from '../../components/profile-components/AddSocialLink.jsx';
import router from '../../config/router.app.js'
export default function StuckNavigatorPage() {
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.navigator);
  const {user,loading}=useSelector((state)=>state.user)
const navigate=useNavigate()
  const navItems = [
    { name: t('profile.myProfile'), path: 'profile', icon: <Home size={20} /> },
    { name:t('profile.jobs') , path: 'jobs', icon: <Briefcase size={20} /> },
    { name: t('profile.companiesAndUsers'), path: 'company', icon: <Users size={20} /> },
    { name: t('profile.messages'), path: 'chats', icon: <MessageCircle size={20} /> },
    { name: t('profile.history'), path: 'history', icon: <Clock size={20} /> },
  ];
React.useEffect(()=>{
  if(!loading){
  if(!user?.email){ 
    return navigate(router.intro)
}
}
},[])

  return (  
    <div className="flex h-screen bg-gradient-to-r from-[#e6f0fa] to-[#f9fbff]">
      <aside className="hidden md:flex flex-col w-72 bg-white/80 backdrop-blur-lg shadow-2xl border-r border-gray-200 p-5">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-gradient-to-br from-[#00bfff] to-[#0288d1] w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
            M
          </div>
          <h1 className="text-xl font-semibold text-gray-800 tracking-wide">
            Meet<span className="text-[#00bfff]">Us</span> Panel
          </h1>
        </div>

        <nav className="flex flex-col space-y-2">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => dispatch(changePage({ page: item.path }))}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 font-medium
                ${
                  page === item.path
                    ? 'bg-gradient-to-r from-[#00bfff] to-[#1ec9f4] text-white shadow-md'
                    : 'text-gray-700 hover:bg-[#eaf6ff] hover:text-[#0288d1]'
                }
              `}
            >
              <div
                className={`${
                  page === item.path
                    ? 'text-white'
                    : 'text-[#0288d1] group-hover:text-white'
                }`}
              >
                {item.icon}
              </div>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-200">
          <button
            className="flex items-center gap-2 text-gray-500 hover:text-[#00bfff] transition"
            onClick={() => alert('Settings clicked')}
          >
            <Settings size={18} />
            <span>{t('profile.settings')}</span>
          </button>
        </div>
      </aside>
<main className="flex-1 flex flex-col min-h-screen relative">
  <div className="flex-1 overflow-y-auto">
    {page === 'profile' && <ProfileMain className="p-6 md:p-10" />}
    {page === 'chats' && <Chats className="p-6 md:p-10" />}
    {page === 'history' && <History className="p-6 md:p-10" />}
    {page === 'jobs' && <Jobs className="p-6 md:p-10" />}
    {page === 'company' && <Company className="p-6 md:p-10" />}
    {page === 'edit' && <EditProfile className="p-6 md:p-10" />}
    {page === 'renameusername' && <RenameUsername className="p-6 md:p-10" />}
    {page === 'renameemail' && <EditEmail className="p-6 md:p-10" />}
    {page === 'renamephone' && <EditPhone className="p-6 md:p-10" />}
    {page === 'renamebio' && <EditBio className="p-6 md:p-10" />}
    {page === 'renamelocation' && <EditLocation className="p-6 md:p-10" />}
    {page === 'renamefullname' && <RenameFullname className="p-6 md:p-10" />}
    {page === 'renamebirthdate' && <EditBirthdate className="p-6 md:p-10" />}
    {page==='addsocialLink' && <AddSocialLink className="p-6 md:p-10" />}
    
  </div>
</main>


      <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-white/90 backdrop-blur-md shadow-lg flex justify-around py-2 border-t border-gray-200">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => dispatch(changePage({ page: item.path }))}
            className={`flex flex-col items-center justify-center text-xs ${
              page === item.path ? 'text-[#00bfff]' : 'text-gray-500'
            }`}
          >
            {item.icon}
            <span>{item.name.split(' ')[0]}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
