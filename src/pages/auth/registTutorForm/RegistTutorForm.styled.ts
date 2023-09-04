import { styled } from 'styled-components';

export const Container = styled.div``;

export const Form = styled.form`
  box-sizing: border-box;
  padding: 40px 20px;
  margin: 0 auto;
  width: 100%;
  max-width: 650px;
  min-width: 360px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  @media screen and (max-width: 420px) {
    padding: 30px 20px;
  }
`;

export const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
export const FormItemTitle = styled.span`
  font-weight: 500;
`;

export const FormItemHeader = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  gap: 10px;
  & span {
    vertical-align: bottom;
  }
`;

export const FormItemBody = styled.div`
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  gap: 15px;
`;

export const FormItemBodySection = styled.section`
  border-radius: 3px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const ItemSchool = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
export const FormCertificateItems = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  padding: 20px 10px;
  border: 1px solid #696969;
  border-radius: 3px;
`;

export const CertificateItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const GuideBox = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  font-size: 14px;
`;

export const PGuideMessage = styled.ul`
  color: #aeaeae;
`;

export const Items = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px 5px;
  justify-content: space-between;
`;

export const Input = styled.input`
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

export const Textarea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  height: 80px;
  border: 1px solid #696969;
  border-radius: 3px;
  resize: none;
  outline: none;
  padding: 8px;
  font-size: 16px;
`;

export const TuitionItems = styled.div`
  border: 1px solid #696969;
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 20px 10px;
  width: 100%;
  gap: 25px;
  @media screen and (min-width: 1024px) {
    gap: 10px;
  }
`;

export const TuitionItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 5px;
  @media screen and (min-width: 1024px) {
    width: 48%;
  }
`;

export const ItemHeader = styled.div``;

export const Button = styled.button`
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
`;

export const PartitionLine = styled.div`
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
