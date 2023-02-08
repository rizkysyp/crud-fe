import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const postData = async (e) => {
    e.preventDefault();
    try {
      let data = {
        email,
        password,
      };
      const result = await axios.post(
        process.env.REACT_APP_BACKEND_API_HOST + "/users/login",
        data
      );

      const users = result.data.data;
      localStorage.setItem("Token", users.token);
      Swal.fire("success", "Login Berhasil", "success");
      navigate("/");
    } catch (error) {
      Swal.fire("Warning", "Email atau password salah", "warning");
      console.log(error);
    }
  };
  return (
    <div className="flex items-center h-screen w-screen bg-gray-300">
      <form
        className="bg-white p-10 rounded-lg shadow-lg w-auto m-auto"
        onSubmit={postData}
      >
        <h2 className="text-lg font-medium mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label className="block font-medium mb-2">Email</label>
          <input
            type="email"
            className="w-full p-2 rounded-lg border border-gray-400"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Password</label>
          <input
            type="password"
            className="w-full p-2 rounded-lg border border-gray-400"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
