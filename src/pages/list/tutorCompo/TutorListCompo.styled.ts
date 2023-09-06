import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../../style/theme/colors';

export const TutorContainer = styled(Link)`
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  overflow: hidden;

  & > img {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    width: 100%;
    height: 230px;
    object-fit: cover;
  }
`;

export const Title = styled.div`
  width: 100%;
  margin-bottom: 5px;
  padding-left: 7px;
  display: block;
  overflow: hidden;
  font-size: 15px;
  font-weight: 600;
  white-space: nowrap;
  text-overflow: ellipsis;
  border-left: 3px solid ${colors.primary};
`;

export const InFoWrap = styled.div`
  padding: 20px;
`;

export const TutorInfo = styled.div`
  padding-top: 10px;
`;

export const Name = styled.div`
  width: 100%;
  margin-bottom: 5px;
  display: block;
  overflow: hidden;
  font-size: 15px;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const LocationDiv = styled.div`
  margin: 10px 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font-size: 13px;
  color: gray;

  & > div {
    margin-right: 15px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }

  & > div:first-child > img {
    width: 10px;
    margin-right: 5px;
  }
  & > div:last-child > img {
    width: 13px;
    margin-right: 5px;
  }
  & > div > svg {
    margin-right: 5px;
    margin-left: 10px;
  }
`;

export const TutorContent = styled.div`
  font-size: 13px;
  white-space: nowrap;
`;

export const Tag = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  div {
    padding: 0 11px;
    line-height: 26px;
    border-radius: 13px;
    border: solid 1px #f3f3f3;
  }
`;
