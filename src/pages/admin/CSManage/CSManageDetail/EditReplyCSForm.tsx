// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { TypeReply } from '../../../../api/customerSupportReply';

// type TypeCreateReplyCSFormProps = {
//   replyInfo: TypeReply;
// };

// const EditReplyCSForm: React.FC<TypeCreateReplyCSFormProps> = () => {
//   // const queryClient = useQueryClient({ replyInfo });
//   const [content, setContent] = useState('');
//   const navigate = useNavigate();

//   const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setContent(event.target.value);
//   };
//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" name="content" value={content} onChange={handleContentChange} />
//       <button>수정완료</button>
//     </form>
//   );
// };

// export default EditReplyCSForm;
