import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    loginType: "guest",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'host') {
        navigate("/host-dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setLoading(true);
    try {
      const result = await login(formData.email, formData.password, formData.loginType);
      console.log("Login result:", result);
      
      if (result.success) {
        console.log("Login successful, user role:", user?.role);
        console.log("Login type selected:", formData.loginType);
        
        // State will update, useEffect will handle redirect
        // But also navigate directly as backup
        setTimeout(() => {
          console.log("Redirecting, user role:", user?.role, "login type:", formData.loginType);
          // Check actual user role, not just login type selection
          if (user?.role === 'host' && formData.loginType === 'host') {
            navigate("/host-dashboard", { replace: true });
          } else if (user?.role === 'guest' && formData.loginType === 'guest') {
            navigate("/", { replace: true });
          } else if (user?.role === 'host' && formData.loginType === 'guest') {
            // User is host but selected guest login - still go to host dashboard
            navigate("/host-dashboard", { replace: true });
          } else {
            // Default to home page
            navigate("/", { replace: true });
          }
        }, 100);
      } else {
        const errorKey = result.isRoleError ? "roleError" : "submit";
        setErrors({ [errorKey]: result.error || "Login failed. Please try again." });
        setLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ submit: "An unexpected error occurred. Please try again." });
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Login</h2>
        
        {errors.submit && (
          <div style={styles.errorAlert}>
            <strong>Error:</strong> {errors.submit}
          </div>
        )}

        {errors.roleError && (
          <div style={styles.roleErrorAlert}>
            <strong>Role Restriction:</strong> {errors.roleError}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              I want to
            </label>
            <div style={styles.radioGroup}>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name="loginType"
                  value="guest"
                  checked={formData.loginType === 'guest'}
                  onChange={handleChange}
                  style={styles.radioInput}
                />
                Book properties (Guest)
              </label>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name="loginType"
                  value="host"
                  checked={formData.loginType === 'host'}
                  onChange={handleChange}
                  style={styles.radioInput}
                />
                List my properties (Host)
              </label>
            </div>
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.email ? styles.inputError : {}),
              }}
              placeholder="Enter your email"
            />
            {errors.email && (
              <span style={styles.errorText}>{errors.email}</span>
            )}
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.password ? styles.inputError : {}),
              }}
              placeholder="Enter your password"
            />
            {errors.password && (
              <span style={styles.errorText}>{errors.password}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={styles.button}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={styles.linkText}>
          Don't have an account?{" "}
          <Link to="/register" style={styles.link}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f7f7f7",
    padding: "24px",
    backgroundImage: "linear-gradient(to bottom, #ffffff, #f7f7f7)",
  },
  formContainer: {
    backgroundColor: "white",
    padding: "48px",
    borderRadius: "16px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "480px",
    border: "1px solid #dddddd",
  },
  title: {
    marginBottom: "32px",
    color: "#222",
    fontSize: "32px",
    fontWeight: "700",
    textAlign: "center",
    fontFamily: "'Circular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  form: {
    width: "100%",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    color: "#222",
    fontSize: "16px",
    fontWeight: "600",
    fontFamily: "'Circular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  radioGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginBottom: "8px",
  },
  radioLabel: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
    fontSize: "16px",
    color: "#222",
    padding: "16px",
    border: "2px solid #dddddd",
    borderRadius: "12px",
    transition: "all 0.2s ease",
    fontFamily: "'Circular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontWeight: "500",
  },
  radioInput: {
    margin: 0,
    width: "20px",
    height: "20px",
    accentColor: "#FF385C",
  },
  input: {
    width: "100%",
    padding: "16px",
    border: "1px solid #dddddd",
    borderRadius: "12px",
    fontSize: "16px",
    boxSizing: "border-box",
    transition: "all 0.3s ease",
    fontFamily: "'Circular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  inputError: {
    borderColor: "#e74c3c",
  },
  errorText: {
    color: "#e74c3c",
    fontSize: "12px",
    marginTop: "5px",
    display: "block",
  },
  errorAlert: {
    backgroundColor: "#fee",
    color: "#c33",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "20px",
    fontSize: "14px",
  },
  roleErrorAlert: {
    backgroundColor: "#ffebee",
    color: "#d32f2f",
    border: "2px solid #d32f2f",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "20px",
    fontSize: "14px",
    fontWeight: "600",
  },
  button: {
    width: "100%",
    padding: "16px",
    backgroundColor: "#FF385C",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontFamily: "'Circular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
    cursor: "not-allowed",
  },
  linkText: {
    textAlign: "center",
    marginTop: "20px",
    color: "#666",
    fontSize: "14px",
  },
  link: {
    color: "#FF5A5F",
    textDecoration: "none",
    fontWeight: "500",
  },
};

export default Login;

