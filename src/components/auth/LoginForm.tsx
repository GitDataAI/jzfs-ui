import React, { useState } from "react";
import AuthApi from "../../libs/apis/auth_api";
import { Login } from "../../libs/module/Auth";
import { Link } from "react-router-dom";

const LoginForm: React.FC = () => {
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
        return value.trim() !== "" ? "" : "用户名不能为空";
      case "password":
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value)
          ? ""
          : "密码必须包含字母和数字，且不少于6位";
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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields before submission
    const newErrors = {
      username: validateField("username", formData.username),
      password: validateField("password", formData.password),
    };

    // If there are validation errors, set them and return
    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await new AuthApi().login(formData);
      console.log("Login successful:", response);
    } catch (err) {
      console.error("Login error:", err);
      setErrors({
        username: "",
        password: "登录失败，请检查您的用户名和密码",
      });
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

      <button
        type="submit"
        className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
      >
        登录
      </button>
      <div className="text-center mt-4">
        <div className="flex justify-between">
          <Link to="/auth/forgot" className="text-primary hover:underline mx-2">
            忘记密码
          </Link>
          <Link
            to="/auth/register"
            className="text-primary hover:underline mx-2"
          >
            没有账号？去注册
          </Link>
        </div>
      </div>
    </form>
  );
};
9;
export default LoginForm;
