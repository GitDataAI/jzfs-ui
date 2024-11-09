import React, { useState } from "react";
import AuthApi from "../../libs/apis/auth_api";
import { Link } from "react-router-dom";

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Consolidate all validation logic
  const validateField = (name: string, value: string) => {
    switch (name) {
      case "username":
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value)
          ? ""
          : "用户名必须包含字母和数字，且不少于6位";
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "请输入有效的邮箱地址";
      case "password":
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value)
          ? ""
          : "密码必须包含字母和数字，且不少于6位";
      case "confirmPassword":
        return value === formData.password ? "" : "两次密码不一致";
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };

      // After updating the field, we check if password and confirmPassword are matching
      if (name === "password" || name === "confirmPassword") {
        const confirmPasswordError =
          updatedData.password === updatedData.confirmPassword
            ? ""
            : "两次密码不一致";
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: confirmPasswordError,
        }));
      }

      return updatedData;
    });

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
      password: validateField("password", formData.password),
      confirmPassword: validateField(
        "confirmPassword",
        formData.confirmPassword
      ),
    };

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }

    try {
      const { confirmPassword, ...registerData } = formData;
      const authApi = new AuthApi();
      const response = await authApi.register(registerData);
      console.log("Register successful:", response);
    } catch (err) {
      console.error("Register error:", err);
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

      <div>
        <label className="block text-sm font-medium text-gray-700">密码</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`w-full mt-1 p-2 border ${
            errors.password ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:border-primary bg-white focus:bg-blue-50 text-primary`}
          placeholder="请输入密码"
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          确认密码
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={`w-full mt-1 p-2 border ${
            errors.confirmPassword ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:border-primary bg-white focus:bg-blue-50 text-primary`}
          placeholder="请再次输入密码"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
      >
        注册
      </button>
      <div className="text-center mt-4">
        <Link to="/auth/login" className="text-primary hover:underline mx-2">
          已有账号？去登录
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
