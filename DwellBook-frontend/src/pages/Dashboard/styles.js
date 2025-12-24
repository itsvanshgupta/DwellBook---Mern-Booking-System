import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const Header = styled.div`
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    color: #333;
  }
  
  p {
    color: #666;
    font-size: 1.1rem;
  }
`;

export const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 2rem;
`;

export const Tab = styled.button`
  background: none;
  border: none;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  border-bottom: 2px solid ${props => props.active ? '#ff385c' : 'transparent'};
  color: ${props => props.active ? '#ff385c' : '#666'};
  font-weight: ${props => props.active ? '600' : '400'};
  transition: all 0.2s;
  
  &:hover {
    color: #ff385c;
  }
`;

export const TabContent = styled.div`
  margin-top: 2rem;
  
  h2 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: #333;
  }
`;

export const Loading = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
`;

export const Error = styled.div`
  background: #fee;
  color: #c53030;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  border: 1px solid #fed7d7;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background: #f8f9fa;
  border-radius: 12px;
  
  p {
    color: #666;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
  }
`;

export const Button = styled.button`
  background: #ff385c;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #e31c5f;
  }
`;

export const BookingsList = styled.div`
  display: grid;
  gap: 1.5rem;
`;

export const BookingCard = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr auto;
  gap: 1.5rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const BookingImage = styled.img`
  width: 200px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  
  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`;

export const BookingDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const BookingTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

export const BookingLocation = styled.p`
  color: #666;
  margin-bottom: 1rem;
`;

export const BookingDates = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
  
  span {
    color: #333;
    font-weight: 500;
  }
`;

export const StatusBadge = styled.span`
  background: ${props => props.color || '#6b7280'};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
`;

export const BookingPrice = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
`;

export const BookingActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  
  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

export const CancelButton = styled.button`
  background: #dc2626;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover:not(:disabled) {
    background: #b91c1c;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export const ProfileCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const ProfileInfo = styled.div`
  display: grid;
  gap: 1.5rem;
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

export const Label = styled.span`
  font-weight: 600;
  color: #333;
  min-width: 120px;
`;

export const Value = styled.span`
  color: #666;
`;
