import { useEffect, useState } from 'react';
import styled from 'styled-components';
import supabase from '../supabase';
import { useModal } from '../hooks';
import TutorListCompo from '../components/list/TutorListCompo';
import SelectBox from '../components/list/SelectBox';
import CityModal from '../components/list/CityModal';

const List = () => {
  const [filterdObj, setFilterdObj] = useState<any>({});
  const { Modal, isOpen, openModal, closeModal } = useModal();
  const [checkedcity, setCheckedCity] = useState<any>('전체');
  const [checkedGunGu, setCheckedGunGu] = useState<string>('');
  const [isDropdown, setisDropdown] = useState(false);

  //
  const [selectedArr, setSelectedArr] = useState<string[]>([]);

  const handleFilterdObg = (item: string, categoty: string) => {
    //성별
    if (categoty === 'gender') {
      if (item === '전체') {
        delete filterdObj.gender;
        return setFilterdObj(filterdObj);
      } else {
        return setFilterdObj({ ...filterdObj, gender: item });
      }
    }

    //난이도
    if (categoty === 'level') {
      if (item === '전체') {
        delete filterdObj.level;
        return setFilterdObj(filterdObj);
      } else {
        return setFilterdObj({ ...filterdObj, level: item });
      }
    }

    //한국어 가능
    if (categoty === 'isPossibleKorean') {
      if (item === '전체') {
        delete filterdObj.isPossibleKorean;
        return setFilterdObj(filterdObj);
      } else {
        return setFilterdObj({ ...filterdObj, isPossibleKorean: item });
      }
    }

    //나이
    if (categoty === 'age') {
      if (item === '전체') {
        delete filterdObj.age;
        return setFilterdObj(filterdObj);
      } else {
        return setFilterdObj({ ...filterdObj, age: item });
      }
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
          console.log('sfsdf');
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
      <SelectBox handleFilterdObg={handleFilterdObg} checkedcity={checkedcity} checkedGunGu={checkedGunGu} openModal={openModal} selectedArr={selectedArr} filterdObj={filterdObj} />
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

const InnerModalBox = styled.div`
  width: 60%;
  height: 80%;
  background-color: salmon;
  overflow-y: scroll;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > input {
    color: salmon;
  }

  @media only screen and (max-width: 590px) {
    width: 100%;
    height: 70%;
  }
`;

const SiBox = styled.div`
  @media only screen and (max-width: 890px) {
    display: none;
  }
`;

const SiGunGuCheckBox = styled.div`
  display: none;

  & > div {
    padding: 10px 15px;
    border: 1px solid #37507d;
    border-radius: 7px;
    margin-bottom: 10px;
  }

  @media only screen and (max-width: 890px) {
    display: block;
  }
`;

const HiddenDropMenu = styled.div`
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #37507d;
  border-radius: 7px;
  max-height: 200px;
  overflow-y: scroll;
`;
