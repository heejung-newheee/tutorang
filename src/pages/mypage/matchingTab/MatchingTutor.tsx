import { Tab, Tabs } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { styled } from 'styled-components';
import { matchingCancel, matchingComplete, matchingRejectStudent, matchingRequest } from '../../../api/match';
import { Views } from '../../../supabase/database.types';
import * as S from './Matching.styled';
import './custom.css';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getOrCreatePrivateChatRoom, sendStudentMessage } from '../../../api/chat';
import { MATCHING_TUTOR_DATA_QUERY_KEY } from '../../../constants/query.constant';
import { RootState } from '../../../redux/config/configStore';
import { openModal } from '../../../redux/modules';
import { ContentsDataBox } from '../Mypage.styled';

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
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<number>(0);
  const loginUser = useSelector((state: RootState) => state.user.user);

  const handleTabChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  // 요청중 취소
  const cancelMatchMutation = useMutation(matchingCancel, {
    onSuccess: () => {
      queryClient.invalidateQueries([MATCHING_TUTOR_DATA_QUERY_KEY]);
    },
  });
  // 매칭완료 : 수업중 취소
  const notCompleteMatchMutation = useMutation(matchingRejectStudent, {
    onSuccess: () => {
      queryClient.invalidateQueries([MATCHING_TUTOR_DATA_QUERY_KEY]);
    },
  });
  // 매칭완료 : 수업 완료
  const completeMatchMutation = useMutation(matchingComplete, {
    onSuccess: () => {
      queryClient.invalidateQueries([MATCHING_TUTOR_DATA_QUERY_KEY]);
    },
  });

  const handleCancelMatch = async (id: string, tutor_id: string | null) => {
    if (!tutor_id) return;
    if (!loginUser) return;
    if (!window.confirm('요청을 취소 하시겠습니까?')) return;
    cancelMatchMutation.mutate(id);
    try {
      const room = await getOrCreatePrivateChatRoom(tutor_id);
      await sendStudentMessage(room.room_id, 'reject');
    } catch (err) {
      console.error(err);
    }
  };

  const handleNotCompleteMatch = async (id: string, tutor_id: string | null) => {
    if (!tutor_id) return;
    if (!loginUser) return;
    if (!window.confirm('수업 취소처리 하시겠습니까?')) return;
    notCompleteMatchMutation.mutate(id);
    try {
      const room = await getOrCreatePrivateChatRoom(tutor_id);
      await sendStudentMessage(room.room_id, 'reject');
    } catch (err) {
      console.error(err);
    }
  };

  const handleCompleteMatch = async (id: string, tutor_id: string | null) => {
    if (!tutor_id) return;
    if (!loginUser) return;
    if (!window.confirm('수업 완료처리 하시겠습니까?')) return;
    completeMatchMutation.mutate(id);
    try {
      const room = await getOrCreatePrivateChatRoom(tutor_id);
      await sendStudentMessage(room.room_id, 'accept');
    } catch (err) {
      console.error(err);
    }
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

  // 리뷰작성
  const handleReviewCreate = (tutor_id: string, matching_id: string): void => {
    dispatch(openModal({ type: 'matchedReviewCreate', targetId: tutor_id, matchingId: matching_id }));
  };

  const handleRequestReTutoring = async (tutor_id: string, user_id: string) => {
    try {
      await matchingRequest({ tutorId: tutor_id, userId: user_id });
    } catch (error) {
      if (error instanceof Error) window.alert(error.message || error);
    }
    window.alert('성공적으로 튜터링을 요청했습니다.');
  };

  return (
    <div>
      <Tabs value={activeTab} onChange={handleTabChange} aria-label="tab menu">
        <Tab label="매칭 대기" />
        <Tab label="매칭 완료" />
        <Tab label="매칭 결과" />
      </Tabs>
      <TabPanel value={activeTab} index={0}>
        <S.InfoList>
          <S.InfoItem style={{ textAlign: 'center', height: '56px', borderTop: '0' }}>
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
                return item.status === 'request';
              })
              .map((item: Views<'matching_tutor_data'>) => {
                return (
                  <S.InfoList key={item.id}>
                    <S.InfoItem>
                      <div>
                        <S.TutorChatLink onClick={() => handleStartChat(item.tutor_id!)}>{item.tutor_name}</S.TutorChatLink>
                      </div>
                      <div>
                        {item.tutor_lc_1_gugun} <br /> {item.tutor_lc_2_gugun}
                      </div>
                      <div>{item.created_at ? item.created_at.split('T')[0] : '날짜 없음'}</div>
                      <div>
                        <S.MatchBtn onClick={() => item.id !== null && handleCancelMatch(item.id, item.tutor_id)}>요청 취소</S.MatchBtn>
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
            <div>튜터 이름</div>
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
                        <S.TutorChatLink onClick={() => handleStartChat(item.tutor_id!)}>{item.tutor_name}</S.TutorChatLink>
                      </div>
                      <div>
                        {item.tutor_lc_1_gugun} <br /> {item.tutor_lc_2_gugun}
                      </div>
                      <div>{item.created_at ? item.created_at.split('T')[0] : '날짜 없음'}</div>
                      <S.MatchBtnWrap>
                        <S.MatchBtn
                          onClick={() => {
                            item.id !== null && handleCompleteMatch(item.id, item.tutor_id);
                          }}
                        >
                          완료
                        </S.MatchBtn>
                        <S.MatchBtn
                          onClick={() => {
                            item.id !== null && handleNotCompleteMatch(item.id, item.tutor_id);
                          }}
                        >
                          취소
                        </S.MatchBtn>
                      </S.MatchBtnWrap>
                    </S.InfoItem>
                  </S.InfoList>
                );
              })}
        </ContentsDataBox>
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        <S.InfoList>
          <S.InfoItem style={{ textAlign: 'center', height: '56px', borderTop: '0' }}>
            <div>튜터 이름</div>
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
                        <S.TutorChatLink onClick={() => handleStartChat(item.tutor_id!)}>{item.tutor_name}</S.TutorChatLink>
                      </div>
                      <div>
                        {item.tutor_lc_1_gugun} <br /> {item.tutor_lc_2_gugun}
                      </div>
                      <div>{item.created_at ? item.created_at.split('T')[0] : '날짜 없음'}</div>
                      <div>
                        {item.status === 'reject' ? (
                          '매칭취소'
                        ) : item.review_confirm === true && item.matched === true ? (
                          <>
                            <S.MatchBtn onClick={() => handleRequestReTutoring(item.tutor_id!, item.user_id!)}>재요청</S.MatchBtn>
                          </>
                        ) : item.matched === false ? (
                          '진행중'
                        ) : (
                          <S.MatchBtn className="review-btn" onClick={() => handleReviewCreate(item.tutor_id!, item.id!)}>
                            리뷰 쓰기
                          </S.MatchBtn>
                        )}
                      </div>
                    </S.InfoItem>
                  </S.InfoList>
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
