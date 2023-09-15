# 튜터랑 (Tutorang)

[Responsive Website]

지역/관심사 등으로 필터링 & 매칭된 튜터와 학생이 온라인/오프라인으로 만나 대화하며 회화 실력 UP!이 되는 튜터링 매칭 서비스
[2023.08.16 ~]

[튜터랑 서비스 보러가기] [www.tutorang.site](https://www.tutorang.site/)

\*서비스 테스트 특이사항
Tutorang 서비스는 상호 작용이 있는 서비스로 튜터 페이지가 이용가능하시도록
튜터 목록중 '대표튜터' 아이디를 전달드립니다.
회원 가입시 학생으로 튜터에게 채팅, 튜터링 요청 가능하고 '대표튜터' 아이디 로그인시 수락,거절 가능합니다.

대표튜터 계정
ID: tutor-test@test.com
PW: tutorang1234!!

---

### 팀원

| [유희정](https://github.com/heejung-newheee) | [이지은](https://github.com/JellyBear97) | [전동헌](https://github.com/qaws7791) | [김유진](https://github.com/goatisgoat) | [김선익](https://github.com/ikik-pd) |
| -------------------------------------------- | ---------------------------------------- | ------------------------------------- | --------------------------------------- | ------------------------------------ |
| `리더`                                       | `부리더`                                 | `팀원`                                | `팀원 `                                 | `팀원`                               |

### 목차

- [1. 프로젝트 소개](#1-프로젝트-소개)
- [2. 기술스택](#2-기술스택)
- [3. Service Architecture](#3-Service-Architecture)
- [4. 서비스 주요기능](#4-서비스-주요기능)
- [5. API Table](#5-api-table)

---

### 1. 프로젝트 소개

![cover](https://github.com/heejung-newheee/tutorang/assets/126348461/39510796-ca2a-4f7b-ab26-e9c9b363cd6b)

[튜터랑]

월/주간 단위로 정해진 수업이 아닌 자유롭게 시간당으로 매칭 튜터링을 요청해 온라인 뿐 아니라 오프라인에서도 가까운 위치에 있는 튜터와 학생이 쉽게 만나 실제로 대화를 해보며 틀에박힌 영어 회와 공부가 아닌 직접 경험을 통해 실제 회화실력을 늘릴 수 있다.

### 2. 기술스택

<img src="https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white"><img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"><img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"><img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"><img src="https://img.shields.io/badge/reactrouterdom-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white"><img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"><img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">

### 3. 서비스 아키텍쳐

![서비스아키텍쳐](https://github.com/heejung-newheee/tutorang/assets/126348461/22c6ce35-43c2-4a5b-8064-6393dd17e73d)

### 4. 서비스 주요 기능

1.  로그인, 회원가입, 회원 정보, 수업정보 수정
2.  튜터 찾기(지역/성격/성별 필터링)
3.  실시간 채팅 (튜터링 신청/약속장소 위치 공유/이미치 전송)
4.  튜터링(신청/응답) 및 후기
5.  커뮤니티, 고객센터 CRUD
6.  학생->튜터 Role 변환 신청/인증
7.  관리자 대시보드(게시글관리, 사용자 신고 처리 및 운영관리)

### 5. API Table

API 관련 함수는 src/api 폴더에 있습니다
![image](https://github.com/heejung-newheee/tutorang/assets/126348461/f73abafe-1ef2-426c-9af7-cc9af624f2c1)
