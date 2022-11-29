import Logo from './Logo'
import { socialIcons } from '../constants'

const Footer = () => {
  return (
    <footer className="w-full bg-orange py-12">
      <div className="relative flex flex-col md:flex-row justify-between my-auto items-center px-6 md:px-12 max-w-7xl w-full gap-6 m-auto">
        <div className="text-center md:text-start">
          <Logo footer />
          <small className="text-offwhite">&#169; 2022 WeeBuddy Inc.</small>
        </div>
        <div>
          {socialIcons.map((social, index) => {
            const { Icon, aria } = social
            return (
              <button
                key={index}
                aria-label={aria}
                className="uppercase px-5 py-3 rounded-md w-max drop-shadow-sm text-white"
              >
                <Icon size={28} />
              </button>
            )
          })}
        </div>
      </div>
    </footer>
  )
}

export default Footer
