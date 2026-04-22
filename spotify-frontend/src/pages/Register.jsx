import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const register = async () => {
    await API.post("/auth/register", data);
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black">

      <div className="bg-[#181818] p-8 rounded-xl w-96">

        <h2 className="text-2xl mb-6 text-center">Register</h2>

        <input
          placeholder="Username"
          className="w-full mb-3 p-3 bg-black"
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />

        <input
          placeholder="Email"
          className="w-full mb-3 p-3 bg-black"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-3 bg-black"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <select
          className="w-full mb-4 p-3 bg-black"
          onChange={(e) => setData({ ...data, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="artist">Artist</option>
        </select>

        <button
          onClick={register}
          className="w-full bg-primary p-3 rounded"
        >
          Register
        </button>

        <p className="text-center mt-4">
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}