import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Listings from "./pages/Listings";
import CreateListing from "./pages/CreateListing";
import ListingDetails from "./pages/ListingDetails";
import Dashboard from "./pages/Dashboard";
import HostDashboard from "./pages/HostDashboard";
import SearchResults from "./pages/SearchResults";

// Protected Route component (must be inside AuthProvider)
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();

  // Simple check - if loading, show loading
  if (loading) {
    return <div style={{ padding: "20px", textAlign: "center" }}>Loading...</div>;
  }

  // Direct localStorage check - this is the most reliable
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("mockUser");
  
  if (token && storedUser) {
    try {
      const userData = JSON.parse(storedUser);
      console.log('ProtectedRoute: Found valid auth data for', userData.email);
      return children;
    } catch (e) {
      console.error('ProtectedRoute: Error parsing user data', e);
    }
  }

  // Fallback to context auth
  if (isAuthenticated && user) {
    console.log('ProtectedRoute: Using context auth for', user.email);
    return children;
  }

  console.log('ProtectedRoute: No auth found, redirecting to login');
  return <Navigate to="/login" replace />;
};

// Host-only Route component
const HostRoute = ({ children }) => {
  const { isAuthenticated, isHost, loading } = useAuth();

  if (loading) {
    return <div style={{ padding: "20px", textAlign: "center" }}>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isHost) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Access Denied</h2>
        <p>Only hosts can access this page.</p>
      </div>
    );
  }

  return children;
};

// Guest-only Route component (regular users, not hosts)
const GuestRoute = ({ children }) => {
  const { isAuthenticated, isGuest, loading } = useAuth();

  if (loading) {
    return <div style={{ padding: "20px", textAlign: "center" }}>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isGuest) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Access Denied</h2>
        <p>This page is only accessible to guests.</p>
      </div>
    );
  }

  return children;
};

// Public Route component (redirects to home if already authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div style={{ padding: "20px", textAlign: "center" }}>Loading...</div>;
  }

  return !isAuthenticated ? children : <Navigate to="/" replace />;
};

// App Routes component (needs to be inside AuthProvider)
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/" element={<ProtectedRoute><Listings /></ProtectedRoute>} />
        <Route path="/listings/:id" element={<ProtectedRoute><ListingDetails /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/host-dashboard" element={<HostRoute><HostDashboard /></HostRoute>} />
        <Route path="/guest" element={<GuestRoute><Listings /></GuestRoute>} />
        <Route path="/create-listing" element={<HostRoute><CreateListing /></HostRoute>} />
        <Route path="/search" element={<ProtectedRoute><SearchResults /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
