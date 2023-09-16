import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { v4 } from 'uuid';
import { CUSTOMER_SUPPORT_QUERY_KEY, TypeNewInquiry, insertNewInquiry } from '../../../api/customerSupport';
import { RootState } from '../../../redux/config/configStore';
import supabase from '../../../supabase';
import './../../../pages/write/write.css';

const LeaveInquiryForm = () => {
  const [title, setTitle] = useState('');
  const QuillRef = useRef<ReactQuill>();
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginUser = useSelector((state: RootState) => state.user.user);

  const createInquiryMutation = useMutation(async (newInquiry: TypeNewInquiry) => insertNewInquiry(newInquiry), {
    onSuccess: () => {
      queryClient.invalidateQueries([CUSTOMER_SUPPORT_QUERY_KEY]);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      if (input.files) {
        const file = input.files[0];

        try {
          const imgName = v4();
          const { data, error } = await supabase.storage.from('avatars').upload(`community/${imgName}`, file, {
            cacheControl: '3600',
            upsert: true,
          });

          console.error(data, error);

          const url = `https://rkirhzqybhsglryysdso.supabase.co/storage/v1/object/public/avatars/${data?.path}`;

          if (QuillRef.current !== undefined) {
            const editor = QuillRef.current.getEditor();
            const range = editor.getSelection();

            if (range) {
              const startIndex = range.index;
              const endIndex = startIndex + 1;

              editor.insertEmbed(range.index, 'image', url);
              editor.setSelection(startIndex, endIndex);
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [['bold', 'italic', 'underline', 'strike', 'blockquote'], [{ list: 'ordered' }, { list: 'bullet' }], ['image']],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [],
  );
  const handleSubmit = async () => {
    const formData = {
      title,
      user_id: loginUser!.id,
      content,
    };
    try {
      await createInquiryMutation.mutate(formData);
    } catch (error) {
      console.error('error submit inqury ', error);
    }
    navigate('/customer-service/customer-support');
  };

  if (!loginUser) return <div></div>;

  return (
    <WriteContainer>
      <Title>
        <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder="제목을 입력해주세요" />
      </Title>
      <ReactQuill
        ref={(element) => {
          if (element !== null) {
            QuillRef.current = element;
          }
        }}
        value={content}
        onChange={setContent}
        modules={modules}
        className="quill"
        theme="snow"
        placeholder="내용을 입력해주세요."
      />
      <SubmitBtn onClick={handleSubmit}>저장</SubmitBtn>
      <BackBtn onClick={() => navigate(-1)}>뒤로가기</BackBtn>
    </WriteContainer>
  );
};

export default LeaveInquiryForm;

const WriteContainer = styled.div`
  margin-top: 100px;
  padding: 0 20px;
`;

const Title = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: 1px solid gray;
  margin-bottom: 20px;
  & > input {
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
  }
`;

const SubmitBtn = styled.button`
  position: fixed;
  right: 20px;
  top: 15px;
  z-index: 100000;
  border: 1px solid gray;
  padding: 10px 20px;
`;

const BackBtn = styled.button`
  position: fixed;
  left: 20px;
  top: 15px;
  z-index: 100000;
  border: 1px solid gray;
  padding: 10px 20px;
`;
