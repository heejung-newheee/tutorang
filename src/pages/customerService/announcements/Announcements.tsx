import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ANNOUNCEMENTS_QUERY_KEY, getAllAnnouncements } from '../../../api/announcements';
import * as C from './../CommonCustomerService.style';
import * as S from './Announcements.style';

const Announcements = () => {
  const { data } = useQuery([ANNOUNCEMENTS_QUERY_KEY], getAllAnnouncements);
  console.log(data);

  if (!data) return <div></div>;
  return (
    <C.OutermostContainer>
      <C.TableContainer>
        <C.Table>
          <C.Caption>공지사항</C.Caption>
          <S.Colgroup>
            <col />
            <col />
            <col />
          </S.Colgroup>
          <C.Thead>
            <tr>
              <th>NO.</th>
              <th>제목</th>
              <th>작성일</th>
            </tr>
          </C.Thead>
          <C.Tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={4}>
                  <C.ParagraghCSGuide>첫 문의를 등록해보세요</C.ParagraghCSGuide>
                </td>
              </tr>
            ) : (
              data.map((announcementItem, index) => (
                <tr key={announcementItem.id}>
                  <td>{index + 1}</td>
                  <td>
                    {/* <C.SpanNavTitle
                      onClick={() => {
                        navigate(`/customer-service/announcements/${announcementItem.id}`);
                      }}
                    >
                      {announcementItem.title}
                    </C.SpanNavTitle> */}
                    <Link to={`/customer-service/announcements/${announcementItem.id}`}>{announcementItem.title}</Link>
                  </td>

                  <td>{announcementItem.created_at.split('T')[0]}</td>
                </tr>
              ))
            )}
          </C.Tbody>
        </C.Table>
      </C.TableContainer>
      <C.PaginationSpace>pagenation space</C.PaginationSpace>
    </C.OutermostContainer>
    // <div>
    //   {' '}
    //   <LisingContainer>
    //     {data?.map((announcementItem) => (
    //       <ListingItem key={announcementItem.id}>
    //         <Link to={`/customer-service/announcements/${announcementItem.id}`}>{announcementItem.title}</Link>
    //       </ListingItem>
    //     ))}
    //   </LisingContainer>
    // </div>
  );
};

export default Announcements;

// 임시
// const LisingContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
// `;

// const ListingItem = styled.div`
//   border: 1px solid #000;
//   padding: 20px;
// `;
