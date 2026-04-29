import React from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      // your API call here

      navigate("/login");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="container">
      <h2>Signup</h2>

      <input name="firstName" placeholder="First Name" />
      <input name="lastName" placeholder="Last Name" />
      <input name="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Password" />

      <button onClick={handleSubmit}>Register</button>

      <p>
        Already have an account?{" "}
        <button onClick={() => navigate("/login")}>
          Login
        </button>
      </p>
    </div>
  );
}

export default Signup;