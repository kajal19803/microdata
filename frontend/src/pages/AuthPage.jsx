import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext"; 

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    category: "",
    password: "",
    confirmPassword: "",
  });

  const { login } = useContext(AuthContext); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin
        ? "http://localhost:5000/api/login"
        : "http://localhost:5000/api/register";

      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      const res = await axios.post(url, payload);

      alert(res.data.message || "Success");

      if (isLogin && res.data.token) {
        localStorage.setItem("userName", res.data.user.firstName);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("category", res.data.user?.category || "");
        login(res.data.user.firstName, res.data.role);
      }

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        country: "",
        category: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isLogin ? "Log in" : "User Registration"}
        </h2>
        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name*"
                required
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name*"
                required
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country*"
                required
                className="w-full border px-3 py-2 rounded"
              />
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Select Category*</option>
                <option value="citizen">Citizen</option>
                <option value="policymaker">Policymaker</option>
                <option value="researcher">Researcher</option>
              </select>
            </>
          )}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address*"
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password*"
            required
            className="w-full border px-3 py-2 rounded"
          />
          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Password Confirm*"
              required
              className="w-full border px-3 py-2 rounded"
            />
          )}
          <input
            type="text"
            placeholder="Type the text in the box"
            className="w-full border px-3 py-2 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800"
          >
            {isLogin ? "Log in" : "Register"}
          </button>
        </form>

        <div className="text-xs text-center text-gray-600 mt-3">
          Information you provide will be used in compliance with NSO's Privacy Policy.
        </div>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-700 hover:underline text-sm"
          >
            {isLogin
              ? "Don't have an account? Register"
              : "Already have an account? Log in"}
          </button>
        </div>

        {!isLogin && (
          <p className="text-center text-xs text-gray-400 mt-6">
            MoSPI Website | eSankhyiki Website | Disclaimer
          </p>
        )}
      </div>
    </div>
  );
}

