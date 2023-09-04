export const FORM_HEADER_TITLE = [
  { keyword: 'signin', title: '로그인' },
  { keyword: 'signup', title: '회원가입' },
  { keyword: 'complete', title: '완료' },
  { keyword: 'user_additional-information', title: '추가인증' },
  { keyword: 'tutor_certificate', title: '튜터 추가인증 정보' },
  { keyword: 'tutor_class_edit', title: '튜터 수업정보 수정' },
];

export const FORM_CONSTANT_TITLE_SIGNIN = 'signin';
export const FORM_CONSTANT_TITLE_SIGNUP = 'signup';
export const FORM_CONSTANT_TITLE_COMPLETE = 'complete';
export const FORM_CONSTANT_TITLE_USER_ADDITIONAL_INFO = 'user_additional-information';
export const FORM_CONSTANT_TITLE_TUTOR_CERTIFICATE = 'tutor_certificate';
export const FORM_CONSTANT_TITLE_TUTOR_CLASS_EDIT = 'tutor_class_edit';

// REGEX
export const USERNAME_KR_REGEX = /^[가-힣|]{2,6}$/;
export const USERNAME_EN_REGEX = /^[a-z|A-Z|+\s]{2,20}$/;
export const EMAIL_REGEX = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;
export const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}$/;
