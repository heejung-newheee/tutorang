import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import * as S from './Community.styled';

const Community = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const path = location.pathname.split('/')[2];

  const gotoWrite = () => {
    navigate(`../write/${path}`);
  };
  return (
    <S.CommunityContainer>
      <S.CommunityTitle>
        <h1>커뮤니티</h1>
        <p>튜터링을 이용하는 사람들의 이야기를 들어보세요.</p>
      </S.CommunityTitle>
      <S.ResponsivMenu>
        <S.ResponsivMenuColor $color={path === 'free'} onClick={() => navigate('free')}>
          {' '}
          <span>자유 게시판</span>
        </S.ResponsivMenuColor>
        <S.ResponsivMenuColor $color={path === 'question'} onClick={() => navigate('question')}>
          {' '}
          <span>질문 게시판</span>
        </S.ResponsivMenuColor>

        <S.ResponsivMenuColor $color={path === 'study'} onClick={() => navigate('study')}>
          {' '}
          <span>학습 정보 게시판</span>
        </S.ResponsivMenuColor>

        <S.ResponsivMenuColor $color={path === 'region'} onClick={() => navigate('region')}>
          <span>지역별 게시판</span>
        </S.ResponsivMenuColor>
      </S.ResponsivMenu>
      <S.PostContainer>
        <S.Category>
          <S.CategoryColor $color={path === 'free'} onClick={() => navigate('free')}>
            <span>자유 게시판</span>
            <span>&rsaquo;</span>
          </S.CategoryColor>
          <S.CategoryColor $color={path === 'question'} onClick={() => navigate('question')}>
            <span>질문 게시판</span>
            <span>&rsaquo;</span>
          </S.CategoryColor>
          <S.CategoryColor $color={path === 'study'} onClick={() => navigate('study')}>
            <span>학습 정보 게시판</span>
            <span>&rsaquo;</span>
          </S.CategoryColor>
          <S.CategoryColor $color={path === 'region'} onClick={() => navigate('region')}>
            <span>지역별 게시판</span>
            <span>&rsaquo;</span>
          </S.CategoryColor>
        </S.Category>
        <S.PostsContainer>
          <Outlet />
        </S.PostsContainer>
      </S.PostContainer>
      <S.PostBtn onClick={gotoWrite}>게시글 작성</S.PostBtn>
    </S.CommunityContainer>
  );
};

export default Community;
