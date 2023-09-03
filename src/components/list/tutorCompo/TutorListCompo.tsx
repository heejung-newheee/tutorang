import { Views } from '../../../supabase/database.types';
import icon_location from '../../../assets/marker-location.png';
import graduation from '../../../assets/graduation-hat.png';
import * as S from './TutorListCompo.styled';

type Props = {
  userInfo: Views<'tutor_info_join'>;
};

const TutorListCompo = ({ userInfo }: Props) => {
  return (
    <S.TutorContainer to={`/detail/${userInfo?.tutor_id}`} key={userInfo?.tutor_info_id}>
      <img src={userInfo?.tutor_img || 'https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/advices/168628538809485777.png?gif=1&w=1440'} alt="" />
      <S.InFoWrap>
        <S.Title>{userInfo.class_info}</S.Title>
        <S.TutorInfo>
          <S.Name>{userInfo?.tutor_name}(hello)</S.Name>
          <S.LocationDiv>
            <div>
              <img src={icon_location} alt="" />
              location1 | location2
              {/* {userInfo.location1_gugun} | {userInfo.location2_gugun} */}
            </div>
            <div>
              {' '}
              <img src={graduation} alt="" />
              university | major
              {/* {userInfo.university} | {userInfo.major} */}
            </div>
          </S.LocationDiv>

          <S.TutorContent>
            <S.Tag>
              {userInfo.personality?.map((item) => (
                <div key={item}>#{item}</div>
              ))}
            </S.Tag>
          </S.TutorContent>
        </S.TutorInfo>
      </S.InFoWrap>
    </S.TutorContainer>
  );
};

export default TutorListCompo;
