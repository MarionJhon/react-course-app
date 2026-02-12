import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [mode, setMode] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { signUp, user, logIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    setError(null);
    let result;
    if (mode) {
      result = logIn(data.email, data.password);
    } else {
      result = signUp(data.email, data.password);
    }

    if (result.success) {
      navigate("/");
    } else {
      setError(result.error);
    }
  }

  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          {user && <p>User logged in: {user.email}</p>}
          <h1 className="page-title">{mode ? "Log-In" : "Sign-Up"}</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="form-error">{errors.email.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-input"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  maxLength: {
                    value: 12,
                    message: "Password must be less than 12 characters",
                  },
                })}
              />
              {errors.password && (
                <span className="form-error">{errors.password.message}</span>
              )}
            </div>
            <button type="submit" className="btn btn-primary btn-large">
              {mode ? "Login" : "Sign-up"}
            </button>
          </form>
          <div className="auth-switch">
            {mode ? (
              <p>
                Already have an account?{" "}
                <span
                  className="auth-link"
                  onClick={() => setMode((prev) => !prev)}
                >
                  {mode ? "Signup" : "Login"}
                </span>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <span
                  className="auth-link"
                  onClick={() => setMode((prev) => !prev)}
                >
                  {mode ? "Signup" : "Login"}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
