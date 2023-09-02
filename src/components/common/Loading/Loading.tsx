import * as S from './Loading.styled';

const Loading = () => {
  return (
    <S.Loading>
      <div className="sk-folding-cube">
        <div className="sk-cube1 sk-cube"></div>
        <div className="sk-cube2 sk-cube"></div>
        <div className="sk-cube4 sk-cube"></div>
        <div className="sk-cube3 sk-cube"></div>
      </div>
    </S.Loading>
  );
};

export default Loading;
