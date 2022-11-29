import Router from 'next/router'

interface ILogo {
  footer?: boolean
}

const Logo = ({ footer }: ILogo) => {
  return (
    <div onClick={() => Router.push('/')}>
      <h2
        className={`${
          footer && 'text-white'
        } text-4xl font-extrabold cursor-pointer`}
      >
        Wee
        <span className={`${footer ? 'text-white' : 'text-orange'}`}>
          Buddy
        </span>
      </h2>
    </div>
  )
}

export default Logo
