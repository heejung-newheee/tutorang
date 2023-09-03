import { styled } from 'styled-components';

export const SPGuideMessage = styled.p`
  min-width: 10px;
  height: 18px;
  font-size: 12px;
  color: #ff003e;
`;

export const SPartitionLine = styled.div`
  position: relative;
  width: 100%;
  height: 1px;
  background-color: #eaeaea;
  & p {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -10px;
    & span {
      background-color: #fff;
    }
  }
`;

export const SContainer = styled.div``;

export const SFormContainer = styled.div`
  height: 420px;
  /* padding: 50px 20px; */
  @media screen and (max-width: 420px) {
    height: 400px;
  }
`;

export const SForm = styled.form`
  box-sizing: border-box;
  padding: 40px 20px 35px;
  margin: 0 auto;
  max-width: 650px;
  min-width: 360px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media screen and (max-width: 420px) {
    padding: 30px 20px;
    gap: 8px;
  }
`;

export const SFormItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const SInput = styled.input`
  padding: 5px 50px 5px 12px;
  box-sizing: border-box;
  width: 100%;
  height: 45px;
  line-height: 45px;
  font-size: 16px;
  border: 1px solid #696969;
  border-radius: 3px;
  outline: none;
  font-size: 16px;
  @media screen and (max-width: 420px) {
    height: 45px;
    line-height: 45px;
  }
`;

export const SButton = styled.button<{ disabled: boolean }>`
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  border-radius: 3px;
  background-color: ${(props) => {
    if (props.disabled === true) return '#e7e7e7';
    else return '#FE902F';
  }};
  color: #fff;
  cursor: ${(props) => {
    if (props.disabled === true) return 'not-allowed';
    else return 'pointer';
  }};
  margin-top: 20px;
  @media screen and (max-width: 420px) {
    margin-top: 25px;
    height: 45px;
    line-height: 45px;
  }
`;
