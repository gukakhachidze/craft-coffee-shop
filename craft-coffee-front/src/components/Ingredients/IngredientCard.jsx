import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCurrencyConverter } from '../../hooks/useCurrencyConverter';

const Card = styled(Link)`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
`;

const Title = styled.h3`
  font-size: 20px;
  color: #6f4e37;
  margin: 0 0 12px 0;
  font-weight: 700;
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 16px 0;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 42px;
`;

const Tags = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background-color: #f0e6d9;
  color: #6f4e37;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #eee;
`;

const Price = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #6f4e37;
`;

const StrengthBadge = styled.span`
  background: ${(props) => {
    if (props.$level === 'high') return '#e74c3c';
    if (props.$level === 'low') return '#27ae60';
    return '#f39c12';
  }};
  color: white;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
`;

const IngredientCard = ({ ingredient }) => {
  const { formatPrice } = useCurrencyConverter();

  const strengthLabels = {
    low: 'სუსტი',
    medium: 'საშუალო',
    high: 'ძლიერი'
  };

  return (
    <Card to={`/ingredients/${ingredient.id}`}>
      <Title>{ingredient.name}</Title>
      <Description>
        {ingredient.description || 'განსაკუთრებული ინგრედიენტი'}
      </Description>
      <Tags>{ingredient.flavor && <Tag>🌸 {ingredient.flavor}</Tag>}</Tags>
      <Footer>
        <Price>{formatPrice(ingredient.price)}</Price>
        <StrengthBadge $level={ingredient.strength}>
          {strengthLabels[ingredient.strength] || 'საშუალო'}
        </StrengthBadge>
      </Footer>
    </Card>
  );
};

export default IngredientCard;
