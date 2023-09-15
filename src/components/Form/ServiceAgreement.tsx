import { useEffect, useState } from 'react';
import { BsCheckSquareFill, BsSquare } from 'react-icons/bs';
import { styled } from 'styled-components';
import * as S from './AuthForm.styled';
import { CheckTeramsAndConditions, Label, SCheckBox, SCheckLabel, SCheckboxContainer, SHeader, SPartitionLine, Span } from './AuthForm.styled';

type TypeServiceAgreement = { $setIsAllChecked: React.Dispatch<React.SetStateAction<boolean>> };

const ServiceAgreement: React.FC<TypeServiceAgreement> = ({ $setIsAllChecked }) => {
  const [checkList, setCheckList] = useState<string[]>([]);
  const [conditionOne, setConditionOne] = useState(false);
  const [conditionTwo, setConditionTwo] = useState(false);
  const [conditionThree, setConditionThree] = useState(false);

  const checkAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked ? setCheckList(['allAgreed', 'aboveFourteen', 'usageRule', 'aboutRefund', 'privateInfoDealing']) : setCheckList([]);
  };

  const check = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked ? setCheckList([...checkList, e.target.name]) : setCheckList(checkList.filter((checked) => checked !== e.target.name));
  };

  useEffect(() => {
    if (checkList.includes('aboveFourteen') && checkList.includes('usageRule') && checkList.includes('aboutRefund') && checkList.includes('privateInfoDealing')) {
      $setIsAllChecked(true);
    } else {
      $setIsAllChecked(false);
    }
  }, [checkList]);

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
        </SCheckLabel>
        <Label htmlFor="allAgreed">전체동의</Label>
      </CheckTeramsAndConditions>

      <SPartitionLine />

      <SCheckboxContainer>
        <div>
          <CheckTeramsAndConditions>
            <SCheckBox type="checkbox" id="aboveFourteen" name="aboveFourteen" onChange={check} checked={checkList.includes('aboveFourteen') ? true : false} />
            <SCheckLabel htmlFor="aboveFourteen">{checkList.includes('aboveFourteen') ? <BsCheckSquareFill className="agree_checkbox" /> : <BsSquare className="agree_checkbox" />}</SCheckLabel>
            <Label htmlFor="aboveFourteen">(필수) 만 14세 이상입니다.</Label>
            <Span></Span>
          </CheckTeramsAndConditions>
        </div>
        <div>
          <CheckTeramsAndConditions>
            <SCheckBox type="checkbox" id="usageRule" name="usageRule" onChange={check} checked={checkList.includes('usageRule') ? true : false} />
            <SCheckLabel htmlFor="usageRule">{checkList.includes('usageRule') ? <BsCheckSquareFill className="agree_checkbox" /> : <BsSquare className="agree_checkbox" />}</SCheckLabel> <Label htmlFor="usageRule">(필수) 이용약관 동의</Label>
            <Span onClick={() => setConditionOne((prev) => !prev)}>{conditionOne ? '닫기' : '보기'}</Span>
          </CheckTeramsAndConditions>
          <S.ConditionsContents className={conditionOne ? 'show' : 'hide'}>
            <div>회원가입 이용약관</div>
            <p>서비스 개요</p>
            <ul>
              <li>회원은 본 서비스를 이용하기 위해 회원가입을 해야 합니다</li>
              <li>본 서비스는 지역 기반 영어 회화 튜터와 학생을 연결하는 목적으로 제공됩니다</li>
            </ul>
            <p>회원 자격</p>
            <ul>
              <li>회원은 본 서비스를 이용하려면 14세 이상이어야 합니다</li>
            </ul>
            <p>서비스 이용</p>
            <ul>
              <li>회원은 본 서비스를 이용함으로써 이용약관 및 관련 규정에 동의한 것으로 간주됩니다</li>
            </ul>
            <p>개인정보 보호</p>
            <ul>
              <li>회원의 개인정보는 개인정보 처리방침에 따라 보호됩니다</li>
            </ul>
            <p>서비스 이용 규칙</p>
            <ul>
              <li>회원은 서비스 이용 시 다음을 준수해야 합니다</li>
              <li>불법 활동 및 욕설, 혐오 표현 사용 금지</li>
              <li>지역 및 튜터 선택 시 신중한 판단 필요</li>
            </ul>
          </S.ConditionsContents>
        </div>
        <div>
          <CheckTeramsAndConditions>
            <SCheckBox type="checkbox" id="aboutRefund" name="aboutRefund" onChange={check} checked={checkList.includes('aboutRefund') ? true : false} />{' '}
            <SCheckLabel htmlFor="aboutRefund">{checkList.includes('aboutRefund') ? <BsCheckSquareFill className="agree_checkbox" /> : <BsSquare className="agree_checkbox" />}</SCheckLabel>
            <Label htmlFor="aboutRefund">(필수) 튜터 매칭방식 및 환불 규정 동의</Label>
            <Span onClick={() => setConditionTwo((prev) => !prev)}>{conditionTwo ? '닫기' : '보기'}</Span>
          </CheckTeramsAndConditions>
          <S.ConditionsContents className={conditionTwo ? 'show' : 'hide'}>
            <div>튜터 매칭방식 및 환불 규정 동의 약관</div>
            <p>튜터 매칭방식 동의</p>
            <ul>
              <li>회원은 튜터 매칭방식을 이해하고 동의합니다</li>
              <li>튜터와 학생은 지역을 기반으로 매칭됩니다</li>
              <li>튜터 및 학생 선택 권한은 회원에게 있으며, 선택 후 매칭됩니다</li>
            </ul>
            <p>수업 환불 규정 동의</p>
            <ul>
              <li>수업 결제 및 환불 규정에 동의합니다</li>
              <li>환불 정책: 수업 시작 전 24시간 이내 환불 가능, 이후 환불 불가 </li>
              <li>취소 시 수업료의 일부가 공제될 수 있습니다</li>
            </ul>
            <p>수업 취소 및 변경</p>
            <ul>
              <li>수업 취소 또는 변경은 미리 알림으로만 가능합니다</li>
              <li>취소 또는 변경 시간은 수업 시작 전 최소 24시간 전이어야 합니다</li>
            </ul>
            <p>튜터와의 의사소통</p>
            <ul>
              <li>튜터와 학생은 수업 일정 및 내용에 대한 의사소통을 원활하게 진행해야 합니다</li>
            </ul>
            <p>환불 처리 시간</p>
            <ul>
              <li>환불은 처리에 몇 영업일이 소요될 수 있습니다</li>
            </ul>
            <p>서비스 이용 규칙</p>
            <ul>
              <li>튜터와 학생은 서비스 이용 시 다음을 준수해야 합니다</li>
              <li>수업 일정 및 환불 정책을 이해하고 준수</li>
              <li>예정된 수업 일정을 지켜야 합니다</li>
            </ul>
          </S.ConditionsContents>
        </div>
        <div>
          <CheckTeramsAndConditions>
            <SCheckBox type="checkbox" id="privateInfoDealing" name="privateInfoDealing" onChange={check} checked={checkList.includes('privateInfoDealing') ? true : false} />{' '}
            <SCheckLabel htmlFor="privateInfoDealing">{checkList.includes('privateInfoDealing') ? <BsCheckSquareFill className="agree_checkbox" /> : <BsSquare className="agree_checkbox" />}</SCheckLabel>
            <Label htmlFor="privateInfoDealing">(필수) 개인정보 취급방침 동의</Label>
            <Span onClick={() => setConditionThree((prev) => !prev)}>{conditionThree ? '닫기' : '보기'}</Span>
          </CheckTeramsAndConditions>
          <S.ConditionsContents className={conditionThree ? 'show' : 'hide'}>
            <div>정보 제공 수집 및 이용동의 약관 </div>
            <p>개인정보 수집</p>
            <ul>
              <li>서비스 운영을 위해 필요한 개인정보를 수집합니다</li>
              <li>수집 항목: 이름, 연락처, 지역 정보</li>
            </ul>
            <p>개인정보 이용 목적</p>
            <ul>
              <li>회원 식별 및 연락</li>
              <li>서비스 제공 및 개선</li>
              <li>이벤트 및 프로모션 안내</li>
            </ul>
            <p>개인정보 보유 기간</p>
            <ul>
              <li>회원 탈퇴 시 또는 개인정보 파기 요청 시까지 보관됩니다</li>
            </ul>
            <p>개인정보 제3자 제공</p>
            <ul>
              <li>회원의 동의 없이 제3자에게 개인정보를 제공하지 않습니다</li>
            </ul>
            <p>개인정보 보안</p>
            <ul>
              <li>개인정보는 안전하게 보호됩니다</li>
            </ul>
            <p>개인정보 열람 및 수정</p>
            <ul>
              <li>회원은 언제든지 자신의 개인정보를 열람하고 수정할 수 있습니다</li>
            </ul>
          </S.ConditionsContents>
        </div>
      </SCheckboxContainer>
    </SContainer>
  );
};

export default ServiceAgreement;

const SContainer = styled.section`
  box-sizing: border-box;
  width: 100%;
  max-width: 650px;
  min-width: 360;
  padding: 0px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
