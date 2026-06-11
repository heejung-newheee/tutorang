import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsFileEarmarkImage } from 'react-icons/bs';
import * as S from './ImgFileUpload.style';

type TypeImgFileUpload = {
  $fileType: string;
  $setCertificationImgFile: React.Dispatch<React.SetStateAction<File | undefined>>;
};

/**
 *
 * @param fileType : tutorCertificationImg, tutorCertificationDoc
 * @returns
 */
const ImgFileUpload = ({ $fileType, $setCertificationImgFile }: TypeImgFileUpload) => {
  const [imgFile, setImgFile] = useState<File>();

  /**
   * 사진 선택했을 때 사용할 함수
   * @param event
   * @param setImgFile  'storage에' 저장될 때 실질적으로 사용되는 imgFile을 갱신해주는 함수(useState로 관리되고 있는 set함수)
   * @param makeVisiblePreviewImg 이미 외부에서 정의된 'raw 이미지파일'을 시각화 해주는 함수
   * @param setPreviewImgfile  makeVisiblePreviewImg함수에 넘겨줄 인자 - 사용자가 선택한 파일을 미리볼 수 있는 previewImgfile 갱신해주는 함수(useState로 관리되고 있는 set함수)
   */
  const handleChangeImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && $fileType === 'tutorCertificationImg') {
      setImgFile(selectedFile);
      $setCertificationImgFile(selectedFile);
    }
  };
  const cancelImg = () => {
    setImgFile(undefined);
    $setCertificationImgFile(undefined);
  };

  let guideMessage = '';
  if ($fileType === 'tutorCertificationImg') guideMessage = '튜터 자격 인증할 이미지 첨부!';

  return (
    <S.CertifiFilesArea>
      <S.FileInput type="file" id={$fileType} onChange={handleChangeImg} accept={'image/*'} />
      <S.CertifiIcon htmlFor={$fileType}>
        <BsFileEarmarkImage className="certification_icon" />
      </S.CertifiIcon>
      <S.Label htmlFor={$fileType}>{imgFile === undefined ? <S.CertifiFilesP $role={'guide'}>{guideMessage}</S.CertifiFilesP> : <S.CertifiFilesP>{imgFile.name}</S.CertifiFilesP>}</S.Label>
      <S.IconFileDelete>
        <AiOutlineClose className="certification_delete_icon" onClick={() => cancelImg()} />
      </S.IconFileDelete>
    </S.CertifiFilesArea>
  );
};

export default ImgFileUpload;
