import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Logo = styled.div`
  font-size: 2.5rem;
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 900;
  color: #f44336;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.08), 0 2px 2px rgba(0, 0, 0, 0.08),
    0 3px 3px rgba(0, 0, 0, 0.08), 0 4px 4px rgba(0, 0, 0, 0.08),
    0 8px 8px rgba(0, 0, 0, 0.08), 0 16px 16px rgba(0, 0, 0, 0.08);
  font-style: initial;
  letter-spacing: -2px;
`;

const HeaderContainer = styled.header`
  display: flex;
  top: 0;
  position: sticky;
  background-color: white;
  z-index: 10;
  padding: 1rem 3rem;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  margin-left: auto;
  align-items: center;
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin-left: 1rem;
`;

export const MainHeader = ({ isLoggedIn = false }) => {
  return (
    <HeaderContainer>
      <LogoLink to="/" alt="Taboo chat app" title="Taboo chat app">
        <Logo>Taboo</Logo>
      </LogoLink>
      <Nav>
        <NavList>
          {!isLoggedIn && (
            <>
              <NavItem>
                <Link to="/login">Login</Link>
              </NavItem>
              <NavItem>
                <Link to="/signup">Sign up</Link>
              </NavItem>
            </>
          )}
          {isLoggedIn && (
            <NavItem>
              <Link to="/logout">Logout</Link>
            </NavItem>
          )}
        </NavList>
      </Nav>
    </HeaderContainer>
  );
};
