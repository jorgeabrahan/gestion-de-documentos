import PropTypes from 'prop-types'
import { Search } from '../../assets/icons'

export const SearchInput = ({ placeholder = '', value = '', handleChange = () => {} }) => {
  return (
    <div className="relative max-w-xs">
      <input
        className="bg-[#ffffff0a] border border-solid border-onyx rounded-full pl-6 pr-11 text-sm transition-[padding] duration-300 text-anti-flash-white w-full py-2 focus:outline-none"
        type="text"
        id="query"
        name="query"
        spellCheck="off"
        autoComplete="off"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      <button className="absolute right-0 top-0 px-3 h-full flex items-center bg-onyx rounded-r-full border-r border-y border-solid border-onyx">
        <Search dimensions="15px" />
      </button>
    </div>
  )
}

SearchInput.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    handleChange: PropTypes.func
}
