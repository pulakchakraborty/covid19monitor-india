import React from 'react';
import styled from 'styled-components';
import GitHubIcon from '@material-ui/icons/GitHub';

const Nav = styled.div`
  background: transparent;
  z-index: 1000;
  position: fixed;
  width: 100%;
`;

const NavHeader = styled.div`
  margin: 0 auto;
  padding: 8px 8px 8px 13px;
  display: flex;
  align-items: center;
  pointer-events: none;
  color: #d14f69;
  font-size: 1.3rem;
  font-weight: 600;
`;

const NavLeft = styled.div`
  width: 80%;
  text-align: left;
`;

const NavRight = styled.div`
  width: 20%;
  text-align: right;
  pointer-events: all;
  margin-top: 8px;
  margin-right: 40px;
`;

const MenuLink = styled.a`
  color: #d14f69;
`;

const Header = () => {
  return (
    <Nav>
      <NavHeader>
        <NavLeft>Coronavirus Monitor</NavLeft>
        <NavRight>
          <MenuLink
            href="https://github.com/pulakchakraborty/c19-india-map"
            target="_blank"
            rel="noopener noreferrer"
            title="Github">
            <GitHubIcon />
          </MenuLink>
        </NavRight>
      </NavHeader>
    </Nav>
  );
};

export default Header;
