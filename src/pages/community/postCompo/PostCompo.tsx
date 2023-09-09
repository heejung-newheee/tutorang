import { useEffect, useState } from 'react';
import * as S from './PostCompo.styled';
import { useNavigate } from 'react-router-dom';

// type USER_ID = {
//   avatar_url: string;
//   profiles: string;
//   username: string;
// };
// type Profile = {
//   id: string;
//   // 다른 필드들도 포함해야 할 수 있습니다.
// };

type Props = {
  item: {
    category: string | null;
    content: string | null;
    created_at: string;
    id: number;
    title: string | null;
    user_id: any;
    // user_id: USER_ID
    // profiles: Profile;
  };
  lastElement: boolean;
};

const PostCompo = ({ item, lastElement }: Props) => {
  const [mainText, setMainText] = useState('');
  const [mainImg, setMainImg] = useState('');

  const navigate = useNavigate();

  const getContentReplace = async () => {
    // const { data, error } = await supabase.from('profiles').select('*').eq('id', item?.user_id);
    // console.log(data, error);

    const srcPattern = /src=\"([^\"]+)\"/;

    const imgTags = item.content?.match(/<img[^>]*>/g);

    if (imgTags) {
      const resultArr = imgTags[0].match(srcPattern);
      resultArr && setMainImg(resultArr[1]);
    }

    let textOnly = item.content?.replace(/<[^>]+>/g, ' ');

    let cleanText = textOnly?.replace(/\s+/g, ' ');

    if (cleanText) {
      setMainText(cleanText);
    }
  };

  const detailDate = (a: Date) => {
    const milliSeconds = new Date().getTime() - a.getTime();
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) {
      const year = a.getFullYear().toString().slice(-2);
      const month = a.getMonth();
      const day = a.getDay();
      return `${year}.${month}.${day}`;
    }
  };

  useEffect(() => {
    getContentReplace();
  }, []);

  return (
    <S.Post $lastElement={lastElement} onClick={() => navigate(`/post/${item.id}`)}>
      <S.UserWrite>
        <S.NameImgDiv>
          <S.ImgDiv src={item.user_id.avatar_url}></S.ImgDiv>
          <S.DateNameDiv>
            <span>{item.user_id.username}</span>
            <span>{detailDate(new Date(item.created_at))}</span>
          </S.DateNameDiv>
        </S.NameImgDiv>

        <div>
          <S.Title>{item.title}</S.Title>
          <S.Text>{mainText}</S.Text>
        </div>
        <S.Like>
          <span>좋아요 3423 </span>
          <span>댓글 2324</span>{' '}
        </S.Like>
      </S.UserWrite>
      <S.UserImg>{mainImg && <img src={mainImg} />}</S.UserImg>
    </S.Post>
  );
};

export default PostCompo;
