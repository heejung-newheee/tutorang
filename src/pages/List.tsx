import { useCallback, useEffect, useRef, useState } from 'react';
import * as S from '../components/list/List.styled';
import { useModal } from '../hooks';
import TutorListCompo from '../components/list/tutorCompo/TutorListCompo';
import LastTutorListCompo from '../components/list/tutorCompo/LastTutorListCompo';
import SelectBox from '../components/list/selectBox/SelectBox';
import CityModal from '../components/list/location/CityModal';
import { handleCityModalFilter, SelectedFilters, SearchDebounce } from '../components/list/utility';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getTutorListPageData } from '../api/list';

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
    speakingLanguage: [],
  };

  //유저가 선택한 목록 - 검색 api에 들어갈 값{}
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>(initialSelectedFilters);
  //검색
  const [searchText, setSearchText] = useState('');

  //튜터 api 호출
  const PAGE_SIZE = 5;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch, isLoading } = useInfiniteQuery(['tutor-list'], ({ pageParam }) => getTutorListPageData(pageParam, selectedFilters, searchText), {
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
      observer.current = new IntersectionObserver((entries, _) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasNextPage],
  );

  //Debouncing
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  //Debouncing
  const debouncedOnChange = SearchDebounce<typeof onChange>(onChange, 500);

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

  if (isLoading) {
    return <div style={{ width: '100%', height: '100vh', backgroundColor: 'salmon' }}>Loading...</div>;
  }

  return (
    <S.Container>
      <S.SearchWrap>
        <svg xmlns="http://www.w3.org/2000/svg" fill="#fe902f" height="1em" viewBox="0 0 512 512">
          <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
        </svg>
        <input type="text" onChange={debouncedOnChange} />
      </S.SearchWrap>
      {/* 필터박스 */}

      <SelectBox initialSelectedFilters={initialSelectedFilters} openModal={openModal} selectedArr={selectedArr} setSelectedArr={setSelectedArr} selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
      {/* 강사 리스트 */}
      <S.TutorList>
        {data?.pages.map((i, first) =>
          i?.map((userInfo, second) => (second === i.length - 1 && data?.pages.length - 1 === first ? <LastTutorListCompo key={second} LastelementRef={LastelementRef} userInfo={userInfo} /> : <TutorListCompo key={second} userInfo={userInfo} />)),
        )}
      </S.TutorList>

      {/* 강사 데이터가 존재하지 않음 */}
      {data?.pages[0].length === 0 ? <S.ShowIsDataNone>강사 목록이 없습니다</S.ShowIsDataNone> : null}

      {/* 모달 */}
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <S.InnerModal
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
        </S.InnerModal>
      </Modal>
    </S.Container>
  );
};

export default List;
