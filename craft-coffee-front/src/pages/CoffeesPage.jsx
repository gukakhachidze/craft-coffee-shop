import styled from 'styled-components';
import { useData } from '../context/DataContext';
import CoffeeCard from '../components/Coffees/CoffeeCard';

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 100px);
  background: linear-gradient(135deg, #f8f6f4 0%, #e8e5e1 100%);
`;

const Hero = styled.div`
  width: 100%;
  background: linear-gradient(135deg, #6f4e37 0%, #8b6f47 100%);
  padding: 100px 48px;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '☕';
    position: absolute;
    font-size: 400px;
    opacity: 0.08;
    top: -80px;
    right: -80px;
    transform: rotate(-15deg);
    animation: float 6s ease-in-out infinite;
  }

  @keyframes float {
    0%,
    100% {
      transform: rotate(-15deg) translateY(0px);
    }
    50% {
      transform: rotate(-15deg) translateY(-20px);
    }
  }

  @media (max-width: 768px) {
    padding: 60px 24px;
  }
`;

const HeroContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 72px;
  margin: 0 0 24px 0;
  font-weight: 900;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
  letter-spacing: -2px;

  @media (max-width: 768px) {
    font-size: 42px;
  }
`;

const Subtitle = styled.p`
  font-size: 24px;
  opacity: 0.95;
  line-height: 1.6;
  font-weight: 300;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  padding: 80px 48px;

  @media (max-width: 768px) {
    padding: 40px 24px;
  }
`;

const FilterBar = styled.div`
  max-width: 1600px;
  margin: 0 auto 64px;
  background: white;
  padding: 32px;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  border: 2px solid #f0e6d9;
`;

const FilterLabel = styled.span`
  font-weight: 700;
  color: #6f4e37;
  font-size: 18px;
`;

const FilterValue = styled.strong`
  font-size: 28px;
  color: #6f4e37;
  background: linear-gradient(135deg, #f0e6d9 0%, #e8dccf 100%);
  padding: 8px 24px;
  border-radius: 12px;
`;

const Grid = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 40px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const EmptyState = styled.div`
  max-width: 800px;
  margin: 80px auto;
  text-align: center;
  padding: 120px 48px;
  background: white;
  border-radius: 32px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 80px 24px;
  }
`;

const EmptyIcon = styled.div`
  font-size: 120px;
  margin-bottom: 32px;
  opacity: 0.5;
  animation: bounce 2s ease-in-out infinite;

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }
`;

const EmptyTitle = styled.h2`
  font-size: 36px;
  color: #6f4e37;
  margin: 0 0 16px 0;
  font-weight: 800;
`;

const EmptyText = styled.p`
  font-size: 20px;
  color: #999;
  font-style: italic;
  line-height: 1.6;
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

const CoffeesPage = () => {
  const { coffees, loading } = useData();

  if (loading) {
    return (
      <Container>
        <Hero>
          <HeroContent>
            <Title>☕ ყავის კატალოგი</Title>
            <Subtitle>აღმოაჩინეთ ჩვენი განსაკუთრებული ყავის კოლექცია</Subtitle>
          </HeroContent>
        </Hero>
        <ContentWrapper>
          <LoadingContainer>
            <Spinner />
            <LoadingText>იტვირთება ყავის კატალოგი...</LoadingText>
          </LoadingContainer>
        </ContentWrapper>
      </Container>
    );
  }

  return (
    <Container>
      <Hero>
        <HeroContent>
          <Title>☕ ყავის კატალოგი</Title>
          <Subtitle>
            აღმოაჩინეთ ჩვენი განსაკუთრებული ყავის კოლექცია, რომელიც მზადდება
            საუკეთესო ინგრედიენტებისგან და ქმნის უნიკალურ გემოთა სიმფონიას
          </Subtitle>
        </HeroContent>
      </Hero>

      <ContentWrapper>
        <FilterBar>
          <FilterLabel>📊 სულ ყავა კატალოგში:</FilterLabel>
          <FilterValue>{coffees.length}</FilterValue>
        </FilterBar>

        {coffees.length === 0 ? (
          <EmptyState>
            <EmptyIcon>☕</EmptyIcon>
            <EmptyTitle>ყავა ჯერ არ არის დამატებული</EmptyTitle>
            <EmptyText>
              გადადით ადმინ პანელში და დაამატეთ თქვენი პირველი განსაკუთრებული
              ყავა კატალოგში
            </EmptyText>
          </EmptyState>
        ) : (
          <Grid>
            {coffees.map((coffee) => (
              <CoffeeCard key={coffee.id} coffee={coffee} />
            ))}
          </Grid>
        )}
      </ContentWrapper>
    </Container>
  );
};

export default CoffeesPage;
