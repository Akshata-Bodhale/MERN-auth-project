import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({});
  const navigate = useNavigate(); // ✅ add this

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      alert(res.data.message);

      // ✅ Redirect to dashboard after success
      if (res.data.message === "Login successful") {
        navigate("/dashboard");
      }

    } catch (err) {
      alert("Login failed");
    }
  };

  
   return (
  <div className="container">
    <h2>Login</h2>

    <input name="email" placeholder="Email" onChange={handleChange} />
    <input name="password" type="password" placeholder="Password" onChange={handleChange} />

    <button onClick={handleSubmit}>Login</button>

    <p>
      Don't have an account?{" "}
        <button
    className="link-btn"
    onClick={() => navigate("/signup")}
  >
    Signup
  </button>
    </p>
  </div>
);

}

export default Login;
