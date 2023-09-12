// import { useMutation, useQueryClient } from '@tanstack/react-query';
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

  // const api = async (newInfo: any) => {
  //   const { error } = await supabase.from('write').insert(newInfo);

  //   console.log(error);
  //   if (error) throw error;
  // };

  const createInquiryMutation = useMutation(async (newInquiry: TypeNewInquiry) => insertNewInquiry(newInquiry), {
    onSuccess: () => {
      queryClient.invalidateQueries([CUSTOMER_SUPPORT_QUERY_KEY]);
    },
    onError: (error) => {
      console.log(error);
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
        console.log(file);

        try {
          const imgName = v4();
          const { data, error } = await supabase.storage.from('avatars').upload(`community/${imgName}`, file, {
            cacheControl: '3600',
            upsert: true,
          });

          // if (data !== null) {
          //   console.log('이미지 URL:', data);
          // }
          console.log(data, error);

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
          console.log(error);
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
  console.log(content);
  const handleSubmit = async () => {
    console.log('sfssdfsd');
    const formData = {
      title,
      user_id: loginUser!.id,
      content,
    };
    console.log(formData);
    try {
      await createInquiryMutation.mutate(formData);
    } catch (error) {
      console.log('error submit inqury ', error);
    }
    // mutation.mutate(formData);
    navigate('/customer-service/customer-support');
  };

  if (!loginUser) return <div></div>;

  // const formData = {
  //   title: 'title',
  //   user_id: loginUser.id,
  //   content: '작성내용',
  //   isReplied: false,
  //   file1: 'null 들어올 수 있음',
  //   file2: 'null 들어올 수 있음',
  // };

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
  /* display: flex;
  justify-content: center;
  flex-direction: column; */
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
