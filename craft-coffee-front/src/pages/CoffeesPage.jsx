import styled from 'styled-components';
import { useData } from '../context/DataContext';
import CoffeeCard from '../components/Coffees/CoffeeCard';

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
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 32px;
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

const CoffeesPage = () => {
  const { coffees } = useData();

  return (
    <Container>
      <Header>
        <Title>☕ ყავის კატალოგი</Title>
        <Subtitle>
          აღმოაჩინეთ ჩვენი განსაკუთრებული ყავის კოლექცია, რომელიც მზადდება
          საუკეთესო ინგრედიენტებისგან
        </Subtitle>
      </Header>

      {coffees.length === 0 ? (
        <EmptyState>
          <EmptyIcon>☕</EmptyIcon>
          <EmptyText>
            ჯერ არ არის დამატებული ყავა. გადადით ადმინ პანელში და დაამატეთ.
          </EmptyText>
        </EmptyState>
      ) : (
        <Grid>
          {coffees.map((coffee) => (
            <CoffeeCard key={coffee.id} coffee={coffee} />
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default CoffeesPage;
