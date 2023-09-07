import { Tab, Tabs } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';
import { createChatRoom, getChatRoomWithTutor, inviteChatRoom, sendTutoringMessage } from '../../../api/chat';
import { matchingAccept, matchingReject } from '../../../api/match';
import { MATCHING_TUTOR_DATA_QUERY_KEY } from '../../../constants/query.constant';
import { RootState } from '../../../redux/config/configStore';
import { Views } from '../../../supabase/database.types';
import { ContentsDataBox, MatchBtn } from '../userInfo/UserInfo.styled';
import * as S from './MatchingTutor.styled';
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
  const user = useSelector((state: RootState) => state.user.user);
  const queryClient = useQueryClient();

  const acceptMatchMutation = useMutation(matchingAccept, {
    onSuccess: () => {
      queryClient.invalidateQueries([MATCHING_TUTOR_DATA_QUERY_KEY]);
    },
  });

  // 수락
  const acceptMatch = async (id: string, student_id: string) => {
    if (!user) return;
    acceptMatchMutation.mutate(id);
    try {
      const room = await getChatRoomWithTutor(user.id, student_id);
      if (room.length > 0) {
        await sendTutoringMessage(room[0].room_id, 'accept');
        return;
      }
      const newRoom = await createChatRoom();
      await inviteChatRoom(newRoom.room_id, student_id);
      await sendTutoringMessage(newRoom.room_id, 'accept');
    } catch (err) {
      console.error(err);
    }
  };

  const rejectMatchMutation = useMutation(matchingReject, {
    onSuccess: () => {
      queryClient.invalidateQueries([MATCHING_TUTOR_DATA_QUERY_KEY]); // ********
    },
  });

  // 거절
  const rejectMatch = async (id: string, student_id: string) => {
    if (!user) return;
    rejectMatchMutation.mutate(id);
    try {
      const room = await getChatRoomWithTutor(user.id, student_id);

      if (room.length > 0) {
        await sendTutoringMessage(room[0].room_id, 'reject');
        return;
      }

      const newRoom = await createChatRoom();
      await inviteChatRoom(newRoom.room_id, student_id);
      await sendTutoringMessage(newRoom.room_id, 'reject');
    } catch (err) {
      console.error(err);
    }
  };

  const [activeTab, setActiveTab] = useState<number>(0);
  const handleTabChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
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
                return item.matched === false;
              })
              .map((item: Views<'matching_tutor_data'>) => {
                return (
                  <S.InfoList key={item.id}>
                    <S.InfoItem>
                      <div>{item.student_name}</div>
                      <div>
                        {item.student_lc_1_gugun}
                        <br />
                        {item.student_lc_2_gugun}
                      </div>
                      <div>{item.created_at ? item.created_at.split('T')[0] : '날짜 없음'}</div>
                      <div>
                        <MatchBtn onClick={() => item.id !== null && acceptMatch(item.id, item.user_id!)}>수락</MatchBtn>
                        <MatchBtn onClick={() => item.id !== null && rejectMatch(item.id, item.user_id!)}>거절</MatchBtn>
                      </div>
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
                return item.matched === true;
              })
              .map((item: Views<'matching_tutor_data'>) => {
                return (
                  <S.InfoList key={item.id}>
                    <S.InfoItem>
                      <div>{item.student_name}</div>
                      <div>
                        {item.student_lc_1_gugun}
                        <br />
                        {item.student_lc_2_gugun}
                      </div>
                      <div>{item.created_at ? item.created_at.split('T')[0] : '날짜 없음'}</div>
                      <div>완료</div>
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
