import { Link } from 'react-router-dom';
import { Section } from '../../../pages/main/Main';
import * as S from './Footer.syled';
const Footer = () => {
  return (
    <S.FooterContainer>
      <Section>
        <S.Inner>
          <S.FooterWrap>
            <div>
              <p>Copyright &copy; 2023 jaesanpaljo All rights reserved</p>
            </div>
            <S.FootLink>
              <Link className="github" to="https://github.com/heejung-newheee/tutorang">
                Github
              </Link>
              <Link to="https://github.com/heejung-newheee">YooHJ</Link>
              <Link to="https://github.com/JellyBear97">LeeJE</Link>
              <Link to="https://github.com/qaws7791">JunDH</Link>
              <Link to="https://github.com/goatisgoat">KimYJ</Link>
              <Link to="https://github.com/ikik-pd">KimSI</Link>
            </S.FootLink>
          </S.FooterWrap>
        </S.Inner>
      </Section>
    </S.FooterContainer>
  );
};

export default Footer;
