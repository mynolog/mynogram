import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { useRef } from 'react'
import Divider from '../../../common/divider/Divider.tsx'
import useAuthStore from '../../../../store/authStore.ts'
import { CiUser } from 'react-icons/ci'
import CommonInput from '../../../common/input/CommonInput.tsx'
import useForm from '../../../../hooks/useForm.tsx'
import CommonButton from '../../../common/button/CommonButton.tsx'
import { firebaseUserService } from '../../../../service/firebaseUserService.ts'
import useToastStore from '../../../../store/toastStore.ts'
import useModalStore from '../../../../store/modalStore.ts'

type EditUserProfileModalProps = {
  file: File | null
  setFile: Dispatch<SetStateAction<File | null>>
}

const EditUserProfileModal = ({ file, setFile }: EditUserProfileModalProps) => {
  const [blobUrl, setBlobUrl] = useState<string | null>(null)
  const { userProfile, setUserProfile, uid } = useAuthStore()
  const avatarRef = useRef<HTMLInputElement>(null)
  const { form, handleFormChange, resetForm } = useForm({
    id: userProfile?.id || '',
    name: userProfile?.name || '',
    description: userProfile?.description || '',
    avatarUrl: userProfile?.avatarUrl || '',
  })
  const { addToast } = useToastStore()
  const { closeModal } = useModalStore()

  const handleUpdateUserProfileClick = async () => {
    if (form.id.trim() === '') {
      addToast('아이디는 필수입니다.', 'delete')
      return
    }
    if (form.name.trim() === '') {
      addToast('이름은 필수입니다.', 'delete')
      return
    }
    if (file && uid) {
      const newUserForm = {
        ...form,
      }
      const result = await firebaseUserService.updateUserProfileByUid(
        uid!,
        newUserForm,
        file,
      )
      if (!result) {
        addToast('유저 정보 수정 실패: 다시 시도해주세요.', 'warning')
        return
      }
      setUserProfile(result)
      resetForm()
      closeModal()
      addToast('유저 정보가 수정되었습니다.', 'update')
    }
  }

  const handleSelectUserAvatarClick = () => {
    if (avatarRef.current) {
      avatarRef.current.click()
    }
  }

  const handleSelectUserAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const targetFile = e.currentTarget.files![0]
    setFile(targetFile)
    if (targetFile) {
      const blob = URL.createObjectURL(targetFile)
      setBlobUrl(blob)
    }
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex flex-col justify-center items-center gap-2">
        <h2 className="font-bold">프로필 수정</h2>
        <Divider />
        <div className="w-full flex flex-col justify-center items-center gap-3 my-2">
          {userProfile && (
            <>
              <div className="w-1/3 flex flex-col justify-center items-center gap-3">
                {userProfile.avatarUrl ? (
                  <div
                    className="rounded-full flex justify-center items-center cursor-pointer"
                    style={{ width: '130px', height: '130px' }}
                  >
                    {blobUrl ? (
                      <img
                        src={blobUrl}
                        alt={file?.name || ''}
                        className="w-full h-full object-cover object-center rounded-full"
                      />
                    ) : (
                      <img
                        src={userProfile.avatarUrl}
                        alt={userProfile.name}
                        className="w-full h-full object-cover object-center rounded-full"
                      />
                    )}
                  </div>
                ) : (
                  <div
                    className="bg-gray-100 rounded-full flex justify-center items-center cursor-pointer"
                    style={{ width: '130px', height: '130px' }}
                  >
                    {/* userProfile에 avatarUrl: null 이라면 기본 프로필 적용 */}
                    <CiUser className="text-7xl text-gray-500" />
                  </div>
                )}
                {/* TODO: 사진 변경 클릭 시 사진 선택 화면으로 이동 */}
                <span
                  className="text-blue-600 font-semibold cursor-pointer"
                  onClick={handleSelectUserAvatarClick}
                >
                  사진 변경
                </span>
                <input
                  type="file"
                  accept="image/*"
                  ref={avatarRef}
                  onChange={handleSelectUserAvatarChange}
                  hidden
                />
              </div>
              <div className="w-full flex flex-col justify-center gap-3">
                <form className="w-full flex flex-col justify-center items-center gap-3">
                  <CommonInput
                    value={form.id}
                    onChange={handleFormChange}
                    label="ID"
                    name="id"
                  />
                  <CommonInput
                    value={form.name}
                    onChange={handleFormChange}
                    label="이름"
                    name="name"
                  />
                  <CommonInput
                    value={form.description}
                    onChange={handleFormChange}
                    label="한 줄 소개"
                    name="description"
                  />
                  <CommonButton
                    width="50%"
                    fontSize="1rem"
                    onClick={handleUpdateUserProfileClick}
                  >
                    <span className="font-semibold">저장</span>
                  </CommonButton>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default EditUserProfileModal
