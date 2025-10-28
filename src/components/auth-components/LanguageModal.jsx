import React from "react";
import { changeLanguage } from "../../config/i18n";
export default function LanguageModal({ onClose }) {
  const languages = [
    { code: "en", label: "English" },
    { code: "ru", label: "Русский" },
    { code: "uz", label: "Oʻzbekcha" },
    { code: "tj", label: "Тоҷикӣ" },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100]">
      <div className="bg-white rounded-2xl p-6 w-80 shadow-xl text-center">
        <h2 className="text-xl font-semibold mb-4">🌍 Change Language</h2>
        <div className="flex flex-col gap-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                changeLanguage(lang.code);
                onClose();
              }}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-blue-50 transition"
            >
              {lang.label}
            </button>
          ))}
        </div>
        <button 
          onClick={onClose}
          className="mt-6 text-gray-500 hover:text-gray-700 text-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
}
