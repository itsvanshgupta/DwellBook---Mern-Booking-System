import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

const ListingCard = ({ listing = {}, isGuest, isHost, user, onBook }) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  const listingId = listing?._id || listing?.id;
  const titleText = listing?.title || "Listing";
  const locationText = listing?.location || "Location not specified";
  const priceText = listing?.price !== undefined && listing?.price !== null ? `₹${listing.price}` : "Price on request";

  const images = listing.images?.length ? listing.images : ["https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"];
  
  // Filter out invalid blob URLs and ensure we have valid images
  const validImages = images.filter(img => {
    // Check if it's a blob URL that might be invalid
    if (img.startsWith('blob:')) {
      return true; // We'll let the img tag handle the error
    }
    return img && (img.startsWith('http') || img.startsWith('data:'));
  });
  
  const displayImages = validImages.length > 0 ? validImages : ["https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"];
  const hasMultipleImages = displayImages.length > 1;
  
  // Auto-rotate images when hovered
  useEffect(() => {
    let interval;
    if (isHovered && hasMultipleImages) {
      interval = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % displayImages.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isHovered, hasMultipleImages, displayImages.length]);

  const handlePrevImage = (e) => {
    e?.stopPropagation();
    setCurrentImageIndex(prev => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };
  
  const handleNextImage = (e) => {
    e?.stopPropagation();
    setCurrentImageIndex(prev => (prev + 1) % displayImages.length);
  };
  
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      handleNextImage();
    }
    if (touchStart - touchEnd < -50) {
      handlePrevImage();
    }
  };
  
  const rating = listing.averageRating || 0;
  const showRating = rating > 0;

  const handleCardClick = () => {
    if (!listingId) return;
    navigate(`/listings/${listingId}`);
  };

  return (
    <Card 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <ImageContainer 
        onTouchStart={handleTouchStart} 
        onTouchMove={handleTouchMove} 
        onTouchEnd={handleTouchEnd}
        onClick={(e) => e.stopPropagation()}
      >
        <ImageWrapper imageCount={displayImages.length} currentIndex={currentImageIndex}>
          {displayImages.map((img, idx) => (
            <Image
              key={idx}
              src={img}
              alt={`${titleText} - View ${idx + 1}`}
              loading="lazy"
              imageCount={displayImages.length}
              onError={(e) => {
                // Fallback to default image if current image fails to load
                e.target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
              }}
            />
          ))}
        </ImageWrapper>
        
        {hasMultipleImages && (
          <DotsContainer>
            {displayImages.map((_, idx) => (
              <Dot
                key={idx}
                active={idx === currentImageIndex}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(idx);
                }}
                aria-label={`View image ${idx + 1}`}
              />
            ))}
          </DotsContainer>
        )}
        
        {hasMultipleImages && (
          <>
            <NavButton 
              direction="left"
              visible={isHovered}
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage(e);
              }}
              aria-label="Previous image"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </NavButton>
            <NavButton 
              direction="right"
              visible={isHovered}
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage(e);
              }}
              aria-label="Next image"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </NavButton>
          </>
        )}
        
        <FavoriteButton 
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill={isFavorite ? "#ff385c" : "rgba(255,255,255,0.8)"} 
            stroke={isFavorite ? "#ff385c" : "#222"} 
            strokeWidth="1.5"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </FavoriteButton>
      </ImageContainer>

      <Content>
        <LocationRow>
          <Location>{locationText}</Location>
          {showRating && (
            <Rating>
              <Star>★</Star>
              <RatingValue>{rating.toFixed(1)}</RatingValue>
            </Rating>
          )}
        </LocationRow>

        <Title>{titleText}</Title>

        {/* Host Information */}
        {listing.hostDetails && (
          <HostInfo>
            <HostAvatar>
              {listing.hostDetails.name ? listing.hostDetails.name.charAt(0).toUpperCase() : 'H'}
            </HostAvatar>
            <HostDetails>
              <HostName>
                Hosted by {listing.hostDetails.name || 'Host'}
                {listing.hostDetails.superhost && <SuperhostBadge>Superhost</SuperhostBadge>}
              </HostName>
              <HostMeta>
                {listing.hostDetails.responseRate && (
                  <span>Response rate {listing.hostDetails.responseRate}%</span>
                )}
              </HostMeta>
            </HostDetails>
          </HostInfo>
        )}

        {listing.description && (
          <Description>
            {listing.description.length > 100
              ? `${listing.description.substring(0, 100)}...`
              : listing.description}
          </Description>
        )}

        <PriceRow>
          <PriceContainer>
            <Price>{priceText}</Price>
            <PriceUnit>/ night</PriceUnit>
          </PriceContainer>
          {isGuest && (
            <BookButton 
              onClick={(e) => {
                e.stopPropagation();
                onBook?.(listing);
              }}
            >
              Book
            </BookButton>
          )}
          {isHost && listing.owner === user?.id && (
            <OwnerBadge>Your Listing</OwnerBadge>
          )}
        </PriceRow>
      </Content>
    </Card>
  );
};

