import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";

export default function Navbar() {
  const { user, role, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
  setDropdownOpen(false);

  if (role && role.toLowerCase() === "admin") {
    navigate("/admin");
  } 
  else if (role && ["citizen", "policymaker", "researcher"].includes(role.toLowerCase())) {
    navigate("/dashboard");
  } 
  else {
    navigate("/login");
  }
};

  return (
    <nav className="flex justify-center space-x-6 bg-gray-100 py-3 text-sm font-medium border-b relative">
      <Link to="/">Home</Link>
      <Link to="/guidelines">Policies and Guidelines</Link>
      <Link to="/manual">Download Manual</Link>
      <Link to="/contact">Contact Us</Link>

      {!user ? (
        <Link to="/login">Login</Link>
      ) : (
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="font-semibold text-blue-700"
          >
            {role === "admin" ? "Admin" : user}
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
              <button
                onClick={handleProfileClick}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                My Profile
              </button>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

