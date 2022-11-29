import { FaPaw } from 'react-icons/fa'
import { serviceInfo, serviceText } from '../../constants'

function Services() {
  return (
    <div className="flex flex-col justify-center gap-10 text-center">
      <h2 className="font-extrabold text-5xl md:text-6xl leading-[1.2]">
        Services <span className="text-orange">Wee</span> Provide
      </h2>
      <div className="md:px-16">
        <div className="relative leading-loose border-2 border-orange-lightest rounded-xl p-8">
          <span className="absolute -top-6 -left-4 -rotate-12 rounded-full bg-orange-lightest p-3">
            <FaPaw size={32} />
          </span>
          <p>{serviceText}</p>
        </div>
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-6 text-center">
        {serviceInfo.map((service, index) => {
          const { Icon, title, color } = service
          return (
            <div
              key={index}
              className="flex flex-col justify-center w-36 h-36 bg-white drop-shadow-sm rounded-xl items-center p-2"
            >
              <span className={`${color} rounded-2xl p-3 text-sand mb-3 mt-2`}>
                <Icon size={26} />
              </span>
              <span className="font-medium">{title}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Services
