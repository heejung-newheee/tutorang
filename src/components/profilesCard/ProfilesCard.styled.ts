import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export const TutorCard = styled(Link)`
  width: 335px;
  margin-right: 30px;
  border-radius: 8px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  overflow: hidden;
`;
export const TutorImg = styled.div`
  width: 100%;
  height: 265px;
  overflow: hidden;
  img {
    width: 100%;
    overflow: hidden;
    object-fit: cover;
  }
`;
export const TutorInfo = styled.div`
  padding: 25px;
`;
export const TutorTitle = styled.h5`
  font-size: 17px;
  font-weight: bold;
  border-left: 3px solid #fe902f;
  padding-left: 8px;
  margin-bottom: 25px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
export const TutorName = styled.div`
  font-size: 16px;
  margin-bottom: 12px;
`;
export const TutorContent = styled.div`
  font-size: 13px;
`;
export const Tag = styled.div`
  display: flex;
  gap: 7px;
  margin-top: 10px;
  div {
    padding: 0 11px;
    line-height: 26px;
    border-radius: 13px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 4px 0px;
  }
`;
