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

// 약관동의

export const SHeader = styled.header`
  width: 100%;
  height: 175px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  & h2 {
    font-size: 32px;
    font-weight: 700;
  }
  @media screen and (max-width: 420px) {
    height: 120px;
    & h2 {
      font-size: 25px;
      font-weight: 600;
    }
  }
`;

export const Label = styled.label`
  width: 100%;
  color: #3d3d3d;
`;
export const Span = styled.span`
  width: 40px;
  cursor: pointer;
  color: #706d6d;
`;

export const CheckTeramsAndConditions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
  @media screen and (max-width: 420px) {
    gap: 10px;
    font-size: 15px;
  }
`;

export const SCheckboxContainer = styled.div`
  width: 100%;
`;

export const SCheckBox = styled.input`
  display: none;
`;

export const SCheckLabel = styled.label`
  /* width: 30px; */
  height: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 420px) {
    height: 27px;
  }
`;

export const ConditionsContents = styled.div`
  padding: 30px;
  border: solid 1px #efefef;
  border-radius: 5px;
  color: #a5a5a5;
  overflow-y: auto;
  height: 0;
  max-height: 0px;
  transition: all 0.5s ease-in-out;
  &.show {
    max-height: 300px;
    height: 300px;
    margin: 5px 0 15px;
  }
  &.hide {
    padding: 0 30px;
    height: 0;
    border: 0;
  }

  div {
    font-weight: bold;
    margin-bottom: 20px;
  }
  ul {
    padding-left: 18px;
    margin: 5px 0 15px;
    li {
      list-style: disc;
    }
  }
`;
