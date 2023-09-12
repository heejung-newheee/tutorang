import styled from 'styled-components';

export const SearchBar = styled.div`
  padding: 1.25rem;
  position: relative;
`;

export const SearchBarIcon = styled.label`
  position: absolute;
  top: 50%;
  left: 30px;
  transform: translateY(-50%);
`;

export const SearchClearButton = styled.button`
  display: flex;
  margin: 0;
  padding: 0.25rem;
  position: absolute;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
`;

export const SearchInput = styled.input`
  width: 100%;
  border-radius: 0.5rem;
  font-size: 0.8125rem;
  padding: 0.75rem;
  border: none;
  background-color: #f5f5f5;
  box-sizing: border-box;
  outline: none;
  text-indent: 1.25rem;
  &:hover,
  &:focus,
  &:focus-visible {
    box-shadow: 0 0 0 1px #939393;
  }
`;

export const Container = styled.div<{ $isMobile: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? '100%' : '410px')};
  border-right: 1px solid #eaeaea;
  overflow-y: auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;
