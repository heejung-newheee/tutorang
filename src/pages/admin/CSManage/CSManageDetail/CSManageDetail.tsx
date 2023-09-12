import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { RootState } from '../../../../redux/config/configStore';
import { ONE_CUSTOMER_INQUIRY_QUERY_KEY, getOneInquiry } from '../../../../api/customerSupport';
import * as S from './CSManageDetail.style';
import CreateReplyCSForm from './CreateReplyCSForm';
import EditReplyCSForm from './EditReplyCSForm';
import { getTimeTextFromISODate } from '../../../../utils/Date';

const CSManageDetail = () => {
  const locationData = useLocation();
  const inquiryId = locationData.state.id;
  const { data: oneInquiryInfo, isLoading, isError } = useQuery([ONE_CUSTOMER_INQUIRY_QUERY_KEY, inquiryId], () => getOneInquiry(inquiryId), { enabled: !!inquiryId });

  // 관리자
  const loginUserId = useSelector((state: RootState) => state.user.user!.id);

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;
  if (!oneInquiryInfo) return <div>데이터가 없습니다.</div>;

  const profiles = oneInquiryInfo.profiles;
  const reply = oneInquiryInfo.customer_support_reply;
  return (
    <div>
      <div>
        <p>제목 : {oneInquiryInfo.title}</p>
        <p>문의자 정보: {profiles?.inquiryUsername}</p>
        <p>문의 날짜: {getTimeTextFromISODate(oneInquiryInfo.created_at)}</p>
        <h2>내용</h2>
        <div dangerouslySetInnerHTML={{ __html: oneInquiryInfo.content || '' }}></div>
      </div>
      {reply.length === 0 ? <div>관리자님~ 답변을 어서 등록해주세요!</div> : <div>{reply[0].content}</div>}

      <S.Button>
        <Link to="/admin/customer-support-manage">목록</Link>
      </S.Button>
      {reply.length === 0 ? (
        <div>{<CreateReplyCSForm loginUserId={loginUserId} csTableId={oneInquiryInfo.id} />}</div>
      ) : (
        <div>
          <EditReplyCSForm replyInfo={reply[0]} />
        </div>
      )}
    </div>
  );
};

export default CSManageDetail;
