import styled from 'styled-components';
import { colors } from '../../../style/theme/colors';

export const CommentLength = styled.div`
  width: 80%;
  margin: 0 auto;

  @media all and (max-width: 768px) {
    margin: 0;
    padding-left: 20px;
  }

  & > span:first-child {
    margin-right: 8px;
  }

  & > span:last-child {
    color: ${colors.primary};
  }
`;

export const CommentContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 40px 0;
  border-bottom: 1px solid ${colors.gray_900};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media all and (max-width: 768px) {
    width: 100%;
    padding: 40px 30px;
  }
`;

export const UserImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 15px;
  object-fit: cover;
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
`;

export const UserNameDate = styled.div`
  margin-bottom: 5px;

  & > span {
    margin-right: 15px;
  }

  & > span:last-child {
    font-size: 12px;
    color: gray;
  }
`;
export const EditSection = styled.div`
  font-size: 13px;
  color: ${colors.gray_900};
  cursor: pointer;
  & > span:first-child {
    margin-right: 10px;
    padding: 0 10px;
    border-right: 1px solid ${colors.gray_900};
  }
`;

export const EditContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 40px 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${colors.gray_900};

  & > button {
    font-size: 13px;

    color: ${colors.gray_900};
  }

  @media all and (max-width: 768px) {
    width: 100%;
    padding: 40px 30px;
  }
`;

export const EditDiv = styled.div`
  flex-grow: 1;
  margin-right: 10px;
`;

export const EditInputDiv = styled.div`
  width: 100%;
  height: 60px;
  border: 1px solid ${colors.gray_900};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  & > input {
    width: 90%;
    height: 90%;
    border: none;
    outline: none;
  }

  & > button {
    margin-right: 10px;
  }
`;
