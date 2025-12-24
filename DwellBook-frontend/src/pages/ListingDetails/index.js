import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { FaStar, FaMapMarkerAlt, FaShare, FaUser } from 'react-icons/fa';
import api from '../../services/api';
import * as S from './styles';

const ListingDetails = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(Date.now() + 86400000), // +1 day
      key: 'selection'
    }
  ]);
  const [guests, setGuests] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        
        // Try backend API first
        try {
          const response = await api.get(`/listings/${id}`);
          if (response.data) {
            setListing(response.data);
            setLoading(false);
            return;
          }
        } catch (apiError) {
          console.log('API not available, checking local storage');
        }
        
        // Fallback to local storage and mock data
        const userCreatedListings = JSON.parse(localStorage.getItem("allListings") || "[]");
        const hostListings = JSON.parse(localStorage.getItem("hostListings") || "[]");
        
        // Mock data for demonstration
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
            hostDetails: { name: 'Rahul Sharma', responseRate: 95, superhost: true },
            amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'Parking', 'Pool', 'Gym'],
            reviews: [
              { rating: 5, comment: 'Amazing location and host!', user: { name: 'John Doe' }, date: '2024-01-15' },
              { rating: 4, comment: 'Great place, very clean', user: { name: 'Jane Smith' }, date: '2024-01-10' }
            ]
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
              'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
            ],
            hostDetails: { name: 'Priya Singh', responseRate: 92, superhost: false },
            amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'Parking'],
            reviews: [
              { rating: 4, comment: 'Perfect location for shopping', user: { name: 'Mike Johnson' }, date: '2024-01-12' }
            ]
          }
        ];
        
        // Combine all listings
        const allListings = [...mockListings, ...userCreatedListings, ...hostListings];
        
        const foundListing = allListings.find(l => l._id === id || l.id === id);
        if (foundListing) {
          setListing(foundListing);
        } else {
          setError('Listing not found');
        }
      } catch (err) {
        setError('Error fetching listing');
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setSubmittingReview(true);
    
    try {
      // Mock review submission
      const reviewData = {
        ...newReview,
        user: 'Current User',
        date: new Date().toISOString().split('T')[0]
      };
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the listing with new review
      setListing(prev => {
        const updatedReviews = [reviewData, ...prev.reviews];
        const newAverageRating = updatedReviews.reduce((sum, review) => sum + review.rating, 0) / updatedReviews.length;
        
        return {
          ...prev,
          reviews: updatedReviews,
          averageRating: Math.round(newAverageRating * 10) / 10
        };
      });
      
      // Reset form
      setNewReview({ rating: 5, comment: '' });
      setShowReviewForm(false);
    } catch (error) {
      setError('Error submitting review');
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleBooking = async () => {
    // Show confirmation popup first
    setShowBookingConfirmation(true);
  };

  const confirmBooking = async () => {
    setBookingLoading(true);
    setBookingError('');
    setBookingSuccess(false);
    setShowBookingConfirmation(false);
    
    try {
      // Get current user info
      const currentUser = JSON.parse(localStorage.getItem("mockUser") || "{}");
      
      // Create booking request data
      const bookingData = {
        _id: Date.now().toString(),
        listingId: id,
        listingTitle: title,
        listingLocation: location,
        checkIn: dateRange[0].startDate.toISOString(),
        checkOut: dateRange[0].endDate.toISOString(),
        guests: guests,
        nights: Math.ceil((dateRange[0].endDate - dateRange[0].startDate) / (1000 * 60 * 60 * 24)) || 1,
        totalPrice: price * (Math.ceil((dateRange[0].endDate - dateRange[0].startDate) / (1000 * 60 * 60 * 24)) || 1),
        user: {
          name: currentUser.name || "Guest User",
          email: currentUser.email || "guest@example.com"
        },
        status: 'pending', // Changed from 'confirmed' to 'pending'
        createdAt: new Date().toISOString(),
        type: 'booking_request' // Add type to distinguish requests
      };
      
      // Save booking request to localStorage
      const allBookings = JSON.parse(localStorage.getItem("allBookings") || "[]");
      allBookings.push(bookingData);
      localStorage.setItem("allBookings", JSON.stringify(allBookings));
      
      // Also save to booking requests for host dashboard
      const bookingRequests = JSON.parse(localStorage.getItem("bookingRequests") || "[]");
      bookingRequests.push(bookingData);
      localStorage.setItem("bookingRequests", JSON.stringify(bookingRequests));
      
      // Create notification for host
      const notifications = JSON.parse(localStorage.getItem("hostNotifications") || "[]");
      notifications.push({
        _id: Date.now().toString(),
        type: 'booking_request',
        message: `New booking request for ${title} from ${currentUser.name || 'Guest'}`,
        bookingId: bookingData._id,
        read: false,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem("hostNotifications", JSON.stringify(notifications));
      
      console.log('Booking request created:', bookingData);
      setBookingSuccess(true);
      setTimeout(() => setBookingSuccess(false), 5000);
    } catch (error) {
      setBookingError('Booking request failed. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <S.Loading>Loading...</S.Loading>;
  if (error) return <S.Error>Error: {error}</S.Error>;
  if (!listing) return <S.NotFound>Listing not found</S.NotFound>;

  const { title, description, price, location, images = [], averageRating, reviews = [] } = listing;
  const nights = Math.ceil((dateRange[0].endDate - dateRange[0].startDate) / (1000 * 60 * 60 * 24)) || 1;
  const total = price * nights;

  // Handle images with proper fallbacks for host-created properties
  const validImages = images.filter(img => {
    // Check if it's a blob URL that might be invalid
    if (img.startsWith('blob:')) {
      return true; // We'll let the img tag handle the error
    }
    return img && (img.startsWith('http') || img.startsWith('data:'));
  });
  
  const displayImages = [];
  const fallbackImage = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
  
  // Ensure we have at least 5 images (duplicate or use fallbacks)
  const baseImages = validImages.length > 0 ? validImages : [fallbackImage];
  for (let i = 0; i < 5; i++) {
    displayImages.push(baseImages[i % baseImages.length] || fallbackImage);
  }

  return (
    <S.Container>
      {/* Image Gallery */}
      <S.Gallery>
        <S.MainImage 
          src={displayImages[currentImage]} 
          alt={title}
          onClick={() => setShowDatePicker(false)}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
          }}
        />
        <S.Thumbnails>
          {displayImages.slice(1, 5).map((img, i) => (
            <S.Thumbnail 
              key={i} 
              src={img} 
              alt={`${title} ${i + 1}`}
              onClick={() => setCurrentImage(i + 1)}
              className={currentImage === i + 1 ? 'active' : ''}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
              }}
            />
          ))}
        </S.Thumbnails>
      </S.Gallery>

      <S.Content>
        {/* Main Content */}
        <S.MainContent>
          <S.Title>{title}</S.Title>
          
          <S.Meta>
            <S.Rating>
              <FaStar /> {averageRating ? averageRating.toFixed(1) : 'New'}
              {reviews.length > 0 && ` · ${reviews.length} reviews`}
            </S.Rating>
            <S.Location>
              <FaMapMarkerAlt /> {location}
            </S.Location>
          </S.Meta>

          <S.Description>{description || 'No description provided.'}</S.Description>

          {/* Reviews Section */}
          <S.Section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2>Reviews</h2>
              <S.AddReviewButton onClick={() => setShowReviewForm(!showReviewForm)}>
                {showReviewForm ? 'Cancel' : 'Add Review'}
              </S.AddReviewButton>
            </div>

            {/* Review Form */}
            {showReviewForm && (
              <S.ReviewForm onSubmit={handleSubmitReview}>
                <S.FormGroup>
                  <label>Rating</label>
                  <S.RatingSelect
                    value={newReview.rating}
                    onChange={(e) => setNewReview(prev => ({ ...prev, rating: Number(e.target.value) }))}
                  >
                    {[1, 2, 3, 4, 5].map(star => (
                      <option key={star} value={star}>
                        {star} {star === 1 ? 'star' : 'stars'}
                      </option>
                    ))}
                  </S.RatingSelect>
                </S.FormGroup>
                <S.FormGroup>
                  <label>Review</label>
                  <S.ReviewTextarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                    placeholder="Share your experience..."
                    required
                    rows="4"
                  />
                </S.FormGroup>
                <S.SubmitButton type="submit" disabled={submittingReview}>
                  {submittingReview ? 'Submitting...' : 'Submit Review'}
                </S.SubmitButton>
              </S.ReviewForm>
            )}

            {reviews.length > 0 ? (
              reviews.map((review) => (
                <S.Review key={review._id}>
                  <S.ReviewHeader>
                    <S.UserIcon><FaUser /></S.UserIcon>
                    <div>
                      <S.Reviewer>{review.user?.name || 'Anonymous'}</S.Reviewer>
                      <S.ReviewMeta>
                        <FaStar /> {review.rating} · {new Date(review.createdAt).toLocaleDateString()}
                      </S.ReviewMeta>
                    </div>
                  </S.ReviewHeader>
                  <S.ReviewText>{review.comment}</S.ReviewText>
                </S.Review>
              ))
            ) : (
              <p>No reviews yet. Be the first to review!</p>
            )}
          </S.Section>
        </S.MainContent>

        {/* Booking Sidebar */}
        <S.BookingSidebar>
          <S.BookingCard>
            <S.Price>₹{price} <span>night</span></S.Price>
            
            <S.DatesContainer>
              <S.DateField onClick={() => setShowDatePicker(!showDatePicker)}>
                <div>
                  <small>CHECK-IN</small>
                  <div>{format(dateRange[0].startDate, 'MM/dd/yyyy')}</div>
                </div>
                <div>
                  <small>CHECKOUT</small>
                  <div>{format(dateRange[0].endDate, 'MM/dd/yyyy')}</div>
                </div>
              </S.DateField>

              {showDatePicker && (
                <S.DatePickerContainer>
                  <DateRange
                    editableDateInputs={true}
                    onChange={item => setDateRange([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dateRange}
                    minDate={new Date()}
                  />
                </S.DatePickerContainer>
              )}
            </S.DatesContainer>

            <S.GuestsSelect 
              value={guests} 
              onChange={(e) => setGuests(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'guest' : 'guests'}
                </option>
              ))}
            </S.GuestsSelect>

            <S.BookButton onClick={handleBooking} disabled={bookingLoading}>
              {bookingLoading ? 'Booking...' : 'Reserve'}
            </S.BookButton>

            {bookingError && <S.BookingError>{bookingError}</S.BookingError>}
            {bookingSuccess && <S.BookingSuccess>Booking request sent! Wait for host confirmation.</S.BookingSuccess>}

            {/* Booking Confirmation Popup */}
            {showBookingConfirmation && (
              <S.ConfirmationOverlay>
                <S.ConfirmationModal>
                  <S.ConfirmationHeader>
                    <h3>Confirm Booking Request</h3>
                    <S.CloseButton onClick={() => setShowBookingConfirmation(false)}>
                      ×
                    </S.CloseButton>
                  </S.ConfirmationHeader>
                  <S.ConfirmationBody>
                    <p>Are you sure you want to send a booking request for:</p>
                    <S.BookingSummary>
                      <div><strong>{title}</strong></div>
                      <div>{location}</div>
                      <div>Check-in: {format(dateRange[0].startDate, 'MMM dd, yyyy')}</div>
                      <div>Check-out: {format(dateRange[0].endDate, 'MMM dd, yyyy')}</div>
                      <div>{guests} {guests === 1 ? 'guest' : 'guests'}</div>
                      <div><strong>Total: ₹{total}</strong></div>
                    </S.BookingSummary>
                    <p>The host will need to approve your request.</p>
                  </S.ConfirmationBody>
                  <S.ConfirmationFooter>
                    <S.CancelButton onClick={() => setShowBookingConfirmation(false)}>
                      Cancel
                    </S.CancelButton>
                    <S.ConfirmButton onClick={confirmBooking} disabled={bookingLoading}>
                      {bookingLoading ? 'Sending...' : 'Send Request'}
                    </S.ConfirmButton>
                  </S.ConfirmationFooter>
                </S.ConfirmationModal>
              </S.ConfirmationOverlay>
            )}

            <S.PriceBreakdown>
              <S.PriceRow>
                <span>₹{price} x {nights} {nights === 1 ? 'night' : 'nights'}</span>
                <span>₹{price * nights}</span>
              </S.PriceRow>
              <S.TotalPrice>
                <span>Total</span>
                <span>₹{total}</span>
              </S.TotalPrice>
            </S.PriceBreakdown>
          </S.BookingCard>

          <S.ShareButton>
            <FaShare /> Share
          </S.ShareButton>
        </S.BookingSidebar>
      </S.Content>
    </S.Container>
  );
};

export default ListingDetails;
