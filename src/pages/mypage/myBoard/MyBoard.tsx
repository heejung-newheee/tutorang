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
        <ContentsDataBox>
          {boardData?.length > 0 ? boardData?.map((board) => <BoardItem key={Math.random() * 22229999} item={board} />) : <InfoNull>문의하신 내역이 없습니다</InfoNull>}
          {/* 
          {boardData?.length > 0 ? (
            boardData.map((item: Tables<'write'>,index) => {
              return (
                <DataItem key={item.id} onClick={() => navigate(`/post/${item.id}`)}>
                  <div>
                    <DataTitle>{item.title}</DataTitle>
                    <DataContent>{item.content}</DataContent>
                    <DataAuth>{item.created_at.split('T')[0]}</DataAuth>
                  </div>
                </DataItem>
              );
            })
          ) : (
            <InfoNull>문의하신 내역이 없습니다</InfoNull>
          )} */}
        </ContentsDataBox>
      </Container>
    </InfoSection>
  );
};

export default MyBoard;
