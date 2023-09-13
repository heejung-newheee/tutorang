import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { redirect, useLocation, useNavigate } from 'react-router-dom';
import { CUSTOMER_SUPPORT_QUERY_KEY, ONE_CUSTOMER_INQUIRY_QUERY_KEY, deleteInquiry, getOneInquiry } from '../../../api/customerSupport';
import { Button } from '../../../components';
import * as C from '../CommonCustomerService.style';
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
  id: string;
  title: string | null;
  user_id: string | null;
  profiles: ProfileProps | null;
  customer_support_reply: CustomerSupportReply[];
};

const DetailCustomerSupport = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const inquiryId = useLocation().pathname.split('/')[3];

  if (!inquiryId) redirect('/customer-service/customer-support');
  const { data } = useQuery([ONE_CUSTOMER_INQUIRY_QUERY_KEY, inquiryId], () => getOneInquiry(inquiryId), { enabled: !!inquiryId });

  const deleteInquiryMutation = useMutation(async (inquiryId: string) => deleteInquiry(inquiryId), {
    onSuccess: () => {
      queryClient.invalidateQueries([CUSTOMER_SUPPORT_QUERY_KEY]);
    },
    onError: (error) => {
      console.error(error);
    },
  });
  if (!data) return <div></div>;

  const inquiryData: InquiryDataProps = data;
  const replyData = data.customer_support_reply;
  const handleDeleteInquiry = async () => {
    const wannaDelete = window.confirm('1:1문의를 삭제하시겠습니까?');
    if (!wannaDelete) return false;
    try {
      await deleteInquiryMutation.mutate(inquiryData.id);
    } catch (error) {
      console.error(error);
    }
    navigate('/customer-service/customer-support');
  };
  const handleEditInquiry = () => {
    navigate(`/edit-inquiry/${inquiryData.id}`, { state: inquiryData });
  };
  return (
    <C.OutermostContainer>
      <C.TableContainer>
        <C.Table>
          <S.Caption>1:1 상담 목록 상세보기</S.Caption>
          <S.Colgroup>
            <col />
            <col />
            <col />
            <col />
          </S.Colgroup>
          <C.Tbody>
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
                <C.ContentArea>
                  <div dangerouslySetInnerHTML={{ __html: inquiryData.content || '' }}></div>
                </C.ContentArea>
              </td>
            </tr>
          </C.Tbody>
        </C.Table>
      </C.TableContainer>
      <C.PartitionLine />
      <C.TableContainer>
        {replyData.length !== 0 ? (
          <>
            <S.Caption>1:1 관리자 답변 등록 상세보기</S.Caption>
            <S.ReplyWrap>
              <S.Replier>
                <div>답변자</div>
                <div>tutorang</div>
              </S.Replier>
              <S.Replier>
                <div>답변일시</div>
                <div>{replyData[0].created_at.split('T')[0]}</div>
              </S.Replier>
              <S.RpContents>
                <C.ContentArea>
                  <p>{replyData[0].content}</p>
                </C.ContentArea>
              </S.RpContents>
            </S.ReplyWrap>
          </>
        ) : (
          <S.ReplacementContainer>
            <p>빠른 시간 내에 답변드리겠습니다! 잠시만 기다려 주세요!</p>
          </S.ReplacementContainer>
        )}
      </C.TableContainer>

      <C.PartitionLine />
      <C.ButtonsWrapper>
        <C.ButtonCS to={'/customer-service/customer-support'}>목록</C.ButtonCS>
        <div>
          {replyData.length === 0 && (
            <>
              <Button variant="outline" color="primary" size="Small" onClick={handleDeleteInquiry}>
                삭제
              </Button>
              <Button variant="solid" color="primary" size="Small" onClick={handleEditInquiry}>
                수정
              </Button>
            </>
          )}
        </div>
      </C.ButtonsWrapper>
    </C.OutermostContainer>
  );
};

export default DetailCustomerSupport;
