import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useCurrencyConverter } from '../../hooks/useCurrencyConverter';

const Nav = styled.nav`
  background: linear-gradient(135deg, #6f4e37 0%, #5a3d2b 100%);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 3px solid #8b6f47;
`;

const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 20px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px 24px;
    flex-direction: column;
    gap: 16px;
  }
`;

const Logo = styled(Link)`
  color: white;
  font-size: 32px;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 12px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s;
  letter-spacing: -0.5px;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const LogoIcon = styled.span`
  font-size: 40px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const NavSection = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const NavLink = styled(Link)`
  color: ${(props) => (props.$active ? '#fff' : 'rgba(255, 255, 255, 0.85)')};
  font-size: 16px;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 8px;
  transition: all 0.3s;
  position: relative;
  background: ${(props) =>
    props.$active ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};
  border: 2px solid
    ${(props) => (props.$active ? 'rgba(255, 255, 255, 0.4)' : 'transparent')};

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 50%;
    transform: translateX(-50%);
    width: ${(props) => (props.$active ? '60%' : '0')};
    height: 3px;
    background: white;
    transition: width 0.3s;
  }

  &:hover::after {
    width: 60%;
  }
`;

const CurrencyButton = styled.button`
  background: linear-gradient(135deg, #f39c12 0%, #d68910 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    background: linear-gradient(135deg, #e67e22 0%, #ca6f1e 100%);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const CurrencyIcon = styled.span`
  font-size: 20px;
`;

const Header = () => {
  const { currency, toggleCurrency } = useCurrencyConverter();
  const location = useLocation();

  return (
    <Nav>
      <Container>
        <Logo to="/">
          <LogoIcon>☕</LogoIcon>
          <span>Craft Coffee</span>
        </Logo>
        <NavSection>
          <NavLinks>
            <NavLink
              to="/ingredients"
              $active={location.pathname.startsWith('/ingredients')}
            >
              🌿 ინგრედიენტები
            </NavLink>
            <NavLink
              to="/coffees"
              $active={location.pathname.startsWith('/coffees')}
            >
              ☕ ყავის კატალოგი
            </NavLink>
          </NavLinks>
          <CurrencyButton onClick={toggleCurrency}>
            <CurrencyIcon>{currency === 'GEL' ? '₾' : '$'}</CurrencyIcon>
            <span>
              {currency === 'GEL' ? 'ლარი → დოლარი' : 'დოლარი → ლარი'}
            </span>
          </CurrencyButton>
        </NavSection>
      </Container>
    </Nav>
  );
};

export default Header;
