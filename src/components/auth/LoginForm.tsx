import React, { useState } from "react";
import { Login } from "../../libs/module/Auth";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAuth from "@/store/useUsers";

const LoginForm: React.FC = () => {
  const { t } = useTranslation("Auth");
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Login>({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  // Consolidate validation logic into one function
  const validateField = (name: string, value: string) => {
    switch (name) {
      case "username":
        return value.trim() !== "" ? "" : t("NullUsername");
      case "password":
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value)
          ? ""
          : t("InvalidPass");
      default:
        return "";
    }
  };

  // Handle input change and validate the field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Dynamically validate the field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      username: validateField("username", formData.username),
      password: validateField("password", formData.password),
    };

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }

    const loginSuccess = await login(formData);
    if (loginSuccess) {
      navigate("/");
    } else {
      setErrors({
        username: t("LoginFail"),
        password: t("LoginFail"),
      });
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
          {t("Password")}
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`w-full mt-1 p-2 border ${
            errors.password ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:border-primary bg-white focus:bg-blue-50 text-primary`}
          placeholder={t("Enter") + t("Password")}
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
      >
        {t("Login")}
      </button>
      <div className="text-center mt-4">
        <div className="flex justify-between">
          <Link to="/auth/forgot" className="text-primary hover:underline mx-2">
            {t("ForgotPass")}
          </Link>
          <Link
            to="/auth/register"
            className="text-primary hover:underline mx-2"
          >
            {t("NonAccount")}
          </Link>
        </div>
      </div>
    </form>
  );
};
9;
export default LoginForm;
