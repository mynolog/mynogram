import { useState } from 'react'
import footerData from './footer.json'
import { Link } from 'react-router-dom'
const Footer = () => {
  const [footerItems, _] = useState(Object.freeze(footerData.footer))
  return (
    <footer className="w-3/4 m-auto  flex flex-col justify-center items-center gap-6 text-sm text-gray-500">
      <ul className="w-full flex justify-center items-center gap-3">
        {footerItems.length > 0 &&
          footerItems.map((item) => (
            <li className="hover:underline" key={item.id + item.title}>
              <Link to={item.to}>{item.title}</Link>
            </li>
          ))}
      </ul>
      <div className="flex gap-4">
        <select>
          <option>한국어</option>
          <option>日本語</option>
          <option>English</option>
          <option>Español</option>
          <option>Français</option>
        </select>
        <span>© 2024 Mynogram from mynolog</span>
      </div>
    </footer>
  )
}

export default Footer
