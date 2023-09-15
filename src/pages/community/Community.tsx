import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import FormHeader from '../../components/Form/FormHeader';
import { FORM_CONSTANT_TITLE_COMMUNITY } from '../../constants/formConstant';
import { AppDispatch, RootState } from '../../redux/config/configStore';
import { displayToastAsync } from '../../redux/modules';
import * as S from './Community.styled';

const Community = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const loginUser = useSelector((state: RootState) => state.user.user);

  const location = useLocation();
  const path = location.pathname.split('/')[2];

  const gotoWrite = () => {
    if (!loginUser) {
      return dispatch(displayToastAsync({ id: Date.now(), type: 'warning', message: '로그인 후 이용해주세요' }));
    }
    navigate(`../write/${path}`);
  };
  useEffect(() => {
    navigate('../community/free/?q=1');
  }, []);
  return (
    <S.CommunityContainer>
      <FormHeader $keyword={FORM_CONSTANT_TITLE_COMMUNITY} />
      <S.ResponsivMenu>
        <S.ResponsivMenuColor $color={path === 'free'} onClick={() => navigate('./free/?q=1')}>
          {' '}
          <span>자유 게시판</span>
        </S.ResponsivMenuColor>
        <S.ResponsivMenuColor $color={path === 'question'} onClick={() => navigate('question/?q=1')}>
          {' '}
          <span>질문 게시판</span>
        </S.ResponsivMenuColor>

        <S.ResponsivMenuColor $color={path === 'study'} onClick={() => navigate('study/?q=1')}>
          {' '}
          <span>학습 정보 게시판</span>
        </S.ResponsivMenuColor>

        <S.ResponsivMenuColor $color={path === 'region'} onClick={() => navigate('region/?q=1')}>
          <span>지역별 게시판</span>
        </S.ResponsivMenuColor>
      </S.ResponsivMenu>
      <S.PostContainer>
        <S.Category>
          <S.CategoryColor $color={path === 'free'} onClick={() => navigate('free/?q=1')}>
            <span>자유 게시판</span>
            <span>&rsaquo;</span>
          </S.CategoryColor>
          <S.CategoryColor $color={path === 'question'} onClick={() => navigate('question/?q=1')}>
            <span>질문 게시판</span>
            <span>&rsaquo;</span>
          </S.CategoryColor>
          <S.CategoryColor $color={path === 'study'} onClick={() => navigate('study/?q=1')}>
            <span>학습 정보 게시판</span>
            <span>&rsaquo;</span>
          </S.CategoryColor>
          <S.CategoryColor $color={path === 'region'} onClick={() => navigate('region/?q=1')}>
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
