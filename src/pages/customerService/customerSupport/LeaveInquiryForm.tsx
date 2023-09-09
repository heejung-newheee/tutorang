import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useInput } from '../../../hooks';
import { RootState } from '../../../redux/config/configStore';

type initialStateType = {
  title: string;
  content: string;
};

const LeaveInquiryForm = () => {
  const loginUser = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();

  const initialState: initialStateType = {
    title: '',
    content: '',
  };
  const [{ title, content }, onChange] = useInput(initialState);

  if (!loginUser) return <div></div>;

  const subitHandler = () => {
    navigate('/customer-service/customer-support');
    const formData = {
      title: 'title',
      user_id: loginUser.id,
      content: '작성내용',
      isReplied: false,
      file1: 'null 들어올 수 있음',
      file2: 'null 들어올 수 있음',
    };
  };

  return (
    <div>
      <h1>LeaveInquiryForm</h1>
      <div>
        <label htmlFor="title">제목</label>
        <input id="title" type="text" name="title" value={title as string} onChange={onChange} />
      </div>
      <div>
        <label htmlFor="content">내용</label>
        <textarea id="content" name="content" value={content as string} onChange={onChange} />
      </div>
      <div>
        <input type="file" name="file" />
      </div>
      <button type="button" onClick={subitHandler}>
        제출
      </button>
    </div>
  );
};

export default LeaveInquiryForm;
