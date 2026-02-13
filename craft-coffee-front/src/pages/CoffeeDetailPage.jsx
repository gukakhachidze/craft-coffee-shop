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
  color: #6f4e37;
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
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);
`;

const ImageSection = styled.div`
  width: 100%;
  height: 500px;
  background: linear-gradient(135deg, #6f4e37 0%, #8b6f47 100%);
  overflow: hidden;
  position: relative;

  @media (max-width: 768px) {
    height: 300px;
  }
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
  font-size: 120px;

  @media (max-width: 768px) {
    font-size: 80px;
  }
`;

const Details = styled.div`
  padding: 64px;

  @media (max-width: 768px) {
    padding: 32px 24px;
  }
`;

const Title = styled.h1`
  font-size: 56px;
  color: #6f4e37;
  margin: 0 0 24px 0;
  font-weight: 900;
  letter-spacing: -2px;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const Meta = styled.div`
  display: flex;
  gap: 32px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 18px;
  color: #666;
  background: #f8f6f4;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
`;

const Description = styled.p`
  font-size: 20px;
  color: #666;
  line-height: 1.8;
  margin-bottom: 48px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Section = styled.div`
  margin-bottom: 48px;
`;

const SectionTitle = styled.h2`
  font-size: 32px;
  color: #6f4e37;
  margin: 0 0 24px 0;
  font-weight: 800;
  letter-spacing: -1px;
`;

const IngredientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const IngredientCard = styled.div`
  background: linear-gradient(135deg, #f8f6f4 0%, #f0e6d9 100%);
  padding: 24px;
  border-radius: 16px;
  border-left: 5px solid #6f4e37;
  transition:
    transform 0.3s,
    box-shadow 0.3s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
`;

const IngredientName = styled.div`
  font-weight: 800;
  color: #6f4e37;
  margin-bottom: 8px;
  font-size: 18px;
`;

const IngredientPrice = styled.div`
  font-size: 16px;
  color: #999;
  font-weight: 600;
`;

const PriceSection = styled.div`
  background: linear-gradient(135deg, #6f4e37 0%, #8b6f47 100%);
  color: white;
  padding: 48px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(111, 78, 55, 0.3);

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
  border-top: 6px solid #6f4e37;
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
  color: #6f4e37;
  font-weight: 600;
`;

const CoffeeDetailPage = () => {
  const { id } = useParams();
  const { getCoffeeById, getCoffeeIngredients, loading } = useData();
  const { formatPrice } = useCurrencyConverter();

  if (loading) {
    return (
      <Container>
        <BackLink to="/coffees">← უკან კატალოგში</BackLink>
        <Content>
          <LoadingContainer>
            <Spinner />
            <LoadingText>იტვირთება...</LoadingText>
          </LoadingContainer>
        </Content>
      </Container>
    );
  }

  const coffee = getCoffeeById(id);

  if (!coffee) {
    return (
      <Container>
        <BackLink to="/coffees">← უკან კატალოგში</BackLink>
        <NotFound>
          <NotFoundIcon>☕</NotFoundIcon>
          <NotFoundTitle>ყავა ვერ მოიძებნა</NotFoundTitle>
          <NotFoundText>
            ყავა ID-ით "{id}" არ არსებობს. დარწმუნდით რომ ყავა დამატებულია ადმინ
            პანელში.
          </NotFoundText>
          <BackLink to="/coffees">← დაბრუნება კატალოგში</BackLink>
        </NotFound>
      </Container>
    );
  }

  const ingredients = getCoffeeIngredients(coffee);

  const caffeineLabels = {
    low: '☕ დაბალი კოფეინი',
    medium: '☕☕ საშუალო კოფეინი',
    high: '☕☕☕ მაღალი კოფეინი'
  };

  return (
    <Container>
      <BackLink to="/coffees">← უკან კატალოგში</BackLink>
      <Content>
        <ImageSection>
          {coffee.image ? (
            <Image src={coffee.image} alt={coffee.title} />
          ) : (
            <Placeholder>☕</Placeholder>
          )}
        </ImageSection>

        <Details>
          <Title>{coffee.title}</Title>

          <Meta>
            <MetaItem>
              <span>🌍</span>
              <span>{coffee.country || 'საერთაშორისო'}</span>
            </MetaItem>
            <MetaItem>
              <span>{caffeineLabels[coffee.caffeine]}</span>
            </MetaItem>
          </Meta>

          {coffee.description && (
            <Description>{coffee.description}</Description>
          )}

          <Section>
            <SectionTitle>🌿 ინგრედიენტები</SectionTitle>
            {ingredients.length === 0 ? (
              <p style={{ color: '#999', fontSize: '18px' }}>
                ინგრედიენტები არ არის მითითებული
              </p>
            ) : (
              <IngredientsGrid>
                {ingredients.map((ingredient) => (
                  <IngredientCard key={ingredient.id}>
                    <IngredientName>{ingredient.name}</IngredientName>
                    <IngredientPrice>
                      {formatPrice(ingredient.price)}
                    </IngredientPrice>
                  </IngredientCard>
                ))}
              </IngredientsGrid>
            )}
          </Section>

          <PriceSection>
            <PriceLabel>💰 ჯამური ფასი</PriceLabel>
            <Price>{formatPrice(coffee.totalPrice)}</Price>
          </PriceSection>
        </Details>
      </Content>
    </Container>
  );
};

export default CoffeeDetailPage;
