import { foot_logo } from '../../../assets';
import { Section } from '../../../pages/Main';
import * as S from './Footer.syled';
const Footer = () => {
  return (
    <S.FooterContainer>
      <Section>
        <S.Inner>
          <S.FooterWrap>
            <div>
              <S.CompanyInfo>
                <div>
                  <img src={foot_logo} alt="logo" />
                </div>
                <div>
                  <S.Call>1599-5319</S.Call>
                  <p>평일 10:00 ~ 18:00</p>
                  <p>(점심시간 13:00 ~ 14:00 주말/공휴일 제외)</p>
                </div>
              </S.CompanyInfo>
              <div>
                <p>튜터랑코리아 주식회사 ㅣ 대표이사: 스파르타</p>
                <p>주소: 서울 강남구 선릉로 92길 36 순이네빌딩 3층</p>
                <p>고객문의: tutorwith@naver.com</p>
                <p>사업자등록번호: 553-29-02154ㅣ법인등록번호: 1101111-1217704 </p>
              </div>
            </div>
            <S.FootLink>
              <p>Information</p>
              <ul>
                <li>브랜드 스토리</li>
                <li>서비스 이용약관</li>
                <li>개인정보처리방침</li>
                <li>윤리신고 센터</li>
                <li>관리자 대시보드 로그인</li>
              </ul>
            </S.FootLink>
            <S.FootLink>
              <p>Comtact us</p>
              <ul>
                <li>고객센터</li>
                <li>1:1 문의</li>
                <li>자주 하는 질문</li>
              </ul>
            </S.FootLink>
          </S.FooterWrap>
        </S.Inner>
      </Section>
    </S.FooterContainer>
  );
};

export default Footer;
