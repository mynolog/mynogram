type LogoProps = {
  width?: string
  height?: string
  fontSize?: string
}

const Logo = ({ width = '', height = '', fontSize = '1.75rem' }: LogoProps) => {
  return (
    <span
      style={{
        fontFamily: "'Edu AU VIC WA NT Guides cursive', cursive",
        fontOpticalSizing: 'auto',
        fontWeight: '800',
        fontStyle: 'normal',
        fontSize,
      }}
      className={`${width} ${height} flex items-center text-3xl active:text-gray-500`}
    >
      Mynogram
    </span>
  )
}

export default Logo
