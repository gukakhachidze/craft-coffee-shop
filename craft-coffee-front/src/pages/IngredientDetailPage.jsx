import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useData } from '../context/DataContext';
import { useCurrencyConverter } from '../hooks/useCurrencyConverter';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 48px 24px;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #6f4e37;
  font-weight: 600;
  margin-bottom: 32px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

const Content = styled.div`
  background: white;
  border-radius: 16px;
  padding: 48px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 48px;
  padding-bottom: 32px;
  border-bottom: 2px solid #f0e6d9;
`;

const Icon = styled.div`
  font-size: 80px;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 48px;
  color: #6f4e37;
  margin: 0 0 16px 0;
  font-weight: 700;
`;

const Description = styled.p`
  font-size: 18px;
  color: #666;
  line-height: 1.8;
  max-width: 600px;
  margin: 0 auto;
`;

const Details = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const DetailCard = styled.div`
  background: #f8f6f4;
  padding: 24px;
  border-radius: 12px;
  border-left: 4px solid #6f4e37;
`;

const DetailLabel = styled.div`
  font-size: 14px;
  color: #999;
  margin-bottom: 8px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const DetailValue = styled.div`
  font-size: 20px;
  color: #6f4e37;
  font-weight: 700;
`;

const PriceSection = styled.div`
  background: linear-gradient(135deg, #6f4e37 0%, #8b6f47 100%);
  color: white;
  padding: 32px;
  border-radius: 12px;
  text-align: center;
`;

const PriceLabel = styled.div`
  font-size: 18px;
  margin-bottom: 8px;
  opacity: 0.9;
`;

const Price = styled.div`
  font-size: 48px;
  font-weight: 700;
`;

const NotFound = styled.div`
  text-align: center;
  padding: 80px 24px;
`;

const IngredientDetailPage = () => {
  const { id } = useParams();
  const { getIngredientById } = useData();
  const { formatPrice } = useCurrencyConverter();

  const ingredient = getIngredientById(id);

  if (!ingredient) {
    return (
      <Container>
        <BackLink to="/ingredients">← უკან ინგრედიენტებში</BackLink>
        <NotFound>
          <h2>ინგრედიენტი ვერ მოიძებნა</h2>
          <p>დარწმუნდით რომ ინგრედიენტი არსებობს ადმინ პანელში</p>
        </NotFound>
      </Container>
    );
  }

  const strengthLabels = {
    low: 'სუსტი',
    medium: 'საშუალო',
    high: 'ძლიერი'
  };

  const strengthIcons = {
    low: '▪',
    medium: '▪▪',
    high: '▪▪▪'
  };

  return (
    <Container>
      <BackLink to="/ingredients">← უკან ინგრედიენტებში</BackLink>
      <Content>
        <Header>
          <Icon>🌿</Icon>
          <Title>{ingredient.name}</Title>
          {ingredient.description && (
            <Description>{ingredient.description}</Description>
          )}
        </Header>

        <Details>
          <DetailCard>
            <DetailLabel>სიძლიერე</DetailLabel>
            <DetailValue>
              {strengthIcons[ingredient.strength]}{' '}
              {strengthLabels[ingredient.strength] || 'საშუალო'}
            </DetailValue>
          </DetailCard>

          {ingredient.flavor && (
            <DetailCard>
              <DetailLabel>არომატი</DetailLabel>
              <DetailValue>🌸 {ingredient.flavor}</DetailValue>
            </DetailCard>
          )}
        </Details>

        <PriceSection>
          <PriceLabel>ფასი</PriceLabel>
          <Price>{formatPrice(ingredient.price)}</Price>
        </PriceSection>
      </Content>
    </Container>
  );
};

export default IngredientDetailPage;
