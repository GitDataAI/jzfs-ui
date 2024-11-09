import React, { useState } from "react";
import { Link } from "react-router-dom";
// import AuthApi from "../../libs/apis/auth_api";

const ForgotForm: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
  });

  // Consolidate all validation logic
  const validateField = (name: string, value: string) => {
    switch (name) {
      case "username":
        return /^[a-zA-Z0-9_]+$/.test(value)
          ? ""
          : "用户名只能包含字母、数字和下划线";
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "请输入有效的邮箱地址";
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
          用户名
        </label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className={`w-full mt-1 p-2 border ${
            errors.username ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:border-primary bg-white focus:bg-blue-50 text-primary`}
          placeholder="请输入用户名"
        />
        {errors.username && (
          <p className="text-red-500 text-xs mt-1">{errors.username}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">邮箱</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full mt-1 p-2 border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:border-primary bg-white focus:bg-blue-50 text-primary`}
          placeholder="请输入邮箱"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
      >
        提交
      </button>
      <div className="text-center mt-4">
        <Link to="/auth/login" className="text-primary hover:underline mx-2">
          想起来了？去登录
        </Link>
      </div>
    </form>
  );
};

export default ForgotForm;
