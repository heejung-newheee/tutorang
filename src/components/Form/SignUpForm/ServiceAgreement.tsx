import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

type TServiceAgreementProps = {
  setFormComponent: React.Dispatch<React.SetStateAction<string>>;
};

const ServiceAgreement: React.FC<TServiceAgreementProps> = ({ setFormComponent }) => {
  const [checkList, setCheckList] = useState<string[]>([]);
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);

  const checkAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked ? setCheckList(['allAgreed', 'aboveFourteen', 'usageRule', 'aboutRefund', 'privateInfoDealing']) : setCheckList([]);
  };

  const check = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked ? setCheckList([...checkList, e.target.name]) : setCheckList(checkList.filter((checked) => checked !== e.target.name));
  };

  useEffect(() => {
    if (checkList.includes('aboveFourteen') && checkList.includes('usageRule') && checkList.includes('aboutRefund') && checkList.includes('privateInfoDealing')) {
      // setCheckList(['allAgreed', 'aboveFourteen', 'usageRule', 'aboutRefund', 'privateInfoDealing']);
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }
  }, [checkList]);
  // const handleCheckAgreement = () => setIsAgreed((prev) => !prev);
  const moveToSignUpForm = () => setFormComponent('infoForSignup');
  return (
    <SWrapper>
      <CheckAllTermsAndConditions>
        <CheckBox type="checkbox" id="allAgreed" name="allAgreed" onChange={checkAll} checked={checkList.length === 5 ? true : false} /> <Label htmlFor="allAgreed">전체동의</Label>
      </CheckAllTermsAndConditions>

      <CheckTeramsAndConditions>
        <CheckBox type="checkbox" id="aboveFourteen" name="aboveFourteen" onChange={check} checked={checkList.includes('aboveFourteen') ? true : false} /> <Label htmlFor="aboveFourteen">(필수) 만 14세 이상입니다.</Label>
        <Span>보기</Span>
      </CheckTeramsAndConditions>
      <CheckTeramsAndConditions>
        <CheckBox type="checkbox" id="usageRule" name="usageRule" onChange={check} checked={checkList.includes('usageRule') ? true : false} /> <Label htmlFor="usageRule">(필수) 이용약관 동의</Label>
        <Span>보기</Span>
      </CheckTeramsAndConditions>
      <CheckTeramsAndConditions>
        <CheckBox type="checkbox" id="aboutRefund" name="aboutRefund" onChange={check} checked={checkList.includes('aboutRefund') ? true : false} /> <Label htmlFor="aboutRefund">(필수) 튜터랑 매칭방식 및 환불 규정 동의</Label>
        <Span>보기</Span>
      </CheckTeramsAndConditions>
      <CheckTeramsAndConditions>
        <CheckBox type="checkbox" id="privateInfoDealing" name="privateInfoDealing" onChange={check} checked={checkList.includes('privateInfoDealing') ? true : false} /> <Label htmlFor="privateInfoDealing">(필수) 개인정보 취급방침 동의</Label>
        <Span>보기</Span>
      </CheckTeramsAndConditions>
      <SButton type="button" disabled={!isAllChecked} onClick={moveToSignUpForm}>
        계속하기
      </SButton>
    </SWrapper>
  );
};

export default ServiceAgreement;

const SWrapper = styled.section`
  width: 400px;
  height: 500px;
  padding: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
`;

const Label = styled.label`
  width: 100%;
`;
const Span = styled.span`
  width: 40px;
  cursor: pointer;
`;

const CheckTeramsAndConditions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SButton = styled.button<{ disabled: boolean }>`
  background-color: ${(props) => {
    if (props.disabled === true) return '#eee';
    else return '#933636ed';
  }};
  color: #fff;
  cursor: ${(props) => {
    if (props.disabled === true) return 'not-allowed';
    else return 'pointer';
  }};
`;

const CheckAllTermsAndConditions = styled.div``;

const CheckBox = styled.input``;
