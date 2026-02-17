// LoginPages.tsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LandingPage.css";
import axios from "../../../api/axiosConig";
import { useAuth } from "../../../context/AuthContext";
import MetaBluxLogo from '../../../assets/auth/logo.png';
import { SlUser } from "react-icons/sl";
import { IoMailOpenOutline } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";
import { usePageTitle } from "../../../hooks/usePageTitle";
import { PiPassword, PiEye, PiEyeSlash } from "react-icons/pi";

interface LoginFormData {
  username: string;
  password: string;
  rememberMe: boolean;
}

interface ForgotFormData {
  email: string;
}

interface LoginError {
  message: string;
}

const LoginPages: React.FC = () => {
  const { login, token } = useAuth();
  usePageTitle("MetaBlux Login");

  const navigate = useNavigate();

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (token) {
      const from =
        (window.history.state && window.history.state.from) || "/";
      navigate(from, { replace: true });
    }
  }, [token, navigate]);

  // ---------------- LOGIN STATE ----------------
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
    rememberMe: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<LoginError | null>(null);

  // ---------------- FORGOT PASSWORD STATE ----------------
  const [forgotEmail, setForgotEmail] = useState<ForgotFormData>({
    email: "",
  });

  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState<string | null>(null);
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // ---------------- HANDLE INPUT CHANGES ----------------
  const handleLoginChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (error) setError(null);
  };

  const handleForgotChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setForgotEmail((prev) => ({ ...prev, [name]: value }));
    if (forgotError) setForgotError(null);
  };

  // ---------------- LOGIN SUBMIT ----------------
  const handleLoginSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("auth/login/", {
        username: formData.username,
        password: formData.password,
      });

      const token = response.data.token;

      if (!token) {
        throw new Error("No token received");
      }

      // Save token
      localStorage.setItem("token", token);

      // Save using auth context
      login(token, formData.rememberMe);

      const from =
        (window.history.state && window.history.state.from) || "/";
      navigate(from, { replace: true });

    } catch (err: any) {
      setError({
        message:
          err.response?.data?.detail ||
          "Invalid username or password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------- FORGOT PASSWORD SUBMIT ----------------
  const handleForgotSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setForgotLoading(true);
    setForgotError(null);

    try {
      const response = await axios.post(
        "auth/forgot-password/",
        { email: forgotEmail.email }
      );

      if (response.data?.message) {
        setForgotSuccess(true);
      } else {
        throw new Error("Failed to send reset email");
      }
    } catch (err: any) {
      setForgotError(
        err.response?.data?.detail ||
          "Failed to process your request"
      );
    } finally {
      setForgotLoading(false);
    }
  };

  // ---------------- FORGOT PASSWORD UI ----------------
  const renderForgotPassword = () => (
    <div className="login-card">
      {forgotSuccess ? (
        <>
          <h3 className="forgot-title">Check Your Email</h3>
          <p className="forgot-subtitle">
            We've sent a password reset link to{" "}
            {forgotEmail.email}.
          </p>
          <button
            className=" "
            onClick={() => setShowForgotPassword(false)}
          >
            <IoIosArrowRoundBack /> Back to Login
          </button>
        </>
      ) : (
        <>
          <h3 className="forgot-title">
            Forgot your Password?
          </h3>

          {forgotError && (
            <div className="forgot-error">
              {forgotError}
            </div>
          )}

          <form onSubmit={handleForgotSubmit}>
            <div className="form-group">
              <label htmlFor="email">
                Enter your Email Id{" "}
                <span className="required">*</span>
              </label>

              

              <div className="input-group">
                <span className="input-icon">
                  <IoMailOpenOutline />
                </span>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="mb-img-input"
                  value={forgotEmail.email}
                  onChange={handleForgotChange}
                  required
                />
              </div>
            </div>

            <button
              className="forgot-btn  "
              type="submit"
              disabled={forgotLoading}
            >
              {forgotLoading
                ? "Sending..."
                : "Send a Link"}
            </button>

          </form>
        </>
      )}
    </div>
  );

  // ---------------- LOGIN UI ----------------
  const renderLoginForm = () => (
    <div className="login-card">
      <h3 className="login-title">
        
        Welcome to <span className="mb-txt-clr-primary">Metablux<img src={MetaBluxLogo} height={20} alt="Logo" className="lesoko-logo" /></span>
      </h3>

      {error && (
        <div className="forgot-error">
          {error.message}
        </div>
      )}

      <form
        onSubmit={handleLoginSubmit}
        className="ls-mt-15px"
      >
        <label>
          User Name <span className="required">*</span>
        </label>

        <div className="input-group">
          <span className="input-icon">
            <SlUser />
          </span>
          <input
            type="text"
            name="username"
            className="mb-img-input"
            value={formData.username}
            onChange={handleLoginChange}
            required
          />
        </div>

        <div className="input-group">
          <span className="input-icon">
            <PiPassword />
          </span>

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            className="mb-img-input"
            onChange={handleLoginChange}
            required
          />

          <span
            className="eye-icon"
            onClick={() =>
              setShowPassword((prev) => !prev)
            }
          >
            {showPassword ? <PiEye /> : <PiEyeSlash />}
          </span>
        </div>

        <div className="options">
          <label className="mb-flex-center">
            <input
              type="checkbox"
              name="rememberMe"
              className="mb-mr-5px"
              checked={formData.rememberMe}
              onChange={handleLoginChange}
            />
            Remember me
          </label>

          <span
            onClick={() =>
              setShowForgotPassword(true)
            }
            style={{
              cursor: "pointer",
              color: "blue",
            }}
          >
            Forgot Password?
          </span>
        </div>

        <button
          type="submit"
          className="login-btn mb-bg-clr-primary mb-txt-clr-white"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );

  return (
    <div className="login-background">
      {showForgotPassword
        ? renderForgotPassword()
        : renderLoginForm()}
    </div>
  );
};

export default LoginPages;
