import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import supabase from '../supabase';
import { useModal } from '../hooks';
import TutorListCompo from '../components/list/tutorCompo/TutorListCompo';
import LastTutorListCompo from '../components/list/tutorCompo/LastTutorListCompo';
import SelectBox from '../components/list/selectBox/SelectBox';
import CityModal from '../components/list/location/CityModal';
import { handleAgeNum, price } from '../components/list/utility';
import { TTutorWithUser } from '../supabase/database.types';
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

  const [selectedFilters, setSelectedFilters] = useState<any>({
    gender: [],
    level: [],
    minPrice: 0,
    maxPrice: 100000,
    location1: '',
    location2: '',
    age: [],
    classStyle: 'onLine',
  });
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
          setSelectedFilters((pre: any) => (pre ? { ...pre, gender: [] } : { ...pre, gender: [] }));
          setSelectedArr((pre) => [...pre.filter((item) => item[0] !== 'gender')]);
          //전체를 제외한 첫 클릭
        } else if (item !== '전체') {
          //값이 없을때 - 추가
          if (selectedFilters.gender.find((i: string) => i === item) === undefined) {
            setSelectedFilters((pre: any) => (pre ? { ...pre, gender: [...pre.gender, item] } : null));
            setSelectedArr((pre: any) => [...pre, ['gender', item]]);
            //값이 있을때 - 삭제
          } else {
            setSelectedFilters((pre: any) => (pre ? { ...pre, gender: pre.gender.filter((i: any) => i !== item) } : null));
            setSelectedArr((pre) => pre.filter((i) => i[1] !== item));
          }
        }
        break;

      //난이도
      case 'level':
        if (item === '전체') {
          //전체 클릭 - 모든 값 초기화
          setSelectedFilters((pre: any) => (pre ? { ...pre, level: [] } : { ...pre, level: [] }));
          setSelectedArr((pre) => [...pre.filter((item) => item[0] !== 'level')]);
          //전체를 제외한 첫 클릭
        } else if (item !== '전체') {
          //값이 없을때 - 추가
          if (selectedFilters.level.find((i: string) => i === item) === undefined) {
            setSelectedFilters((pre: any) => (pre ? { ...pre, level: [...pre.level, item] } : null));
            setSelectedArr((pre: any) => [...pre, ['level', item]]);
            //값이 있을때 - 삭제
          } else {
            setSelectedFilters((pre: any) => (pre ? { ...pre, level: pre.level.filter((i: any) => i !== item) } : null));
            setSelectedArr((pre) => pre.filter((i) => i[1] !== item));
          }
        }

        break;
      //가격
      case 'price':
        if (item === '전체') {
          setSelectedFilters((pre: any) => (pre ? { ...pre, minPrice: 0 } : { ...pre }));
          setSelectedFilters((pre: any) => (pre ? { ...pre, maxPrice: 100000 } : { ...pre }));
          setSelectedArr((pre) => pre.filter((item) => item[0] !== 'price'));
          setSelectedArr((pre) => [...pre, ['price', '전체']]);
        } else {
          const minPrice = price.find((i: { priceNum: string; min: number; max: number }) => i.priceNum === item)?.min;
          const maxPrice = price.find((i: { priceNum: string; min: number; max: number }) => i.priceNum === item)?.max;
          setSelectedFilters((pre: any) => (pre ? { ...pre, minPrice, maxPrice } : { ...pre }));
          setSelectedArr((pre) => pre.filter((item) => item[0] !== 'price'));
          setSelectedArr((pre) => [...pre, ['price', item]]);
        }
        break;

      //나이
      case 'age':
        //숫자로 변환
        let ageNum = handleAgeNum(item);

        if (item === '전체') {
          //전체 클릭 - 모든 값 초기화
          setSelectedFilters((pre: any) => (pre ? { ...pre, age: [] } : { ...pre, age: [] }));
          setSelectedArr((pre) => [...pre.filter((item) => item[0] !== 'age')]);
          //전체를 제외한 첫 클릭
        } else if (item !== '전체') {
          //값이 없을때 - 추가
          if (selectedFilters.age.find((i: string) => Number(i) === ageNum) === undefined) {
            setSelectedFilters((pre: any) => (pre ? { ...pre, age: [...pre.age, ageNum] } : null));
            setSelectedArr((pre: any) => [...pre, ['age', item]]);
            //값이 있을때 - 삭제
          } else {
            setSelectedFilters((pre: any) => (pre ? { ...pre, age: pre.age.filter((i: any) => i !== ageNum) } : null));
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
      setSelectedFilters((pre: any) => {
        if (pre) {
          return { ...pre, location1: '', location2: '' };
        }
      });
      setSelectedArr((pre) => pre.filter((item) => item[0] !== 'location1'));
      setSelectedArr((pre) => pre.filter((item) => item[0] !== 'location2'));
    } else {
      //지역명이 있으면 업데이트
      setSelectedFilters((pre: any) => {
        if (pre) {
          return { ...pre, location1: checkedcity, location2: '' };
        }
      });

      setSelectedArr((pre) => [...pre.filter((item) => item[0] !== 'location1'), ['location1', checkedcity]]);
      setSelectedArr((pre) => pre.filter((item) => item[0] !== 'location2'));
    }

    if (checkedGunGu === '전체') {
      //전체면 필터객체에서 삭제
      setSelectedFilters((pre: any) => {
        if (pre) {
          return { ...pre, location2: [] };
        }
      });
      setSelectedArr((pre) => pre.filter((item) => item[0] !== 'location2'));
    } else if (checkedGunGu) {
      //지역명이 있으면 업데이트
      setSelectedFilters((pre: any) => {
        if (pre) {
          return { ...pre, location2: checkedGunGu };
        }
      });

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

    let query = supabase.from('tutor_info').select('*');

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
      <TutorList>{data?.pages.map((i, first) => i?.map((userInfo, second) => (second === i.length - 1 && data?.pages.length - 1 === first ? <LastTutorListCompo LastelementRef={LastelementRef} /> : <TutorListCompo />)))}</TutorList>

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
`;

const TutorList = styled.div`
  margin-top: 50px;
  width: 100%;
  padding: 0 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
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
  width: 50%;
  min-width: 240px;
  height: 60px;
  padding: 0 10px;
  margin-top: 70px;
  border: 1px solid #fe902f;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 2px 2px 4px -4px black;

  & > input {
    outline: none;
    border: none;
    width: 100%;
    height: 100%;
  }
`;
