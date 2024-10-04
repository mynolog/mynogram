import UserPost from './UserPost.tsx'
import UserProfile from './UserProfile.tsx'
const UserOverview = () => {
  return (
    <main className="max-w-fit min-w-[800px] flex flex-col mx-auto mt-20 pl-[120px]">
      <UserProfile />
      <UserPost />
    </main>
  )
}

export default UserOverview
