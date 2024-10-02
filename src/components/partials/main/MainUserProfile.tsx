import { useAuthStore } from '../../../store/authStore.ts'
import CommonButton from '../../common/button/CommonButton.tsx'
import { CiUser, CiSettings } from 'react-icons/ci'
import { FaThreads } from 'react-icons/fa6'

const MainUserProfile = () => {
  const { userProfile } = useAuthStore()

  return (
    <div className="w-full flex">
      <div className="w-1/3 flex justify-center items-center">
        <div
          className="bg-gray-100 rounded-full flex justify-center items-center cursor-pointer"
          style={{ width: '105px', height: '105px' }}
        >
          {/* user에 프로필 이미지가 없으면 기본 프로필 적용 */}
          <CiUser className="text-7xl text-gray-500" />
        </div>
      </div>
      <div className="w-2/3">
        {userProfile && (
          <div className="w-full flex flex-col justify-start gap-7">
            <div className="w-fit flex gap-2">
              <h3 className="font-semibold text-xl mr-2 cursor-pointer">
                {userProfile.id}
              </h3>
              <CommonButton
                bgColor="#F3F4F6"
                fontSize="0.85rem"
                width="100px"
                padding="5px 3px"
                textColor="#000"
              >
                {/* TODO: 프로필 편집 클릭 시 프로필 편집 모달 창 불러오기 */}
                <span className="font-semibold">프로필 편집</span>
              </CommonButton>
              <CommonButton
                bgColor="#F3F4F6"
                fontSize="0.85rem"
                width="120px"
                padding="5px 3px"
                textColor="#000"
              >
                <span className="font-semibold">보관된 스토리 보기</span>
              </CommonButton>
              <CiSettings className="text-3xl cursor-pointer" />
            </div>
            <div className="w-full flex gap-5">
              <p>
                <span>게시물 </span>
                <span className="font-bold">{userProfile.follows}</span>
              </p>
              <p>
                <span>팔로우 </span>
                <span className="font-bold">{userProfile.follows}</span>
              </p>
              <p>
                <span>팔로워 </span>
                <span className="font-bold">{userProfile.followers}</span>
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="flex items-center max-w-fit py-1 px-2 bg-slate-100 rounded-2xl cursor-pointer hover:bg-slate-300">
                <FaThreads />
                <span>{userProfile.id}</span>
              </p>
              <span className="max-w-fit font-semibold">
                {userProfile.description}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MainUserProfile
