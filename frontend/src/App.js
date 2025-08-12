import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";

import TopHeader from "./components/Topheader";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import RedirectIfAuth from "./components/RedirectIfAuth";

import HomePage from "./pages/Home";
import AuthPage from './pages/AuthPage';
import AdminUpload from "./pages/AdminUpload";
import UserDashboard from "./pages/UserDashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <TopHeader />
          <Navbar />

          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />

              <Route
                path="/login"
                element={
                  <RedirectIfAuth>
                    <AuthPage />
                  </RedirectIfAuth>
                }
              />
              <Route
                path="/register"
                element={
                  <RedirectIfAuth>
                    <AuthPage />
                  </RedirectIfAuth>
                }
              />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute allowedRoles={["user"]}>
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <AdminUpload />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;


