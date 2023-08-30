import { Views } from '../../supabase/database.types';
import * as S from './ProfilesCard.styled';

interface pageProps {
  tutor: Views<'tutor_info_join'>;
}

const ProfilesCard = ({ tutor }: pageProps) => {
  console.log(tutor); // 튜터 정보 넘겨주셔서 사용하시면 됩니당

  return (
    <>
      <S.TutorCard to={`/detail/${tutor.tutor_id}`} key={tutor.tutor_info_id}>
        <S.TutorImg>
          <img src={tutor.tutor_img || undefined} alt="" />
        </S.TutorImg>
        <S.TutorInfo>
          <S.TutorTitle>{tutor.class_info}</S.TutorTitle>
          <S.TutorName>{tutor.tutor_name}</S.TutorName>
          <S.TutorContent>
            {tutor.location1_gugun} | {tutor.location2_gugun}
            {tutor.university} | {tutor.major}
            <S.Tag>
              <div>#{tutor.personality}</div>
              <div>#열정적인</div>
              <div>#열정적인</div>
            </S.Tag>
          </S.TutorContent>
        </S.TutorInfo>
      </S.TutorCard>
    </>
  );
};

export default ProfilesCard;
