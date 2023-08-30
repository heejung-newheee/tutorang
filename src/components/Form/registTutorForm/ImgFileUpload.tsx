// users-profile-images : 유저의 프로필 이미지, 튜터의 정식 프로필 이미지
// users-certification-files : 튜터의 인증 이미지, 튜터의 인증 파일
import { useState } from 'react';
import { BsFileEarmarkImage } from 'react-icons/bs';
import { styled } from 'styled-components';
// import { AVAILABLE_LANGUAGE_LIST, CLASSLEVEL_LIST, PERSONALITY_LIST } from './constant';
import { AiOutlineClose } from 'react-icons/ai';

type TypeImgFileUpload = {
  $fileType: string;
  $setCertificationImgFile: React.Dispatch<React.SetStateAction<File | undefined>>;
};

/**
 *
 * @param fileType : tutorCertificationImg, tutorCertificationDoc
 * @returns
 */
const ImgFileUpload: React.FC<TypeImgFileUpload> = ({ $fileType, $setCertificationImgFile }) => {
  const [imgFile, setImgFile] = useState<File>();

  /**
   * 사진 선택했을 때 사용할 함수
   * @param event
   * @param setImgFile  'storage에' 저장될 때 실질적으로 사용되는 imgFile을 갱신해주는 함수(useState로 관리되고 있는 set함수)
   * @param makeVisiblePreviewImg 이미 외부에서 정의된 'raw 이미지파일'을 시각화 해주는 함수
   * @param setPreviewImgfile  makeVisiblePreviewImg함수에 넘겨줄 인자 - 사용자가 선택한 파일을 미리볼 수 있는 previewImgfile 갱신해주는 함수(useState로 관리되고 있는 set함수)
   */
  const handleChangeImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('내확인좀 하리', event.target.files);
    const selectedFile = event.target.files?.[0];
    console.log(selectedFile);
    if (selectedFile && $fileType === 'tutorCertificationImg') {
      console.log('여기서 이미지 파일 넘겨주고 있는거 맞지?', selectedFile);
      setImgFile(selectedFile);
      $setCertificationImgFile(selectedFile);
    }
  };

  // image 취소(저장전 취소!) 버튼 click시 실행
  const cancelImg = () => {
    setImgFile(undefined);
    $setCertificationImgFile(undefined);
  };

  let guideMessage = '';
  if ($fileType === 'tutorCertificationImg') guideMessage = '튜터 자격 인증할 이미지 첨부!';

  return (
    <SCertifiFilesArea>
      <SFileInput type="file" id={$fileType} onChange={handleChangeImg} accept={'image/*'} />
      <SCertifiIcon htmlFor={$fileType}>
        <BsFileEarmarkImage className="certification_icon" />
      </SCertifiIcon>
      <SLabel htmlFor={$fileType}>{imgFile === undefined ? <SCertifiFilesP $role={'guide'}>{guideMessage}</SCertifiFilesP> : <SCertifiFilesP>{imgFile.name}</SCertifiFilesP>}</SLabel>
      <SIconFileDelete>
        <AiOutlineClose className="certification_delete_icon" onClick={() => cancelImg()} />
      </SIconFileDelete>
    </SCertifiFilesArea>
  );
};

export default ImgFileUpload;

const SCertifiFilesArea = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`;

const SCertifiIcon = styled.label`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
`;

const SCertifiFilesP = styled.p<{ $role?: string }>`
  box-sizing: border-box;
  min-width: 245px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 10px 5px 10px 10px;
  overflow: hidden;

  // 실제 파일 명과 안내문구의 색을 다르게 해야할지 어쩔지 몰라서 애매하게 둠
  border: ${({ $role }) => {
    if ($role === 'guide') return '1px solid #696969';
    else return '1px solid #FE902F';
  }};
  border-radius: 3px;
  color: #aeaeae;
`;
const SLabel = styled.label<{ id?: string }>`
  background-color: #f7f7f7;
  width: 100%;
  height: 40px;
  cursor: pointer;
`;

const SIconFileDelete = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SFileInput = styled.input`
  display: none;
`;
