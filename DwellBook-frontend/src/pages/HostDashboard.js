import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import * as S from './HostDashboard/styles';

const HostDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('listings');
  const [listings, setListings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [bookingRequests, setBookingRequests] = useState([]);
  const [earnings, setEarnings] = useState({ total: 0, monthly: 0, bookings: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newListing, setNewListing] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    images: []
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Get data from localStorage
      const hostListings = JSON.parse(localStorage.getItem("hostListings") || "[]");
      const allBookings = JSON.parse(localStorage.getItem("allBookings") || "[]");
      const bookingRequests = JSON.parse(localStorage.getItem("bookingRequests") || "[]");
      
      // Filter listings by current host
      const myListings = hostListings.filter(listing => 
        listing.owner === user?.id || listing.ownerName === user?.name
      );
      
      // Filter bookings for current host's listings
      const myBookings = allBookings.filter(booking => 
        myListings.some(listing => listing._id === booking.listingId)
      );
      
      // Filter booking requests for current host's listings
      const myBookingRequests = bookingRequests.filter(request => 
        myListings.some(listing => listing._id === request.listingId)
      );
      
      setListings(myListings);
      setBookings(myBookings);
      setBookingRequests(myBookingRequests);
      
      // Calculate earnings (only from confirmed bookings)
      const confirmedBookings = myBookings.filter(booking => booking.status === 'confirmed');
      const totalEarnings = confirmedBookings.reduce((sum, booking) => sum + (booking.totalPrice || 0), 0);
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const monthlyEarnings = confirmedBookings.filter(booking => {
        const bookingDate = new Date(booking.createdAt);
        return bookingDate.getMonth() === currentMonth && bookingDate.getFullYear() === currentYear;
      }).reduce((sum, booking) => sum + (booking.totalPrice || 0), 0);

      setEarnings({
        total: totalEarnings,
        monthly: monthlyEarnings,
        bookings: confirmedBookings.length
      });
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      // Update booking request status
      const allRequests = JSON.parse(localStorage.getItem("bookingRequests") || "[]");
      const updatedRequests = allRequests.map(req => 
        req._id === requestId ? { ...req, status: 'confirmed' } : req
      );
      localStorage.setItem("bookingRequests", JSON.stringify(updatedRequests));

      // Update main bookings
      const allBookings = JSON.parse(localStorage.getItem("allBookings") || "[]");
      const updatedBookings = allBookings.map(booking => 
        booking._id === requestId ? { ...booking, status: 'confirmed' } : booking
      );
      localStorage.setItem("allBookings", JSON.stringify(updatedBookings));

      // Create notification for guest
      const request = allRequests.find(req => req._id === requestId);
      const guestNotifications = JSON.parse(localStorage.getItem("guestNotifications") || "[]");
      guestNotifications.push({
        _id: Date.now().toString(),
        type: 'booking_confirmed',
        message: `Your booking request for ${request?.listingTitle} has been confirmed!`,
        bookingId: requestId,
        userEmail: request?.user?.email,
        read: false,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem("guestNotifications", JSON.stringify(guestNotifications));

      // Refresh data
      fetchData();
    } catch (error) {
      setError('Failed to accept request');
    }
  };

  const handleDeclineRequest = async (requestId) => {
    if (!window.confirm('Are you sure you want to decline this booking request?')) {
      return;
    }

    try {
      // Update booking request status
      const allRequests = JSON.parse(localStorage.getItem("bookingRequests") || "[]");
      const updatedRequests = allRequests.map(req => 
        req._id === requestId ? { ...req, status: 'declined' } : req
      );
      localStorage.setItem("bookingRequests", JSON.stringify(updatedRequests));

      // Update main bookings
      const allBookings = JSON.parse(localStorage.getItem("allBookings") || "[]");
      const updatedBookings = allBookings.map(booking => 
        booking._id === requestId ? { ...booking, status: 'declined' } : booking
      );
      localStorage.setItem("allBookings", JSON.stringify(updatedBookings));

      // Create notification for guest
      const request = allRequests.find(req => req._id === requestId);
      const guestNotifications = JSON.parse(localStorage.getItem("guestNotifications") || "[]");
      guestNotifications.push({
        _id: Date.now().toString(),
        type: 'booking_declined',
        message: `Your booking request for ${request?.listingTitle} has been declined.`,
        bookingId: requestId,
        userEmail: request?.user?.email,
        read: false,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem("guestNotifications", JSON.stringify(guestNotifications));

      // Refresh data
      fetchData();
    } catch (error) {
      setError('Failed to decline request');
    }
  };

  const handleCreateListing = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      // Create new listing with host info
      const listingData = {
        _id: Date.now().toString(),
        title: newListing.title,
        description: newListing.description,
        price: Number(newListing.price),
        location: newListing.location,
        owner: user?.id || "host_" + Date.now(),
        ownerName: user?.name || "Host",
        propertyType: "Apartment",
        guests: 2,
        bedrooms: 1,
        beds: 1,
        bathrooms: 1,
        averageRating: 0,
        totalReviews: 0,
        images: newListing.images.length > 0 ? 
          newListing.images.map(file => URL.createObjectURL(file)) :
          ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"],
        amenities: ['WiFi', 'Air Conditioning', 'Kitchen'],
        reviews: [],
        status: 'available',
        createdAt: new Date().toISOString()
      };
      
      // Get existing listings from localStorage
      const existingListings = JSON.parse(localStorage.getItem("hostListings") || "[]");
      existingListings.push(listingData);
      localStorage.setItem("hostListings", JSON.stringify(existingListings));
      
      // Also add to main listings so guests can see it
      const mainListings = JSON.parse(localStorage.getItem("allListings") || "[]");
      mainListings.push(listingData);
      localStorage.setItem("allListings", JSON.stringify(mainListings));
      
      setListings(prev => [listingData, ...prev]);
      setNewListing({ title: '', description: '', price: '', location: '', images: [] });
      setShowCreateForm(false);
    } catch (err) {
      setError('Failed to create listing');
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageUpload = (e) => {
    setNewListing(prev => ({
      ...prev,
      images: Array.from(e.target.files)
    }));
  };

  const handleDeleteListing = async (listingId) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) {
      return;
    }

    try {
      // Remove from host listings
      const hostListings = JSON.parse(localStorage.getItem("hostListings") || "[]");
      const updatedHostListings = hostListings.filter(listing => listing._id !== listingId);
      localStorage.setItem("hostListings", JSON.stringify(updatedHostListings));
      
      // Remove from main listings
      const mainListings = JSON.parse(localStorage.getItem("allListings") || "[]");
      const updatedMainListings = mainListings.filter(listing => listing._id !== listingId);
      localStorage.setItem("allListings", JSON.stringify(updatedMainListings));
      
      setListings(prev => prev.filter(listing => listing._id !== listingId));
    } catch (err) {
      setError('Failed to delete listing');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
  }

  return (
    <S.Container>
      <S.Header>
        <h1>Host Dashboard</h1>
        <p>Welcome back, {user?.name || 'Host'}!</p>
      </S.Header>

      <S.Tabs>
        <S.Tab active={activeTab === 'listings'} onClick={() => setActiveTab('listings')}>
          My Listings
        </S.Tab>
        <S.Tab active={activeTab === 'requests'} onClick={() => setActiveTab('requests')}>
          Booking Requests {bookingRequests.filter(req => req.status === 'pending').length > 0 && (
            <S.Badge>{bookingRequests.filter(req => req.status === 'pending').length}</S.Badge>
          )}
        </S.Tab>
        <S.Tab active={activeTab === 'bookings'} onClick={() => setActiveTab('bookings')}>
          Bookings
        </S.Tab>
        <S.Tab active={activeTab === 'earnings'} onClick={() => setActiveTab('earnings')}>
          Earnings
        </S.Tab>
      </S.Tabs>

      {error && <S.Error>{error}</S.Error>}

      {activeTab === 'listings' && (
        <S.TabContent>
          <S.SectionHeader>
            <h2>My Listings</h2>
            <S.Button onClick={() => setShowCreateForm(!showCreateForm)}>
              {showCreateForm ? 'Cancel' : 'Create New Listing'}
            </S.Button>
          </S.SectionHeader>

          {showCreateForm && (
            <S.CreateForm onSubmit={handleCreateListing}>
              <S.FormGroup>
                <label>Title</label>
                <S.Input
                  type="text"
                  value={newListing.title}
                  onChange={(e) => setNewListing(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </S.FormGroup>
              <S.FormGroup>
                <label>Description</label>
                <S.Textarea
                  value={newListing.description}
                  onChange={(e) => setNewListing(prev => ({ ...prev, description: e.target.value }))}
                  required
                  rows="4"
                />
              </S.FormGroup>
              <S.FormGroup>
                <label>Price per night</label>
                <S.Input
                  type="number"
                  value={newListing.price}
                  onChange={(e) => setNewListing(prev => ({ ...prev, price: e.target.value }))}
                  required
                />
              </S.FormGroup>
              <S.FormGroup>
                <label>Location</label>
                <S.Input
                  type="text"
                  value={newListing.location}
                  onChange={(e) => setNewListing(prev => ({ ...prev, location: e.target.value }))}
                  required
                />
              </S.FormGroup>
              <S.FormGroup>
                <label>Images</label>
                <S.FileInput
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {newListing.images.length > 0 && (
                  <S.ImagePreview>
                    {newListing.images.map((img, i) => (
                      <div key={i}>
                        <img src={URL.createObjectURL(img)} alt={`Preview ${i+1}`} />
                      </div>
                    ))}
                  </S.ImagePreview>
                )}
              </S.FormGroup>
              <S.SubmitButton type="submit" disabled={submitting}>
                {submitting ? 'Creating...' : 'Create Listing'}
              </S.SubmitButton>
            </S.CreateForm>
          )}

          {listings.length === 0 ? (
            <S.EmptyState>
              <p>You haven't created any listings yet.</p>
            </S.EmptyState>
          ) : (
            <S.ListingsGrid>
              {listings.map((listing) => (
                <S.ListingCard key={listing._id}>
                  <S.ListingImage 
                    src={listing.images?.[0] || 'https://via.placeholder.com/300x200'} 
                    alt={listing.title}
                  />
                  <S.ListingInfo>
                    <h3>{listing.title}</h3>
                    <p>{listing.location}</p>
                    <S.Price>₹{listing.price}/night</S.Price>
                    <S.ListingActions>
                      <S.EditButton onClick={() => navigate(`/listings/${listing._id}`)}>
                        View
                      </S.EditButton>
                      <S.DeleteButton onClick={() => handleDeleteListing(listing._id)}>
                        Delete
                      </S.DeleteButton>
                    </S.ListingActions>
                  </S.ListingInfo>
                </S.ListingCard>
              ))}
            </S.ListingsGrid>
          )}
        </S.TabContent>
      )}

      {activeTab === 'requests' && (
        <S.TabContent>
          <h2>Booking Requests</h2>
          {bookingRequests.length === 0 ? (
            <S.EmptyState>
              <p>No booking requests yet.</p>
            </S.EmptyState>
          ) : (
            <S.BookingsList>
              {bookingRequests.map((request) => (
                <S.BookingCard key={request._id}>
                  <S.BookingInfo>
                    <h3>{request.listingTitle || 'Unknown Listing'}</h3>
                    <p><strong>Guest:</strong> {request.user?.name || 'Unknown'}</p>
                    <p><strong>Email:</strong> {request.user?.email || 'N/A'}</p>
                    <p><strong>Dates:</strong> {formatDate(request.checkIn)} - {formatDate(request.checkOut)}</p>
                    <p><strong>Guests:</strong> {request.guests}</p>
                    <p><strong>Total:</strong> ₹{request.totalPrice}</p>
                    <p><strong>Requested:</strong> {formatDate(request.createdAt)}</p>
                  </S.BookingInfo>
                  <S.BookingActions>
                    {request.status === 'pending' && (
                      <>
                        <S.AcceptButton onClick={() => handleAcceptRequest(request._id)}>
                          Accept
                        </S.AcceptButton>
                        <S.DeclineButton onClick={() => handleDeclineRequest(request._id)}>
                          Decline
                        </S.DeclineButton>
                      </>
                    )}
                    {request.status === 'confirmed' && (
                      <S.StatusBadge confirmed>Confirmed</S.StatusBadge>
                    )}
                    {request.status === 'declined' && (
                      <S.StatusBadge declined>Declined</S.StatusBadge>
                    )}
                  </S.BookingActions>
                </S.BookingCard>
              ))}
            </S.BookingsList>
          )}
        </S.TabContent>
      )}

      {activeTab === 'bookings' && (
        <S.TabContent>
          <h2>Bookings on Your Listings</h2>
          {bookings.length === 0 ? (
            <S.EmptyState>
              <p>No bookings yet.</p>
            </S.EmptyState>
          ) : (
            <S.BookingsList>
              {bookings.map((booking) => (
                <S.BookingCard key={booking._id}>
                  <S.BookingInfo>
                    <h3>{booking.listing?.title || 'Unknown Listing'}</h3>
                    <p><strong>Guest:</strong> {booking.user?.name || 'Unknown'}</p>
                    <p><strong>Dates:</strong> {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}</p>
                    <p><strong>Total:</strong> ₹{booking.totalPrice}</p>
                  </S.BookingInfo>
                  <S.BookingStatus>Status: Active</S.BookingStatus>
                </S.BookingCard>
              ))}
            </S.BookingsList>
          )}
        </S.TabContent>
      )}

      {activeTab === 'earnings' && (
        <S.TabContent>
          <h2>Earnings Overview</h2>
          <S.EarningsGrid>
            <S.EarningsCard>
              <h3>Total Earnings</h3>
              <S.Amount>₹{earnings.total}</S.Amount>
            </S.EarningsCard>
            <S.EarningsCard>
              <h3>This Month</h3>
              <S.Amount>₹{earnings.monthly}</S.Amount>
            </S.EarningsCard>
            <S.EarningsCard>
              <h3>Total Bookings</h3>
              <S.Amount>{earnings.bookings}</S.Amount>
            </S.EarningsCard>
          </S.EarningsGrid>
        </S.TabContent>
      )}
    </S.Container>
  );
};

export default HostDashboard;
