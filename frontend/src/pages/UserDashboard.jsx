import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const storedCategory = localStorage.getItem("category");

    if (!token) {
      navigate("/auth"); 
    } else {
      if (role === "admin") {
        navigate("/admin");
      } else {
        setCategory(storedCategory || "user");
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      {category === "citizen" && (
        <p>Welcome Citizen! Here you can access public surveys and reports.</p>
      )}
      {category === "policymaker" && (
        <p>Welcome Policymaker! Here are your policy-relevant datasets and analytics.</p>
      )}
      {category === "researcher" && (
        <p>Welcome Researcher! Here you can access microdata for research purposes.</p>
      )}
    </div>
  );
}
