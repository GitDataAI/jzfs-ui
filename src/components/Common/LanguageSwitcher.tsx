import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { GrLanguage } from "react-icons/gr";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "en", label: "English" },
    { code: "zh-CN", label: "中文" },
  ];

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-2 px-2 py-1 border border-gray-400 rounded-full shadow-sm hover:border-primary focus:outline-none transition duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <GrLanguage className="text-lg dark:text-white/70" />
        <span className="text-sm text-dark dark:text-white/70 hidden sm:block">
          {languages.find((lang) => lang.code === i18n.language)?.label}
        </span>
        {isOpen ? (
          <FaCaretUp className="text-xs dark:text-white/70" />
        ) : (
          <FaCaretDown className="text-xs dark:text-white/70" />
        )}
      </button>
      {isOpen && (
        <div className="absolute bg-white dark:bg-gray-800 text-xs shadow-lg rounded-lg mt-2 w-30 transition-all duration-300 ease-in-out z-10">
          {languages.map((lang, index) => (
            <button
              key={lang.code}
              className={`w-full text-left px-4 py-2 dark:hover:bg-gray-700 transition duration-200 dark:text-white hover:text-primary dark:hover:text-primary whitespace-nowrap ${
                index === languages.length - 1 ? "rounded-b-lg" : "rounded-t-lg"
              }`}
              onClick={() => changeLanguage(lang.code)}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
