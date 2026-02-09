import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Sun, Moon, User, Phone } from "lucide-react";

import { validateForm } from "./lib";
import { useToast } from "./useToast";
import Toast from "./Toast";
import "./App.css";

export default function Signup() {
  const [fullname, setFullname] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [dark, setDark] = useState(false);
  const [errors, setErrors] = useState({});
  const { toasts, removeToast, success, error } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Submission Interception: Check for empty fields
    if (!fullname.trim() || !mobile.trim() || !email.trim() || !password.trim() || !confirm.trim()) {
      error("Please fill in all required fields");
      return;
    }

    const result = validateForm(email, password);
    if (!fullname || fullname.trim().length === 0) result.fullname = "Enter your full name";
    if (!mobile || !/^\d{10}$/.test(mobile)) result.mobile = "Enter a valid 10-digit mobile number";
    if (password !== confirm) result.confirm = "Passwords do not match";
    setErrors(result);

    if (Object.keys(result).length === 0) {
      success("Account created ✅");
      // Reset form after successful submission
      setFullname("");
      setMobile("");
      setEmail("");
      setPassword("");
      setConfirm("");
      
      setTimeout(() => {
        window.history.pushState({}, "", "/");
        window.dispatchEvent(new PopStateEvent("popstate"));
      }, 2000);
    } else {
      error("Please fix the errors and try again");
    }
  };

  return (
    <>
      <Toast toasts={toasts} removeToast={removeToast} />
      <div className={`page ${dark ? "dark" : ""}`}>
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="header">
            <h2>Create account</h2>
            <button onClick={() => setDark(!dark)}>
              {dark ? <Sun size={18} style={{ color: "white" }} /> : <Moon size={18} />}
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <User className="icon left" size={18} />
              <input
                type="text"
                placeholder="Full name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className={errors.fullname ? "error" : ""}
              />
              {errors.fullname && <div className="error-text">{errors.fullname}</div>}
            </div>

            <div className="field">
              <Phone className="icon left" size={18} />
              <input
                type="tel"
                placeholder="Mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className={errors.mobile ? "error" : ""}
              />
              {errors.mobile && <div className="error-text">{errors.mobile}</div>}
            </div>

            <div className="field">
              <Mail className="icon left" size={18} />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? "error" : ""}
              />
              {errors.email && <div className="error-text">{errors.email}</div>}
            </div>

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
              {errors.password && <div className="error-text">{errors.password}</div>}
            </div>

            <div className="field">
              <Lock className="icon left" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className={errors.confirm ? "error" : ""}
              />
              {errors.confirm && <div className="error-text">{errors.confirm}</div>}
            </div>

            <motion.button whileTap={{ scale: 0.96 }} className="submit" type="submit">
              <div className="Start">Create Account</div>
            </motion.button>
          </form>

          <p className="signup">Already have an account? <button onClick={() => { window.history.pushState({}, '', '/'); window.dispatchEvent(new PopStateEvent('popstate')); }}>Sign in</button></p>
        </motion.div>
      </div>
    </>
  );
}
