import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X, Globe } from "lucide-react";
import LanguageModal from "./LanguageModal";
import { useNavigate } from "react-router-dom";
import router from "../../config/router.app";
export default function Header() {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
    const navigate=useNavigate()
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const getCurrentLanguageName = () => {
    const languages = {
      uz: t('language.uzbek'),
      ru: t('language.russian'),
      tj: t('language.tajik'),
      en: t('language.english')
    };
    return languages[i18n.language] || 'UZ';
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              MeetUs
            </h1>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a 
              href="#" 
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              {t('nav.home')}
            </a>
            <a 
              href="#" 
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              {t('nav.features')}
            </a>
            <a 
              href="#" 
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              {t('nav.jobs')}
            </a>
            <a 
              href="#" 
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              {t('nav.companies')}
            </a>
            <a 
              href="#" 
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              {t('nav.pricing')}
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => setShowModal(true)} 
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
            >
              <Globe size={18} />
              <span>{getCurrentLanguageName()}</span>
            </button>

            <button  onClick={()=>navigate(router.login)} className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
              {t('nav.login')}
            </button>
            <button onClick={()=>navigate(router.selectType)} className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-6 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 font-medium">
              {t('nav.signup')}
            </button>
          </div>

          <div className="flex md:hidden items-center space-x-2">
            <button 
              onClick={() => setShowModal(true)} 
              className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Globe size={18} />
            </button>

            <button 
              onClick={toggleMenu}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4 px-2">
              <a 
                href="#" 
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2"
                onClick={() => setMenuOpen(false)}
              >
                {t('nav.home')}
              </a>
              <a 
                href="#" 
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2"
                onClick={() => setMenuOpen(false)}
              >
                {t('nav.features')}
              </a>
              <a 
                href="#" 
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2"
                onClick={() => setMenuOpen(false)}
              >
                {t('nav.jobs')}
              </a>
              <a 
                href="#" 
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2"
                onClick={() => setMenuOpen(false)}
              >
                {t('nav.companies')}
              </a>
              <a 
                href="#" 
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2"
                onClick={() => setMenuOpen(false)}
              >
                {t('nav.pricing')}
              </a>
              
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <button onClick={()=>navigate(router.login)} className="w-full text-center text-blue-600 hover:text-blue-700 font-medium py-2">
                  {t('nav.login')}
                </button>
                <button onClick={()=>navigate(router.selectType)} className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white py-2 rounded-lg font-medium">
                  {t('nav.signup')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {showModal && <LanguageModal onClose={() => setShowModal(false)} />}
    </header>
  );
}