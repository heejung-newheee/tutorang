import { Tab, Tabs } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { IoChatbubblesSharp } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { getOrCreatePrivateChatRoom, sendTutorMessage } from '../../../api/chat';
import { matchingPending, matchingReject } from '../../../api/match';
import { MATCHING_TUTOR_DATA_QUERY_KEY } from '../../../constants/query.constant';
import { RootState } from '../../../redux/config/configStore';
import { Views } from '../../../supabase/database.types';
import { ContentsDataBox } from '../Mypage.styled';
import * as S from './Matching.styled';
import './custom.css';
interface pageProps {
  matchList: Views<'matching_tutor_data'>[];
}

const TabPanel = (props: any) => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      {value === index && <TabPanelBox>{children}</TabPanelBox>}
    </div>
  );
};
const MatchingStudent = ({ matchList }: pageProps) => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const queryClient = useQueryClient();

  const acceptMatchMutation = useMutation(matchingPending, {
    onSuccess: () => {
      queryClient.invalidateQueries([MATCHING_TUTOR_DATA_QUERY_KEY]);
    },
  });

  const rejectMatchMutation = useMutation(matchingReject, {
    onSuccess: () => {
      queryClient.invalidateQueries([MATCHING_TUTOR_DATA_QUERY_KEY]);
    },
  });
  // 튜터가 수락
  const acceptMatch = async (id: string, student_id: string) => {
    if (!user) return;
    acceptMatchMutation.mutate(id);
    try {
      const room = await getOrCreatePrivateChatRoom(student_id);
      await sendTutorMessage(room.room_id, 'pending');
    } catch (err) {
      console.error(err);
    }
  };

  // 튜터가 거절
  const rejectMatch = async (id: string, student_id: string) => {
    if (!user) return;
    rejectMatchMutation.mutate(id);
    try {
      const room = await getOrCreatePrivateChatRoom(student_id);
      await sendTutorMessage(room.room_id, 'reject');
    } catch (err) {
      console.error(err);
    }
  };

  const [activeTab, setActiveTab] = useState<number>(0);
  const handleTabChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };
  // 튜터와의 채팅창 이동
  const handleStartChat = async (tutorId: string) => {
    if (!tutorId) return;

    try {
      const chatRoom = await getOrCreatePrivateChatRoom(tutorId);
      navigate(`/chat?room_id=${chatRoom.room_id}`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Tabs value={activeTab} onChange={handleTabChange} aria-label="tab menu">
        <Tab label="요청중" />
        <Tab label="요청완료" />
        <Tab label="수업완료" />
      </Tabs>
      <TabPanel value={activeTab} index={0}>
        <S.InfoList>
          <S.InfoItem style={{ textAlign: 'center', height: '56px', borderTop: '0' }}>
            <div>학생 이름</div>
            <div>지역</div>
            <div>날짜</div>
            <div>취소</div>
          </S.InfoItem>
        </S.InfoList>
        <ContentsDataBox>
          {matchList &&
            matchList
              .filter((item: Views<'matching_tutor_data'>) => {
                return item.status === 'request';
              })
              .map((item: Views<'matching_tutor_data'>) => {
                return (
                  <S.InfoList key={item.id}>
                    <S.InfoItem>
                      <div>
                        <div>
                          <S.UserAvatar src={item.student_img!} alt="tutor avatar" />
                          <p>{item.student_name}</p>
                        </div>
                        <S.UserLinkWrap>
                          <S.ChatLink onClick={() => handleStartChat(item.user_id!)}>
                            <IoChatbubblesSharp />
                          </S.ChatLink>
                        </S.UserLinkWrap>
                      </div>
                      <div>
                        {item.student_lc_1_gugun}
                        <br />
                        {item.student_lc_2_gugun}
                      </div>
                      <div>{item.created_at ? item.created_at.split('T')[0] : '날짜 없음'}</div>
                      <S.MatchBtnWrap>
                        <S.MatchBtn onClick={() => item.id !== null && acceptMatch(item.id, item.user_id!)}>수락</S.MatchBtn>
                        <S.MatchBtn onClick={() => item.id !== null && rejectMatch(item.id, item.user_id!)}>거절</S.MatchBtn>
                      </S.MatchBtnWrap>
                    </S.InfoItem>
                  </S.InfoList>
                );
              })}
        </ContentsDataBox>
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <S.InfoList>
          <S.InfoItem style={{ textAlign: 'center', height: '56px', borderTop: '0' }}>
            <div>학생 이름</div>
            <div>지역</div>
            <div>날짜</div>
            <div>확인</div>
          </S.InfoItem>
        </S.InfoList>
        <ContentsDataBox>
          {matchList &&
            matchList
              .filter((item: Views<'matching_tutor_data'>) => {
                return item.status === 'pending';
              })
              .map((item: Views<'matching_tutor_data'>) => {
                return (
                  <S.InfoList key={item.id}>
                    <S.InfoItem>
                      <div>
                        <div>
                          <S.UserAvatar src={item.student_img!} alt="tutor avatar" />
                          <p>{item.student_name}</p>
                        </div>
                        <S.UserLinkWrap>
                          <S.ChatLink onClick={() => handleStartChat(item.user_id!)}>
                            <IoChatbubblesSharp />
                          </S.ChatLink>
                        </S.UserLinkWrap>
                      </div>
                      <div>
                        {item.student_lc_1_gugun}
                        <br />
                        {item.student_lc_2_gugun}
                      </div>
                      <div>{item.created_at ? item.created_at.split('T')[0] : '날짜 없음'}</div>
                      <div>매칭 진행중</div>
                    </S.InfoItem>
                  </S.InfoList>
                );
              })}
        </ContentsDataBox>
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        <S.InfoList>
          <S.InfoItem style={{ textAlign: 'center', height: '56px', borderTop: '0' }}>
            <div>학생 이름</div>
            <div>지역</div>
            <div>날짜</div>
            <div>확인</div>
          </S.InfoItem>
        </S.InfoList>
        <ContentsDataBox>
          {matchList &&
            matchList
              .filter((item: Views<'matching_tutor_data'>) => {
                return item.status === 'reject' || 'complete';
              })
              .map((item: Views<'matching_tutor_data'>) => {
                return (
                  <S.InfoList key={item.id}>
                    <S.InfoItem>
                      <div>
                        <div>
                          <S.UserAvatar src={item.student_img!} alt="tutor avatar" />
                          <p>{item.student_name}</p>
                        </div>
                        <S.UserLinkWrap>
                          <S.ChatLink onClick={() => handleStartChat(item.user_id!)}>
                            <IoChatbubblesSharp />
                          </S.ChatLink>
                        </S.UserLinkWrap>
                      </div>
                      <div>
                        {item.student_lc_1_gugun}
                        <br />
                        {item.student_lc_2_gugun}
                      </div>
                      <div>{item.created_at ? item.created_at.split('T')[0] : '날짜 없음'}</div>
                      <div>{item.status === 'reject' ? '매칭취소' : '매칭완료'}</div>
                    </S.InfoItem>
                  </S.InfoList>
                );
              })}
        </ContentsDataBox>
      </TabPanel>
    </div>
  );
};

export default MatchingStudent;

const TabPanelBox = styled.div`
  background-color: #fff;
  border-radius: 8px;
  margin-top: 50px;
`;
