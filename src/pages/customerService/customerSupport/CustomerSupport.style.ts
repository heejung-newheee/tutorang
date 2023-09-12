import { styled } from 'styled-components';

// [ ] 여긴 다름
export const Colgroup = styled.colgroup`
  & col:nth-child(1) {
    width: 6.5%;
  }
  & col:nth-child(2) {
    width: 65.5%;
  }
  & col:nth-child(3) {
    width: 13%;
  }
  & col:nth-child(4) {
    width: 10%;
  }
  @media screen and (max-width: 420px) {
    & col:nth-child(1) {
      width: 12%;
    }
    & col:nth-child(2) {
      width: 53%;
    }
    & col:nth-child(3) {
      width: 23%;
    }
    & col:nth-child(4) {
      width: 12%;
    }
  }
`;

export const ButtonSpace = styled.div`
  /* height: 60px; */
  padding: 10px 0px;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
`;
