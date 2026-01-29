import styled from 'styled-components';
import { useData } from '../context/DataContext';
import IngredientCard from '../components/Ingredients/IngredientCard';

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 100px);
  background: linear-gradient(135deg, #f8f6f4 0%, #e8e5e1 100%);
`;

const Hero = styled.div`
  width: 100%;
  background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
  padding: 100px 48px;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '🌿';
    position: absolute;
    font-size: 400px;
    opacity: 0.08;
    top: -80px;
    left: -80px;
    transform: rotate(15deg);
    animation: sway 6s ease-in-out infinite;
  }

  @keyframes sway {
    0%,
    100% {
      transform: rotate(15deg) translateX(0px);
    }
    50% {
      transform: rotate(15deg) translateX(20px);
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

const Stats = styled.div`
  max-width: 1600px;
  margin: 0 auto 64px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
`;

const StatCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  text-align: center;
  border-top: 6px solid ${(props) => props.$color || '#6f4e37'};
  transition:
    transform 0.3s,
    box-shadow 0.3s;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
  }
`;

const StatIcon = styled.div`
  font-size: 56px;
  margin-bottom: 16px;
`;

const StatValue = styled.div`
  font-size: 48px;
  font-weight: 900;
  color: #6f4e37;
  margin-bottom: 12px;
  letter-spacing: -1px;
`;

const StatLabel = styled.div`
  font-size: 16px;
  color: #999;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Grid = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 32px;

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
  animation: wiggle 2s ease-in-out infinite;

  @keyframes wiggle {
    0%,
    100% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(-5deg);
    }
    75% {
      transform: rotate(5deg);
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

const IngredientsPage = () => {
  const { ingredients } = useData();

  const avgPrice =
    ingredients.length > 0
      ? (
          ingredients.reduce((sum, ing) => sum + ing.price, 0) /
          ingredients.length
        ).toFixed(2)
      : 0;

  const highStrength = ingredients.filter((i) => i.strength === 'high').length;

  return (
    <Container>
      <Hero>
        <HeroContent>
          <Title>🌿 ინგრედიენტები</Title>
          <Subtitle>
            საუკეთესო ხარისხის ინგრედიენტები, რომლებიც ქმნიან განსაკუთრებულ
            ყავას და უზრუნველყოფენ უნიკალურ გემოს
          </Subtitle>
        </HeroContent>
      </Hero>

      <ContentWrapper>
        <Stats>
          <StatCard $color="#6f4e37">
            <StatIcon>📦</StatIcon>
            <StatValue>{ingredients.length}</StatValue>
            <StatLabel>სულ ინგრედიენტი</StatLabel>
          </StatCard>
          <StatCard $color="#27ae60">
            <StatIcon>💰</StatIcon>
            <StatValue>{avgPrice} ₾</StatValue>
            <StatLabel>საშუალო ფასი</StatLabel>
          </StatCard>
          <StatCard $color="#e74c3c">
            <StatIcon>⚡</StatIcon>
            <StatValue>{highStrength}</StatValue>
            <StatLabel>მაღალი სიძლიერე</StatLabel>
          </StatCard>
        </Stats>

        {ingredients.length === 0 ? (
          <EmptyState>
            <EmptyIcon>🌿</EmptyIcon>
            <EmptyTitle>ინგრედიენტები ჯერ არ არის დამატებული</EmptyTitle>
            <EmptyText>
              გადადით ადმინ პანელში და დაამატეთ თქვენი პირველი ინგრედიენტი,
              რომელიც გახდება თქვენი ყავის საფუძველი
            </EmptyText>
          </EmptyState>
        ) : (
          <Grid>
            {ingredients.map((ingredient) => (
              <IngredientCard key={ingredient.id} ingredient={ingredient} />
            ))}
          </Grid>
        )}
      </ContentWrapper>
    </Container>
  );
};

export default IngredientsPage;
