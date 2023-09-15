import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { ONE_CUSTOMER_INQUIRY_QUERY_KEY } from '../../../../api/customerSupport';
import { TypeReply, deleteReplyToInquiry, editReplyToInquiry } from '../../../../api/customerSupportReply';

type EditReplyCSFormProps = {
  replyInfo: TypeReply;
};

const EditReplyCSForm = ({ replyInfo }: EditReplyCSFormProps) => {
  const queryClient = useQueryClient();
  const [isEditing, setEditing] = useState(false);
  const [content, setContent] = useState(replyInfo.content || '');

  const deleteReplyMutation = useMutation(async (replyId: string) => deleteReplyToInquiry(replyId), {
    onSuccess: () => {
      queryClient.invalidateQueries([ONE_CUSTOMER_INQUIRY_QUERY_KEY, replyInfo.cs_table_id]);
    },
    onError: (error) => {
      console.error(error);
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
    const deleteCheck = window.confirm('정말로 삭제하시겠습니까?');
    if (!deleteCheck) return;
    deleteReplyMutation.mutate(replyInfo.id);
  };

  const handleToggleEdit = () => {
    if (isEditing) setContent(replyInfo.content || '');
    setEditing(!isEditing);
  };

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
