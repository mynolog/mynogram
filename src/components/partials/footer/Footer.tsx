import { VscGithubInverted } from 'react-icons/vsc'
import { FaInstagram } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="min-h-fit mt-24 mb-12 flex flex-col justify-center items-center text-sm text-gray-500">
      <div className="flex items-center gap-4 mb-12">
        <span>© 2024 mynolog All rights reserved.</span>
        <a href="https://github.com/mynolog/mynogram" target="_parent ">
          <VscGithubInverted className="text-3xl" />
        </a>
        <a href="https://www.instagram.com/_undefined_2/" target="_parent ">
          <FaInstagram className="text-3xl" />
        </a>
      </div>
    </footer>
  )
}

export default Footer
