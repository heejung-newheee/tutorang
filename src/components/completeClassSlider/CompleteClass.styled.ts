import { styled } from 'styled-components';

export const CompleteTutor = styled.div`
  margin-right: 66px;
`;
export const CompleteImg = styled.div`
  width: 92px;
  height: 92px;
  overflow: hidden;
  border-radius: 50%;
  img {
    width: 100%;
    object-fit: cover;
  }
`;
export const CompleteContents = styled.div`
  text-align: center;
  > div {
    margin-top: 8px;
  }
`;
export const ComTutorName = styled.div`
  font-size: 16px;
`;
export const ComTutorLocation = styled.div`
  font-size: 13px;
  /* img {
    filter: invert(0%) sepia(6%) saturate(7476%) hue-rotate(257deg) brightness(102%) contrast(107%);
    } */
`;

export const ReviewBtn = styled.button`
  font-size: 14px;
  line-height: 26px;
  padding: 0 15px;
  border-radius: 20px;
  border: solid 1px #000;
  margin-top: 8px;
`;