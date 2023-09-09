import { useEffect, useState } from 'react';
import * as S from './PostCompo.styled';
import { useNavigate } from 'react-router-dom';
import { detailDate } from '../utility';

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
  const [mainImg, setMainImg] = useState<(RegExpMatchArray | null)[]>([]);

  const navigate = useNavigate();

  const getContentReplace = async () => {
    const imgTags = item.content?.match(/<img[^>]*>/g);
    const srcPattern = /src=\"([^\"]+)\"/;

    console.log(imgTags);
    if (imgTags) {
      // const resultArr = imgTags[0].match(srcPattern);

      const resultArr = imgTags.map((img) => img.match(srcPattern));
      // imgTags.forEach(img => )

      // console.log(aaa, 'asdsads');
      resultArr && setMainImg(resultArr);
    }

    let textOnly = item.content?.replace(/<[^>]+>/g, ' ');

    let cleanText = textOnly?.replace(/\s+/g, ' ');

    if (cleanText) {
      setMainText(cleanText);
    }
  };

  // console.log(mainImg && mainImg[0]);
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

        <S.TitleTextDiv>
          <S.Title>{item.title}</S.Title>
          <S.Text>{mainText}</S.Text>
        </S.TitleTextDiv>
        <S.ResponsiveImg>
          <div>
            {mainImg.map((item) => (
              <img src={item?.[1]} />
            ))}
          </div>
        </S.ResponsiveImg>
        <S.Like>
          <span>좋아요 3423 </span>
          <span>댓글 2324</span>{' '}
        </S.Like>
      </S.UserWrite>
      <S.UserImg>{mainImg !== null && mainImg.length !== 0 && <img src={mainImg[0]?.[1]} />}</S.UserImg>
    </S.Post>
  );
};

export default PostCompo;
