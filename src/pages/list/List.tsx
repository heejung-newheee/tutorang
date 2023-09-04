import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SelectedFilters } from '../../@types/list/listType';
import { getTutorListPageData } from '../../api/list';
import { Loading } from '../../components';
import { useModal } from '../../hooks';
import * as S from './List.styled';
import CityModal from './location/CityModal';
import SelectBox from './selectBox/SelectBox';
import LastTutorListCompo from './tutorCompo/LastTutorListCompo';
import TutorListCompo from './tutorCompo/TutorListCompo';
import { SearchDebounce, handleCityModalFilter } from './utility';

const List = () => {
  const { Modal, isOpen, openModal, closeModal } = useModal();
  const [checkedcity, setCheckedCity] = useState<string>('전체');
  const [checkedGunGu, setCheckedGunGu] = useState<string>('전체');
  const [isDistrictDropdown, setisDistrictDropdown] = useState(false);
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

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>(initialSelectedFilters);
  const [searchText, setSearchText] = useState('');

  const PAGE_SIZE = 5;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch, isLoading } = useInfiniteQuery(['tutor-list'], ({ pageParam }) => getTutorListPageData(pageParam, selectedFilters, searchText), {
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.length === PAGE_SIZE) {
        return allPages.length + 1;
      }
      return undefined;
    },
    enabled: false,
  });

  const reloadQuery = () => {
    refetch();
  };

  useEffect(() => {
    reloadQuery();
  }, [selectedFilters, searchText]);

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

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const debouncedOnChange = SearchDebounce<typeof onChange>(onChange, 500);

  const handleDropAndSi = (item: string, version: string) => {
    setCheckedCity(item);
    setCheckedGunGu('');
    version === 'pc' ? null : setisDistrictDropdown(!isDistrictDropdown);
  };

  const handelCloseModalAndSelect = () => {
    handleCityModalFilter(setSelectedFilters, selectedFilters, setSelectedArr, checkedcity, checkedGunGu);
    closeModal();
  };

  const handleCloseModal = () => {
    closeModal();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <S.Container>
      <S.SearchWrap>
        <svg xmlns="http://www.w3.org/2000/svg" fill="#fe902f" height="1em" viewBox="0 0 512 512">
          <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
        </svg>
        <input type="text" onChange={debouncedOnChange} />
      </S.SearchWrap>

      <SelectBox initialSelectedFilters={initialSelectedFilters} openModal={openModal} selectedArr={selectedArr} setSelectedArr={setSelectedArr} selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
      <S.TutorList>
        {data?.pages.map((i, first) =>
          i?.map((userInfo, second) => (second === i.length - 1 && data?.pages.length - 1 === first ? <LastTutorListCompo key={second} LastelementRef={LastelementRef} userInfo={userInfo} /> : <TutorListCompo key={second} userInfo={userInfo} />)),
        )}
      </S.TutorList>

      {data?.pages[0].length === 0 ? <S.ShowIsDataNone>강사 목록이 없습니다</S.ShowIsDataNone> : null}

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
