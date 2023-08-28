import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import supabase from '../supabase';
import { useModal } from '../hooks';
import TutorListCompo from '../components/list/TutorListCompo';
import SelectBox from '../components/list/SelectBox';
import CityModal from '../components/list/CityModal';
import { price } from '../components/list/MobileModal';
import axios from 'axios';

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
    location2: [],
    age: [],
    // classStyle: 'offLine',
  });
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
            //값이 없을때 - 추가
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
            //값이 없을때 - 추가
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
          const minPrice = price.find((i) => i.priceNum === item)?.min;
          const maxPrice = price.find((i) => i.priceNum === item)?.max;
          setSelectedFilters((pre: any) => (pre ? { ...pre, minPrice, maxPrice } : { ...pre }));
          setSelectedArr((pre) => pre.filter((item) => item[0] !== 'price'));
          setSelectedArr((pre) => [...pre, ['price', item]]);
        }
        break;

      //나이
      case 'age':
        let ageNum = 0;
        switch (item) {
          case '10대':
            ageNum = 10;
            break;
          case '20대':
            ageNum = 20;

            break;
          case '30대':
            ageNum = 30;

            break;
          case '40대':
            ageNum = 40;

            break;
          case '50대':
            ageNum = 50;

            break;
          case '60대':
            ageNum = 60;

            break;

          default:
            break;
        }

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
            //값이 없을때 - 추가
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

  //강사 api 호출
  useEffect(() => {
    getData();
  }, [selectedFilters]);

  const getData = async () => {
    const { gender } = selectedFilters;
    // console.log(gender);
    try {
      // .range(0, 1)
      // const { data, error } = await supabase.from('profiles').select('*').in('gender', [genderArr]).textSearch('username', `':*'`);
      // const { data, error } = await supabase.from('profiles').select('*').in('gender', [genderArr]).in('language_level', [language_levelArr]).match(filterdObj);
      // let query = supabase.from('profiles').select('*');
      // if (gender) {
      //   query = query.in('gender', [...gender]);
      // }
      // const { data, error } = await query.range(1, 3);
      // console.log(error);
      // .gte('price', 3000).lte('price', 100000)
      // console.log(data, 'ㅁㄴㅇㄴ');
    } catch (error) {
      console.log(error);
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
          return { ...pre, location1: '', location2: [] };
        }
      });
      setSelectedArr((pre) => pre.filter((item) => item[0] !== 'location1'));
      setSelectedArr((pre) => pre.filter((item) => item[0] !== 'location2'));
    } else {
      //지역명이 있으면 업데이트
      setSelectedFilters((pre: any) => {
        if (pre) {
          return { ...pre, location1: checkedcity, location2: [] };
        }
      });

      setSelectedArr((pre) => [...pre.filter((item) => item[0] !== 'location1'), ['location1', checkedcity]]);
      setSelectedArr((pre) => pre.filter((item) => item[0] !== 'location2'));
    }

    if (checkedGunGu.includes('전체')) {
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

  //무한크스롤
  const elementRef = useRef<HTMLDivElement | null>(null);

  // const [books, setBooks] = useState<string[]>([]);
  // const [pageNum, setPageNum] = useState(1);
  // const [hasMore, setHasMore] = useState(false);
  // const getApi = () => {
  //   axios({
  //     method: 'GET',
  //     url: 'http://openlibrary.org/search.json',
  //     params: { q: 'text', page: pageNum },
  //   })
  //     .then((res) => {
  //       setBooks((pre) => (pre ? [...pre, ...res.data.docs.map((i: { title: any }) => i.title)] : [...pre]));
  //       setHasMore(res.data.docs.length > 0);
  //       setPageNum((pre) => pre + 1);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  // console.log(books);

  // useEffect(() => {
  //   if (books.length === 0) {
  //     getApi();
  //   }

  //   const observer = new IntersectionObserver((entries, observer) => {
  //     // IntersectionObserverEntry 객체 리스트와 observer 본인(self)를 받음
  //     if (entries[0].isIntersecting && hasMore) {
  //       getApi();
  //       observer.disconnect();
  //     }
  //   });
  //   if (observer && elementRef.current && hasMore) {
  //     observer.observe(elementRef.current);
  //   }

  //   if (!hasMore) {
  //     observer.disconnect();
  //   }
  //   // return () => {
  //   //   if (observer) {
  //   //     observer.disconnect();
  //   //   }
  //   // };
  // }, [books]);

  //Debouncing
  // const [searchText, setSearchText] = useState('second');
  // const debounce = (callback: () => any, delay: number) => {
  //   let timerId: string | null = null;
  //   return (...args) => {
  //     if (timerId) clearTimeout(timerId);
  //     timerId = setTimeout(() => {
  //       callback(...args);
  //     }, delay);
  //   };
  // };

  // Debouncing
  // const debounce = (callback: (text: string) => any, delay: number | undefined) => {
  //   let timerId: any = null;
  //   if (timerId) {
  //     clearTimeout(timerId);
  //   }
  //   timerId = setTimeout(() => {
  //     timerId = null;
  //     return callback;
  //   }, delay);
  // };

  // const handleSearchText = useCallback(
  //   debounce((text: string) => setSearchText(text), 2000),
  //   [],
  // );
  const handleDebouncing = (e: React.ChangeEvent<HTMLInputElement>) => {
    // handleSearchText(e.target.value);
    console.log('sfs');
  };
  return (
    <Container>
      <SearchWrap>
        {/* <input type="text" onChange={() => handleDebouncing(e)} /> */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="#fe902f" height="1em" viewBox="0 0 512 512">
          <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
        </svg>
      </SearchWrap>
      {/* 필터박스 */}
      <SelectBox handleFilterdObj={handleFilterdObj} openModal={openModal} selectedArr={selectedArr} setSelectedArr={setSelectedArr} selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
      {/* 강사 리스트 */}
      <TutorList>
        {/* {books?.map((i) => (
          <TutorListCompo />
        ))} */}
        <TutorListCompo />
        <TutorListCompo />
        <TutorListCompo />
      </TutorList>
      <div ref={elementRef}>Loading</div>

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
  /* padding: 0 20px; */
  padding: 0 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  & > div {
    /* background-color: beige; */
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
