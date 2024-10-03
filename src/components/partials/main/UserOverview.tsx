import UserPost from './UserPost.tsx'
import UserProfile from './UserProfile.tsx'
const UserOverview = () => {
  return (
    <main className="w-3/4 ml-72 mr-52 my-12">
      <UserProfile />
      <UserPost />
    </main>
  )
}

export default UserOverview
