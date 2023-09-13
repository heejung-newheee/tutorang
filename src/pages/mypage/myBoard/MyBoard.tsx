import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { getMyBoardList } from '../../../api/write';
import { Loading } from '../../../components';
import { RootState } from '../../../redux/config/configStore';
import { Container } from '../../main/Main';
import { ContentsDataBox, InfoNull, InfoSection, InfoTitle } from '../Mypage.styled';
import BoardItem from './BoardItem';

const MyBoard = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const data = useQuery(['write'], () => getMyBoardList(user!.id));
  const boardData = data.data;

  if (data.isLoading) {
    return <Loading />;
  }
  if (data.isError) {
    return <div>데이터를 불러오는 중에 오류가 발생했습니다.</div>;
  }
  if (boardData == null) {
    return null;
  }

  return (
    <InfoSection>
      <Container>
        <InfoTitle>내가 남긴 문의</InfoTitle>
        {boardData?.length > 0 ? (
          <ContentsDataBox>
            {boardData?.map((board) => (
              <BoardItem key={Math.random() * 22229999} item={board} />
            ))}
          </ContentsDataBox>
        ) : (
          <InfoNull>문의하신 내역이 없습니다</InfoNull>
        )}
      </Container>
    </InfoSection>
  );
};

export default MyBoard;
