import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SelectedFilters } from '../../@types/list/listType';
import { getTutorListPageData } from '../../api/list';
import { magnifier } from '../../assets';
import { Loading } from '../../components';
import { useModal } from '../../hooks';
import * as S from './List.styled';
import CityModal from './location/CityModal';
import SelectBox from './selectBox/SelectBox';
import LastTutorListCompo from './tutorCompo/LastTutorListCompo';
import TutorListCompo from './tutorCompo/TutorListCompo';
import { SearchDebounce } from './utility';

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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <S.Container>
      <S.SearchWrap>
        <img src={magnifier} alt="" />
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
            checkedcity={checkedcity}
            checkedGunGu={checkedGunGu}
            setisDistrictDropdown={setisDistrictDropdown}
            setCheckedCity={setCheckedCity}
            setCheckedGunGu={setCheckedGunGu}
            setSelectedFilters={setSelectedFilters}
            setSelectedArr={setSelectedArr}
            closeModal={closeModal}
          />
        </S.InnerModal>
      </Modal>
    </S.Container>
  );
};

export default List;
