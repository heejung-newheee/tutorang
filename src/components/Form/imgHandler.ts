// 이미지 처리할 때 사용할 함수 모음

import { v4 } from 'uuid';
import supabase from '../../supabase';
// users-profile-images : 유저의 프로필 이미지, 튜터의 정식 프로필 이미지
// users-certification-files : 튜터의 인증 이미지, 튜터의 인증 파일

type TypeMakeVisiblePreviewImg = (setImgFile: React.Dispatch<React.SetStateAction<File | null>>, setPreviewImg: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>) => void;

/**
 * 사진 선택했을 때 사용할 함수
 * @param event
 * @param setImgFile  'storage에' 저장될 때 실질적으로 사용되는 imgFile을 갱신해주는 함수(useState로 관리되고 있는 set함수)
 * @param makeVisiblePreviewImg 이미 외부에서 정의된 'raw 이미지파일'을 시각화 해주는 함수
 * @param setPreviewImg  makeVisiblePreviewImg함수에 넘겨줄 인자 - 사용자가 선택한 파일을 미리볼 수 있는 previewImg를 갱신해주는 함수(useState로 관리되고 있는 set함수)
 */
export const handleChangeImg = (
  event: React.ChangeEvent<HTMLInputElement>,
  makeVisiblePreviewImg: TypeMakeVisiblePreviewImg,
  setImgFile: React.Dispatch<React.SetStateAction<File | null>>,
  setPreviewImg: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>,
) => {
  const selectedFile = event.target.files?.[0];
  if (selectedFile) {
    setImgFile(selectedFile);
    makeVisiblePreviewImg(setImgFile, setPreviewImg);
  }
};

/**
 * '선택한 파일'정보가 담긴 'raw 이미지파일'을 인자로 받아 시각화 하는 역할
 * @param selectedFile : 'raw 이미지파일' - 최초로 사용자 컴퓨터에서 파일 가져왔을 때 선택된 파일 (객체형태임) (handleChangeImg 함수에서 지역변수로 정의됨)
 * @param setPreviewImg  사용자가 선택한 파일을 미리볼 수 있는 previewImg를 갱신해주는 함수(useState로 관리되고 있는 set함수)
 */
export const makeVisiblePreviewImg = (selectedFile: File, setPreviewImg: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>) => {
  if (selectedFile) {
    // setImgFile(selectedFile);
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      if (reader.result) {
        setPreviewImg(reader.result);
      }
    };
  }
};

// supabase storage에 저장 후 재사용가능한 url 얻는 함수
// insert image to supabase Storaage + get image from supabase Storage -> return reUsable imgUrl
/**
 *
 * @param imgFile  'storage에' 저장될 때 실질적으로 사용되는 imgFile - setImgFile에 의해 관리되는 state로
 * @param bucketName  imgFile이 저장될 'storage의 bucket이름' - ex. (// users-profile-images  // users-certification-files : 튜터의 인증 이미지, 튜터의 인증 파일 )
 * @param userEmail   imgFile이 저장될 storage > bucket 의 '하위 폴더명' - ex.  (bucket)users-profile-images : (folder)유저 email //(userEmail을 폴더명으로 하는 이유 : 나중에 유저 탈퇴했을 때 개인정보 처리하기 편함. (storage는 어차피 url 만들어주는 역할만 하고 있어서 최초 이미지 입력할 때가 아니면 다시 접근할 일 거의 없음.))
 * @returns imgUrl => 이게 user profile or tutor info에 저장될 img임!
 */
export const storeAndGetProfileImg = async (imgFile: File | null, bucketName: string, userEmail: string) => {
  // insert image to supabase Storaage
  const imgIdentity = v4();
  if (imgFile) {
    const { error } = await supabase.storage.from(bucketName).upload(`${userEmail}/${imgIdentity}`, imgFile, {
      cacheControl: '3600',
      upsert: false,
    });
    if (error) {
      console.error('upload error', error);
    }
  }

  //  get image from supabase Storage
  const { data } = await supabase.storage.from(bucketName).getPublicUrl(`${userEmail}/${imgIdentity}`);
  const imgUrl = data.publicUrl;
  return imgUrl;
};

// image 취소(저장전 취소!) 버튼 click시 실행
export const cancelImg = (setImageFile: React.Dispatch<React.SetStateAction<File | null>>, setPreviewImg: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>) => {
  setImageFile(null);
  setPreviewImg(null);
};
