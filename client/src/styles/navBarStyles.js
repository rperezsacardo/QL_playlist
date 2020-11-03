import styled from 'styled-components';

export const UList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;
export const FullNavBar = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.colors.purpleHeart};
  width: 100%; !import;
  padding: 1em;
`;
export const LogoImage = styled.img`
  width: 10em;
`;
export const RightNavBar = styled.nav`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
`;
export const LefNavBar = styled.nav`
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: space-around;
  align-items: center;
`;
