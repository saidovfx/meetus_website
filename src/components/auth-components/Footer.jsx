import React from "react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <h3 className="text-white text-xl font-semibold mb-4">MeetUs</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {t('footer.description')}
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">{t('footer.product')}</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">{t('nav.features')}</a></li>
            <li><a href="#" className="hover:text-white transition-colors">{t('nav.pricing')}</a></li>
            <li><a href="#" className="hover:text-white transition-colors">{t('nav.docs')}</a></li>
            <li><a href="#" className="hover:text-white transition-colors">{t('nav.jobs')}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">{t('footer.company')}</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">{t('nav.home')}</a></li>
            <li><a href="#" className="hover:text-white transition-colors">{t('footer.about')}</a></li>
            <li><a href="#" className="hover:text-white transition-colors">{t('nav.blog')}</a></li>
            <li><a href="#" className="hover:text-white transition-colors">{t('footer.contact')}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">{t('footer.newsletter')}</h4>
          <form className="flex flex-col gap-3">
            <input 
              type="email"
              placeholder={t('auth.email')}
              className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <button 
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
            >
              {t('footer.subscribe')}
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-gray-700">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500">
            © 2025 MeetUs. {t('footer.rights')}
          </div>
          
          <div className="flex flex-wrap gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              {t('footer.privacy')}
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              {t('footer.terms')}
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              {t('footer.cookies')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}