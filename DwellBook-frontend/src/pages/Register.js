import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "guest",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

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

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
    console.log("Submitting registration with role:", formData.role);
    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role
    });
    console.log("Registration result:", result);
    setLoading(false);

    if (result.success) {
      navigate("/login");
    } else {
      setErrors({ submit: result.error });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Create Account</h2>
        
        {errors.submit && (
          <div style={styles.errorAlert}>{errors.submit}</div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.name ? styles.inputError : {}),
              }}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <span style={styles.errorText}>{errors.name}</span>
            )}
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
            <label htmlFor="role" style={styles.label}>
              I want to
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="guest">Book properties (Guest)</option>
              <option value="host">List my properties (Host)</option>
              <option value="both">Both - Book and List properties</option>
            </select>
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
              placeholder="Create a password (min. 6 characters)"
            />
            {errors.password && (
              <span style={styles.errorText}>{errors.password}</span>
            )}
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="confirmPassword" style={styles.label}>
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.confirmPassword ? styles.inputError : {}),
              }}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <span style={styles.errorText}>{errors.confirmPassword}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={styles.button}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p style={styles.linkText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Login here
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

export default Register;

