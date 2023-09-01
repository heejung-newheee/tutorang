import React, { useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import { Views } from '../../supabase/database.types';
import { InfoItem, InfoList, MatchBtn } from '../userInfo/UserInfo.styled';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { matchingAccept, matchingCancel, matchingReject } from '../../api/match';
import { styled } from 'styled-components';
import './custom.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/config/configStore';
import { createChatRoom, getChatRoomWithTutor, inviteChatRoom, sendTutoringMessage } from '../../api/chat';

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
  const user = useSelector((state: RootState) => state.user.user);
  const queryClient = useQueryClient();
  const acceptMatchMutation = useMutation(matchingAccept, {
    onSuccess: () => {
      queryClient.invalidateQueries(['matching']);
    },
  });

  const acceptMatch = async (id: string, student_id: string) => {
    if (!user) return;
    acceptMatchMutation.mutate(id);
    try {
      const room = await getChatRoomWithTutor(user.id, student_id);
      if (room.length > 0) {
        console.log('룸이 있음');
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
      queryClient.invalidateQueries(['matching']);
    },
  });

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

  // console.log(matchList);
  const [activeTab, setActiveTab] = useState<number>(0);
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <div>
      <Tabs value={activeTab} onChange={handleTabChange} aria-label="tab menu">
        <Tab label="요청 대기" />
        <Tab label="매칭 완료" />
      </Tabs>
      <TabPanel value={activeTab} index={0}>
        <InfoList>
          <InfoItem style={{ textAlign: 'center', height: '56px', borderTop: '0' }}>
            <div>상태</div>
            <div>이름</div>
            <div>지역</div>
            <div>날짜</div>
            <div>취소</div>
          </InfoItem>
        </InfoList>
        {matchList &&
          matchList
            .filter((item: Views<'matching_tutor_data'>) => {
              return item.matched === false;
            })
            .map((item: Views<'matching_tutor_data'>) => {
              return (
                <InfoList key={item.id}>
                  <InfoItem>
                    <div>{item.status}</div>
                    <div>{item.student_name}</div>
                    <div>
                      {item.student_lc_1_gugun} | {item.student_lc_2_gugun}
                    </div>
                    <div>{item.created_at ? item.created_at.split('T')[0] : '날짜 없음'}</div>
                    <div>
                      <MatchBtn onClick={() => item.id !== null && acceptMatch(item.id, item.user_id!)}>수락</MatchBtn>
                      <MatchBtn onClick={() => item.id !== null && rejectMatch(item.id, item.user_id!)}>거절</MatchBtn>
                    </div>
                  </InfoItem>
                </InfoList>
              );
            })}
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <InfoList>
          <InfoItem style={{ textAlign: 'center', height: '56px', borderTop: '0' }}>
            <div>상태</div>
            <div>이름</div>
            <div>지역</div>
            <div>날짜</div>
            <div>확인</div>
          </InfoItem>
        </InfoList>
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
                    <div>{item.student_name}</div>
                    <div>
                      {item.student_lc_1_gugun} | {item.student_lc_2_gugun}
                    </div>
                    <div>{item.created_at ? item.created_at.split('T')[0] : '날짜 없음'}</div>
                    <div>완료</div>
                  </InfoItem>
                </InfoList>
              );
            })}
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
