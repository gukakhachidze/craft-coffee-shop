import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCurrencyConverter } from '../../hooks/useCurrencyConverter';

const Card = styled(Link)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
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

const ImageContainer = styled.div`
  width: 100%;
  height: 240px;
  overflow: hidden;
  background: linear-gradient(135deg, #6f4e37 0%, #8b6f47 100%);
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 48px;
`;

const Content = styled.div`
  padding: 20px;
`;

const Title = styled.h3`
  font-size: 24px;
  color: #6f4e37;
  margin: 0 0 8px 0;
  font-weight: 700;
`;

const Country = styled.p`
  font-size: 14px;
  color: #999;
  margin: 0 0 12px 0;
  font-style: italic;
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 16px 0;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #eee;
`;

const Price = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: #6f4e37;
`;

const CaffeineTag = styled.span`
  background: ${(props) => {
    if (props.$level === 'high') return '#e74c3c';
    if (props.$level === 'low') return '#27ae60';
    return '#f39c12';
  }};
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
`;

const CoffeeCard = ({ coffee }) => {
  const { formatPrice } = useCurrencyConverter();

  const caffeineLabels = {
    low: 'დაბალი კოფეინი',
    medium: 'საშუალო კოფეინი',
    high: 'მაღალი კოფეინი'
  };

  return (
    <Card to={`/coffees/${coffee.id}`}>
      <ImageContainer>
        {coffee.image ? (
          <Image src={coffee.image} alt={coffee.title} />
        ) : (
          <Placeholder>☕</Placeholder>
        )}
      </ImageContainer>
      <Content>
        <Title>{coffee.title}</Title>
        <Country>🌍 {coffee.country || 'საერთაშორისო'}</Country>
        <Description>{coffee.description || 'განსაკუთრებული ყავა'}</Description>
        <Footer>
          <Price>{formatPrice(coffee.totalPrice)}</Price>
          <CaffeineTag $level={coffee.caffeine}>
            {caffeineLabels[coffee.caffeine] || 'საშუალო კოფეინი'}
          </CaffeineTag>
        </Footer>
      </Content>
    </Card>
  );
};

export default CoffeeCard;
