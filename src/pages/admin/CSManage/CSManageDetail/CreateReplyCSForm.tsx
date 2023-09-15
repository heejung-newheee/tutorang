import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ONE_CUSTOMER_INQUIRY_QUERY_KEY } from '../../../../api/customerSupport';
import { TypeNewReplyToInquiry, insertNewReplyToInquiry } from '../../../../api/customerSupportReply';
import { AppDispatch } from '../../../../redux/config/configStore';
import { displayToastAsync } from '../../../../redux/modules';
import { ButtonAnnouncement, ButtonWrap } from '../../announcementManage/ManageAnnouncementCommon.style';
import * as C from './CommonCS.style';

const CreateReplyCSForm = ({ loginUserId, csTableId }: { loginUserId: string; csTableId: string }) => {
  const queryClient = useQueryClient();
  const [content, setContent] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const createCSReplyMutation = useMutation(async (newReply: TypeNewReplyToInquiry) => insertNewReplyToInquiry(newReply), {
    onSuccess: () => {
      queryClient.invalidateQueries([ONE_CUSTOMER_INQUIRY_QUERY_KEY, csTableId]);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!content) {
      dispatch(displayToastAsync({ id: Date.now(), type: 'warning', message: '내용이 입력되지 않았습니다!' }));
      return false;
    }
    const oneMoreReplyCheck = window.confirm('내용에 이상이 없습니까? 문의게시판 답변으로 등록하시겠습니까?');
    if (content && !oneMoreReplyCheck) {
      return false;
    }
    const newReply = {
      cs_table_id: csTableId,
      user_id: loginUserId,
      content,
    };
    try {
      await createCSReplyMutation.mutate(newReply);
    } catch (error) {
      dispatch(displayToastAsync({ id: Date.now(), type: 'warning', message: `error submit cs reply, ${String(error)}` }));
    }
    setContent('');
    dispatch(displayToastAsync({ id: Date.now(), type: 'success', message: '답변이 정상적으로 등록되었습니다!' }));
  };
  return (
    <form onSubmit={handleSubmit}>
      <C.InputReplyArea type="text" name="content" value={content} onChange={handleContentChange} />
      <ButtonWrap>
        <ButtonAnnouncement>등록완료</ButtonAnnouncement>
      </ButtonWrap>
    </form>
  );
};

export default CreateReplyCSForm;
