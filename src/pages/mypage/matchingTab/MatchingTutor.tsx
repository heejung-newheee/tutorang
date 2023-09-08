import { Tab, Tabs } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { styled } from 'styled-components';
import { matchingCancel, matchingComplete, matchingRejectStudent } from '../../../api/match';
import { Views } from '../../../supabase/database.types';
import { ContentsDataBox, MatchBtn } from '../userInfo/UserInfo.styled';
import * as S from './MatchingTutor.styled';
import './custom.css';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createChatRoom, getChatRoomWithTutor, inviteChatRoom } from '../../../api/chat';
import { getMyWritiedReview } from '../../../api/review';
import { MATCHING_TUTOR_DATA_QUERY_KEY, REVIEW_QUERY_KEY } from '../../../constants/query.constant';
import { RootState } from '../../../redux/config/configStore';
import { openModal } from '../../../redux/modules';
import { InfoItem, InfoList } from './MatchingTutor.styled';

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
  const [openMenuId, setOpenMenuId] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<number>(0);
  const loginUser = useSelector((state: RootState) => state.user.user);
  // 내가 작성한 리뷰들
  const myReview = useQuery([REVIEW_QUERY_KEY], () => getMyWritiedReview(loginUser!.id));

  console.log(matchList);
  console.log('myReview', myReview.data);

  const handleTabChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  // 아예 요청중 취소
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

  const handleCancelMatch = async (id: string) => {
    if (window.confirm('요청을 취소 하시겠습니까?')) cancelMatchMutation.mutate(id);
  };

  const handleNotCompleteMatch = async (id: string) => {
    if (window.confirm('수업 취소처리 하시겠습니까?')) notCompleteMatchMutation.mutate(id);
    // if (window.confirm('수업 취소/환불 요청 하시겠습니까?')) notCompleteMatchMutation.mutate(id);
  };

  const handleCompleteMatch = async (id: string) => {
    if (window.confirm('수업 완료처리 하시겠습니까?')) completeMatchMutation.mutate(id);
    // if (window.confirm('수업 취소/환불 요청 하시겠습니까?')) notCompleteMatchMutation.mutate(id);
  };

  // 튜터와의 채팅창 이동
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

  // 리뷰작성
  const handleReviewCreate = (tutor_id: string, matching_id: string): void => {
    dispatch(openModal({ type: 'matchedReviewCreate', targetId: tutor_id, matchingId: matching_id }));
    // console.log(matching_id);
  };

  // 리뷰를 가져오기 ***************
  // const fetchReview = async (tutorId: string, matchingId: string) => {
  //   try {
  //     const reviewData = await matchMyReview(loginUser!.id);
  //     const matchingReview = reviewData.find((review) => review.reviewed_id === tutorId);
  //     console.log(matchingReview);

  //     return matchingReview;
  //   } catch (error) {
  //     console.error(error);
  //     return null;
  //   }
  // };

  // 리뷰 수정
  const handleOpenReviewUpdateForm = (): void => {
    dispatch(openModal({ type: 'reviewUpdate', targetId: loginUser?.id }));
  };

  const handleReviewDelete = (id: number) => {
    dispatch(openModal({ type: 'confirmRemove', targetId: id }));
  };
  // const mutationReviewDelete = useMutation(reviewDelete, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries([REVIEW_QUERY_KEY]);
  //   },
  // });

  // const handleReviewDelete = () => {
  //   mutationReviewDelete.mutate(Number(_id));
  //   dispatch(closeModal());
  // };

  const handleIsOpen = (reviewId: number) => {
    setOpenMenuId(reviewId === openMenuId ? 0 : reviewId);
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
                return item.status === 'pending';
              })
              .map((item: Views<'matching_tutor_data'>) => {
                return (
                  <InfoList key={item.id}>
                    <InfoItem>
                      <div>
                        <S.TutorChatLink onClick={() => handleStartChat(item.tutor_id!)}>{item.tutor_name}</S.TutorChatLink>
                      </div>
                      <div>
                        {item.tutor_lc_1_gugun} <br /> {item.tutor_lc_2_gugun}
                      </div>
                      <div>{item.created_at ? item.created_at.split('T')[0] : '날짜 없음'}</div>
                      <div>
                        <MatchBtn
                          onClick={() => {
                            console.log('수업완료 누름');

                            item.id !== null && handleCompleteMatch(item.id);
                          }}
                        >
                          수업완료
                        </MatchBtn>
                        <MatchBtn
                          onClick={() => {
                            console.log('수업취소 누름');
                            item.id !== null && handleNotCompleteMatch(item.id);
                          }}
                        >
                          수업취소
                        </MatchBtn>
                      </div>
                    </InfoItem>
                  </InfoList>
                );
              })}
        </ContentsDataBox>
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        <InfoList>
          <InfoItem style={{ textAlign: 'center', height: '56px', borderTop: '0' }}>
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
                return item.status === 'reject' || 'complete';
              })
              .map((item: Views<'matching_tutor_data'>) => {
                return (
                  <InfoList key={item.id}>
                    <InfoItem>
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
                        ) : item.review_confirm ? (
                          <>
                            <S.ReviewBtn
                              onClick={() => {
                                handleOpenReviewUpdateForm();
                                // 여기에서 리뷰를 가져오려면
                                // dispatch(setReview(review));
                                // handleIsOpen(review.id);
                              }}
                            >
                              수정
                            </S.ReviewBtn>
                            <S.ReviewBtn
                              onClick={() => {
                                // handleReviewDelete(리뷰게시글id);
                              }}
                            >
                              삭제
                            </S.ReviewBtn>
                          </>
                        ) : (
                          <S.ReviewBtn className="review-btn" onClick={() => handleReviewCreate(item.tutor_id!, item.id!)}>
                            리뷰 쓰기
                          </S.ReviewBtn>
                        )}
                      </div>
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
