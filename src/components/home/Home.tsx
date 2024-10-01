import { useAuthStore } from '../../store/authStore.ts'

const Home = () => {
  const { userProfile } = useAuthStore()

  return (
    <div>
      {userProfile && (
        <>
          <h2>{userProfile.id}</h2>
          <h2>{userProfile.description}</h2>
          <h2>팔로워 : {userProfile.followers}</h2>
          <h2>팔로우 : {userProfile.follows}</h2>
          <h2>게시물 : {userProfile.follows}</h2>
        </>
      )}
    </div>
  )
}

export default Home
