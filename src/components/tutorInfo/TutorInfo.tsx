import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchReview } from '../../api/user';
import * as S from './TutorInfo.styled';
import { RootState } from '../../redux/config/configStore';
import { useSelector } from 'react-redux';
import { fetchTutorAll } from '../../api/tutor';
import { Tables } from '../../supabase/database.types';
import supabase from '../../supabase';
import { matchingAccept, matchingReject } from '../../api/match';
interface pageProps {
  match: Tables<'matching'>[];
}
const TutorInfo = ({ match }: pageProps) => {
  const queryClient = useQueryClient();

  const { data: tutor, isLoading: tutorLoading, isError: tutorError } = useQuery(['tutor'], fetchTutorAll);
  const { data: review, isLoading: reviewLoading, isError: reviewError } = useQuery(['review'], fetchReview);
  const user = useSelector((state: RootState) => state.user.user);
  // console.log('tutorInfo 로그인사용자', user);

  const reviewData = review?.filter((item) => {
    return user!.id === item.reviewed_id;
  });

  const tutorInfo = tutor?.find((item) => {
    return user!.id === item.user_id;
  });

  // const created = tutorInfo!.created_at.split('T')[0];

  const acceptMatchMutation = useMutation(matchingAccept, {
    onSuccess: () => {
      queryClient.invalidateQueries(['matching']);
    },
  });

  const acceptMatch = async (id: string) => {
    acceptMatchMutation.mutate(id);
  };

  const rejectMatchMutation = useMutation(matchingReject, {
    onSuccess: () => {
      queryClient.invalidateQueries(['matching']);
    },
  });

  const rejectMatch = async (id: string) => {
    rejectMatchMutation.mutate(id);
  };

  // 받은 요청 내역
  const matchingData = Array.isArray(match) ? match : [match];
  const matchList = matchingData.filter((item: Tables<'matching'>) => item.tutor_id === user!.id);
  console.log(matchList);

  if (tutorLoading || reviewLoading) {
    return <div>로딩중~~~~~~~~~~~</div>;
  }
  if (tutorError || reviewError) {
    return <div>데이터를 불러오는 중에 오류가 발생했습니다.</div>;
  }
  if (!tutor || !review || !matchList) {
    return null;
  }
  return (
    <>
      {tutorInfo && (
        <div>
          <div>
            <div>강사 대시보드</div>
            <button>수업 내용 수정</button>
            <div>수업레벨 : Lv 2</div>
            <div>별점 : ⭐⭐⭐⭐ </div>
            <div>수업소개 : {tutorInfo!.class_info}</div>
            <div>시간당 : {tutorInfo!.price}원</div>
            {/* <div style={{ fontSize: '0.8rem', color: '#ggg' }}> 마지막 정보 업데이트 {tutorInfo?.update ? <span>{tutorInfo.update}</span> : <span>{created}</span>}</div> */}
          </div>

          <div>
            <div>매칭 내역</div>
            {matchList &&
              matchList.map((item: Tables<'matching'>) => {
                return (
                  <div key={item.id} style={{ background: '#eee', margin: '5px' }}>
                    <div>아이디{item.id}</div>
                    <div>요청 상태{item.status}</div>
                    <div>날짜{item.created_at.split('T')[0]}</div>
                    <div>튜터 이름 </div>
                    <div>지역 --</div>
                    <button onClick={() => acceptMatch(item.id)}>요청 수락 버튼</button>
                    <button onClick={() => rejectMatch(item.id)}>요청 거절 버튼</button>
                  </div>
                );
              })}
          </div>

          <div>수강생 후기</div>
          <S.StudentList>
            {reviewData &&
              reviewData.map((review) => {
                return (
                  <S.StudentItem key={review.id}>
                    <div>{review.title}</div>
                    <div>{review.content}</div>
                  </S.StudentItem>
                );
              })}
          </S.StudentList>
          <div>수익차트</div>
        </div>
      )}
    </>
  );
};

export default TutorInfo;
