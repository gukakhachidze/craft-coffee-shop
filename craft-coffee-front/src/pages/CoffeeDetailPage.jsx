import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useData } from '../context/DataContext';
import { useCurrencyConverter } from '../hooks/useCurrencyConverter';

const Container = styled.div`
  max-width: 1200px;
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
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const ImageSection = styled.div`
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, #6f4e37 0%, #8b6f47 100%);
  overflow: hidden;
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
  font-size: 96px;
`;

const Details = styled.div`
  padding: 48px;
`;

const Title = styled.h1`
  font-size: 48px;
  color: #6f4e37;
  margin: 0 0 16px 0;
  font-weight: 700;
`;

const Meta = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
`;

const Description = styled.p`
  font-size: 18px;
  color: #666;
  line-height: 1.8;
  margin-bottom: 32px;
`;

const Section = styled.div`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  color: #6f4e37;
  margin: 0 0 16px 0;
  font-weight: 700;
`;

const IngredientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
`;

const IngredientCard = styled.div`
  background: #f8f6f4;
  padding: 16px;
  border-radius: 8px;
  border-left: 4px solid #6f4e37;
`;

const IngredientName = styled.div`
  font-weight: 600;
  color: #6f4e37;
  margin-bottom: 4px;
`;

const IngredientPrice = styled.div`
  font-size: 14px;
  color: #999;
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

const CoffeeDetailPage = () => {
  const { id } = useParams();
  const { getCoffeeById, getCoffeeIngredients } = useData();
  const { formatPrice } = useCurrencyConverter();

  const coffee = getCoffeeById(id);

  if (!coffee) {
    return (
      <Container>
        <BackLink to="/coffees">← უკან კატალოგში</BackLink>
        <NotFound>
          <h2>ყავა ვერ მოიძებნა</h2>
          <p>დარწმუნდით რომ ყავა არსებობს ადმინ პანელში</p>
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
            <MetaItem>🌍 {coffee.country || 'საერთაშორისო'}</MetaItem>
            <MetaItem>{caffeineLabels[coffee.caffeine]}</MetaItem>
          </Meta>

          {coffee.description && (
            <Description>{coffee.description}</Description>
          )}

          <Section>
            <SectionTitle>ინგრედიენტები</SectionTitle>
            {ingredients.length === 0 ? (
              <p style={{ color: '#999' }}>ინგრედიენტები არ არის მითითებული</p>
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
            <PriceLabel>ჯამური ფასი</PriceLabel>
            <Price>{formatPrice(coffee.totalPrice)}</Price>
          </PriceSection>
        </Details>
      </Content>
    </Container>
  );
};

export default CoffeeDetailPage;
