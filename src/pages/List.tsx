import { useEffect, useState } from 'react';
import styled from 'styled-components';
import supabase from '../supabase';
import { useModal } from '../hooks';
import TutorListCompo from '../components/list/TutorListCompo';
import SelectBox from '../components/list/SelectBox';
import CityModal from '../components/list/CityModal';

const List = () => {
  //유저가 선택한 목록{} - 검색 api 사용
  const [filterdObj, setFilterdObj] = useState<any>({});
  const { Modal, isOpen, openModal, closeModal } = useModal();
  //시/군/구
  const [checkedcity, setCheckedCity] = useState<any>('전체');
  const [checkedGunGu, setCheckedGunGu] = useState<string>('');
  //모달 시/군/구 드롭다운
  const [isDropdown, setisDropdown] = useState(false);

  //유저가 선택한 목록[]
  type ddd = {};
  const [selectedArr, setSelectedArr] = useState<string[][]>([]);

  //////
  const [genderArr, setGenderArr] = useState<string[]>(['전체', '여성', '남성']);
  const [language_levelArr, setLanguage_levelArr] = useState<string[]>(['전체', 'advanced', 'beginner']);

  // const [location1Arr, setLocation1Arr] = useState<string[]>([]);

  // const [location2Arr, setLocation2Arr] = useState<string[]>([]);

  const [priceArr, setPriceArr] = useState<string[]>([]);

  console.log(selectedArr, 'selectedArr');
  const handleFilterdObg = (item: string, category: string) => {
    switch (category) {
      //성별
      case 'gender':
        //처음 클릭했을 때
        if (genderArr.includes('전체') && item !== '전체') {
          setGenderArr([item]);
          setSelectedArr((pre) => [...pre, ['gender', item]]);
        } else if (item === '전체') {
          setGenderArr(['전체', '여성', '남성']);
          setSelectedArr((pre) => pre.filter((item) => item[0] !== 'gender'));
        } else if (!genderArr.includes('전체') && item !== '전체') {
          if (genderArr.includes(item)) {
            setGenderArr((pre) => pre.filter((i) => i !== item));
            setSelectedArr((pre: any[]) => pre.filter((i) => i[1] !== item));
          } else {
            setGenderArr((pre) => [...pre, item]);
            setSelectedArr((pre: any) => [...pre, ['gender', item]]);
          }
        }
        break;

      // 난이도
      case 'level':
        if (language_levelArr.includes('전체')) {
          setLanguage_levelArr([item]);
        } else if (!language_levelArr.includes('전체')) {
          language_levelArr.includes(item) ? setLanguage_levelArr((pre) => pre.filter((i) => i !== item)) : setLanguage_levelArr((pre) => [...pre, item]);
        }
        break;

      // 한국어 가능
      // case 'isPossibleKorean':
      //   if (item === '전체') {
      //     delete filterdObj.isPossibleKorean;
      //     setFilterdObj((pre: any) => (pre ? { ...pre } : null));
      //   } else {
      //     setFilterdObj({ ...filterdObj, isPossibleKorean: item });
      //   }
      //   break;

      //나이
      case 'age':
        // if (item === '전체') {
        //   delete filterdObj.age;
        //   setFilterdObj((pre: any) => (pre ? { ...pre } : null));
        // } else {
        //   setFilterdObj({ ...filterdObj, age: item });
        // }
        break;

      //가격
      case 'price':
        if (item === '전체') {
          delete filterdObj.price;
          setFilterdObj((pre: any) => (pre ? { ...pre } : null));
        } else {
          setFilterdObj({ ...filterdObj, price: item });
        }
        break;

      default:
        break;
    }
  };

  //강사 api 호출
  useEffect(() => {
    getData();

    // const arr: string[] = [];
    // for (const key in filterdObj) {
    //   arr.push(filterdObj[key]);
    // }

    // setSelectedArr(arr);
  }, [filterdObj, genderArr, language_levelArr]);

  const getData = async () => {
    try {
      // const minPrice = 20000; // 최소 가격
      // const maxPrice = 5000; // 최대 가격
      // .range(0, 1)
      // const { data, error } = await supabase.from('profiles').select('*').match(filterdObj);
      const { data, error } = await supabase.from('profiles').select('*').in('gender', [genderArr]).in('language_level', [language_levelArr]).match(filterdObj);
      // const { data, error } = await supabase.from('tutor_info').select('*').gte('price', minPrice);

      // .gte('price', 3000).lte('price', 100000)
      console.log(data, 'ㅁㄴㅇㄴ');
    } catch (error) {
      console.log(error);
    }
  };
  console.log(filterdObj, selectedArr);

  const handleDropAndSi = (item: string) => {
    //시(city)생성, 군구 초기화
    setCheckedCity(item);
    setCheckedGunGu('');
    setSelectedArr((pre) => pre.filter((item) => item[0] !== 'location2'));
    setSelectedArr((pre) => [...pre, ['location1', item]]);
    //군구 초기화
    delete filterdObj.location2;
    setFilterdObj(filterdObj);
    setisDropdown(!isDropdown);
  };

  const handelCloseModalAndSelect = () => {
    console.log(checkedcity, checkedGunGu);

    if (checkedcity === '전체') {
      //전체면 필터객체에서 삭제
      setFilterdObj((prevState: any) => {
        if (prevState) {
          delete prevState.location1;
          return prevState;
        }
        setSelectedArr((pre) => pre.filter((item) => item[0] !== 'location1'));
      });
    } else {
      //지역명이 있으면 업데이트
      setFilterdObj((prevState: any) => (prevState ? { ...prevState, location1: checkedcity } : null));
      setSelectedArr((pre) => [...pre.filter((item) => item[0] !== 'location1'), ['location1', checkedcity]]);
    }

    if (checkedGunGu === '전체') {
      //전체면 필터객체에서 삭제
      setFilterdObj((prevState: any) => {
        if (prevState) {
          delete prevState.location2;
          return prevState;
        }
      });
      setSelectedArr((pre) => pre.filter((item) => item[0] !== 'location2'));
    } else if (checkedGunGu) {
      //지역명이 있으면 업데이트
      setFilterdObj((prevState: any) => (prevState ? { ...prevState, location2: checkedGunGu } : null));
      setSelectedArr((pre) => [...pre.filter((item) => item[0] !== 'location2'), ['location2', checkedGunGu]]);
    }
    closeModal();
  };

  const DeleteFilterBar = (item: string) => {};
  return (
    <Container>
      {/* 필터박스 */}
      <SelectBox
        handleFilterdObg={handleFilterdObg}
        openModal={openModal}
        selectedArr={selectedArr}
        filterdObj={filterdObj}
        setFilterdObj={setFilterdObj}
        genderArr={genderArr}
        language_levelArr={language_levelArr}
        setGenderArr={setGenderArr}
        setSelectedArr={setSelectedArr}
      />
      {/* 강사 리스트 */}
      <TutorList>
        <TutorListCompo />
        <TutorListCompo />
        <TutorListCompo />
      </TutorList>
      {/* 모달 */}
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <InnerModal
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation();
          }}
        >
          <CityModal isDropdown={isDropdown} setisDropdown={setisDropdown} checkedcity={checkedcity} handleDropAndSi={handleDropAndSi} setCheckedGunGu={setCheckedGunGu} handelCloseModalAndSelect={handelCloseModalAndSelect} />
        </InnerModal>
      </Modal>
    </Container>
  );
};

export default List;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TutorList = styled.div`
  margin-top: 50px;
  width: 100%;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media only screen and (max-width: 890px) {
    grid-template-columns: repeat(2, 1fr);
  }

  & > div {
    background-color: beige;
    word-break: break-all;
  }

  & > div img {
    width: 100%;
  }
`;

/////모달
const InnerModal = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 590px) {
    align-items: end;
  }
`;
