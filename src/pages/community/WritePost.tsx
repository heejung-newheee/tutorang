import React, { useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import supabase from '../../supabase';
import './write.css';

const WritePost = () => {
  const QuillRef = useRef<ReactQuill>();
  const [contents, setContents] = useState('');

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
          const { data, error } = await supabase.storage.from('test222').upload('test222/' + file.name, file, {
            cacheControl: '3600',
            upsert: false,
          });

          // const { data: img } = supabase.storage
          //   .from("test222")
          //   .getPublicUrl(file.name);

          // console.log(img);
          // if (data) {
          //   const fileURL = data.Location;
          // }

          console.log(data, error);
        } catch {}
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [['bold', 'italic', 'underline', 'strike', 'blockquote'], [{ color: [] }], [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }, { align: [] }], ['image']],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [],
  );

  return (
    <div style={{ margin: 100 }}>
      <div>title</div>
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
    </div>
  );
};

export default WritePost;
