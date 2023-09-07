import { useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import supabase from '../../supabase';
import './write.css';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/config/configStore';

const WritePost = () => {
  const [title, setTitle] = useState('');
  const QuillRef = useRef<ReactQuill>();
  const [contents, setContents] = useState('');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginUser = useSelector((state: RootState) => state.user.user);

  const location = useLocation();

  const path = location.pathname.split('/')[2];

  const api = async (newInfo: any) => {
    const { error } = await supabase.from('write').insert(newInfo);

    console.log(error);
    if (error) throw error;
  };

  const mutation = useMutation(async (newInfo: any) => api(newInfo), {
    onSuccess: () => {
      queryClient.invalidateQueries(['write']);
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
          const { data, error } = await supabase.storage.from('avatars').upload('community/' + file.name, file, {
            cacheControl: '3600',
            upsert: false,
          });
          console.log(data, error);

          const url = 'https://rkirhzqybhsglryysdso.supabase.co/storage/v1/object/public/avatars/community/adasd.jpeg';

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
        } catch {}
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
    console.log('sfssdfsd');
    mutation.mutate({
      title: title,
      content: contents,
      user_id: loginUser?.id,
      category: path,
    });
  };
  // const getApi = async () => {
  //   const { data, error } = await supabase.from('write').select('*');
  //   console.log(data);
  //   if (error) throw error;
  //   return data;
  // };

  // const { data } = useQuery(['write'], getApi);

  // console.log(data, 'data');
  return (
    <WriteContainer>
      <div>title</div>
      <Title>
        <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder="제목을 입력해주세요" />
      </Title>
      <ReactQuill
        ref={(element) => {
          if (element !== null) {
            QuillRef.current = element;
          }
        }}
        value={contents}
        onChange={setContents}
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

export default WritePost;

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
