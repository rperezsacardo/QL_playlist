import styled from 'styled-components';

export const GlobalStyles = styled.div`
  font-family: Play, sans-serif;
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
`;

export const Card = styled.div`
  padding: 10px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  border-radius: 15px;
`;

export const Container = styled.div`
  margin: 1em;
  display: flex;

  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
  align-content: flex-start;
`;
export const LineContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
  align-content: flex-start;
`;
export const UContainer = styled.ul`
  margin-left: 1em;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
`;

export const Title = styled.h1`
  color: purple;
  font-size: 1.5rem;
`;

export const ListItem = styled.li`
  list-style: none;
  padding: 0 1em;

  a,
  a:visited,
  a:hover,
  a:active {
    text-decoration: none;
    color: white;
    color: white;
  }
  h4 {
    color: white;
  }
`;

export const Button = styled.button`
  appearance: none;
  background-color: ${(props) => props.theme.colors.christalle};
  border: ${(props) => (props.noBorder ? '0' : '1px solid white')};
  color: white;
  padding: 0.5em 1em;
  transition: background-color 0.25s, color 0.25s;
  border-radius: 15px;

  &:hover {
    background-color: rgba(72, 46, 166, 0.5);
    cursor: pointer;
  }
`;

export const SytedInput = styled.input`
  border-width: 2px;
  border-color: #cccccc;
  border-style: solid;
  border-radius: 28px;
  text-align: center;
  padding: 11px;
`;
