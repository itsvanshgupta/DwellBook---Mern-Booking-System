import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import * as S from './Dashboard/styles';

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('bookings');
  const [cancelling, setCancelling] = useState(null);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      
      // Use localStorage directly since we're using mock authentication
      // Don't try API first to avoid 401 errors that cause logout
      console.log('Using localStorage for bookings data');
      
      const allBookings = JSON.parse(localStorage.getItem("allBookings") || "[]");
      const userBookings = allBookings.filter(booking => {
        // Match by user email or name
        const isUserBooking = booking.user?.email === user?.email || 
                             booking.user?.name === user?.name ||
                             booking.guestEmail === user?.email ||
                             booking.guestName === user?.name;
        return isUserBooking;
      });
      
      console.log('User bookings found:', userBookings.length);
      if (userBookings.length > 0) {
        console.log('First booking data structure:', JSON.stringify(userBookings[0], null, 2));
      }
      
      setBookings(userBookings);
      
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      setCancelling(bookingId);
      await api.delete(`/bookings/${bookingId}`);
      
      // Remove cancelled booking from state
      setBookings(prev => prev.filter(booking => booking._id !== bookingId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to cancel booking');
    } finally {
      setCancelling(null);
    }
  };

  const getBookingStatus = (checkIn, checkOut, bookingStatus) => {
    const now = new Date();
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // First check if booking has explicit status from host
    if (bookingStatus === 'confirmed') {
      return { status: 'Confirmed', color: '#10b981' };
    } else if (bookingStatus === 'declined') {
      return { status: 'Declined', color: '#ef4444' };
    } else if (bookingStatus === 'pending') {
      return { status: 'Pending', color: '#f59e0b' };
    }

    // Fallback to date-based status
    if (now < checkInDate) {
      return { status: 'Upcoming', color: '#3b82f6' };
    } else if (now >= checkInDate && now < checkOutDate) {
      return { status: 'Active', color: '#10b981' };
    } else {
      return { status: 'Completed', color: '#6b7280' };
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (authLoading || loading) {
    return <S.Loading>Loading...</S.Loading>;
  }

  return (
    <S.Container>
      <S.Header>
        <h1>My Dashboard</h1>
        <p>Welcome back, {user?.name || 'User'}!</p>
      </S.Header>

      <S.Tabs>
        <S.Tab 
          active={activeTab === 'bookings'} 
          onClick={() => setActiveTab('bookings')}
        >
          My Bookings
        </S.Tab>
        <S.Tab 
          active={activeTab === 'profile'} 
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </S.Tab>
      </S.Tabs>

      {error && <S.Error>{error}</S.Error>}

      {activeTab === 'bookings' && (
        <S.TabContent>
          <h2>My Bookings</h2>
          {bookings.length === 0 ? (
            <S.EmptyState>
              <p>You haven't made any bookings yet.</p>
              <S.Button onClick={() => window.location.href = '/'}>
                Browse Listings
              </S.Button>
            </S.EmptyState>
          ) : (
            <S.BookingsList>
              {bookings.map((booking) => {
                const { status, color } = getBookingStatus(booking.checkIn, booking.checkOut, booking.status);
                return (
                  <S.BookingCard key={booking._id}>
                    <S.BookingImage 
                      src={booking.listingImages?.[0] || booking.listing?.images?.[0] || 'https://via.placeholder.com/200x150'} 
                      alt={booking.listingTitle || booking.listing?.title || 'Property'}
                    />
                    <S.BookingDetails>
                      <S.BookingTitle>{booking.listingTitle || booking.listing?.title || 'Property'}</S.BookingTitle>
                      <S.BookingLocation>{booking.listingLocation || booking.listing?.location || 'Unknown Location'}</S.BookingLocation>
                      
                      <S.BookingDates>
                        <span>{formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}</span>
                        <S.StatusBadge color={color}>{status}</S.StatusBadge>
                      </S.BookingDates>
                      
                      <S.BookingPrice>${booking.totalPrice}</S.BookingPrice>
                    </S.BookingDetails>
                    
                    <S.BookingActions>
                      {status === 'Upcoming' && (
                        <S.CancelButton 
                          onClick={() => handleCancelBooking(booking._id)}
                          disabled={cancelling === booking._id}
                        >
                          {cancelling === booking._id ? 'Cancelling...' : 'Cancel Booking'}
                        </S.CancelButton>
                      )}
                    </S.BookingActions>
                  </S.BookingCard>
                );
              })}
            </S.BookingsList>
          )}
        </S.TabContent>
      )}

      {activeTab === 'profile' && (
        <S.TabContent>
          <h2>Profile Information</h2>
          <S.ProfileCard>
            <S.ProfileInfo>
              <S.InfoRow>
                <S.Label>Name:</S.Label>
                <S.Value>{user?.name || 'Not provided'}</S.Value>
              </S.InfoRow>
              <S.InfoRow>
                <S.Label>Email:</S.Label>
                <S.Value>{user?.email || 'Not provided'}</S.Value>
              </S.InfoRow>
              <S.InfoRow>
                <S.Label>Role:</S.Label>
                <S.Value>{user?.isHost ? 'Host' : 'Guest'}</S.Value>
              </S.InfoRow>
              <S.InfoRow>
                <S.Label>Member Since:</S.Label>
                <S.Value>{user?.createdAt ? formatDate(user.createdAt) : 'Unknown'}</S.Value>
              </S.InfoRow>
            </S.ProfileInfo>
          </S.ProfileCard>
        </S.TabContent>
      )}
    </S.Container>
  );
};

export default Dashboard;
