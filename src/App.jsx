import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Moon,
  Sun
} from "lucide-react";

import { validateForm } from "./lib";
import "./App.css";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [dark, setDark] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = validateForm(email, password);
    setErrors(result);

    if (Object.keys(result).length === 0) {
      alert("Login Successful ✅");
    }
  };

  return (
    <div className={`page ${dark ? "dark" : ""}`}>
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="header">
          <h2>Sign in with email</h2>
          <button onClick={() => setDark(!dark)}>
            {dark ? <Sun size={18} style={{ color: "white" }} /> : <Moon size={18} />}
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="field">
            <Mail className="icon left" size={18} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? "error" : ""}
            />
            {errors.email && (
              <div className="error-text">{errors.email}</div>
            )}
          </div>

          {/* Password */}
          <div className="field">
            <Lock className="icon left" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? "error" : ""}
            />
            <button
              type="button"
              className="icon-btn right"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && (
              <div className="error-text">{errors.password}</div>
            )}
          </div>

          <div className="forgot">Forgot <label>Password?</label></div>

          <motion.button 
            whileTap={{ scale: 0.96 }}
            className="submit"
            type="submit"
          >
           <div className="Start" >Get Started </div> 
          </motion.button>
        </form>
        <p className="signup">Not having an account? <button onClick={() => { window.history.pushState({}, '', '/signup'); window.dispatchEvent(new PopStateEvent('popstate')); }}>Sign up</button></p>
      </motion.div>
    </div>
  );
}
