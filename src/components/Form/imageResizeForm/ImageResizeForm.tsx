import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as S from './ImageResizeForm.styled';
import { MdOutlineCropFree } from 'react-icons/md';
import { closeModal, successModal } from '../../../redux/modules';
import { IoClose } from 'react-icons/io5';
import { RootState } from '../../../redux/config/configStore';
import Cropper, { ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { Button } from '../..';

const ImageResizeForm = () => {
  const { targetId } = useSelector((state: RootState) => state.modal);
  const [image, setImage] = useState<string | null>(null);
  const [imgFile, setImgFile] = useState<string | null>(null);
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

  const onCropEnd = async () => {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;
    setImgFile(cropper.getCroppedCanvas().toDataURL());
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
          <Cropper src={image || ''} style={{ height: 400, width: '100%' }} initialAspectRatio={1} aspectRatio={1} guides={false} cropend={onCropEnd} ref={cropperRef} />
          <div style={{ marginTop: 'auto' }}>
            <Button variant="solid" color={'primary'} size="Large" onClick={handleSubmit}>
              확인
            </Button>
          </div>
        </S.Body>
      </S.Inner>
    </S.Container>
  );
};

export default ImageResizeForm;
