import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Panchayat from "./pages/Panchayat";
import Schemes from "./pages/Schemes";
import Development from "./pages/Development";
import Notices from "./pages/Notices";
import Documents from "./pages/Documents";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Grievance from "./pages/Grievance";
import Family from "./pages/Family";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./AdminDashboard";

export default function App() {
  return (
    <Routes>
      {/* =========================
          PUBLIC WEBSITE
      ========================= */}

      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/panchayat" element={<Panchayat />} />

        <Route path="/schemes" element={<Schemes />} />

        <Route
          path="/development"
          element={<Development />}
        />

        <Route path="/notices" element={<Notices />} />

        <Route
          path="/documents"
          element={<Documents />}
        />

        <Route path="/services" element={<Services />} />

        <Route path="/gallery" element={<Gallery />} />

        <Route
          path="/grievance"
          element={<Grievance />}
        />

        <Route path="/family" element={<Family />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="*" element={<NotFound />} />
      </Route>

      {/* =========================
          ADMIN LOGIN
      ========================= */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      {/* =========================
          PROTECTED ADMIN DASHBOARD
      ========================= */}

      <Route
        path="/admin/grievances"
        element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        }
      />
    </Routes>
  );
}