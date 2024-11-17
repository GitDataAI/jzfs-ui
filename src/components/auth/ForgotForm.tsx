import React, { useState } from "react";
import { Link } from "react-router-dom";
// import AuthApi from "../../libs/apis/auth_api";
import { useTranslation } from "react-i18next";

const ForgotForm: React.FC = () => {
  const { t } = useTranslation("Auth");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    verificationCode: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    verificationCode: "",
  });

  // Consolidate all validation logic
  const validateField = (name: string, value: string) => {
    switch (name) {
      case "username":
        return /^[a-zA-Z0-9_]+$/.test(value) ? "" : t("InvalidUsername");
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : t("InvalidEmail");
      case "verificationCode":
        return /^\d{6}$/.test(value) ? "" : t("InvalidCaptcha");
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Set the error for the field dynamically
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields before submission
    const newErrors = {
      username: validateField("username", formData.username),
      email: validateField("email", formData.email),
      verificationCode: validateField(
        "verificationCode",
        formData.verificationCode
      ),
    };

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }

    try {
      //   const response = await new AuthApi().forgotPassword(formData);
      //   console.log("Forgot password request successful:", response);
    } catch (err) {
      console.error("Forgot password request error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t("Username")}
        </label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className={`w-full mt-1 p-2 border ${
            errors.username ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:border-primary bg-white focus:bg-blue-50 text-primary`}
          placeholder={t("Enter") + t("Username")}
        />
        {errors.username && (
          <p className="text-red-500 text-xs mt-1">{errors.username}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t("Email")}
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full mt-1 p-2 border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:border-primary bg-white focus:bg-blue-50 text-primary`}
          placeholder={t("Enter") + t("Email")}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t("Captcha")}
        </label>
        <input
          type="text"
          name="verificationCode"
          value={formData.verificationCode}
          onChange={handleChange}
          className={`w-full mt-1 p-2 border ${
            errors.verificationCode ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:border-primary bg-white focus:bg-blue-50 text-primary`}
          placeholder={t("Enter") + t("Captcha")}
        />
        {errors.verificationCode && (
          <p className="text-red-500 text-xs mt-1">{errors.verificationCode}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
      >
        {t("Submit")}
      </button>
      <div className="text-center mt-4">
        <Link to="/auth/login" className="text-primary hover:underline mx-2">
          {t("RemAccount")}
        </Link>
      </div>
    </form>
  );
};

export default ForgotForm;
