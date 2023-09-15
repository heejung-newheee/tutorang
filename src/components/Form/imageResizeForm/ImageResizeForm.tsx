import 'cropperjs/dist/cropper.css';
import { useEffect, useRef, useState } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import { IoClose } from 'react-icons/io5';
import { MdOutlineCropFree } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/config/configStore';
import { closeModal, successModal } from '../../../redux/modules';
import * as S from './ImageResizeForm.styled';

const base64StringtoFile = (base64String: string, filename: string): File => {
  const arr = base64String.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

const ImageResizeForm = () => {
  const { targetId } = useSelector((state: RootState) => state.modal);
  const [image, setImage] = useState<string | null>(null);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const dispatch = useDispatch();

  const cropperRef = useRef<ReactCropperElement>(null);

  const handleSubmit = async () => {
    if (!targetId || !imgFile) return;
    dispatch(successModal({ file: imgFile }));
    dispatch(closeModal());
  };

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (files === null) return;
    setImage(URL.createObjectURL(files[0]));
  };

  const onCrop = async () => {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;
    const file = base64StringtoFile(cropper.getCroppedCanvas().toDataURL(), 'cropped.jpg');
    setImgFile(file);
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {});

  return (
    <S.Container>
      <S.Inner>
        <S.Header>
          <S.HeaderTitle>
            <MdOutlineCropFree size={20} />
            이미지 자르기
          </S.HeaderTitle>
          <S.IconButton onClick={handleClose}>
            <IoClose size={30} />
          </S.IconButton>
        </S.Header>
        <S.Body>
          <input type="file" onChange={onChangeImage} />
          <Cropper
            src={image || ''}
            style={{ height: 400, width: '100%' }}
            // Cropper.js options
            initialAspectRatio={1}
            aspectRatio={1}
            guides={false}
            crop={onCrop}
            ref={cropperRef}
          />
          <button type="button" onClick={handleSubmit}>
            프로필 사진 저장
          </button>
        </S.Body>
      </S.Inner>
    </S.Container>
  );
};

export default ImageResizeForm;
