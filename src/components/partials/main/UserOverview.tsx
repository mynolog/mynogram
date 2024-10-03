import UserPost from './UserPost.tsx'
import UserProfile from './UserProfile.tsx'
const UserOverview = () => {
  return (
    <main className="max-w-fit flex flex-col mx-auto mt-20">
      <UserProfile />
      <UserPost />
    </main>
  )
}

export default UserOverview
