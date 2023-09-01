import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import supabase from '../supabase';
import { useModal } from '../hooks';
import TutorListCompo from '../components/list/tutorCompo/TutorListCompo';
import LastTutorListCompo from '../components/list/tutorCompo/LastTutorListCompo';
import SelectBox from '../components/list/selectBox/SelectBox';
import CityModal from '../components/list/location/CityModal';
import { handleCityModalFilter, SelectedFilters } from '../components/list/utility';
import { useInfiniteQuery } from '@tanstack/react-query';

const List = () => {
  const { Modal, isOpen, openModal, closeModal } = useModal();
  //시/군/구
  const [checkedcity, setCheckedCity] = useState<string>('전체');
  const [checkedGunGu, setCheckedGunGu] = useState<string>('전체');
  //모달 시/군/구 드롭다운
  const [isDistrictDropdown, setisDistrictDropdown] = useState(false);

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

  //유저가 선택한 목록 - 검색 api에 들어갈 값{}
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>(initialSelectedFilters);
  //검색
  const [searchText, setSearchText] = useState('');

  console.log(selectedFilters, selectedArr);

  //튜터 api 호출
  const PAGE_SIZE = 6;

  const api = async (page = 1) => {
    const { gender, level, minPrice, maxPrice, location1, location2, age, classStyle } = selectedFilters;

    // const selectedLanguages = ['한국어', '일본어']; // 유저가 선택한 언어들

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

    if (searchText) {
      query = query.textSearch('tutor_name', `${searchText}`);
    }
    if (minPrice >= 0 && maxPrice) {
      if (classStyle === 'onLine') {
        query = query.gte('tuition_fee_online', 0).lte('tuition_fee_online', 100000);
      } else {
        query = query.gte('tuition_fee_offline', minPrice).lte('tuition_fee_offline', maxPrice);
      }
    }

    // query.filter(`languages && ARRAY[${selectedLanguages.map(lang => `'${lang}'`).join(', ')}]`);

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

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteQuery(['tutor-list'], ({ pageParam }) => api(pageParam), {
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

  //Debouncing
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  //Debouncing
  const debouncedOnChange = debounce<typeof onChange>(onChange, 500);

  //시, 군구
  const handleDropAndSi = (item: string, version: string) => {
    //시, 군구 setState
    setCheckedCity(item);
    setCheckedGunGu('');
    //체크박스 닫기
    version === 'pc' ? null : setisDistrictDropdown(!isDistrictDropdown);
  };

  //시, 군구
  const handelCloseModalAndSelect = () => {
    handleCityModalFilter(setSelectedFilters, selectedFilters, setSelectedArr, checkedcity, checkedGunGu);
    closeModal();
  };

  //시, 군구
  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <Container>
      <SearchWrap>
        <svg xmlns="http://www.w3.org/2000/svg" fill="#fe902f" height="1em" viewBox="0 0 512 512">
          <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
        </svg>
        <input type="text" onChange={debouncedOnChange} />
      </SearchWrap>
      {/* 필터박스 */}

      <SelectBox initialSelectedFilters={initialSelectedFilters} openModal={openModal} selectedArr={selectedArr} setSelectedArr={setSelectedArr} selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
      {/* 강사 리스트 */}
      <TutorList>
        {data?.pages.map((i, first) => i?.map((userInfo, second) => (second === i.length - 1 && data?.pages.length - 1 === first ? <LastTutorListCompo LastelementRef={LastelementRef} userInfo={userInfo} /> : <TutorListCompo userInfo={userInfo} />)))}
      </TutorList>

      {/* 모달 */}
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <InnerModal
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation();
          }}
        >
          <CityModal
            isDistrictDropdown={isDistrictDropdown}
            setisDistrictDropdown={setisDistrictDropdown}
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
  margin-top: 100px;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;

  @media only screen and (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (max-width: 500px) {
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
