import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CreateListing = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    images: null,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { isHost, user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormData((prev) => ({
        ...prev,
        images: files,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = "Valid price is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
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
      // Get existing listings from localStorage
      const existingListings = JSON.parse(localStorage.getItem("hostListings") || "[]");
      
      // Create new listing with host info
      const newListing = {
        _id: Date.now().toString(), // Simple unique ID
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        location: formData.location,
        owner: user?.id || "host_" + Date.now(),
        ownerName: user?.name || "Host",
        propertyType: "Apartment",
        guests: 2,
        bedrooms: 1,
        beds: 1,
        bathrooms: 1,
        averageRating: 0,
        totalReviews: 0,
        images: formData.images ? 
          Array.from(formData.images).map(file => URL.createObjectURL(file)) :
          [
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          ],
        amenities: ['WiFi', 'Air Conditioning', 'Kitchen'],
        reviews: [],
        status: 'available',
        createdAt: new Date().toISOString(),
        hostDetails: {
          name: user?.name || "Host",
          responseRate: 95,
          superhost: false,
          hostingSince: new Date().toISOString()
        }
      };
      
      // Add to listings
      existingListings.push(newListing);
      localStorage.setItem("hostListings", JSON.stringify(existingListings));
      
      // Also add to main listings so guests can see it
      const mainListings = JSON.parse(localStorage.getItem("allListings") || "[]");
      mainListings.push(newListing);
      localStorage.setItem("allListings", JSON.stringify(mainListings));

      navigate("/host-dashboard");
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || "Failed to create listing",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isHost) {
    return (
      <div style={styles.container}>
        <div style={styles.errorContainer}>
          <h2>Access Denied</h2>
          <p>Only hosts can create listings.</p>
          <button onClick={() => navigate("/")} style={styles.button}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Create New Listing</h2>

        {errors.submit && (
          <div style={styles.errorAlert}>{errors.submit}</div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="title" style={styles.label}>
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.title ? styles.inputError : {}),
              }}
              placeholder="Enter listing title"
            />
            {errors.title && (
              <span style={styles.errorText}>{errors.title}</span>
            )}
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="description" style={styles.label}>
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              style={{
                ...styles.input,
                ...styles.textarea,
                ...(errors.description ? styles.inputError : {}),
              }}
              placeholder="Enter listing description"
            />
            {errors.description && (
              <span style={styles.errorText}>{errors.description}</span>
            )}
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="price" style={styles.label}>
              Price per Night (₹) *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="1"
              style={{
                ...styles.input,
                ...(errors.price ? styles.inputError : {}),
              }}
              placeholder="Enter price per night"
            />
            {errors.price && (
              <span style={styles.errorText}>{errors.price}</span>
            )}
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="location" style={styles.label}>
              Location *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.location ? styles.inputError : {}),
              }}
              placeholder="Enter location"
            />
            {errors.location && (
              <span style={styles.errorText}>{errors.location}</span>
            )}
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="images" style={styles.label}>
              Images (up to 5)
            </label>
            <input
              type="file"
              id="images"
              name="images"
              accept="image/*"
              multiple
              onChange={handleChange}
              style={styles.fileInput}
            />
            <small style={styles.helperText}>
              You can upload up to 5 images
            </small>
          </div>

          <div style={styles.buttonGroup}>
            <button
              type="button"
              onClick={() => navigate("/")}
              style={styles.cancelButton}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={styles.submitButton}
            >
              {loading ? "Creating..." : "Create Listing"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f7f7f7",
    padding: "20px",
  },
  formContainer: {
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  title: {
    marginBottom: "30px",
    color: "#333",
    fontSize: "28px",
    fontWeight: "600",
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
    color: "#333",
    fontSize: "14px",
    fontWeight: "500",
  },
  input: {
    width: "100%",
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "16px",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  textarea: {
    resize: "vertical",
    fontFamily: "inherit",
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
  fileInput: {
    width: "100%",
    padding: "8px",
    fontSize: "14px",
  },
  helperText: {
    display: "block",
    marginTop: "5px",
    color: "#666",
    fontSize: "12px",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
    marginTop: "30px",
  },
  cancelButton: {
    flex: 1,
    padding: "12px",
    backgroundColor: "#ccc",
    color: "#333",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
  submitButton: {
    flex: 1,
    padding: "12px",
    backgroundColor: "#00A699",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  errorContainer: {
    maxWidth: "600px",
    margin: "100px auto",
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#FF5A5F",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default CreateListing;

