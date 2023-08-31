import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Tables, Views } from '../../../supabase/database.types';
import ProfilesCard from '../../profilesCard/ProfilesCard';
import supabase from '../../../supabase';
import { useEffect, useState } from 'react';
import school from '../../../assets/school.png';
import location from '../../../assets/location-icon.png';

type Props = {
  userInfo: Views<'tutor_info_join'>;
};

const TutorListCompo = ({ userInfo }: Props) => {
  console.log(userInfo, 'userInfo');
  console.log('TutorListCompo');

  ////sfsfdsfdsfsf
  // const fetchUserInfo = async (userId: string | null) => {
  //   const { data, error } = await supabase.from('tutor_info_join').select('*').eq('tutor_id', userId).single(); // 단일 결과로 가져오기

  //   if (error) {
  //     console.error('Error fetching user info:', error);
  //   } else {
  //     // console.log('User info:', data);
  //     setAdditional(data);
  //     // 데이터를 상태로 저장하거나 다른 작업을 수행할 수 있음
  //   }
  // };

  // useEffect(() => {
  //   fetchUserInfo(userInfo.user_id);
  // }, []);

  return (
    <TutorContainer to={`/detail/${userInfo?.tutor_id}`} key={userInfo?.tutor_info_id}>
      <img src={userInfo?.tutor_img || 'https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/advices/168628538809485777.png?gif=1&w=1440'} alt="" />
      <InFoWrap>
        <div>{userInfo.class_info}</div>
        <SSSSSS>
          <Name>{userInfo?.tutor_name}(hello)</Name>
          <LocationDiv>
            <div>
              <p>
                <img src={location} alt="school" />
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="#383838" height="1em" viewBox="0 0 384 512">
                  <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                </svg>{' '} */}
                location1 | location2
              </p>
              {/* {userInfo.location1_gugun} | {userInfo.location2_gugun} */}
            </div>
            <div>
              {' '}
              <svg xmlns="http://www.w3.org/2000/svg" fill="#383838" height="0.8em" viewBox="0 0 512 512">
                <path d="M243.4 2.6l-224 96c-14 6-21.8 21-18.7 35.8S16.8 160 32 160v8c0 13.3 10.7 24 24 24H456c13.3 0 24-10.7 24-24v-8c15.2 0 28.3-10.7 31.3-25.6s-4.8-29.9-18.7-35.8l-224-96c-8-3.4-17.2-3.4-25.2 0zM128 224H64V420.3c-.6 .3-1.2 .7-1.8 1.1l-48 32c-11.7 7.8-17 22.4-12.9 35.9S17.9 512 32 512H480c14.1 0 26.5-9.2 30.6-22.7s-1.1-28.1-12.9-35.9l-48-32c-.6-.4-1.2-.7-1.8-1.1V224H384V416H344V224H280V416H232V224H168V416H128V224zM256 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
              </svg>
              <p>university | major</p>
              {/* {userInfo.university} | {userInfo.major} */}
            </div>
          </LocationDiv>

          <div>
            <TutorContent>
              <Tag>
                <div>#{userInfo.personality}</div>
                <div>#열정적인</div>
                <div>#열정적인</div>
              </Tag>
            </TutorContent>
          </div>
        </SSSSSS>
      </InFoWrap>
    </TutorContainer>

    // <TutorCard to={`/detail/${additional?.tutor_id}`} key={additional?.tutor_info_id}>
    //   <TutorImg>
    //     <img src={additional?.tutor_img || undefined} alt="" />
    //   </TutorImg>
    //   <TutorInfo>
    //     <TutorTitle>{userInfo.class_info}</TutorTitle>
    //     <TutorName>{additional?.tutor_name}</TutorName>
    // <TutorContent>
    //   {userInfo.location1_gugun} | {userInfo.location2_gugun}
    //   {userInfo.university} | {userInfo.major}
    //   <Tag>
    //     <div>#{userInfo.personality}</div>
    //     <div>#열정적인</div>
    //     <div>#열정적인</div>
    //   </Tag>
    // </TutorContent>
    //   </TutorInfo>
    // </TutorCard>
  );
};

export default TutorListCompo;

const TutorContainer = styled(Link)`
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  & > img {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    width: 100%;

    object-fit: cover;
    /* height: 60%; */
    max-height: 320px;
  }
`;

const InFoWrap = styled.div`
  /* background-color: #fe902f; */

  & > div:first-child {
    margin: 5px 0;
    border-left: 3px solid #fe902f;
    margin-left: 10px;
    font-weight: 600;
    /* background-color: aqua;s */
    padding-left: 7px;
    /* margin-top: 10px; */

    & > div:last-child {
      padding: 10px;
      /* background-color: #508787;s */

      & > div {
        display: flex;
        margin-right: 10px;

        & > span {
          margin-right: 10px;
          border: 1px solid black;
        }
      }
    }
  }
`;

const SSSSSS = styled.div`
  /* border: 1px solid black;s */
  padding-top: 10px;
  padding-left: 15px;
`;

const Name = styled.div`
  margin-bottom: 5px;
  font-size: 15px;
`;

const LocationDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  /* gap: 15px; */
  /* padding-left: 15px;s */
  margin-bottom: 5px;

  & > div {
    margin-right: 5px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }

  /* & > div > svg {
    width: 5px;
  } */
  & > div > p {
    font-size: 13px;
    color: gray;
  }
`;

// export const TutorCard = styled(Link)`
//   width: 335px;
//   margin-right: 30px;
//   border-radius: 8px;
//   box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
//   overflow: hidden;
// `;
// export const TutorImg = styled.div`
//   width: 100%;
//   height: 265px;
//   overflow: hidden;
//   img {
//     width: 100%;
//     overflow: hidden;
//     object-fit: cover;
//   }
// `;
// export const TutorInfo = styled.div`
//   padding: 25px;
// `;
// export const TutorTitle = styled.h5`
//   font-size: 17px;
//   font-weight: bold;
//   border-left: 3px solid #fe902f;
//   padding-left: 8px;
//   margin-bottom: 25px;
//   overflow: hidden;
//   white-space: nowrap;
//   text-overflow: ellipsis;
// `;
// export const TutorName = styled.div`
//   font-size: 16px;
//   margin-bottom: 12px;
// `;
export const TutorContent = styled.div`
  font-size: 13px;
  /* margin-bottom: 15px; */
`;
export const Tag = styled.div`
  display: flex;
  gap: 5px;
  div {
    padding: 0 11px;
    line-height: 26px;
    border-radius: 13px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
`;
