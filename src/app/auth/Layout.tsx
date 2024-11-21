import React from "react";
import { Outlet } from "react-router-dom";
// import { Link } from "react-router-dom";
// import LanguageSwitcher from "@/components/Common/LanguageSwitcher";
// import { useTranslation } from "react-i18next";

const AuthLayout: React.FC = () => {
  // const { t } = useTranslation("Auth");
  return (
    // bg-gradient-to-br
    <div className="relative min-h-screen flex items-center justify-center  from-black via-primary-dark to-background p-4 bg-[#FFFFF7]">
      {/* <header className="absolute top-0 left-0 w-full flex items-center justify-between p-4 bg-transparent px-10">
        <Link to="/" className="text-white text-2xl font-bold">
          GitDataAi Cloud
        </Link>
        <div className="flex items-center">
          <LanguageSwitcher />
        </div>
      </header>

      <div className="hidden lg:flex w-1/2 flex-col items-center text-white p-8 space-y-4">
        <h2 className="text-4xl font-bold">{t("H2")}</h2>
        <p className="text-lg max-w-md text-center">{t("Description")}</p>
      </div> */}

      <div className="absolute w-full max-w-md bg-white rounded-lg shadow-lg p-8 lg:w-1/2  max-sm:h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
