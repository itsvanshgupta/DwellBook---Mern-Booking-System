import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 2rem;
`;

export const Loading = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
`;

export const Error = styled.div`
  color: #ff4d4f;
  text-align: center;
  padding: 2rem;
`;

export const NotFound = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
`;

export const Gallery = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const MainImage = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 12px;
`;

export const Thumbnails = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;

export const Thumbnail = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const MainContent = styled.div``;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

export const Meta = styled.div`
  display: flex;
  gap: 1rem;
  color: #666;
  margin-bottom: 1.5rem;
`;

export const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const Description = styled.p`
  line-height: 1.6;
  color: #333;
  margin-bottom: 2rem;
`;

export const Section = styled.section`
  margin: 2rem 0;
  padding: 1.5rem 0;
  border-top: 1px solid #eee;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

export const Review = styled.div`
  margin-bottom: 1.5rem;
`;

export const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
`;

export const UserIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
`;

export const Reviewer = styled.div`
  font-weight: 600;
`;

export const ReviewMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.9rem;
  color: #666;
`;

export const ReviewText = styled.p`
  margin: 0.5rem 0 0 3.5rem;
  color: #333;
`;

export const BookingSidebar = styled.aside`
  position: sticky;
  top: 2rem;
`;

export const BookingCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
`;

export const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;

  span {
    font-size: 1rem;
    font-weight: 400;
    color: #666;
  }
`;

export const DatesContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

export const DateField = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;

  > div {
    padding: 0.75rem;
    border-right: 1px solid #eee;

    &:last-child {
      border-right: none;
    }

    small {
      display: block;
      font-size: 0.75rem;
      color: #666;
      margin-bottom: 0.25rem;
    }
  }
`;

export const DatePickerContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-top: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

export const GuestsSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

export const BookButton = styled.button`
  width: 100%;
  background: #ff385c;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 1rem;
  transition: background 0.2s;

  &:hover {
    background: #e31c5f;
  }
`;

export const PriceBreakdown = styled.div`
  border-top: 1px solid #eee;
  padding-top: 1rem;
`;

export const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  color: #666;
`;

export const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  font-weight: 600;
  font-size: 1.1rem;
`;

export const ShareButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #f5f5f5;
  }
`;

export const AddReviewButton = styled.button`
  background: #ff385c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #e31c5f;
  }
`;

export const ReviewForm = styled.form`
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  border: 1px solid #e0e0e0;
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #333;
  }
`;

export const RatingSelect = styled.select`
  width: 200px;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
`;

export const ReviewTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #ff385c;
  }
`;

export const SubmitButton = styled.button`
  background: #ff385c;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background: #e31c5f;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export const BookingError = styled.div`
  background: #fee;
  color: #c53030;
  padding: 0.75rem;
  border-radius: 6px;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  border: 1px solid #fed7d7;
`;

export const BookingSuccess = styled.div`
  background: #f0fdf4;
  color: #16a34a;
  padding: 0.75rem;
  border-radius: 6px;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  border: 1px solid #bbf7d0;
`;

// Booking Confirmation Modal Styles
export const ConfirmationOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ConfirmationModal = styled.div`
  background: white;
  border-radius: 12px;
  padding: 0;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

export const ConfirmationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 0;
  border-bottom: 1px solid #e5e7eb;

  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #111827;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6b7280;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  &:hover {
    background: #f3f4f6;
    color: #111827;
  }
`;

export const ConfirmationBody = styled.div`
  padding: 24px;

  p {
    margin: 0 0 16px;
    color: #4b5563;
    line-height: 1.5;
  }
`;

export const BookingSummary = styled.div`
  background: #f9fafb;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;

  div {
    margin-bottom: 8px;
    color: #374151;

    &:last-child {
      margin-bottom: 0;
      color: #111827;
      font-size: 16px;
    }
  }
`;

export const ConfirmationFooter = styled.div`
  display: flex;
  gap: 12px;
  padding: 24px;
  border-top: 1px solid #e5e7eb;
`;

export const CancelButton = styled.button`
  flex: 1;
  padding: 12px 24px;
  border: 1px solid #d1d5db;
  background: white;
  color: #374151;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: #f9fafb;
  }
`;

export const ConfirmButton = styled.button`
  flex: 1;
  padding: 12px 24px;
  border: none;
  background: #ff385c;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: #e91e63;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
