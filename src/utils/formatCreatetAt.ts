type TimeZone = 'Asia/Seoul'
type Locale = 'ko-KR'

// TODO: 게시물 올린 시간 기준으로 반환값 분기 처리
// 예시)
// 1시간 이내: m분 전
// 24시간 이내: h시간 전
// 1년 이내: mm/dd
// 1년 이상: yyyy/mm/dd

export const formatCreatedAt = (
  timestamp: number,
  locale: Locale,
  timeZone: TimeZone,
) => {
  const date = new Date(timestamp)

  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone,
  })
}
