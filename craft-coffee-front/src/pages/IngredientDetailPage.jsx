import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useData } from '../context/DataContext';
import { useCurrencyConverter } from '../hooks/useCurrencyConverter';

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 100px);
  background: linear-gradient(135deg, #f8f6f4 0%, #e8e5e1 100%);
  padding: 48px 24px;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: #27ae60;
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 32px;
  padding: 12px 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;

  &:hover {
    transform: translateX(-4px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`;

const Content = styled.div`
  max-width: 900px;
  margin: 0 auto;
  background: white;
  border-radius: 24px;
  padding: 64px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);

  @media (max-width: 768px) {
    padding: 32px 24px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 48px;
  padding-bottom: 32px;
  border-bottom: 3px solid #f0e6d9;
`;

const Icon = styled.div`
  font-size: 96px;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 56px;
  color: #6f4e37;
  margin: 0 0 16px 0;
  font-weight: 900;
  letter-spacing: -2px;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const Description = styled.p`
  font-size: 20px;
  color: #666;
  line-height: 1.8;
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Details = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
`;

const DetailCard = styled.div`
  background: linear-gradient(135deg, #f8f6f4 0%, #f0e6d9 100%);
  padding: 32px;
  border-radius: 20px;
  border-left: 6px solid #6f4e37;
  transition:
    transform 0.3s,
    box-shadow 0.3s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
`;

const DetailLabel = styled.div`
  font-size: 12px;
  color: #999;
  margin-bottom: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const DetailValue = styled.div`
  font-size: 28px;
  color: #6f4e37;
  font-weight: 800;
  letter-spacing: -0.5px;
`;

const PriceSection = styled.div`
  background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
  color: white;
  padding: 48px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(39, 174, 96, 0.3);

  @media (max-width: 768px) {
    padding: 32px 24px;
  }
`;

const PriceLabel = styled.div`
  font-size: 20px;
  margin-bottom: 12px;
  opacity: 0.9;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Price = styled.div`
  font-size: 64px;
  font-weight: 900;
  letter-spacing: -2px;

  @media (max-width: 768px) {
    font-size: 48px;
  }
`;

const NotFound = styled.div`
  max-width: 800px;
  margin: 80px auto;
  text-align: center;
  padding: 80px 48px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const NotFoundIcon = styled.div`
  font-size: 96px;
  margin-bottom: 24px;
  opacity: 0.5;
`;

const NotFoundTitle = styled.h2`
  font-size: 32px;
  color: #e74c3c;
  margin: 0 0 16px 0;
  font-weight: 800;
`;

const NotFoundText = styled.p`
  font-size: 18px;
  color: #999;
  margin-bottom: 32px;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  gap: 24px;
`;

const Spinner = styled.div`
  width: 80px;
  height: 80px;
  border: 6px solid #f3f3f3;
  border-top: 6px solid #27ae60;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  font-size: 18px;
  color: #27ae60;
  font-weight: 600;
`;

const IngredientDetailPage = () => {
  const { id } = useParams();
  const { getIngredientById, loading } = useData();
  const { formatPrice } = useCurrencyConverter();

  if (loading) {
    return (
      <Container>
        <BackLink to="/ingredients">← უკან ინგრედიენტებში</BackLink>
        <Content>
          <LoadingContainer>
            <Spinner />
            <LoadingText>იტვირთება...</LoadingText>
          </LoadingContainer>
        </Content>
      </Container>
    );
  }

  const ingredient = getIngredientById(id);

  if (!ingredient) {
    return (
      <Container>
        <BackLink to="/ingredients">← უკან ინგრედიენტებში</BackLink>
        <NotFound>
          <NotFoundIcon>🌿</NotFoundIcon>
          <NotFoundTitle>ინგრედიენტი ვერ მოიძებნა</NotFoundTitle>
          <NotFoundText>
            ინგრედიენტი ID-ით "{id}" არ არსებობს. დარწმუნდით რომ ინგრედიენტი
            დამატებულია ადმინ პანელში.
          </NotFoundText>
          <BackLink to="/ingredients">← დაბრუნება ინგრედიენტებში</BackLink>
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
          <PriceLabel>💰 ფასი</PriceLabel>
          <Price>{formatPrice(ingredient.price)}</Price>
        </PriceSection>
      </Content>
    </Container>
  );
};

export default IngredientDetailPage;
