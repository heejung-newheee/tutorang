import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  display: block;
  margin-bottom: 5px;
  font-size: 15px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 5px 0;
  border-left: 3px solid #fe902f;
  margin-left: 10px;
  font-weight: 600;
  padding-left: 7px;
`;

export const InFoWrap = styled.div``;

export const TutorInfo = styled.div`
  padding-top: 10px;
  padding-left: 15px;
`;

export const Name = styled.div`
  width: 100%;
  display: block;
  margin-bottom: 5px;
  font-size: 15px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const LocationDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 10px 0;
  font-size: 13px;
  color: gray;

  & > div {
    margin-right: 5px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }

  & > div > img {
    width: 12px;
    margin-right: 5px;
  }
  & > div > svg {
    margin-right: 5px;
    margin-left: 10px;
  }
`;

export const TutorContent = styled.div`
  font-size: 13px;
  margin-bottom: 15px;
  white-space: nowrap;
`;

export const Tag = styled.div`
  display: flex;
  gap: 5px;
  div {
    padding: 0 11px;
    line-height: 26px;
    border-radius: 13px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
`;
