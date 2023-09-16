import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { v4 } from 'uuid';
import { updateWrite, updateEditedWrite } from '../../api/writeCommunity';
import { AppDispatch, RootState } from '../../redux/config/configStore';
import supabase from '../../supabase';
import './write.css';
import { displayToastAsync } from '../../redux/modules';
import { EDITWRITE, POSTWRITE } from '../../@types/writeCommunity/WriteCommunity.type';

const WritePost = () => {
  const [title, setTitle] = useState<string | null>('');
  const QuillRef = useRef<ReactQuill>();
  const [contents, setContents] = useState<string | null>('');
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
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

        try {
          const imgName = v4();
          const { data } = await supabase.storage.from('avatars').upload(`community/${imgName}`, file, {
            cacheControl: '3600',
            upsert: true,
          });

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
        } catch (err) {
          console.log(err);
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
    if (!title) {
      return dispatch(displayToastAsync({ id: Date.now(), type: 'warning', message: '제목을 입력해주세요' }));
    }

    if (!contents) {
      return dispatch(displayToastAsync({ id: Date.now(), type: 'warning', message: '내용을 입력해주세요' }));
    }

    if (path === 'edit-community') {
      editUpdateMutation.mutate({
        title: title,
        content: contents,
      });

      navigate(-1);
      return;
    }

    if (path === 'free' || path === 'study' || path === 'question' || path === 'region') {
      communityMutation.mutate({
        title: title,
        content: contents,
        user_id: loginUser?.id,
        category: path,
      });
      navigate(-1);
    }
  };

  const getEditPost = async () => {
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
      getEditPost();
    }
  }, []);

  ///community-update
  const communityMutation = useMutation((postWrite: POSTWRITE) => updateWrite(postWrite), {
    onSuccess: () => {
      queryClient.invalidateQueries(['write']);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  //community-edit
  const editUpdateMutation = useMutation((editWrite: EDITWRITE) => updateEditedWrite(editWrite, editPostNum), {
    onSuccess: () => {
      queryClient.invalidateQueries(['write']);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <WriteContainer>
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
