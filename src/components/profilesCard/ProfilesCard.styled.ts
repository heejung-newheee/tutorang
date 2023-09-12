import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { colors } from '../../style/theme/colors';

export const TutorCard = styled(Link)`
  margin-right: 30px;
  border-radius: 8px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  overflow: hidden;
`;
export const TutorImg = styled.div`
  width: 100%;
  height: 230px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    overflow: hidden;
    object-fit: cover;
  }
`;
export const TutorInfo = styled.div`
  padding: 18px;
`;
export const TutorTitle = styled.h5`
  font-size: 17px;
  font-weight: bold;
  border-left: 3px solid ${colors.primary};
  padding-left: 8px;
  margin-bottom: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
export const TutorName = styled.div`
  font-size: 16px;
  margin-bottom: 12px;
  font-weight: bold;
`;
export const TutorContent = styled.div`
  font-size: 13px;
`;
export const InfoIcon = styled.img`
  width: 15px;
  position: relative;
  top: 3px;
`;
export const Tag = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 10px;
  div {
    padding: 0 11px;
    font-size: 12px;
    line-height: 26px;
    border-radius: 13px;
    border: solid 1px #dbdbdb;
    white-space: nowrap;
  }
`;
