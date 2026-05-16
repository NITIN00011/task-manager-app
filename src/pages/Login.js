import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);

      navigate("/");
    } catch (error) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(to bottom right, #020617, #0f172a)",
        padding: "20px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          background: "#1e293b",
          padding: "40px",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 0 25px rgba(56,189,248,0.3)",
        }}
      >
        <h1
          style={{
            color: "#38bdf8",
            textAlign: "center",
            marginBottom: "30px",
            textShadow: "0 0 10px #38bdf8",
          }}
        >
          🔐 Login
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button
          onClick={loginUser}
          style={buttonStyle}
        >
          Login
        </button>

        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
            color: "#cbd5e1",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "#38bdf8",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "15px",
  borderRadius: "10px",
  border: "none",
  outline: "none",
  fontSize: "16px",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "25px",
  borderRadius: "10px",
  border: "none",
  background: "#38bdf8",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
  boxShadow: "0 0 15px #38bdf8",
};

export default Login;