const Card = styled.div`
  border-radius: 12px;
  overflow: visible;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  background-color: #fff;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 0;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 66.66%; /* 3:2 Aspect Ratio */
  overflow: hidden;
  background-color: #f7f7f7;
  border-radius: 12px 12px 0 0;
`;

const ImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  display: flex;
  transition: transform 0.5s ease;
  width: ${props => props.imageCount * 100}%;
  transform: translateX(${props => -props.currentIndex * (100 / props.imageCount)}%);
`;

const Image = styled.img`
  width: ${props => 100 / props.imageCount}%;
  height: 100%;
  object-fit: cover;
  flex-shrink: 0;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #dddddd;
  color: #222;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.2s ease;
  z-index: 10;
  opacity: ${props => props.visible ? 1 : 0};
  left: ${props => props.direction === 'left' ? '12px' : 'auto'};
  right: ${props => props.direction === 'right' ? '12px' : 'auto'};
  
  &:hover {
    background-color: #fff;
    transform: translateY(-50%) scale(1.1);
    opacity: 1 !important;
  }
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  z-index: 2;
`;

const Dot = styled.button`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: none;
  background-color: ${props => props.active ? '#fff' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  padding: 0;
  transition: all 0.2s ease;
  transform: ${props => props.active ? 'scale(1.2)' : 'scale(1)'};
`;

const FavoriteButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
  
  &:hover {
    transform: scale(1.1);
    
    svg {
      transform: scale(1.1);
      fill: #ff385c;
      stroke: #ff385c;
    }
  }
`;

const Content = styled.div`
  padding: 16px;
  background-color: #fff;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const LocationRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const Location = styled.span`
  font-size: 15px;
  color: #717171;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
`;

const Star = styled.span`
  color: #FF385C;
  margin-right: 4px;
`;

const RatingValue = styled.span`
  font-weight: 500;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #222;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Description = styled.p`
  font-size: 14px;
  color: #717171;
  margin: 0 0 16px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Price = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #222;
`;

const PriceUnit = styled.span`
  font-size: 14px;
  color: #717171;
`;

const BookButton = styled.button`
  background-color: #FF385C;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #e91e63;
    transform: scale(1.03);
  }
`;

const OwnerBadge = styled.span`
  background-color: #f5f5f5;
  color: #222;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 500;
`;

// Host Information Styles
const HostInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  padding: 8px 0;
`;

const HostAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ff385c;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  flex-shrink: 0;
`;

const HostDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const HostName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #222;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const SuperhostBadge = styled.span`
  background-color: #ff385c;
  color: white;
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
`;

const HostMeta = styled.div`
  font-size: 12px;
  color: #717171;
`;

export default ListingCard;
