import { Views } from '../../../supabase/database.types';
import icon_location from '../../../assets/marker-location.png';
import * as S from './TutorListCompo.styled';

type Props = {
  LastelementRef: (node: HTMLDivElement) => void;
  userInfo: Views<'tutor_info_join'>;
};

const LastTutorListCompo = ({ LastelementRef, userInfo }: Props) => {
  return (
    <S.TutorContainer to={`/detail/${userInfo?.tutor_id}`} key={userInfo?.tutor_info_id}>
      <img src={userInfo?.tutor_img || 'https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/advices/168628538809485777.png?gif=1&w=1440'} alt="" />
      <S.InFoWrap ref={LastelementRef}>
        <S.Title>{userInfo.class_info}</S.Title>
        <S.TutorInfo>
          <S.Name>{userInfo?.tutor_name}(hello)</S.Name>
          <S.LocationDiv>
            <div>
              <img src={icon_location} alt="school" />
              location1 | location2
              {/* {userInfo.location1_gugun} | {userInfo.location2_gugun} */}
            </div>
            <div>
              {' '}
              <svg xmlns="http://www.w3.org/2000/svg" fill="#383838" height="1em" viewBox="0 0 512 512">
                <path d="M243.4 2.6l-224 96c-14 6-21.8 21-18.7 35.8S16.8 160 32 160v8c0 13.3 10.7 24 24 24H456c13.3 0 24-10.7 24-24v-8c15.2 0 28.3-10.7 31.3-25.6s-4.8-29.9-18.7-35.8l-224-96c-8-3.4-17.2-3.4-25.2 0zM128 224H64V420.3c-.6 .3-1.2 .7-1.8 1.1l-48 32c-11.7 7.8-17 22.4-12.9 35.9S17.9 512 32 512H480c14.1 0 26.5-9.2 30.6-22.7s-1.1-28.1-12.9-35.9l-48-32c-.6-.4-1.2-.7-1.8-1.1V224H384V416H344V224H280V416H232V224H168V416H128V224zM256 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
              </svg>
              university | major
              {/* {userInfo.university} | {userInfo.major} */}
            </div>
          </S.LocationDiv>

          <S.TutorContent>
            <S.Tag>
              <div>#{userInfo.personality}</div>
              <div>#열정적인</div>
              <div>#열정적인</div>
            </S.Tag>
          </S.TutorContent>
        </S.TutorInfo>
      </S.InFoWrap>
    </S.TutorContainer>
  );
};

export default LastTutorListCompo;
