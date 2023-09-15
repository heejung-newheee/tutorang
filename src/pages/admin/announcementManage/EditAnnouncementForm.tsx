import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import { ANNOUNCEMENTS_QUERY_KEY, ONE_ANNOUNCEMENT_QUERY_KEY, editAnnouncement } from '../../../api/announcements';
import { RootState } from '../../../redux/config/configStore';
import supabase from '../../../supabase';
import { UpdatingTables } from '../../../supabase/database.types';
import './../../../components/common/webEditor.css';
import * as S from './AnnouncementForm.style';

const EditAnnouncementForm = () => {
  const navigate = useNavigate();
  const QuillRef = useRef<ReactQuill>();
  const queryClient = useQueryClient();
  const pathdata = useLocation();
  const originalAnnouncementData = pathdata.state;
  const announcementId = originalAnnouncementData.id;
  const [title, setTitle] = useState(originalAnnouncementData.title);
  const [content, setContent] = useState(originalAnnouncementData.content);

  const loginUser = useSelector((state: RootState) => state.user.user);

  const editAnnouncementMutation = useMutation(async ({ announcementId, updatedAnnouncement }: { announcementId: string; updatedAnnouncement: UpdatingTables<'announcements'> }) => editAnnouncement(announcementId, updatedAnnouncement), {
    onSuccess: () => {
      queryClient.invalidateQueries([ANNOUNCEMENTS_QUERY_KEY]);
      queryClient.invalidateQueries([ONE_ANNOUNCEMENT_QUERY_KEY]);
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
    const updatedAnnouncement = {
      user_id: loginUser!.id,
      title,
      content,
    };
    try {
      await editAnnouncementMutation.mutate({ announcementId, updatedAnnouncement });
    } catch (error) {
      console.error('error submit inqury ', error);
    }
    navigate(`/admin/announcements-manage/${announcementId}`);
  };

  if (!loginUser) return <div></div>;

  return (
    <S.WriteContainer>
      <S.Title>
        <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="제목을 입력해주세요" />
      </S.Title>
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
      <S.SubmitBtn onClick={handleSubmit}>저장</S.SubmitBtn>
      <S.BackBtn onClick={() => navigate(-1)}>뒤로가기</S.BackBtn>
    </S.WriteContainer>
  );
};

export default EditAnnouncementForm;
