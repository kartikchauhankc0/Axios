import { motion as Motion } from "framer-motion";
import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/auth.context";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [data, setData] = useState({ email: "", password: "" });

  const login = async () => {
    const res = await API.post("/auth/login", data);
    setUser(res.data.user);
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black">

      <Motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#181818] p-8 rounded-xl w-96"
      >
        <h2 className="text-2xl mb-6 text-center">Login</h2>

        <input
          placeholder="Email"
          className="w-full mb-3 p-3 bg-black"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 bg-black"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button onClick={login} className="w-full bg-primary p-3 rounded">
          Login
        </button>

        <p className="text-center mt-4">
          <Link to="/register">Register</Link>
        </p>
      </Motion.div>
    </div>
  );
}