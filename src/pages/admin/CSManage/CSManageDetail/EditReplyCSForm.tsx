import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ONE_CUSTOMER_INQUIRY_QUERY_KEY } from '../../../../api/customerSupport';
import { TypeReply, deleteReplyToInquiry, editReplyToInquiry } from '../../../../api/customerSupportReply';
import { AppDispatch, RootState } from '../../../../redux/config/configStore';
import { clearModal, displayToastAsync, openModal } from '../../../../redux/modules';

type EditReplyCSFormProps = {
  replyInfo: TypeReply;
};

const EditReplyCSForm = ({ replyInfo }: EditReplyCSFormProps) => {
  const { isConfirm } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();
  const [isEditing, setEditing] = useState(false);
  const [content, setContent] = useState(replyInfo.content || '');

  const deleteReplyMutation = useMutation(async (replyId: string) => deleteReplyToInquiry(replyId), {
    onSuccess: () => {
      queryClient.invalidateQueries([ONE_CUSTOMER_INQUIRY_QUERY_KEY, replyInfo.cs_table_id]);
    },
    onError: (error) => {
      dispatch(displayToastAsync({ id: Date.now(), type: 'warning', message: String(error) }));
    },
  });

  const updateReplyMutation = useMutation(async ({ replyId, content }: { replyId: string; content: string }) => editReplyToInquiry(replyId, content), {
    onSuccess: () => {
      queryClient.invalidateQueries([ONE_CUSTOMER_INQUIRY_QUERY_KEY, replyInfo.cs_table_id]);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEditing(false);
    updateReplyMutation.mutate({ replyId: replyInfo.id, content });
  };

  const handleDeleteReply = () => {
    dispatch(openModal({ type: 'confirm', message: '정말로 삭제하시겠습니까?' }));
  };

  const handleToggleEdit = () => {
    if (isEditing) setContent(replyInfo.content || '');
    setEditing(!isEditing);
  };

  useEffect(() => {
    if (isConfirm) deleteReplyMutation.mutate(replyInfo.id);
    return () => {
      dispatch(clearModal());
    };
  }, [isConfirm]);

  return (
    <>
      <button onClick={handleToggleEdit}>{isEditing ? '수정취소' : '수정하기'}</button>
      <form onSubmit={handleSubmit}>
        <input type="text" name="content" value={content} onChange={handleContentChange} disabled={!isEditing} />
        <button type="submit" disabled={!isEditing}>
          수정완료
        </button>
        <button type="button" onClick={handleDeleteReply}>
          삭제
        </button>
      </form>
    </>
  );
};

export default EditReplyCSForm;
