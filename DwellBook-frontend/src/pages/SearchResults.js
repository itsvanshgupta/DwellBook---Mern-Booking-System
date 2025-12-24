import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import ListingCard from '../components/ListingCard';
import SearchBar from '../components/SearchBar';

// Mock Indian properties data
const mockListings = [
  {
    _id: '1',
    title: 'Mumbai Marine Drive Apartment',
    description: 'Modern apartment overlooking Marine Drive with stunning sea views. Perfect for business travelers with proximity to financial district and luxury amenities.',
    price: 120,
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
    price: 85,
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
    price: 95,
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
    price: 110,
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
    price: 180,
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
    price: 120,
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
  },
  {
    _id: '7',
    title: 'Pune Koregaon Park Villa',
    description: 'Luxurious villa in Pune\'s upscale Koregaon Park area with private pool and garden.',
    price: 200,
    location: 'Pune, India',
    propertyType: 'Villa',
    guests: 8,
    bedrooms: 4,
    beds: 5,
    bathrooms: 4,
    averageRating: 4.9,
    totalReviews: 156,
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ],
    hostDetails: { name: 'Sneha Patil', responseRate: 98, superhost: true }
  },
  {
    _id: '8',
    title: 'Jaipur Heritage Haveli',
    description: 'Traditional Rajasthani haveli in Jaipur\'s Pink City area with authentic architecture and modern amenities.',
    price: 150,
    location: 'Jaipur, India',
    propertyType: 'Heritage Home',
    guests: 6,
    bedrooms: 3,
    beds: 4,
    bathrooms: 3,
    averageRating: 4.7,
    totalReviews: 189,
    images: [
      'https://images.unsplash.com/photo-1596436886636-1c3a542872d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1476231682828-37aaddaa0faf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ],
    hostDetails: { name: 'Vikram Singh', responseRate: 94, superhost: false }
  }
];

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchQuery = searchParams.get('q') || '';

  useEffect(() => {
    if (searchQuery) {
      searchListings(searchQuery);
    }
  }, [searchQuery]);

  const searchListings = async (query) => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to use backend API first
      try {
        const response = await fetch(`http://localhost:5000/api/listings?location=${encodeURIComponent(query)}`);
        if (response.ok) {
          const data = await response.json();
          setListings(data.listings || []);
          setLoading(false);
          return;
        }
      } catch (apiError) {
        console.log('API not available, using local data');
      }
      
      // Fallback to local storage and mock data
      const userCreatedListings = JSON.parse(localStorage.getItem("allListings") || "[]");
      const hostListings = JSON.parse(localStorage.getItem("hostListings") || "[]");
      
      // Combine all listings
      const allListings = [...mockListings, ...userCreatedListings, ...hostListings];
      
      setTimeout(() => {
        const filteredListings = allListings.filter(listing => 
          listing.location.toLowerCase().includes(query.toLowerCase()) ||
          listing.title.toLowerCase().includes(query.toLowerCase()) ||
          listing.description.toLowerCase().includes(query.toLowerCase()) ||
          (listing.hostDetails && listing.hostDetails.name.toLowerCase().includes(query.toLowerCase()))
        );
        setListings(filteredListings);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    window.history.pushState({}, '', `/search?q=${encodeURIComponent(query)}`);
    searchListings(query);
  };

  const handleBook = (listing) => {
    // Navigate to property detail page for booking
    const listingId = listing._id || listing.id;
    if (listingId) {
      window.history.pushState({}, '', `/listings/${listingId}`);
      window.location.href = `/listings/${listingId}`;
    }
  };

  return (
    <Container>
      <Header>
        <Title>Search Results</Title>
        <SearchBarContainer>
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Search destinations worldwide..."
          />
        </SearchBarContainer>
      </Header>

      {loading && (
        <LoadingContainer>
          <LoadingSpinner />
          <LoadingText>Searching for properties...</LoadingText>
        </LoadingContainer>
      )}

      {error && (
        <ErrorContainer>
          <ErrorMessage>Error: {error}</ErrorMessage>
        </ErrorContainer>
      )}

      {!loading && !error && (
        <ResultsContainer>
          <ResultsHeader>
            {searchQuery && (
              <SearchInfo>
                {listings.length > 0 
                  ? `${listings.length} properties found for "${searchQuery}"`
                  : `No properties found for "${searchQuery}"`
                }
              </SearchInfo>
            )}
          </ResultsHeader>

          {listings.length > 0 ? (
            <ListingsGrid>
              {listings.map((listing) => (
                <ListingCard 
                  key={listing._id} 
                  listing={listing}
                  isGuest={true}
                />
              ))}
            </ListingsGrid>
          ) : (
            !loading && searchQuery && (
              <NoResultsContainer>
                <NoResultsIcon>
                  <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                </NoResultsIcon>
                <NoResultsTitle>No properties found</NoResultsTitle>
                <NoResultsText>
                  Try adjusting your search or browse our popular destinations
                </NoResultsText>
                <PopularDestinations>
                  <PopularTitle>Popular Destinations</PopularTitle>
                  <PopularGrid>
                    {['New York', 'Paris', 'Tokyo', 'London', 'Dubai', 'Singapore'].map((city) => (
                      <PopularCity 
                        key={city}
                        onClick={() => handleSearch(city)}
                      >
                        {city}
                      </PopularCity>
                    ))}
                  </PopularGrid>
                </PopularDestinations>
              </NoResultsContainer>
            )
          )}
        </ResultsContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background-color: #f7f7f7;
  padding: 20px 0;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
  padding: 0 24px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #222;
  margin-bottom: 24px;
  font-family: 'Circular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const SearchBarContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #222;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.div`
  font-size: 16px;
  color: #717171;
  font-family: 'Circular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px 20px;
`;

const ErrorMessage = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #ff385c;
  color: #222;
  font-family: 'Circular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const ResultsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

const ResultsHeader = styled.div`
  margin-bottom: 32px;
`;

const SearchInfo = styled.div`
  font-size: 18px;
  color: #222;
  font-weight: 500;
  font-family: 'Circular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const ListingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
  }
`;

const NoResultsContainer = styled.div`
  text-align: center;
  padding: 80px 20px;
`;

const NoResultsIcon = styled.div`
  color: #717171;
  margin-bottom: 24px;
`;

const NoResultsTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #222;
  margin-bottom: 8px;
  font-family: 'Circular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const NoResultsText = styled.p`
  font-size: 16px;
  color: #717171;
  margin-bottom: 40px;
  font-family: 'Circular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const PopularDestinations = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const PopularTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #222;
  margin-bottom: 16px;
  font-family: 'Circular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const PopularGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
`;

const PopularCity = styled.button`
  padding: 12px 16px;
  border: 1px solid #dddddd;
  border-radius: 20px;
  background: white;
  color: #222;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Circular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  &:hover {
    border-color: #222;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

export default SearchResults;
