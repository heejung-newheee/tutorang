import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { v4 } from 'uuid';
import { WriteInsertApi, editUpdateApi } from '../../api/writeCommunity';
import { RootState } from '../../redux/config/configStore';
import supabase from '../../supabase';
import './write.css';

const WritePost = () => {
  const [title, setTitle] = useState<string | null>('');
  const QuillRef = useRef<ReactQuill>();
  const [contents, setContents] = useState<string | null>('');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginUser = useSelector((state: RootState) => state.user.user);

  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const [query, _] = useSearchParams();
  const editPostNum = Number(query.get('q'));

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
  console.log(contents);
  const handleSubmit = async () => {
    if (path === 'edit-community') {
      editUpdateMutation.mutate({
        title: title,
        content: contents,
      });
    }

    if (path === 'free' || path === 'study' || path === 'question' || path === 'region') {
      communityMutation.mutate({
        title: title,
        content: contents,
        user_id: loginUser?.id,
        category: path,
      });
    }
  };

  const editCommunity = async () => {
    const { data } = await supabase
      .from('write')
      .select('*')
      .eq('id', Number(query.get('q')));
    setTitle(data && data[0]?.title);
    setContents(data && data[0]?.content);
  };

  ///community-edit
  useEffect(() => {
    if (path === 'edit-community') {
      editCommunity();
    }
  }, []);
  ///community-insert
  const communityMutation = useMutation(async (newInfo: any) => WriteInsertApi(newInfo), {
    onSuccess: () => {
      queryClient.invalidateQueries(['write']);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  //community-edit
  const editUpdateMutation = useMutation(async (newInfo: any) => editUpdateApi(newInfo, editPostNum), {
    onSuccess: () => {
      queryClient.invalidateQueries(['write']);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <WriteContainer>
      {/* <div>title</div> */}
      <Title>
        <input value={title as string} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="제목을 입력해주세요" />
      </Title>
      <ReactQuill
        ref={(element) => {
          if (element !== null) {
            QuillRef.current = element;
          }
        }}
        value={contents as string}
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
