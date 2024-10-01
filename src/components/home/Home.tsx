import { useAuthStore } from '../../store/authStore.ts'

const Home = () => {
  const { user } = useAuthStore()

  return (
    <div>
      {user && (
        <>
          <h2>{user.email}</h2>
        </>
      )}
    </div>
  )
}

export default Home
