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
  const [selectedArr, setSelectedArr] = useState<string[]>([]);

  const handleFilterdObg = (item: string, categoty: string) => {
    switch (categoty) {
      //성별
      case 'gender':
        if (item === '전체') {
          delete filterdObj.gender;
          setFilterdObj((pre: any) => (pre ? { ...pre } : null));
        } else {
          setFilterdObj({ ...filterdObj, gender: item });
        }
        break;

      //난이도
      case 'level':
        if (item === '전체') {
          delete filterdObj.level;
          setFilterdObj((pre: any) => (pre ? { ...pre } : null));
        } else {
          setFilterdObj({ ...filterdObj, level: item });
        }
        break;

      //한국어 가능
      case 'isPossibleKorean':
        if (item === '전체') {
          delete filterdObj.isPossibleKorean;
          setFilterdObj((pre: any) => (pre ? { ...pre } : null));
        } else {
          setFilterdObj({ ...filterdObj, isPossibleKorean: item });
        }
        break;

      //나이
      case 'age':
        if (item === '전체') {
          delete filterdObj.age;
          setFilterdObj((pre: any) => (pre ? { ...pre } : null));
        } else {
          setFilterdObj({ ...filterdObj, age: item });
        }
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

    const arr: string[] = [];
    for (const key in filterdObj) {
      arr.push(filterdObj[key]);
    }

    setSelectedArr(arr);
  }, [filterdObj]);

  const getData = async () => {
    try {
      // const { data, error } = await supabase.from('tutor_info').select('*').range(0, 1).match(filterdObj);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(filterdObj, selectedArr);

  const handleDropAndSi = (item: string) => {
    //시(city)생성, 군구 초기화
    setCheckedCity(item);
    setCheckedGunGu('');
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
      });
    } else {
      //지역명이 있으면 업데이트
      setFilterdObj((prevState: any) => (prevState ? { ...prevState, location1: checkedcity } : null));
    }

    if (checkedGunGu === '전체') {
      //전체면 필터객체에서 삭제
      setFilterdObj((prevState: any) => {
        if (prevState) {
          delete prevState.location2;
          return prevState;
        }
      });
    } else if (checkedGunGu) {
      //지역명이 있으면 업데이트
      setFilterdObj((prevState: any) => (prevState ? { ...prevState, location2: checkedGunGu } : null));
    }
    closeModal();
  };

  return (
    <Container>
      {/* 필터박스 */}
      <SelectBox handleFilterdObg={handleFilterdObg} checkedcity={checkedcity} checkedGunGu={checkedGunGu} openModal={openModal} selectedArr={selectedArr} filterdObj={filterdObj} setFilterdObj={setFilterdObj} />
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
