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
  position: relative;
  
  &:hover {
    color: #ff385c;
  }
`;

export const Badge = styled.span`
  background: #ff385c;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  font-weight: 600;
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

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
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

export const CreateForm = styled.form`
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  border: 1px solid #e0e0e0;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #333;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #ff385c;
  }
`;

export const Textarea = styled.textarea`
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

export const FileInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
`;

export const ImagePreview = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
  
  div {
    width: 80px;
    height: 80px;
    border-radius: 4px;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
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

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background: #f8f9fa;
  border-radius: 12px;
  
  p {
    color: #666;
    font-size: 1.1rem;
  }
`;

export const ListingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

export const ListingCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const ListingImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const ListingInfo = styled.div`
  padding: 1.5rem;
  
  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: #333;
  }
  
  p {
    color: #666;
    margin-bottom: 1rem;
  }
`;

export const Price = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
`;

export const ListingActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const EditButton = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #2563eb;
  }
`;

export const DeleteButton = styled.button`
  background: #dc2626;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #b91c1c;
  }
`;

export const BookingsList = styled.div`
  display: grid;
  gap: 1rem;
`;

export const BookingCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export const BookingInfo = styled.div`
  h3 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    color: #333;
  }
  
  p {
    color: #666;
    margin-bottom: 0.25rem;
  }
`;

export const BookingStatus = styled.div`
  font-weight: 600;
  color: #28a745;
`;

export const BookingActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const AcceptButton = styled.button`
  background: #28a745;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.2s;

  &:hover {
    background: #218838;
  }
`;

export const DeclineButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.2s;

  &:hover {
    background: #c82333;
  }
`;

export const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;

  ${props => props.confirmed && `
    background: #d4edda;
    color: #155724;
  `}

  ${props => props.declined && `
    background: #f8d7da;
    color: #721c24;
  `}
`;

export const EarningsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

export const EarningsCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  text-align: center;
  
  h3 {
    font-size: 1rem;
    color: #666;
    margin-bottom: 1rem;
  }
`;

export const Amount = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #ff385c;
`;
