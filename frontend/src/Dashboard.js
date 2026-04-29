import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Welcome to Dashboard 🎉</h2>
      <p>You are successfully logged in.</p>

      <button onClick={() => navigate("/login")}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;