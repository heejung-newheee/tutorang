import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { CUSTOMER_SUPPORT_QUERY_KEY, ONE_CUSTOMER_INQUIRY_QUERY_KEY, deleteInquiry, getOneInquiry } from '../../../api/customerSupport';
import * as S from './DetailCustomerSupport.style';
type ProfileProps = {
  inquiryUsername: string | null;
};

type CustomerSupportReply = {
  content: string | null;
  created_at: string;
  cs_table_id: string | null;
  id: string;
  user_id: string | null;
};

type InquiryDataProps = {
  content: string | null | TrustedHTML;
  created_at: string;
  file1: string | null;
  file2: string | null;
  id: string;
  isReplied: boolean | null;
  title: string | null;
  user_id: string | null;
  profiles: ProfileProps | null;
  customer_support_reply: CustomerSupportReply[];
};

const DetailCustomerSupport = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const pathdata = useLocation();
  const inquiryId = pathdata.state.id;
  const { data } = useQuery([ONE_CUSTOMER_INQUIRY_QUERY_KEY, inquiryId], () => getOneInquiry(inquiryId), { enabled: !!inquiryId });

  const deleteInquiryMutation = useMutation(async (inquiryId: string) => deleteInquiry(inquiryId), {
    onSuccess: () => {
      queryClient.invalidateQueries([CUSTOMER_SUPPORT_QUERY_KEY]);
      queryClient.invalidateQueries([ONE_CUSTOMER_INQUIRY_QUERY_KEY]);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  if (!data) return <div></div>;

  const inquiryData: InquiryDataProps = data;
  const replyData = data.customer_support_reply;
  const handleDeleteInquiry = async () => {
    const wannaDelete = window.confirm('!:1문의를 삭제하시겠습니까?');
    if (!wannaDelete) return false;
    try {
      await deleteInquiryMutation.mutate(inquiryData.id);
    } catch (error) {
      console.log(error);
    }
    navigate('/customer-service/customer-support');
  };
  const handleEditInquiry = () => {
    navigate(`/edit-inquiry/${inquiryData.id}`, { state: inquiryData });
  };
  return (
    <S.DetailCustomerSupportContainer>
      <S.TableContainer $role={'customer'}>
        <S.Table>
          <S.Caption>1:1 상담 목록 상세보기</S.Caption>
          <S.Colgroup>
            <col />
            <col />
            <col />
            <col />
          </S.Colgroup>
          <tbody>
            <tr>
              <th>제목</th>
              <td colSpan={3}>{inquiryData.title}</td>
            </tr>
            <tr>
              <th>작성자</th>
              <td>{inquiryData.profiles!.inquiryUsername}</td>
              <th>답변여부</th>
              <td>{replyData.length === 0 ? 'X' : 'O'}</td>
            </tr>
            <tr>
              <th>문의날짜</th>
              <td colSpan={3}>{inquiryData.created_at.split('T')[0]}</td>
            </tr>
            <tr>
              <td colSpan={4}>
                <S.ContentArea>
                  <div dangerouslySetInnerHTML={{ __html: inquiryData.content || '' }}></div>
                </S.ContentArea>
              </td>
            </tr>
          </tbody>
        </S.Table>
      </S.TableContainer>

      <S.TableContainer $role={'$administrator'}>
        {replyData.length !== 0 ? (
          <S.Table>
            <S.Caption>1:1 관리자 답변 등록 상세보기</S.Caption>
            <S.Colgroup>
              <col />
              <col />
            </S.Colgroup>
            <tbody>
              <tr>
                <th>답변자</th>
                <td>tutorang</td>
              </tr>
              <tr>
                <th>답변일시</th>
                <td>{replyData[0].created_at.split('T')[0]}</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <S.ContentArea>
                    <div>
                      <p>{replyData[0].content}</p>
                    </div>
                  </S.ContentArea>
                </td>
              </tr>
            </tbody>
          </S.Table>
        ) : (
          <S.ReplacementContainer>
            <p>빠른 시간 내에 답변드리겠습니다! 잠시만 기다려 주세요!</p>
          </S.ReplacementContainer>
        )}
      </S.TableContainer>

      <S.ButtonsWrapper>
        <button onClick={() => navigate('/customer-service/customer-support')}>목록</button>
        <div>
          {replyData.length === 0 && (
            <>
              <button onClick={handleDeleteInquiry}>삭제</button>
              <button onClick={handleEditInquiry}>수정</button>
            </>
          )}
        </div>
      </S.ButtonsWrapper>
    </S.DetailCustomerSupportContainer>
  );
};

export default DetailCustomerSupport;
