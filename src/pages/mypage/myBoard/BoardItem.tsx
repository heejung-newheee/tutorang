import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { detailDate } from '../../community/utility';
import * as S from './MyBoard.styled';

type PROFILES = {
  id: string;
  username: string | null;
  email: string | null;
  avatar_url: string | null;
};
type Props = {
  item: {
    category: string | null;
    content: string | null;
    created_at: string;
    id: number;
    like: number | null;
    title: string | null;
    user_id: string | null;
    profiles: PROFILES | null;
  };
};

const BoardItem = ({ item }: Props) => {
  const [mainText, setMainText] = useState('');
  const [mainImg, setMainImg] = useState<(RegExpMatchArray | null)[]>([]);

  const navigate = useNavigate();

  const getContentReplace = () => {
    const imgTags = item.content?.match(/<img[^>]*>/g);
    const srcPattern = /src=\"([^\"]+)\"/;

    if (imgTags) {
      const resultArr = imgTags.map((img) => img.match(srcPattern));
      resultArr && setMainImg(resultArr);
    }

    let textOnly = item.content?.replace(/<[^>]+>/g, ' ');
    let cleanText = textOnly?.replace(/\s+/g, ' ');

    if (cleanText) {
      setMainText(cleanText);
    }
  };

  useEffect(() => {
    getContentReplace();
  }, []);

  return (
    <S.Post onClick={() => navigate(`/post/${item.id}`)}>
      <S.ContentsText>
        <S.Time>{detailDate(new Date(item.created_at))}</S.Time>
        <S.Title>{item.title}</S.Title>
        <S.Text>{mainText}</S.Text>
        <S.Like>
          <span>좋아요 {item.like} </span>
        </S.Like>
      </S.ContentsText>

      <S.ContentsImg>{mainImg !== null && mainImg.length !== 0 && <img src={mainImg[0]?.[1]} />}</S.ContentsImg>
    </S.Post>
  );
};

export default BoardItem;
