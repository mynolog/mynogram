# Mynogram
<a href="https://elice-frontend-firebase-18d5b.web.app" style="font-size: 24px;">🔍 구경하러가기</a>

## 미리보기
### 메인 페이지
![둘러보기](https://firebasestorage.googleapis.com/v0/b/elice-frontend-firebase-18d5b.appspot.com/o/imgs%2F%E1%84%83%E1%85%AE%E1%86%AF%E1%84%85%E1%85%A5%E1%84%87%E1%85%A9%E1%84%80%E1%85%B5.png?alt=media&token=371bcaf4-b454-4080-80a9-68352df4e7f7)
### 나의 페이지
![나의페이지](https://firebasestorage.googleapis.com/v0/b/elice-frontend-firebase-18d5b.appspot.com/o/imgs%2F%E1%84%82%E1%85%A1%E1%84%8B%E1%85%B4%E1%84%91%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%8C%E1%85%B5.png?alt=media&token=0bbb0409-03dd-4f65-91d5-7c532a2851cf)
### 게시물 생성
![생성](https://firebasestorage.googleapis.com/v0/b/elice-frontend-firebase-18d5b.appspot.com/o/imgs%2F%E1%84%80%E1%85%A6%E1%84%89%E1%85%B5%E1%84%86%E1%85%AE%E1%86%AF%E1%84%89%E1%85%A2%E1%86%BC%E1%84%89%E1%85%A5%E1%86%BC.png?alt=media&token=2dbb2875-bcbd-4eff-a4d1-ed8c699a8258)
### 게시물 보기/수정/삭제
![보기/수정/삭제](https://firebasestorage.googleapis.com/v0/b/elice-frontend-firebase-18d5b.appspot.com/o/imgs%2F%E1%84%80%E1%85%A6%E1%84%89%E1%85%B5%E1%84%86%E1%85%AE%E1%86%AF%E1%84%87%E1%85%A9%E1%84%80%E1%85%B5_%E1%84%89%E1%85%AE%E1%84%8C%E1%85%A5%E1%86%BC_%E1%84%89%E1%85%A1%E1%86%A8%E1%84%8C%E1%85%A6.png?alt=media&token=c5e99deb-3d16-4089-9a91-273186d11e5e)

## 목표
1. CRUD에 대한 이해
2. TailwindCSS로 재사용 가능한 UI 컴포넌트 관리
3. 백엔드와 프론트엔드 간 통신 흐름에 대한 이해
4. 파이어베이스 연동으로 빠른 프로토타입 구축

## 기술 스택
[![React](https://skillicons.dev/icons?i=react)](https://ko.react.dev/)
[![TypeScript](https://skillicons.dev/icons?i=ts)](https://www.typescriptlang.org/)
[![TailwindCSS](https://skillicons.dev/icons?i=tailwind)](https://tailwindcss.com/)
[![Firebase](https://skillicons.dev/icons?i=firebase)](https://firebase.google.com/docs?hl=ko)

## 프로젝트 폴더 구조
```
mynogram/  
├── public/  # 정적 파일
├── src/  # 소스 코드
│   ├── components/ # UI 컴포넌트
│   ├── config/ # 프로젝트 설정
│   ├── hooks/  # 커스텀 훅
│   ├── routes/  # 앱의 라우터 
│   ├── service/  # API 호출 / 데이터 처리
│   ├── store/  # 전역 상태 관리
│   ├── types/  # 타입 정의
│   ├── utils/  # 유틸리티 함수
│   ├── main.tsx  # 앱의 엔트리 포인트
│   ├── App.tsx  # 메인 앱 컴포넌트
│   ├── index.css # 전역 스타일
```

## 구현 완료
- [x] : 네비게이션 바 레이아웃 및 스타일 적용
- [x] : 파이어베이스 연동
- [x] : 로그인, 로그아웃
- [x] : 회원가입
- [x] : 기본 레이아웃 구성
- [x] : Main
- [x] : Footer
- [x] : 유저 페이지
- [x] : 모달 컨테이너
- [x] : 게시물 등록 모달
- [x] : 게시물 보기 모달
- [x] : 토스트 메시지 UI 적용
- [x] : 회원가입 시 기본 아바타 설정
- [x] : 홈 라우트('/') 진입 시 모든 유저의 사진 리스트 출력
- [x] : 게시물 편집 모달

## 구현 필요한 기능
- [ ] : 포스트 삭제 확인 모달 
- [ ] : 유저 프로필 편집 모달

## (시간이 남는다면) 추가로 구현하고 싶은 기능
- [ ] : 유저 프로필 이미지 변경/ 삭제
- [ ] : 좋아요 / 댓글
- [ ] : 반응형 또는 적응형 웹 적용

## 트러블 슈팅
### 새로고침 시 로그인 풀리는 문제
  - 발생 원인
    - 전역 상태로 관리중인 userProfile과 isAuthenticated 변수가 웹 페이지 새로 고침 시 null로 초기화되어 /login 페이지로 리다이렉트 됨 
  - 해결 방법
    - 전역 상태로 관리하는 변수와 객체를 zustand persist 미들웨어를 사용하여 로컬스토리지에 연동하는 방법 적용
### 유저 페이지에서 모든 유저의 게시물이 렌더링되는 문제
  - 발생 원인
    - DB에서 모든 유저의 게시물을 별도의 필터링 없이 불러와서 발생
  - 해결 방법
    - 모든 유저의 게시물을 구독하여 불러오고 실제 렌더링 시 uid를 비교하여 일치하는 게시물만 필터링하여 렌더링
### 파이어베이스 배포 시 특정 경로에 직접 접근 시 404 에러 발생하는 문제
  - 발생 원인
    - 서버에는 기본적으로 index.html만 있으며 해당 경로에 대한 파일을 찾지 못해 404 Not Found 에러 반환
  - 해결 방법
    - firebase.json 파일에 'rewrites' 옵션을 추가하여 모든 경로에 접근 시 루트로 리다이렉트하도록 설정
```json
{
  "rewrites": [
    {
        "source": "**",
        "destination": "/index.html"
    }
  ]
}
```

## 깃 커밋 메시지 컨벤션
| 타입       | 내용                       |
|----------|:-------------------------|
| feat     | 새로운 기능 추가에 대한 커밋         |
| style    | 스타일링 수정에 대한 커밋           |
| refactor | 코드 리팩토링에 대한 커밋           |
| fix      | 버그 수정에 대한 커밋             |
| chore    | 기타 개발 환경 또는 문서 수정에 대한 커밋 |