import styled from 'styled-components';
export const LayoutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 70px; // 헤더 고정 높이
  @media all and (max-width: 768px) {
    padding-top: 50px; // 헤더 높이
  }
`;
