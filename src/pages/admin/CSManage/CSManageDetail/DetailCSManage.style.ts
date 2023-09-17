import { styled } from 'styled-components';
import { colors } from '../../../../style/theme/colors';

export const Button = styled.button`
  background-color: #fff;
  border: 2px solid #cdcdcd;
  border-radius: 3px;
  padding: 4px 25px;
  &:hover {
    border: 2px solid ${colors.primary};
    background-color: #fe902f2c;
  }
`;

export const InquiryContent = styled.div`
  margin: 30px 0;
  border-top: solid 1px #ddd;
  padding: 30px 15px;
  font-size: 14px;
  text-align: center;
  & img {
    width: 300px;
  }
`;

export const ReplyContainer = styled.div`
  padding: 0 15px;
  font-size: 14px;
`;

export const ReplyContent = styled.div`
  margin-top: 10px;
`;

export const InquiryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const InquiryTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  & span:nth-child(1) {
    margin-right: 10px;
  }
`;
