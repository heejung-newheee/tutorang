import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { CUSTOMER_SUPPORT_QUERY_KEY, deleteInquiry } from '../../../api/customerSupport';
import * as S from './DetailCustomerSupport.style';

const DetailCustomerSupport = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const pathdata = useLocation();
  const inquiryData = pathdata.state;
  const replyData = inquiryData.customer_support_reply;
  const deleteInquiryMutation = useMutation(async (inquiryId: string) => deleteInquiry(inquiryId), {
    onSuccess: () => {
      queryClient.invalidateQueries([CUSTOMER_SUPPORT_QUERY_KEY]);
    },
    onError: (error) => {
      console.log(error);
    },
  });
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
              <td>{inquiryData.profiles.inquiryUsername}</td>
              <th>답변여부</th>
              <td>{inquiryData.isReplied ? 'O' : 'X'}</td>
            </tr>
            <tr>
              <th>문의날짜</th>
              <td colSpan={3}>{inquiryData.created_at.split('T')[0]}</td>
            </tr>
            <tr>
              <td colSpan={4}>
                <S.ContentArea>
                  <div dangerouslySetInnerHTML={{ __html: inquiryData.content }}></div>
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
                    <div dangerouslySetInnerHTML={{ __html: replyData[0].content }}></div>
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
          {inquiryData.isReplied === false && (
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
