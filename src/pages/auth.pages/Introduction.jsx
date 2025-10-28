import React from "react";
import Header from "../../components/auth-components/Header";
import Footer from "../../components/auth-components/Footer";
import { useTranslation } from "react-i18next";
import Stact_Image from '../../images/image1.png'

export default function Introduction() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />

      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-sm font-medium text-blue-700">
                🚀 {t('hero.primaryButton')}
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  {t('hero.title')}
                </h1>
                <p className="text-xl md:text-2xl text-blue-600 font-semibold">
                  {t('hero.subtitle')}
                </p>
                <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                  {t('hero.description')}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                  {t('hero.primaryButton')}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
                <button className="px-8 py-4 border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-lg transition-colors duration-200">
                  {t('hero.secondaryButton')}
                </button>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-600">{t('hero.metrics.companies')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">2K+</div>
                  <div className="text-sm text-gray-600">{t('hero.metrics.jobs')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">10K+</div>
                  <div className="text-sm text-gray-600">{t('hero.metrics.candidates')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">5K+</div>
                  <div className="text-sm text-gray-600">{t('hero.metrics.hires')}</div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative max-w-lg">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl opacity-60 blur-lg"></div>
                <img
                  src={Stact_Image}
                  alt="MeetUs Platform"
                  className="relative rounded-xl shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('features.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors duration-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                👤
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('features.items.profile.title')}
              </h3>
              <p className="text-gray-600">
                {t('features.items.profile.description')}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors duration-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                🔍
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('features.items.search.title')}
              </h3>
              <p className="text-gray-600">
                {t('features.items.search.description')}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors duration-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                🔒
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('features.items.security.title')}
              </h3>
              <p className="text-gray-600">
                {t('features.items.security.description')}
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors duration-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                📊
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('features.items.analytics.title')}
              </h3>
              <p className="text-gray-600">
                {t('features.items.analytics.description')}
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors duration-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                📱
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('features.items.mobile.title')}
              </h3>
              <p className="text-gray-600">
                {t('features.items.mobile.description')}
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors duration-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                💬
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('features.items.support.title')}
              </h3>
              <p className="text-gray-600">
                {t('features.items.support.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-blue-600 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {t('cta.description')}
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 hover:bg-blue-50 font-semibold rounded-lg transition-colors duration-200">
            {t('cta.button')}
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}