type LogoProps = {
  width?: string
  height?: string
}

const Logo = ({ width = '', height = '' }: LogoProps) => {
  return (
    <span
      style={{
        fontFamily: "'Edu AU VIC WA NT Guides cursive', cursive",
        fontOpticalSizing: 'auto',
        fontWeight: '800',
        fontStyle: 'normal',
      }}
      className={`${width} ${height} flex items-center text-3xl active:text-gray-500`}
    >
      Mynogram
    </span>
  )
}

export default Logo
