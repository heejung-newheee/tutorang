import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { ONE_CUSTOMER_INQUIRY_QUERY_KEY, getOneInquiry } from '../../../../api/customerSupport';
import { RootState } from '../../../../redux/config/configStore';
import { getTimeTextFromISODate } from '../../../../utils/Date';
import { FilterContainer, Layout, Title } from '../../boardManage/BoardManage.styled';
import * as C from './../../CommonCustomerServiceManagement.style';
import CreateReplyCSForm from './CreateReplyCSForm';
import * as S from './DetailCSManage.style';
import EditReplyCSForm from './EditReplyCSForm';

const DetailCSManage = () => {
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
    <Layout>
      <FilterContainer>
        <C.TitleHeader>
          <Title>1:1 문의 관리</Title>
          <C.ButtonWrap>
            <C.ButtonAnnouncement>
              <Link to="/admin/customer-support-manage">목록</Link>
            </C.ButtonAnnouncement>
          </C.ButtonWrap>
        </C.TitleHeader>
        <C.CSContent>
          <C.ContentAuth>
            <p>{getTimeTextFromISODate(oneInquiryInfo.created_at)}</p>
            <p>작성자: {profiles?.inquiryUsername}</p>
          </C.ContentAuth>
          <div>
            <p>제목</p>
            {oneInquiryInfo.title}
          </div>
          <S.InquiryContent>
            <p>내용</p>
            <div dangerouslySetInnerHTML={{ __html: oneInquiryInfo.content || '' }}></div>
          </S.InquiryContent>
        </C.CSContent>
        {reply.length === 0 && <div>관리자님~ 답변을 어서 등록해주세요!</div>}

        {reply.length === 0 ? (
          <div>{<CreateReplyCSForm loginUserId={loginUserId} csTableId={oneInquiryInfo.id} />}</div>
        ) : (
          <div>
            <EditReplyCSForm replyInfo={reply[0]} />
          </div>
        )}
      </FilterContainer>
    </Layout>
  );
};

export default DetailCSManage;
