import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import supabase from '../supabase';
import { useModal } from '../hooks';
import TutorListCompo from '../components/list/tutorCompo/TutorListCompo';
import LastTutorListCompo from '../components/list/tutorCompo/LastTutorListCompo';
import SelectBox from '../components/list/selectBox/SelectBox';
import CityModal from '../components/list/location/CityModal';
import { handleAgeNum, SelectedFilters } from '../components/list/utility';
import { useInfiniteQuery } from '@tanstack/react-query';

const List = () => {
  const { Modal, isOpen, openModal, closeModal } = useModal();
  //시/군/구
  const [checkedcity, setCheckedCity] = useState<string>('전체');
  const [checkedGunGu, setCheckedGunGu] = useState<string>('전체');
  //모달 시/군/구 드롭다운
  const [isDropdown, setisDropdown] = useState(false);

  //유저가 선택한 목록 - 필터 바에 들어갈 값[]
  const [selectedArr, setSelectedArr] = useState<string[][]>([]);

  const initialSelectedFilters: SelectedFilters = {
    gender: [],
    level: [],
    minPrice: 0,
    maxPrice: 100000,
    priceType: '전체',
    location1: '',
    location2: '',
    age: [],
    classStyle: 'onLine',
  };

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>(initialSelectedFilters);
  //검색
  const [searchText, setSearchText] = useState('');

  console.log(selectedFilters, selectedArr);
  //체크박스 클릭
  const handleFilterdObj = (item: string, category: string) => {
    switch (category) {
      //성별
      case 'gender':
        if (item === '전체') {
          //전체 클릭 - 모든 값 초기화
          setSelectedFilters((pre: SelectedFilters) => pre && { ...pre, gender: [] });
          setSelectedArr((pre: string[][]) => [...pre.filter((item) => item[0] !== 'gender')]);
          //전체를 제외한 클릭
        } else if (item !== '전체') {
          //값이 없을때 - 추가
          if (selectedFilters?.gender.find((i: string) => i === item) === undefined) {
            setSelectedFilters((pre: SelectedFilters) => pre && { ...pre, gender: [...pre.gender, item] });
            setSelectedArr((pre: string[][]) => [...pre, ['gender', item]]);
            //값이 있을때 - 삭제
          } else {
            setSelectedFilters((pre: SelectedFilters) => pre && { ...pre, gender: pre.gender.filter((i: string) => i !== item) });
            setSelectedArr((pre) => pre.filter((i) => i[1] !== item));
          }
        }
        break;

      //난이도
      case 'level':
        if (item === '전체') {
          //전체 클릭 - 모든 값 초기화
          setSelectedFilters((pre: SelectedFilters) => pre && { ...pre, level: [] });
          setSelectedArr((pre) => [...pre.filter((item) => item[0] !== 'level')]);
          //전체를 제외한 클릭
        } else if (item !== '전체') {
          //값이 없을때 - 추가
          if (selectedFilters?.level.find((i: string) => i === item) === undefined) {
            setSelectedFilters((pre: SelectedFilters) => pre && { ...pre, level: [...pre.level, item] });
            setSelectedArr((pre: string[][]) => [...pre, ['level', item]]);
            //값이 있을때 - 삭제
          } else {
            setSelectedFilters((pre: SelectedFilters) => pre && { ...pre, level: pre.level.filter((i: string) => i !== item) });
            setSelectedArr((pre) => pre.filter((i) => i[1] !== item));
          }
        }
        break;

      //나이
      case 'age':
        //숫자로 변환
        let ageNum = handleAgeNum(item);

        if (item === '전체') {
          //전체 클릭 - 모든 값 초기화
          setSelectedFilters((pre: SelectedFilters) => pre && { ...pre, age: [] });
          setSelectedArr((pre) => [...pre.filter((item) => item[0] !== 'age')]);
        } else if (item !== '전체') {
          //값이 없을때 - 추가
          if (selectedFilters?.age.find((i: number) => i === ageNum) === undefined) {
            setSelectedFilters((pre: SelectedFilters) => pre && { ...pre, age: [...pre.age, Number(ageNum)] });
            setSelectedArr((pre: string[][]) => [...pre, ['age', item]]);
            //값이 있을때 - 삭제
          } else {
            setSelectedFilters((pre: SelectedFilters) => pre && { ...pre, age: pre.age.filter((i: number) => i !== ageNum) });
            setSelectedArr((pre) => pre.filter((i) => i[1] !== item));
          }
        }
        break;

      default:
        break;
    }
  };

  const handleDropAndSi = (item: string, version: string) => {
    //시, 군구 setState
    setCheckedCity(item);
    setCheckedGunGu('');
    //체크박스 닫기
    version === 'pc' ? null : setisDropdown(!isDropdown);
  };

  const handelCloseModalAndSelect = () => {
    if (checkedcity === '전체') {
      //전체면 필터객체에서 삭제
      setSelectedFilters((pre: SelectedFilters) => pre && { ...pre, location1: '', location2: '' });
      setSelectedArr((pre) => pre.filter((item) => item[0] !== 'location1'));
      setSelectedArr((pre) => pre.filter((item) => item[0] !== 'location2'));
    } else {
      //지역명이 있으면 업데이트
      setSelectedFilters((pre: SelectedFilters) => pre && { ...pre, location1: checkedcity, location2: '' });

      setSelectedArr((pre) => [...pre.filter((item) => item[0] !== 'location1'), ['location1', checkedcity]]);
      setSelectedArr((pre) => pre.filter((item) => item[0] !== 'location2'));
    }

    if (checkedGunGu === '전체') {
      //전체면 필터객체에서 삭제
      setSelectedFilters((pre: SelectedFilters) => pre && { ...pre, location2: '' });
      setSelectedArr((pre) => pre.filter((item) => item[0] !== 'location2'));
    } else if (checkedGunGu) {
      //지역명이 있으면 업데이트
      setSelectedFilters((pre: SelectedFilters) => pre && { ...pre, location2: checkedGunGu });

      setSelectedArr((pre) => [...pre.filter((item) => item[0] !== 'location2'), ['location2', checkedGunGu]]);
    }
    closeModal();
  };

  const handleCloseModal = () => {
    closeModal();
  };

  //튜터 api 호출
  const PAGE_SIZE = 6;

  const api = async (page = 1) => {
    const { gender, level, minPrice, maxPrice, location1, location2, age, classStyle } = selectedFilters;

    let query = supabase.from('tutor_info_join').select('*');

    // if (gender.length !== 0) {
    //   query = query.in('gender', [...gender]);
    // }
    // if (level.length !== 0) {
    //   query = query.in('level', [...level]);
    // }

    // if (age.length !== 0) {
    //   const minAge = age.sort()[0];
    //   const maxAge = age.sort()[age.length - 1];
    //   query = query.gte('age', minAge).lte('age', maxAge);
    // }

    // if (searchText) {
    //   query = query.textSearch('username', `${searchText}`);
    // }
    // if (minPrice >= 0 && maxPrice) {
    //   if (classStyle === 'onLine') {
    //     query = query.gte('tuition_fee_online', 0).lte('tuition_fee_online', 100000);
    //   } else {
    //     query = query.gte('tuition_fee_offline', minPrice).lte('tuition_fee_offline', maxPrice);
    //   }
    // }

    if (location1) {
      query = query.or(`location1_sido.eq.${location1},location2_sido.eq.${location1}`);

      console.log(location2, 'location2');
      if (location2 !== '') {
        query = query.or(`location2_gugun.eq.${location2},location2_gugun.eq.${location2}`);
      }
    }

    const { data, error } = await query.range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
    console.log(error, 'tutor-list-api-error');
    console.log(data, 'tutor-list-api');

    return data;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteQuery(['tutor'], ({ pageParam }) => api(pageParam), {
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.length === PAGE_SIZE) {
        return allPages.length + 1; // 다음 페이지 번호 반환
      }
      return undefined;
    },
    enabled: false, // 초기에는 쿼리 비활성화
  });

  // 어떤 변수든 변경될 때마다 api 함수 호출
  const reloadQuery = () => {
    refetch();
  };

  // 어떤 변수든 변경될 때마다 api 함수 호출
  useEffect(() => {
    reloadQuery();
  }, [selectedFilters, searchText]);

  //무한크스롤
  const observer = useRef<IntersectionObserver | null>(null);

  const LastelementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingNextPage) {
        return null;
      }
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasNextPage],
  );

  console.log(data);

  //Debouncing
  const debounce = <T extends (...args: any[]) => any>(fn: T, delay: number) => {
    let timeout: ReturnType<typeof setTimeout>;

    return (...args: Parameters<T>): ReturnType<T> => {
      let result: any;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        result = fn(...args);
      }, delay);
      return result;
    };
  };

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const debouncedOnChange = debounce<typeof onChange>(onChange, 500);

  return (
    <Container>
      <SearchWrap>
        <svg xmlns="http://www.w3.org/2000/svg" fill="#fe902f" height="1em" viewBox="0 0 512 512">
          <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
        </svg>
        <input type="text" onChange={debouncedOnChange} />
      </SearchWrap>
      {/* 필터박스 */}

      <SelectBox handleFilterdObj={handleFilterdObj} openModal={openModal} selectedArr={selectedArr} setSelectedArr={setSelectedArr} selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
      {/* 강사 리스트 */}
      <TutorList>
        {data?.pages.map((i, first) => i?.map((userInfo, second) => (second === i.length - 1 && data?.pages.length - 1 === first ? <LastTutorListCompo LastelementRef={LastelementRef} /> : <TutorListCompo userInfo={userInfo} />)))}
      </TutorList>

      {/* 모달 */}
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <InnerModal
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation();
          }}
        >
          <CityModal
            isDropdown={isDropdown}
            setisDropdown={setisDropdown}
            checkedcity={checkedcity}
            handleDropAndSi={handleDropAndSi}
            setCheckedGunGu={setCheckedGunGu}
            checkedGunGu={checkedGunGu}
            handelCloseModalAndSelect={handelCloseModalAndSelect}
            handleCloseModal={handleCloseModal}
          />
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
  transition: all 0.5s ease-in-out;
`;

const TutorList = styled.div`
  margin-top: 50px;
  width: 100%;
  padding: 0 20px;
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(3, 1fr);
  /* transition: height 0.5s ease-in-out; */

  @media only screen and (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (max-width: 650px) {
    grid-template-columns: repeat(1, 1fr);
  }

  & > div {
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

  @media all and (min-width: 0px) and (max-width: 600px) {
    align-items: end;
  }
`;

////Search
const SearchWrap = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  margin-top: 120px;
  color: #ffffff;
  padding-left: 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  & > input {
    outline: none;
    border: none;
    width: 100%;
    height: 100%;
    padding-left: 20px;
    font-size: 1em;
  }
`;
