import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import { CUSTOMER_SUPPORT_QUERY_KEY, ONE_CUSTOMER_INQUIRY_QUERY_KEY, TypeUpdatedInquiry, editInquiry } from '../../../api/customerSupport';
import supabase from '../../../supabase';
import * as S from './EditInquiryForm.style';

const EditInquiryForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const pathdata = useLocation();
  const originalInquiryData = pathdata.state;
  const inquiryId = originalInquiryData.id as string;
  const [title, setTitle] = useState(originalInquiryData.title);
  const QuillRef = useRef<ReactQuill>();
  const [content, setContent] = useState(originalInquiryData.content);

  const editInquiryMutation = useMutation(async ({ inquiryId, updatedInquiry }: { inquiryId: string; updatedInquiry: TypeUpdatedInquiry }) => editInquiry(inquiryId, updatedInquiry), {
    onSuccess: () => {
      queryClient.invalidateQueries([CUSTOMER_SUPPORT_QUERY_KEY]);
      queryClient.invalidateQueries([ONE_CUSTOMER_INQUIRY_QUERY_KEY]);
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
    const updatedInquiry: TypeUpdatedInquiry = {
      title,
      content,
    };
    console.log(updatedInquiry);
    try {
      await editInquiryMutation.mutate({ inquiryId, updatedInquiry });
    } catch (error) {
      console.log('error submit inqury ', error);
    }
    // mutation.mutate(formData);
    // navigate(`/customer-service/customer-support/${inquiryId}`);
    navigate(-1);
  };

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

export default EditInquiryForm;
