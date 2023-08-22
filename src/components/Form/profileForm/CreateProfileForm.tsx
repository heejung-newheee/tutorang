// TODO 아마 메인에 '모달창으로 뜨거나' 새로운 입력창으로 가면 될듯.

import { useState } from 'react';
import { styled } from 'styled-components';

const CreateProfileForm = () => {
  const [checkedRole, setCheckedRole] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [checkedGender, setCheckedGender] = useState<string>();
  const [birth, setBirth] = useState<string>();
  // const LEVELOPTION = [
  //   { value: 'beginner', label: '초급', description: '소개, 질문, 간단한 답변이 가능해요' },
  //   { value: 'intermediate', label: '중급', description: '일반적이고, 일상적인 주제에 대해 대화할 수 있어요.' },
  //   { value: 'advanced', label: '고급', description: '좀 더 자연스럽게 내 생각을 표현하며 원어민과 교류할 수 있어요.' },
  // ];

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 아래 두개는 조건문을 'tutor'or student로 해도되긴해
    if (event.target.name === 'tutor' || event.target.name === 'student') setCheckedRole(event.target.value);
    if (event.target.name === 'username') setUsername(event.target.value);
    if (event.target.name === 'female' || event.target.name === 'male') setCheckedGender(event.target.value);
    if (event.target.name === 'birth') setBirth(event.target.value);
    console.log(event.target.value);
  };
  return (
    <SForm>
      <h1>당신의 상세 정보를 알려주세여</h1>
      <div>
        <label htmlFor="username">이름</label>
        <input type="text" id="username" name="username" placeholder="이름을 입력하세요" onChange={onChangeHandler} value={username} />
      </div>

      <div>
        {`여긴 학생튜터 => radio?`}
        <label htmlFor="tutor">
          튜터
          <input type="radio" id="tutor" name="tutor" value="tutor" checked={checkedRole === 'tutor'} onChange={onChangeHandler} />
        </label>
        <label htmlFor="student">
          학생
          <input type="radio" id="student" name="student" value="student" checked={checkedRole === 'student'} onChange={onChangeHandler} />
        </label>
      </div>

      <div>
        {`여긴 성별 => radio?`}
        <label htmlFor="female">
          여성
          <input type="radio" id="female" name="female" value="female" checked={checkedGender === 'female'} onChange={onChangeHandler} />
        </label>
        <label htmlFor="male">
          남성
          <input type="radio" id="male" name="male" value="male" checked={checkedGender === 'male'} onChange={onChangeHandler} />
        </label>
      </div>

      <div>
        {`여긴 생년월일 => select`}
        <input type="date" name="birth" value={birth} onChange={onChangeHandler} />
      </div>
      <div>{`지역설정 1 => select`}</div>
      <div>{`지역설정 2 => select`}</div>
      <div>{`레벨 =>  => select`}</div>
      <button>제출하기</button>
    </SForm>
  );
};

export default CreateProfileForm;

// 임시 form 디자인
const SForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid #000;
`;
