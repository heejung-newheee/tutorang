export const FORM_HEADER_TITLE = [
  { keyword: 'signin', title: '로그인', subTitle: '쉽고 빠르게 튜터를 만나보는 1:1 매칭 서비스 튜터랑' },
  { keyword: 'signup', title: '회원가입', subTitle: '쉽고 빠르게 튜터를 만나보는 1:1 매칭 서비스 튜터랑' },
  { keyword: 'complete', title: '완료', subTitle: '쉽고 빠르게 튜터를 만나보는 1:1 매칭 서비스 튜터랑' },
  { keyword: 'user_additional-information', title: '추가인증', subTitle: '쉽고 빠르게 튜터를 만나보는 1:1 매칭 서비스 튜터랑' },
  { keyword: 'tutor_certificate', title: '튜터 추가인증 정보', subTitle: '쉽고 빠르게 튜터를 만나보는 1:1 매칭 서비스 튜터랑' },
  { keyword: 'tutor_class_edit', title: '수업 정보 수정', subTitle: '학생들에게 어필할 수 있는 나만의 매력을 어필해 보세요' },
  { keyword: 'profiles_edit', title: '나의 프로필 수정', subTitle: '쉽고 빠르게 튜터를 만나보는 1:1 매칭 서비스 튜터랑' },
  { keyword: 'community', title: '커뮤니티', subTitle: '튜터링을 이용하는 사람들의 이야기를 들어보세요' },
  { keyword: 'customer', title: '고객센터', subTitle: '튜터랑의 관련 문의사항을 이야기 해주세요' },
];

export const FORM_CONSTANT_TITLE_SIGNIN = 'signin';
export const FORM_CONSTANT_TITLE_SIGNUP = 'signup';
export const FORM_CONSTANT_TITLE_COMPLETE = 'complete';
export const FORM_CONSTANT_TITLE_USER_ADDITIONAL_INFO = 'user_additional-information';
export const FORM_CONSTANT_TITLE_TUTOR_CERTIFICATE = 'tutor_certificate';
export const FORM_CONSTANT_TITLE_TUTOR_CLASS_EDIT = 'tutor_class_edit';
export const FORM_CONSTANT_TITLE_PROFILES_EDIT = 'profiles_edit';
export const FORM_CONSTANT_TITLE_COMMUNITY = 'community';
export const FORM_CONSTANT_TITLE_CUSTOMER = 'customer';

export const USERNAME_KR_REGEX = /^[가-힣|]{2,6}$/;
export const USERNAME_EN_REGEX = /^[a-z|A-Z|+\s]{2,20}$/;
export const EMAIL_REGEX = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;
export const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}$/;
