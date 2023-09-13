import { styled } from 'styled-components';

// [ ] 여긴 다름
export const Colgroup = styled.colgroup`
  & col:nth-child(1) {
    width: 7%;
  }
  & col:nth-child(2) {
    width: 80%;
  }
  & col:nth-child(3) {
    width: 13%;
  }

  @media screen and (max-width: 420px) {
    & col:nth-child(1) {
      width: 12%;
    }
    & col:nth-child(2) {
      width: 62%;
    }
    & col:nth-child(3) {
      width: 26%;
    }
  }
`;
