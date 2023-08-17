const Detail = () => {
  return (
    <>
      <section>
        {/* 프로필 */}
        <div>
          <figure>
            <img src="" alt="프로필 이미지 " />
          </figure>
          <h4>이름</h4>
          <p>직장인 회화 마스터, 동헌이 함께 하겠습니다.</p>
        </div>

        {/* 인증 */}
        <div>
          <span>학력인증</span>
          <span>신분증인증</span>
        </div>

        {/* 후기 */}
        <div>
          <div>
            <h5>리뷰평점</h5>
            <span>5.0</span>
          </div>
          <div>
            <h5>리뷰수</h5>
            <span>5</span>
          </div>
          <div>
            <h5>고용수</h5>
            <span>5</span>
          </div>
        </div>

        {/* 버튼 */}
        <a>신고하기</a>
        <button>찜하기</button>
      </section>

      {/* 진행중인 수업 */}
      <section>
        <h2>진행중인 수업</h2>

        <ul>
          <li>
            <figure>
              <img src="" alt="수업 썸네일" />
            </figure>
            <h3>수업 이름</h3>
            <p>수업내용을 소개합니다.</p>
            <p>
              수강료: <span>80,000</span>
            </p>
            <button>찜하기</button>
          </li>
        </ul>
      </section>

      {/* 후기 리스트 */}
      <section>
        <h3>
          후기 <span>5</span>
        </h3>

        <ul>
          <li>
            <p>작성자</p>
            <p>후기 내용을 작성합니다.</p>
          </li>
        </ul>
      </section>

      {/* 후기 작성 */}
      <section>
        <form>후기</form>
      </section>
    </>
  );
};

export default Detail;
