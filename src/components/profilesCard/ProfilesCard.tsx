import { icon_location_gray, icon_school } from '../../assets';
import { Views } from '../../supabase/database.types';
import * as S from './ProfilesCard.styled';

interface pageProps {
  tutor: Views<'tutor_info_join'>;
}

const ProfilesCard = ({ tutor }: pageProps) => {
  return (
    <>
      <S.TutorImg>
        <img src={tutor.tutor_img || undefined} alt="" />
      </S.TutorImg>
      <S.TutorInfo>
        <S.TutorTitle>{tutor.class_info}</S.TutorTitle>
        <S.TutorName>{tutor.tutor_name}</S.TutorName>
        <S.TutorContent>
          <div>
            <S.InfoIcon src={icon_location_gray} alt="" /> {tutor.location1_gugun} | {tutor.location2_gugun}
          </div>
          <div>
            <S.InfoIcon src={icon_school} alt="" />
            {tutor.university} | {tutor.major}
          </div>
          <S.Tag>
            {tutor.personality && tutor.personality.length > 0 ? (
              <>
                {tutor.personality[0] ? <div>#{tutor.personality[0]}</div> : <br />}
                {tutor.personality[1] ? <div>#{tutor.personality[1]}</div> : <br />}
                {tutor.personality[2] ? <div>#{tutor.personality[2]}</div> : <br />}
              </>
            ) : (
              <div></div>
            )}
          </S.Tag>
        </S.TutorContent>
      </S.TutorInfo>
      {/* </S.TutorCard> */}
    </>
  );
};

export default ProfilesCard;
