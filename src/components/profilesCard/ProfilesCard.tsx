import { icon_location_gray, icon_school } from '../../assets';
import { Views } from '../../supabase/database.types';
import * as S from './ProfilesCard.styled';

interface pageProps {
  tutor: Views<'tutor_info_join'> | Views<'tutor_top_reviewer'>;
}
const ProfilesCard = ({ tutor }: pageProps) => {
  return (
    <>
      <div>
        <S.TutorImg>
          <img src={tutor.tutor_card_img || undefined} alt="user profile" />
        </S.TutorImg>
        <S.TutorInfo>
          <S.TutorTitle>{tutor.class_info}</S.TutorTitle>
          <S.TutorName>{tutor.tutor_name}</S.TutorName>
          <S.TutorContent>
            <div>
              <S.InfoIcon src={icon_location_gray} alt="location info" /> {tutor.location1_sido} - {tutor.location1_gugun} | {tutor.location2_sido} - {tutor.location2_gugun}
            </div>
            <div>
              <S.InfoIcon src={icon_school} alt="univesity info" /> {tutor.university} | {tutor.major}
            </div>
            <S.Tag>
              {tutor.personality?.map((personal) => {
                return <div key={personal}>#{personal}</div>;
              })}
            </S.Tag>
          </S.TutorContent>
        </S.TutorInfo>{' '}
      </div>
    </>
  );
};

export default ProfilesCard;
