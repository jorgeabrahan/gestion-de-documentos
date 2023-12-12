import { GoogleIsoLogo } from '../assets/images'
import PropTypes from 'prop-types'

export const GoogleSignInButton = ({ handleClick = () => {} }) => {
  return (
    <button className="bg-anti-flash-white rounded-md font-semibold py-3 px-[22px] flex items-center justify-center gap-3 text-black" onClick={handleClick}>
      <img className='max-w-[20px]' src={GoogleIsoLogo} alt="Isologo de Google" />
      <span>Registrarse con Google</span>
    </button>
  )
}

GoogleSignInButton.propTypes = {
    handleClick: PropTypes.func
}
