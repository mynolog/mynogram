import { FaCameraRetro } from 'react-icons/fa'
const EmptyPostItem = () => {
  return (
    <li className="w-full flex flex-col items-center justify-center gap-4 mt-10">
      <FaCameraRetro className="text-7xl" />
      <span className="text-2xl font-bold">게시물 없음</span>
      <p>왼쪽 탭에서 만들기를 눌러서 일상을 공유해보세요.</p>
    </li>
  )
}

export default EmptyPostItem
