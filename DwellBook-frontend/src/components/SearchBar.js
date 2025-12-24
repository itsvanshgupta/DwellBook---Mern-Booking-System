import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ onSearch, placeholder = "Search worldwide destinations..." }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Popular worldwide cities with real data
  const popularCities = [
    { name: "New York", country: "United States", lat: 40.7128, lon: -74.0060 },
    { name: "London", country: "United Kingdom", lat: 51.5074, lon: -0.1278 },
    { name: "Paris", country: "France", lat: 48.8566, lon: 2.3522 },
    { name: "Tokyo", country: "Japan", lat: 35.6762, lon: 139.6503 },
    { name: "Sydney", country: "Australia", lat: -33.8688, lon: 151.2093 },
    { name: "Dubai", country: "United Arab Emirates", lat: 25.2048, lon: 55.2708 },
    { name: "Singapore", country: "Singapore", lat: 1.3521, lon: 103.8198 },
    { name: "Barcelona", country: "Spain", lat: 41.3851, lon: 2.1734 },
    { name: "Rome", country: "Italy", lat: 41.9028, lon: 12.4964 },
    { name: "Amsterdam", country: "Netherlands", lat: 52.3676, lon: 4.9041 },
    { name: "Bangkok", country: "Thailand", lat: 13.7563, lon: 100.5018 },
    { name: "Mumbai", country: "India", lat: 19.0760, lon: 72.8777 },
    { name: "Los Angeles", country: "United States", lat: 34.0522, lon: -118.2437 },
    { name: "Miami", country: "United States", lat: 25.7617, lon: -80.1918 },
    { name: "Chicago", country: "United States", lat: 41.8781, lon: -87.6298 },
    { name: "San Francisco", country: "United States", lat: 37.7749, lon: -122.4194 },
    { name: "Boston", country: "United States", lat: 42.3601, lon: -71.0589 },
    { name: "Seattle", country: "United States", lat: 47.6062, lon: -122.3321 },
    { name: "Las Vegas", country: "United States", lat: 36.1699, lon: -115.1398 },
    { name: "Toronto", country: "Canada", lat: 43.6532, lon: -79.3832 },
    { name: "Vancouver", country: "Canada", lat: 49.2827, lon: -123.1207 },
    { name: "Mexico City", country: "Mexico", lat: 19.4326, lon: -99.1332 },
    { name: "Buenos Aires", country: "Argentina", lat: -34.6118, lon: -58.3960 },
    { name: "São Paulo", country: "Brazil", lat: -23.5505, lon: -46.6333 },
    { name: "Rio de Janeiro", country: "Brazil", lat: -22.9068, lon: -43.1729 },
    { name: "Cape Town", country: "South Africa", lat: -33.9249, lon: 18.4241 },
    { name: "Cairo", country: "Egypt", lat: 30.0444, lon: 31.2357 },
    { name: "Istanbul", country: "Turkey", lat: 41.0082, lon: 28.9784 },
    { name: "Moscow", country: "Russia", lat: 55.7558, lon: 37.6173 },
    { name: "Berlin", country: "Germany", lat: 52.5200, lon: 13.4050 },
    { name: "Madrid", country: "Spain", lat: 40.4168, lon: -3.7038 },
    { name: "Vienna", country: "Austria", lat: 48.2082, lon: 16.3738 },
    { name: "Prague", country: "Czech Republic", lat: 50.0755, lon: 14.4378 },
    { name: "Budapest", country: "Hungary", lat: 47.4979, lon: 19.0402 },
    { name: "Warsaw", country: "Poland", lat: 52.2297, lon: 21.0122 },
    { name: "Athens", country: "Greece", lat: 37.9838, lon: 23.7275 },
    { name: "Lisbon", country: "Portugal", lat: 38.7223, lon: -9.1393 },
    { name: "Stockholm", country: "Sweden", lat: 59.3293, lon: 18.0686 },
    { name: "Oslo", country: "Norway", lat: 59.9139, lon: 10.7522 },
    { name: "Copenhagen", country: "Denmark", lat: 55.6761, lon: 12.5683 },
    { name: "Helsinki", country: "Finland", lat: 60.1699, lon: 24.9384 },
    { name: "Tel Aviv", country: "Israel", lat: 32.0853, lon: 34.7818 },
    { name: "Jerusalem", country: "Israel", lat: 31.7683, lon: 35.2137 },
    { name: "Manila", country: "Philippines", lat: 14.5995, lon: 120.9842 },
    { name: "Jakarta", country: "Indonesia", lat: -6.2088, lon: 106.8456 },
    { name: "Kuala Lumpur", country: "Malaysia", lat: 3.1390, lon: 101.6869 },
    { name: "Seoul", country: "South Korea", lat: 37.5665, lon: 126.9780 },
    { name: "Hong Kong", country: "Hong Kong", lat: 22.3193, lon: 114.1694 },
    { name: "Shanghai", country: "China", lat: 31.2304, lon: 121.4737 },
    { name: "Beijing", country: "China", lat: 39.9042, lon: 116.4074 },
    { name: "Delhi", country: "India", lat: 28.6139, lon: 77.2090 },
    { name: "Kolkata", country: "India", lat: 22.5726, lon: 88.3639 },
    { name: "Melbourne", country: "Australia", lat: -37.8136, lon: 144.9631 },
    { name: "Auckland", country: "New Zealand", lat: -36.8485, lon: 174.7633 }
  ];

  // Filter cities based on query
  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
    const timer = setTimeout(() => {
      const filtered = popularCities.filter(city => 
        city.name.toLowerCase().includes(query.toLowerCase()) ||
        city.country.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8);
      
      setSuggestions(filtered);
      setShowSuggestions(true);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchQuery = query) => {
    if (searchQuery.trim()) {
      onSearch?.(searchQuery);
      setShowSuggestions(false);
      // Navigate to search results page
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSuggestionClick = (city) => {
    setQuery(`${city.name}, ${city.country}`);
    handleSearch(`${city.name}, ${city.country}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <SearchContainer ref={searchRef}>
      <SearchForm onSubmit={handleSubmit}>
        <SearchIcon>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </SearchIcon>
        <SearchInput
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setShowSuggestions(true)}
          placeholder={placeholder}
          autoComplete="off"
        />
        {query && (
          <ClearButton
            type="button"
            onClick={() => {
              setQuery('');
              setSuggestions([]);
              setShowSuggestions(false);
            }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </ClearButton>
        )}
      </SearchForm>

      {showSuggestions && (
        <SuggestionsContainer>
          {isLoading ? (
            <LoadingItem>
              <LoadingSpinner />
              Searching cities...
            </LoadingItem>
          ) : suggestions.length > 0 ? (
            suggestions.map((city, index) => (
              <SuggestionItem
                key={index}
                onClick={() => handleSuggestionClick(city)}
              >
                <CityInfo>
                  <CityName>{city.name}</CityName>
                  <CountryName>{city.country}</CountryName>
                </CityInfo>
                <LocationIcon>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </LocationIcon>
              </SuggestionItem>
            ))
          ) : (
            <NoResults>
              No cities found. Try a different search term.
            </NoResults>
          )}
        </SuggestionsContainer>
      )}
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const SearchForm = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid #dddddd;
  border-radius: 40px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  
  &:focus-within {
    border-color: #222;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.1);
  }
`;

const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  color: #717171;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 14px 0;
  border: none;
  outline: none;
  font-size: 16px;
  font-family: 'Circular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: transparent;
  
  &::placeholder {
    color: #717171;
  }
`;

const ClearButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  border: none;
  background: none;
  color: #717171;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f7f7f7;
    color: #222;
  }
`;

const SuggestionsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #dddddd;
  border-top: none;
  border-radius: 0 0 24px 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-height: 320px;
  overflow-y: auto;
  z-index: 1000;
  margin-top: -8px;
`;

const SuggestionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid #f7f7f7;
  
  &:hover {
    background: #f7f7f7;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const CityInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const CityName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #222;
  font-family: 'Circular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const CountryName = styled.div`
  font-size: 12px;
  color: #717171;
  margin-top: 2px;
  font-family: 'Circular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const LocationIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #717171;
`;

const LoadingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: #717171;
  font-size: 14px;
  gap: 8px;
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #222;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const NoResults = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: #717171;
  font-size: 14px;
  font-style: italic;
`;

export default SearchBar;
