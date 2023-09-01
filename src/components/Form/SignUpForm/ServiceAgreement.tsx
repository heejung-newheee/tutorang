import { useEffect, useState } from 'react';
import { BsCheckSquareFill, BsSquare } from 'react-icons/bs';
import { styled } from 'styled-components';

type TypeServiceAgreement = { $setIsAllChecked: React.Dispatch<React.SetStateAction<boolean>> };

const ServiceAgreement: React.FC<TypeServiceAgreement> = ({ $setIsAllChecked }) => {
  const [checkList, setCheckList] = useState<string[]>([]);

  const checkAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked ? setCheckList(['allAgreed', 'aboveFourteen', 'usageRule', 'aboutRefund', 'privateInfoDealing']) : setCheckList([]);
  };

  const check = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked);
    e.target.checked ? setCheckList([...checkList, e.target.name]) : setCheckList(checkList.filter((checked) => checked !== e.target.name));
  };

  useEffect(() => {
    if (checkList.includes('aboveFourteen') && checkList.includes('usageRule') && checkList.includes('aboutRefund') && checkList.includes('privateInfoDealing')) {
      // setCheckList(['allAgreed', 'aboveFourteen', 'usageRule', 'aboutRefund', 'privateInfoDealing']);
      $setIsAllChecked(true);
    } else {
      $setIsAllChecked(false);
    }
  }, [checkList]);
  // const handleCheckAgreement = () => setIsAgreed((prev) => !prev);

  return (
    <SContainer>
      <SHeader>
        <h2>약관동의</h2>
      </SHeader>
      <CheckTeramsAndConditions>
        <SCheckBox
          type="checkbox"
          id="allAgreed"
          name="allAgreed"
          onChange={checkAll}
          checked={checkList.includes('aboveFourteen') && checkList.includes('usageRule') && checkList.includes('aboutRefund') && checkList.includes('privateInfoDealing') ? true : false}
        />
        <SCheckLabel htmlFor="allAgreed">
          {checkList.includes('aboveFourteen') && checkList.includes('usageRule') && checkList.includes('aboutRefund') && checkList.includes('privateInfoDealing') ? (
            <BsCheckSquareFill className="agree_checkbox" />
          ) : (
            <BsSquare className="agree_checkbox" />
          )}
        </SCheckLabel>{' '}
        <Label htmlFor="allAgreed">전체동의</Label>
      </CheckTeramsAndConditions>
      <SPartitionLine />
      <CheckTeramsAndConditions>
        <SCheckBox type="checkbox" id="aboveFourteen" name="aboveFourteen" onChange={check} checked={checkList.includes('aboveFourteen') ? true : false} />
        <SCheckLabel htmlFor="aboveFourteen">{checkList.includes('aboveFourteen') ? <BsCheckSquareFill className="agree_checkbox" /> : <BsSquare className="agree_checkbox" />}</SCheckLabel>
        <Label htmlFor="aboveFourteen">(필수) 만 14세 이상입니다.</Label>
        <Span>보기</Span>
      </CheckTeramsAndConditions>
      <CheckTeramsAndConditions>
        <SCheckBox type="checkbox" id="usageRule" name="usageRule" onChange={check} checked={checkList.includes('usageRule') ? true : false} />
        <SCheckLabel htmlFor="usageRule">{checkList.includes('usageRule') ? <BsCheckSquareFill className="agree_checkbox" /> : <BsSquare className="agree_checkbox" />}</SCheckLabel> <Label htmlFor="aboveFourteen">(필수) 이용약관 동의</Label>
        <Span>보기</Span>
      </CheckTeramsAndConditions>
      <CheckTeramsAndConditions>
        <SCheckBox type="checkbox" id="aboutRefund" name="aboutRefund" onChange={check} checked={checkList.includes('aboutRefund') ? true : false} />{' '}
        <SCheckLabel htmlFor="aboutRefund">{checkList.includes('aboutRefund') ? <BsCheckSquareFill className="agree_checkbox" /> : <BsSquare className="agree_checkbox" />}</SCheckLabel>
        <Label htmlFor="aboutRefund">(필수) 튜터랑 매칭방식 및 환불 규정 동의</Label>
        <Span>보기</Span>
      </CheckTeramsAndConditions>
      <CheckTeramsAndConditions>
        <SCheckBox type="checkbox" id="privateInfoDealing" name="privateInfoDealing" onChange={check} checked={checkList.includes('privateInfoDealing') ? true : false} />{' '}
        <SCheckLabel htmlFor="privateInfoDealing">{checkList.includes('privateInfoDealing') ? <BsCheckSquareFill className="agree_checkbox" /> : <BsSquare className="agree_checkbox" />}</SCheckLabel>
        <Label htmlFor="privateInfoDealing">(필수) 개인정보 취급방침 동의</Label>
        <Span>보기</Span>
      </CheckTeramsAndConditions>
      {/* <SButton type="button" disabled={!isAllChecked} onClick={moveToSignUpForm}>
        계속하기
      </SButton> */}
    </SContainer>
  );
};

export default ServiceAgreement;

// signUp에 SUnderForm이랑 css 비슷하게 가
const SContainer = styled.section`
  box-sizing: border-box;
  width: 100%;
  max-width: 650px;
  min-width: 360;
  height: 550px;
  padding: 0px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
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

const SHeader = styled.header`
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
    height: 130px;
    & h2 {
      font-size: 25px;
      font-weight: 600;
    }
  }
`;

const Label = styled.label`
  width: 100%;
  color: #3d3d3d;
`;
const Span = styled.span`
  width: 40px;
  cursor: pointer;
  color: #706d6d;
`;

const CheckTeramsAndConditions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
`;

const SCheckBox = styled.input`
  display: none;
`;

const SCheckLabel = styled.label`
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
