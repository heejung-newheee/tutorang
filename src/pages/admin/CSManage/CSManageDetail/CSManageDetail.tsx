import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { CS_MANAGE_QUERY_KEY, CS_REPLY_QUERY_KEY, getAllCs, getTargetCsReply } from '../../../../api/customerSupportReply';
import { RootState } from '../../../../redux/config/configStore';

const CSManageDetail = () => {
  const locationData = useLocation();
  const inquiryId = locationData.state.id;
  const { data } = useQuery([CS_MANAGE_QUERY_KEY], getAllCs, { enabled: !!inquiryId });
  const { data: targetReply } = useQuery([CS_REPLY_QUERY_KEY], () => getTargetCsReply(inquiryId), { enabled: !!inquiryId });
  console.log('이거슨 데이터여', data);
  console.log('내는 이것을 원했어야', targetReply);
  // 관리자
  const loginUserId = useSelector((state: RootState) => state.user.user!.id);
  console.log('locationData', locationData);

  const oneInquiryInfo = locationData.state;
  const inquiryWriterInfo = oneInquiryInfo.profiles;
  console.log(oneInquiryInfo.customer_support_reply.length);
  return;
  // <div>
  //   <div>
  //     <h2>내용</h2>
  //     <div dangerouslySetInnerHTML={{ __html: oneInquiryInfo.content }}></div>
  //   </div>
  //   {targetReply.length === 0 ? <div>관리자님~ 답변을 어서 등록해주세요!</div> : <div>{targetReply[0].content}</div>}

  //   <S.Button>목록</S.Button>
  //   {targetReply.length !== 0 && (
  //     <>
  //       <S.Button>답변수정</S.Button>
  //       <S.Button>답변삭제</S.Button>
  //     </>
  //   )}
  //   {targetReply.length === 0 ? (
  //     <div>{<CreateReplyCSForm loginUserId={loginUserId} csTableId={oneInquiryInfo.id} />}</div>
  //   ) : (
  //     <div>
  //       <EditReplyCSForm targetReply={targetReply} />
  //     </div>
  //   )}
  // </div>
};

export default CSManageDetail;
