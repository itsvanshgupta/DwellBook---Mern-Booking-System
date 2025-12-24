import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ListingCard from "../components/ListingCard";
import SearchBar from "../components/SearchBar";

// Mock Indian properties data
const mockListings = [
  {
    _id: '1',
    title: 'Mumbai Marine Drive Apartment',
    description: 'Modern apartment overlooking Marine Drive with stunning sea views. Perfect for business travelers with proximity to financial district and luxury amenities.',
    price: 8000,
    location: 'Mumbai, India',
    propertyType: 'Apartment',
    guests: 3,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    averageRating: 4.7,
    totalReviews: 234,
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ],
    hostDetails: { name: 'Rahul Sharma', responseRate: 95, superhost: true }
  },
  {
    _id: '2',
    title: 'Delhi Connaught Place Studio',
    description: 'Chic studio in the heart of Delhi near Connaught Place with modern amenities and easy access to metro stations.',
    price: 5500,
    location: 'Delhi, India',
    propertyType: 'Studio',
    guests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    averageRating: 4.5,
    totalReviews: 189,
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ],
    hostDetails: { name: 'Priya Singh', responseRate: 92, superhost: false }
  },
  {
    _id: '3',
    title: 'Bangalore IT Corridor Apartment',
    description: 'Modern apartment in Bangalore\'s tech hub with high-speed internet and proximity to major IT companies.',
    price: 6500,
    location: 'Bangalore, India',
    propertyType: 'Apartment',
    guests: 3,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    averageRating: 4.6,
    totalReviews: 156,
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ],
    hostDetails: { name: 'Arjun Kumar', responseRate: 94, superhost: true }
  },
  {
    _id: '4',
    title: 'Chennai Marina Beach House',
    description: 'Beautiful beach house near Marina Bay with stunning ocean views and modern amenities.',
    price: 7500,
    location: 'Chennai, India',
    propertyType: 'Beach House',
    guests: 4,
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    averageRating: 4.8,
    totalReviews: 201,
    images: [
      'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ],
    hostDetails: { name: 'Lakshmi Narayanan', responseRate: 96, superhost: true }
  },
  {
    _id: '5',
    title: 'Kolkata Heritage Bungalow',
    description: 'Historic colonial bungalow in Kolkata\'s elite Alipore area with beautiful gardens and traditional architecture.',
    price: 12000,
    location: 'Kolkata, India',
    propertyType: 'Bungalow',
    guests: 6,
    bedrooms: 3,
    beds: 4,
    bathrooms: 3,
    averageRating: 4.7,
    totalReviews: 134,
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ],
    hostDetails: { name: 'Anjan Dutta', responseRate: 92, superhost: false }
  },
  {
    _id: '6',
    title: 'Hyderabad Hi-Tech City Apartment',
    description: 'Modern apartment in Hyderabad\'s technology hub with easy access to major IT companies and HITEC City.',
    price: 7000,
    location: 'Hyderabad, India',
    propertyType: 'Apartment',
    guests: 3,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    averageRating: 4.6,
    totalReviews: 203,
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ],
    hostDetails: { name: 'Raj Kumar', responseRate: 95, superhost: true }
  }
];

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { logout, user, isHost, isGuest } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleBook = (listing) => {
    // Navigate to property detail page for booking
    const listingId = listing._id || listing.id;
    if (listingId) {
      navigate(`/listings/${listingId}`);
    }
  };

  const handleSearch = (query) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  useEffect(() => {
    const loadListings = async () => {
      try {
        // Load both mock listings and user-created listings
        const userCreatedListings = JSON.parse(localStorage.getItem("allListings") || "[]");
        
        // Combine mock listings with user-created listings
        const allListings = [...mockListings, ...userCreatedListings];
        
        setTimeout(() => {
          setListings(allListings);
          setError(null);
          setLoading(false);
        }, 500);
      } catch (err) {
        console.error("Error loading listings", err);
        setError("Failed to load listings");
        setLoading(false);
      }
    };

    loadListings();
  }, []);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}></div>
        <p style={styles.loadingText}>Loading amazing places...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div className="header-content" style={styles.headerContent}>
          <h1 style={styles.logo} onClick={() => navigate("/")}>
            DwellBook
          </h1>
          <div className="nav" style={styles.nav}>
            <span className="user-info" style={styles.userInfo}>
              {user?.name || "User"} • {user?.role === "host" ? "Host" : "Guest"}
            </span>
            <button
              onClick={() => navigate("/dashboard")}
              style={styles.dashboardButton}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f0f0f0"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#fff"}
            >
              Dashboard
            </button>
            {isHost && (
              <button
                onClick={() => navigate("/host-dashboard")}
                style={styles.hostDashboardButton}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#ffeded"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#fff"}
              >
                Host Dashboard
              </button>
            )}
            {isHost && (
              <button
                onClick={() => navigate("/create-listing")}
                style={styles.createButton}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#000"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#222"}
              >
                Create Listing
              </button>
            )}
            <button 
              onClick={handleLogout} 
              style={styles.logoutButton}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#E31C5F"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#FF385C"}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section style={styles.searchSection}>
        <SearchBar onSearch={handleSearch} />
      </section>

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.contentWrapper}>
          {/* Title Section */}
          <div style={styles.titleSection}>
            <h2 style={styles.pageTitle}>Explore places to stay</h2>
            {listings.length > 0 && (
              <p style={styles.subtitle}>{listings.length} {listings.length === 1 ? 'listing' : 'listings'} available</p>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div style={styles.errorAlert}>
              <strong>Error:</strong> {error}
            </div>
          )}

          {/* Listings Grid */}
          {!error && listings.length === 0 && !loading && (
            <div style={styles.emptyState}>
              <p style={styles.emptyText}>No listings found</p>
              {isHost && (
                <button
                  onClick={() => navigate("/create-listing")}
                  style={styles.createFirstButton}
                >
                  Create Your First Listing
                </button>
              )}
            </div>
          )}

          {!error && listings.length > 0 && (
            <div style={styles.grid} className="listings-grid">
              {listings.map((listing, index) => (
                <ListingCard
                  key={listing._id || listing.id || index}
                  listing={listing}
                  isGuest={isGuest}
                  isHost={isHost}
                  user={user}
                  onBook={handleBook}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f7f7f7",
    padding: "24px 0",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "calc(100vh - 80px)",
    backgroundColor: "#f7f7f7",
  },
  loadingSpinner: {
    border: "4px solid rgba(0, 0, 0, 0.1)",
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    borderLeftColor: "#FF5A5F",
    borderTopColor: "#FF5A5F",
    animation: "spin 1s linear infinite",
    marginBottom: "20px",
  },
  loadingText: {
    fontSize: "18px",
    color: "#222",
    marginTop: "16px",
    fontWeight: '500',
    fontFamily: '"Cereal", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  searchSection: {
    padding: "32px 40px 24px",
    backgroundColor: "#fff",
    borderBottom: "1px solid #ebebeb",
  },
  header: {
    backgroundColor: "#fff",
    padding: "16px 40px",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.08)",
    position: "sticky",
    top: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#FF385C",
    textDecoration: "none",
    fontFamily: "'Circular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  userName: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#222",
    fontFamily: "'Circular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  dashboardButton: {
    padding: "12px 24px",
    backgroundColor: "#fff",
    color: "#222",
    border: "1px solid #dddddd",
    borderRadius: "24px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontFamily: "'Circular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    textDecoration: "none",
    display: "inline-block",
  },
  hostDashboardButton: {
    padding: "12px 24px",
    backgroundColor: "#fff",
    color: "#FF385C",
    border: "1px solid #FF385C",
    borderRadius: "24px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontFamily: "'Circular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    textDecoration: "none",
    display: "inline-block",
  },
  createButton: {
    padding: "12px 24px",
    backgroundColor: "#222",
    color: "#fff",
    border: "none",
    borderRadius: "24px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.2s ease",
    fontFamily: "'Circular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    textDecoration: "none",
    display: "inline-block",
  },
  logoutButton: {
    padding: "12px 24px",
    backgroundColor: "#FF385C",
    color: "#fff",
    border: "none",
    borderRadius: "24px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.2s ease",
    fontFamily: "'Circular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  main: {
    padding: "40px",
  },
  contentWrapper: {
    maxWidth: "1760px",
    margin: "0 auto",
  },
  titleSection: {
    marginBottom: "32px",
  },
  errorTitle: {
    fontSize: "28px",
    fontWeight: "600",
    marginBottom: "16px",
    color: "#222",
    fontFamily: '"Cereal", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  subtitle: {
    fontSize: "16px",
    color: "#717171",
    margin: 0,
  },
  emptyState: {
    textAlign: "center",
    padding: "80px 20px",
  },
  emptyText: {
    fontSize: "18px",
    color: "#717171",
    marginBottom: "24px",
  },
  createFirstButton: {
    padding: "14px 28px",
    backgroundColor: "#222",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '24px',
    padding: '0 40px',
    maxWidth: '1760px',
    margin: '0 auto',
    width: '100%',
  },
};

// Add CSS for spinner animation
const spinKeyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Add responsive styles
const responsiveStyles = `
  @media (max-width: 1128px) {
    .listings-grid {
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)) !important;
      padding: 0 24px !important;
    }
  }
  
  @media (max-width: 768px) {
    .listings-grid {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) !important;
      gap: 24px 16px !important;
      padding: 0 24px !important;
    }
    
    .header-content {
      padding: 12px 24px !important;
      flex-direction: column !important;
      gap: 16px !important;
    }
    
    .nav {
      flex-wrap: wrap !important;
      justify-content: center !important;
      gap: 12px !important;
    }
    
    .nav button {
      padding: 10px 16px !important;
      font-size: 12px !important;
    }
  }
  
  @media (max-width: 480px) {
    .listings-grid {
      grid-template-columns: 1fr !important;
      gap: 24px !important;
      padding: 0 16px !important;
    }
    
    .header-content {
      padding: 12px 16px !important;
    }
    
    .logo {
      font-size: 20px !important;
    }
    
    .nav {
      flex-direction: column !important;
      width: 100% !important;
      gap: 8px !important;
    }
    
    .nav button {
      width: 100% !important;
      padding: 12px !important;
      text-align: center !important;
    }
    
    .user-info {
      font-size: 12px !important;
      text-align: center !important;
    }
    
    .main {
      padding: 24px 0 !important;
    }
    
    .title-section {
      padding: 0 16px !important;
    }
    
    .page-title {
      font-size: 24px !important;
    }
  }
`;

// Add styles to document head
if (typeof document !== 'undefined') {
  const existingStyle = document.getElementById('listings-styles');
  if (!existingStyle) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'listings-styles';
    styleSheet.textContent = spinKeyframes + responsiveStyles;
    document.head.appendChild(styleSheet);
  }
}

export default Listings;
