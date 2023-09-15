import styled from 'styled-components';
import { colors } from '../../../style/theme/colors';

export const Inner = styled.div`
  position: absolute;
  z-index: 554;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  padding-top: 150px;
  @media screen and (max-width: 425px) {
    padding-top: 120px;
  }
`;

export const Contents = styled.div`
  position: fixed;
  top: 53%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 500px;
  overflow: hidden;
  border-radius: 18px;
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  z-index: 1000;
  @media screen and (max-width: 420px) {
    width: 320px;
  }
`;

export const ContentsTitle = styled.div`
  position: relative;
  padding: 20px 30px 20px;
  & h1 {
    font-size: 20px;
    text-align: center;
  }
  @media screen and (max-width: 420px) {
    padding: 15px 25px 15px;
    & h1 {
      font-size: 17px;
      text-align: center;
    }
  }
`;

export const ContentsItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

export const PartitionLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colors.gray_200};
`;

export const ContentsBody = styled.div`
  padding: 20px 30px;
  height: 480px;
  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  gap: 20px;
  @media screen and (max-width: 420px) {
    padding: 20px 25px;
    height: 520px;
    overflow-y: scroll;

    gap: 15px;
  }
`;

export const ContentsItemTitle = styled.span`
  padding: 0 10px;
  margin-bottom: 0 0 15px 0;
  font-size: 16px;
  font-weight: 500;
  border-left: 5px solid ${colors.primary};
`;

export const ContentItemBody = styled.div`
  padding-left: 15px;
  font-size: 14px;
`;
export const ContentItemBodyList = styled.div`
  display: flex;
  gap: 10px;
`;

export const CertificateContainer = styled.div``;

export const Figure = styled.figure`
  & img {
    max-width: 200px;
  }
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  top: 23px;
  right: 25px;
  & button {
    width: 28px;
  }
  & img {
    width: 100%;
  }
  @media screen and (max-width: 425px) {
    top: 15px;
  }
`;
