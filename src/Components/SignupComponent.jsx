import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupComponent() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/upload");
  };

  return (
    <div className="w-full flex justify-center mb-10">
      <div className="w-full max-w-sm px-6 py-8 bg-black/30 backdrop-blur-lg rounded-xl shadow-lg border border-gray-700 hover:border-purple-500 transition-all duration-300">
        <h2 className="text-2xl font-bold text-white mb-5 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
          Sign up to Albumify
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="text-gray-300 block mb-1 text-sm">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2.5 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="text-gray-300 block mb-1 text-sm">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2.5 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="text-gray-300 block mb-1 text-sm">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2.5 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white text-base py-2.5 rounded-md transition-all duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-purple-400 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
