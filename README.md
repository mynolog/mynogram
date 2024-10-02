# Mynogram

## 기술 스택
[![Skills](https://skillicons.dev/icons?i=react,ts,tailwind)](https://skillicons.dev)

## 완료
- [x] : 네비게이션 바 레이아웃 및 스타일 적용
- [x] : 파이어베이스 연동
- [x] : 로그인, 로그아웃
- [x] : 회원가입

## TODO
- [ ] : 기본 레이아웃 구성
  - [ ] : Main
  - [x] : Footer
- [ ] : 메인 페이지
- [ ] : 기본 모달 생성
  - [ ] : 포스트 업로드
  - [ ] : 포스트 편집
  - [ ] : 포스트 삭제 확인
  - [ ] : 유저 프로필 수정

## 추가로 구현하고 싶은 기능
- [x] : 토스트 메시지 UI 적용
- [ ] : 반응형 또는 적응형 웹 적용
- [ ] : Oauth 제공자 추가 적용
- [ ] : 이메일, 비밀번호로 회원가입 및 로그인 구현
- [ ] : 프로필 이미지 변경/ 삭제

## Trouble Shooting
### 새로고침 시 로그인 풀리는 문제
  - 발생 원인
    - 전역 상태로 관리중인 userProfile과 isAuthenticated 변수가 웹 페이지 새로 고침 시 null로 초기화되어 /login 페이지로 리다이렉트 됨 
  - 해결 방법
    - 전역 상태로 관리하는 변수와 객체를 zustand persist 미들웨어를 사용하여 로컬스토리지에 연동하는 방법 적용