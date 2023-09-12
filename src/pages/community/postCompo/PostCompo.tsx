import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { detailDate } from '../utility';
import * as S from './PostCompo.styled';

type PROFILES = {
  id: string;
  username: string | null;
  avatar_url: string | null;
};
type Props = {
  item: {
    category: string | null;
    content: string | null;
    created_at: string;
    id: number;
    title: string | null;
    like: number | null;
    user_id: string | null;
    profiles: PROFILES | null;
  };
  lastElement: boolean;
};

const PostCompo = ({ item, lastElement }: Props) => {
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
    <S.Post $lastElement={lastElement} onClick={() => navigate(`/post/${item.id}`)}>
      <S.UserWrite>
        <S.NameImgDiv>
          <S.ImgDiv src={item && (item.profiles?.avatar_url as string)}></S.ImgDiv>
          <S.DateNameDiv>
            <span>{item.profiles?.username}</span>
            <span>{detailDate(new Date(item.created_at))}</span>
          </S.DateNameDiv>
        </S.NameImgDiv>

        <S.TitleTextDiv>
          <S.Title>{item.title}</S.Title>
          <S.Text>{mainText}</S.Text>
        </S.TitleTextDiv>
        <S.ResponsiveImg>
          <div>
            {mainImg.map((item, index) => (
              <img src={item?.[1]} key={index} />
            ))}
          </div>
        </S.ResponsiveImg>
        <S.Like>
          <span>좋아요 {item.like} </span>
          {/* <span>{detailDate(new Date(item.created_at))}</span>{' '} */}
        </S.Like>
      </S.UserWrite>
      <S.UserImg>{mainImg !== null && mainImg.length !== 0 && <img src={mainImg[0]?.[1]} />}</S.UserImg>
    </S.Post>
  );
};

export default PostCompo;
