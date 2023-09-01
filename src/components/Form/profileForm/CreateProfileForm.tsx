import { useState } from 'react';
import { styled } from 'styled-components';
import FormHeader from '../FormHeader';
import { FORM_CONSTANT_TITLE_USER_ADDITIONAL_INFO } from '../formConstant';
import SelectLocation from './SelectLocation';

const CreateProfileForm = () => {
  const [_, setLoaction] = useState({ sido1: '1지역 시/도 선택', gugun1: '1지역 구/군 선택', sido2: '2지역 시/도 선택', gugun2: '2지역 구/군 선택' });
  return (
    <SContainer>
      <FormHeader $keyword={FORM_CONSTANT_TITLE_USER_ADDITIONAL_INFO} />
      <SPartitionLine />
      <SForm>
        <SFormItem>
          <span>이메일</span>
          <SInput type="text" value={'로그인한 유저의 email'} disabled={true} />
        </SFormItem>
        <SFormItem></SFormItem>

        {/* [x] 지역 선택란 */}
        <SFormItem>
          <SFormItemHeader></SFormItemHeader>
          <SFormItemBody>
            <SFormItemBodySection>
              <span>지역1</span>
              <SelectLocation $locationType={'locationType1'} $setLocation={setLoaction} />
            </SFormItemBodySection>
            <SFormItemBodySection>
              <span>지역2</span>
              <SelectLocation $locationType={'locationType2'} $setLocation={setLoaction} />
            </SFormItemBodySection>
          </SFormItemBody>
        </SFormItem>
      </SForm>
    </SContainer>
  );
};

export default CreateProfileForm;

const SContainer = styled.div``;

const SForm = styled.form`
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

const SFormItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const SInput = styled.input`
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

// const SButton = styled.button<{ disabled: boolean }>`
//   height: 50px;
//   font-size: 16px;
//   background-color: ${(props) => {
//     if (props.disabled === true) return '#e7e7e7';
//     else return '#FE902F';
//   }};
//   color: #fff;
//   cursor: ${(props) => {
//     if (props.disabled === true) return 'not-allowed';
//     else return 'pointer';
//   }};
//   border-radius: 3px;
//   margin-top: 20px;
//   /* @media screen and (max-width: 420px) {
//     width: 100%;
//   } */
// `;

/* location */
const SFormItemHeader = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  gap: 10px;
  & span {
    vertical-align: bottom;
  }
`;

const SFormItemBody = styled.div`
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

const SFormItemBodySection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SPartitionLine = styled.div`
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
