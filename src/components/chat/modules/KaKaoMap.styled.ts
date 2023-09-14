import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 1rem;
  height: 300px;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    height: auto;
    overflow: hidden;
    flex-direction: column;
    flex: 1;
  }
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 10px;
  max-width: 300px;
  @media screen and (max-width: 768px) {
    max-width: 100%;
  }
`;

export const ListItem = styled.li`
  padding: 10px;
  border-radius: 10px;
  &:hover,
  &:focus,
  &:focus-within {
    background-color: #eeeeee81;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  @media screen and (max-width: 768px) {
    overflow: hidden;
  }
`;

export const SearchBar = styled.div`
  width: 100%;
  position: relative;
`;

export const SearchIcon = styled.span`
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
`;

export const LocationInput = styled.input`
  font-size: 1rem;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #eee;
  width: 100%;
  text-indent: 24px;
  outline: none;
`;

export const PlaceList = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  overflow-y: auto;
`;
