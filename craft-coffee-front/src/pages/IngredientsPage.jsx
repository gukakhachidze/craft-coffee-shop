import styled from 'styled-components';
import { useData } from '../context/DataContext';
import IngredientCard from '../components/Ingredients/IngredientCard';

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 48px 24px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 48px;
`;

const Title = styled.h1`
  font-size: 48px;
  color: #6f4e37;
  margin: 0 0 16px 0;
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 24px;
  color: #999;
`;

const EmptyIcon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
`;

const EmptyText = styled.p`
  font-size: 18px;
  font-style: italic;
`;

const IngredientsPage = () => {
  const { ingredients } = useData();

  return (
    <Container>
      <Header>
        <Title>🌿 ინგრედიენტები</Title>
        <Subtitle>
          ყველა ინგრედიენტი, რომელიც გამოიყენება ჩვენს ყავის მომზადებაში
        </Subtitle>
      </Header>

      {ingredients.length === 0 ? (
        <EmptyState>
          <EmptyIcon>🌿</EmptyIcon>
          <EmptyText>
            ჯერ არ არის დამატებული ინგრედიენტები. გადადით ადმინ პანელში და
            დაამატეთ.
          </EmptyText>
        </EmptyState>
      ) : (
        <Grid>
          {ingredients.map((ingredient) => (
            <IngredientCard key={ingredient.id} ingredient={ingredient} />
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default IngredientsPage;
