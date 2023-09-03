import React, { useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import { Views } from '../../supabase/database.types';
import { MATCHING_TUTOR_DATA_QUERY_KEY } from '../userInfo/UserInfo';
import { ContentsDataBox, MatchBtn } from '../userInfo/UserInfo.styled';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { matchingCancel } from '../../api/match';
import { styled } from 'styled-components';
import * as S from './MatchingTutor.styled';
import './custom.css';

import { InfoItem, InfoList } from './MatchingTutor.styled';
import { useNavigate } from 'react-router-dom';
import { createChatRoom, getChatRoomWithTutor, inviteChatRoom } from '../../api/chat';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/config/configStore';

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

const MatchingTutor = ({ matchList }: pageProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<number>(0);
  const loginUser = useSelector((state: RootState) => state.user.user);

  const cancelMatchMutation = useMutation(matchingCancel, {
    onSuccess: () => {
      queryClient.invalidateQueries(MATCHING_TUTOR_DATA_QUERY_KEY);
    },
  });

  const handleTabChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };
  const handleCancelMatch = async (id: string) => {
    if (window.confirm('요청을 취소 하시겠습니까?')) cancelMatchMutation.mutate(id);
  };

  const handleStartChat = async (tutorId: string) => {
    if (!tutorId) return;

    try {
      const chatRoom = await getChatRoomWithTutor(loginUser!.id, tutorId);

      if (chatRoom.length > 0) {
        navigate(`/chat?room_id=${chatRoom[0].room_id}`);
        return;
      }

      const newRoom = await createChatRoom();

      await inviteChatRoom(newRoom.room_id, tutorId);

      navigate(`/chat?room_id=${newRoom.room_id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Tabs value={activeTab} onChange={handleTabChange} aria-label="tab menu">
        <Tab label="요청 대기" />
        <Tab label="매칭 완료" />
      </Tabs>
      <TabPanel value={activeTab} index={0}>
        <S.InfoList>
          <S.InfoItem style={{ textAlign: 'center', height: '56px', borderTop: '0' }}>
            <div>상태</div>
            <div>튜터 이름</div>
            <div>지역</div>
            <div>날짜</div>
            <div>취소</div>
          </S.InfoItem>
        </S.InfoList>

        <ContentsDataBox>
          {matchList &&
            matchList
              .filter((item: Views<'matching_tutor_data'>) => {
                return item.matched === false;
              })
              .map((item: Views<'matching_tutor_data'>) => {
                return (
                  <S.InfoList key={item.id}>
                    <S.InfoItem>
                      <div>{item.status}</div>
                      <div>
                        <S.TutorChatLink onClick={() => handleStartChat(item.tutor_id!)}>{item.tutor_name}</S.TutorChatLink>
                      </div>
                      <div>
                        {item.tutor_lc_1_gugun} | {item.tutor_lc_2_gugun}
                      </div>
                      <div>{item.created_at ? item.created_at.split('T')[0] : '날짜 없음'}</div>
                      <div>
                        <MatchBtn onClick={() => item.id !== null && handleCancelMatch(item.id)}>요청 취소</MatchBtn>
                      </div>
                    </S.InfoItem>
                  </S.InfoList>
                );
              })}
        </ContentsDataBox>
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <InfoList>
          <InfoItem style={{ textAlign: 'center', height: '56px', borderTop: '0' }}>
            <div>상태</div>
            <div>튜터 이름</div>
            <div>지역</div>
            <div>날짜</div>
            <div>확인</div>
          </InfoItem>
        </InfoList>

        <ContentsDataBox>
          {matchList &&
            matchList
              .filter((item: Views<'matching_tutor_data'>) => {
                return item.matched === true;
              })
              .map((item: Views<'matching_tutor_data'>) => {
                return (
                  <InfoList key={item.id}>
                    <InfoItem>
                      <div>{item.status}</div>
                      <div>
                        <S.TutorChatLink onClick={() => handleStartChat(item.tutor_id!)}>{item.tutor_name}</S.TutorChatLink>
                      </div>
                      <div>
                        {item.tutor_lc_1_gugun} | {item.tutor_lc_2_gugun}
                      </div>
                      <div>{item.created_at ? item.created_at.split('T')[0] : '날짜 없음'}</div>
                      <div>완료</div>
                    </InfoItem>
                  </InfoList>
                );
              })}
        </ContentsDataBox>
      </TabPanel>
    </div>
  );
};

export default MatchingTutor;

const TabPanelBox = styled.div`
  background-color: #fff;
  border-radius: 8px;
  margin-top: 50px;
`;
