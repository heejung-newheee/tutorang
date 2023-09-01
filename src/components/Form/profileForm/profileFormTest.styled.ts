import { styled } from 'styled-components';

export const SContainer = styled.div``;

export const SForm = styled.form`
  box-sizing: border-box;
  padding: 80px 20px;
  margin: 0 auto;
  width: 100%;
  max-width: 650px;
  min-width: 360px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  @media screen and (max-width: 420px) {
    padding: 50px 20px;
  }
`;

export const SFormItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const SInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  line-height: 50px;
  border: 1px solid #696969;
  border-radius: 3px;
  outline: none;
  padding: 8px 10px;
  font-size: 16px;
  @media screen and (max-width: 420px) {
    height: 45px;
    line-height: 45px;
  }
`;

export const SButton = styled.button<{ disabled: boolean }>`
  height: 50px;
  font-size: 16px;
  background-color: ${(props) => {
    if (props.disabled === true) return '#e7e7e7';
    else return '#FE902F';
  }};
  color: #fff;
  cursor: ${(props) => {
    if (props.disabled === true) return 'not-allowed';
    else return 'pointer';
  }};
  border-radius: 3px;
  margin-top: 20px;
  /* @media screen and (max-width: 420px) {
    width: 100%;
  } */
`;

/* location */
export const SFormItemHeader = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  gap: 10px;
  & span {
    vertical-align: bottom;
  }
`;

export const SFormItemBody = styled.div`
  border: 1px solid #696969;
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 20px 10px;
  width: 100%;
  gap: 25px;
`;

export const SFormItemBodySection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
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
