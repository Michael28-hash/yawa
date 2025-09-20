"use client";
import dynamic from "next/dynamic";

const ClientOnlyApp = dynamic(() => Promise.resolve(App), { ssr: false });


import { HashRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./pages/routes/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard/page";
import CoachDashboard from "./pages/coach/CoachDashboard/page";
import TreasurerDashboard from "./pages/treasurer/TreasurerDashboard/page";
import PlayerDashboard from "./pages/player/playerdashboard/page";
import Login from "./loginpage/page";
import Landingpages from "./landingpage/page";
function App() {
  return (
    <Router>  
      <Routes>
     <Route path="/" element={<Landingpages />} />
     {/* <Route path="/" element={<Login/>} /> */}

        <Route  
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/coach-dashboard"
          element={
            <ProtectedRoute allowedRoles={["coach"]}>
              <CoachDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/treasurer-dashboard"
          element={
            <ProtectedRoute allowedRoles={["treasurer"]}>
              <TreasurerDashboard />
            </ProtectedRoute>
          }
        />


          <Route
          path="/player-dashboard"
          element={
            <ProtectedRoute allowedRoles={["player"]}>
              <PlayerDashboard  />
            </ProtectedRoute>
          }
        />
        

     </Routes>
    </Router>
  );
}


export default function Root() {
  return <ClientOnlyApp />;
}