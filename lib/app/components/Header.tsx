import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Container from './Container';

// #region StyledComponents
const StyledHeader = styled.header`
  height: 50px;
  background: #191919;

  a {
    color: white;
    text-decoration: none;

    &:not(:first-child) {
      margin-left: 1rem;
    }
  }
`;

const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  height: inherit;
`;
// #endregion

const Header: FC = () => (
  <StyledHeader>
    <StyledContainer>
      <Link to="/">Home</Link>
      <Link to="/users">Users</Link>
    </StyledContainer>
  </StyledHeader>
);

export default Header;
