import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  /* ======================
     HANDLE LOGIN
  ====================== */
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://medtrack-mqas.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      // Store user session
      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.name);

      navigate("/dashboard");

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d8f3dc] to-[#b7e4c7] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-[#1b4332]">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
          />

          <button
            type="submit"
            className="w-full bg-[#2d6a4f] text-white p-3 rounded hover:bg-[#1b4332] transition"
          >
            Login
          </button>

          {/* REGISTER REDIRECT */}
          <p className="text-sm text-center mt-4 text-[#1b4332]/80">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-[#2d6a4f] font-semibold hover:underline"
            >
              Register
            </Link>
          </p>

        </form>
      </motion.div>
    </div>
  );
};

export default Login;