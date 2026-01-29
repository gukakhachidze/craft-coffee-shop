import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCurrencyConverter } from '../../hooks/useCurrencyConverter';

const Nav = styled.nav`
  background-color: #6f4e37;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: white;
  font-size: 24px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const NavLink = styled(Link)`
  color: white;
  font-size: 16px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 6px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const CurrencyButton = styled.button`
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: white;
    color: #6f4e37;
  }
`;

const Header = () => {
  const { currency, toggleCurrency } = useCurrencyConverter();

  return (
    <Nav>
      <Container>
        <Logo to="/">☕ Craft Coffee</Logo>
        <NavLinks>
          <NavLink to="/ingredients">ინგრედიენტები</NavLink>
          <NavLink to="/coffees">ყავის კატალოგი</NavLink>
          <CurrencyButton onClick={toggleCurrency}>
            {currency === 'GEL' ? '₾ → $' : '$ → ₾'}
          </CurrencyButton>
        </NavLinks>
      </Container>
    </Nav>
  );
};

export default Header;
