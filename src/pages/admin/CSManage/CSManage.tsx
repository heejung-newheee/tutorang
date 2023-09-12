import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { CS_MANAGE_QUERY_KEY, getAllCs } from '../../../api/customerSupportReply';
import * as S from './CSManage.style';

type TypeinquiryItem = {
  content: string | null;
  created_at: string;
  file1: string | null;
  file2: string | null;
  id: string;
  isReplied: boolean | null;
  title: string | null;
  user_id: string | null;
  profiles: {
    age: number | null;
    avatar_url: string | null;
    basic_authority: boolean;
    birth: string | null;
    deleted_at: string | null;
    email: string | null;
    gender: string | null;
    id: string;
    location1_gugun: string | null;
    location1_sido: string | null;
    location2_gugun: string | null;
    location2_sido: string | null;
    role: string | null;
    updated_at: string | null;
    username: string | null;
  } | null;
};

const CSManage = () => {
  const navigate = useNavigate();
  const { data } = useQuery([CS_MANAGE_QUERY_KEY], getAllCs);
  console.log('여기 뭐뭐 들었어', data);

  const moveTodetailCSQuiryPage = (inquiryId: string, inquiryitem: TypeinquiryItem) => navigate(`/admin/customer-support-manage/${inquiryId}`, { state: inquiryitem });
  if (!data) return <div></div>;
  return (
    <S.ContainerCS>
      <S.ContainerFiltering></S.ContainerFiltering>
      <S.SectionTrueReplied>
        <ul>
          {data.map((inquiryitem) => (
            <S.LiInquiryItem key={Math.random()}>
              <div>{inquiryitem.profiles?.avatar_url ? <S.ProfileImgSize src={inquiryitem.profiles?.avatar_url} alt="" /> : <p>'기본이미지'</p>}</div>
              <div>{inquiryitem.profiles?.username || '이름 미등록'}</div>
              <S.TitleInquiryItem onClick={() => moveTodetailCSQuiryPage(inquiryitem.id, inquiryitem)}>{inquiryitem.title}</S.TitleInquiryItem>
              <div>{inquiryitem.created_at.split('T')[0]}</div>
              <div>{inquiryitem.customer_support_reply.length === 0 ? 'X' : 'O'}</div>
              <div></div>
            </S.LiInquiryItem>
          ))}
        </ul>
      </S.SectionTrueReplied>
      <S.SectionFalseReplied></S.SectionFalseReplied>
    </S.ContainerCS>
  );
};

export default CSManage;
