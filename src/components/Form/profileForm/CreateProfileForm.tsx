// TODO 아마 메인에 '모달창으로 뜨거나' 새로운 입력창으로 가면 될듯.

import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import supabase from '../../../supabase';

const CreateProfileForm = () => {
  const [checkedRole, setCheckedRole] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [checkedGender, setCheckedGender] = useState<string>('');
  const [birth, setBirth] = useState<string>('');
  const [selectedLanguageLevel, setSelectedLanguageLevel] = useState<string>('');

  //localStorage 정보는 리덕스에서 빼서 쓸껀데 일단은 임시로 useState 이용해서 저장!
  const [uid, setUid] = useState<string>('');
  const bringUid = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const user_id = user.id;
    setUid(user_id);
  };

  const LEVELOPTION = [
    { value: 'beginner', label: '초급', description: '소개, 질문, 간단한 답변이 가능해요' },
    { value: 'intermediate', label: '중급', description: '일반적이고, 일상적인 주제에 대해 대화할 수 있어요.' },
    { value: 'advanced', label: '고급', description: '좀 더 자연스럽게 내 생각을 표현하며 원어민과 교류할 수 있어요.' },
  ];

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    // 아래 두개는 조건문을 'tutor'or student로 해도되긴해
    if (event.target.name === 'tutor' || event.target.name === 'student') setCheckedRole(event.target.value);
    if (event.target.name === 'username') setUsername(event.target.value);
    if (event.target.name === 'female' || event.target.name === 'male') setCheckedGender(event.target.value);
    if (event.target.name === 'birth') setBirth(event.target.value);
    if (event.target.name === 'language_level') setSelectedLanguageLevel(event.target.value);
    console.log(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { data, error: updateUserError } = await supabase.auth.updateUser({
      data: { role: checkedRole, username },
    });
    console.log(data);
    console.log(updateUserError?.message);

    const updatedInfo = {
      role: checkedRole,
      username,
      gender: checkedGender,
      birth,
      language_level: selectedLanguageLevel,
      location1: '송파구',
      location2: '강남구',
    };
    const { error: updateProfileError } = await supabase.from('profiles').update(updatedInfo).eq('id', uid);
    console.log(updateProfileError);

    setCheckedRole('');
    setUsername('');
    setCheckedGender('');
    setBirth('');
    setSelectedLanguageLevel('');
  };

  useEffect(() => {
    bringUid();
  }, []);

  const test = () => {
    const updatedInfo = {
      role: checkedRole,
      username,
      gender: checkedGender,
      birth,
      language_level: selectedLanguageLevel,
      location1: '송파구',
      location2: '강남구',
    };
    console.log('updatedInfo', updatedInfo);
  };
  return (
    <SForm onSubmit={handleSubmit}>
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

      {/* TODO 지역설정 카테고리는 db에 어떤 방식으로 저장하냐에 따라서 바꿀겁니다. */}
      <div>
        지역설정1 <input type="text" value="경상북도 경주시" />
      </div>
      <div>
        지역설정2 <input type="text" value="서울특별시 강남구" />
      </div>
      <div>{`레벨 =>  => select`}</div>

      <select className="select" name="language_level" value={selectedLanguageLevel} onChange={onChangeHandler} placeholder="값을 입력해주세염">
        <option disabled defaultValue="">
          선택하세요
        </option>
        {LEVELOPTION.map((y) => {
          return (
            <option key={y.value} value={y.value}>
              {y.label} : {y.description}
            </option>
          );
        })}
      </select>
      <button type="button" onClick={test}>
        테스트해야즴
      </button>
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
