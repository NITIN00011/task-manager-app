import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      alert("Something went wrong");
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
          🚀 Register
        </h1>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

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
          onClick={registerUser}
          style={buttonStyle}
        >
          Register
        </button>

        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
            color: "#cbd5e1",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#38bdf8",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Login
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

export default Register;