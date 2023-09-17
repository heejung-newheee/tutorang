import styled from 'styled-components';
export const LayoutContainer = styled.div`
  max-width: 1200px;
  min-height: calc(100vh);
  margin: 0 auto;
  padding-top: 70px;
  @media all and (max-width: 768px) {
    padding-top: 50px;
  }
`;
