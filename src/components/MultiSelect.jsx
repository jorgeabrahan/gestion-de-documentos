import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

export const MultiSelect = ({
  options = [],
  placeholder = '',
  selectedOptions = [],
  setSelectedOptions = () => {},
  isDisabled = false
}) => {
  const inputRef = useRef(null)
  const [isFocused, setIsFocused] = useState(false)
  const [query, setQuery] = useState('')
  const [filteredOptions, setFilteredOptions] = useState(options || [])
  useEffect(() => {
    const results = options.filter((option) =>
      option?.label?.toLowerCase()?.includes(query.toLowerCase()) && (selectedOptions.find(opt => opt?.value === option?.value) === undefined)
    )
    if (results?.length === 0) {
      setFilteredOptions(options)
      return
    }
    setFilteredOptions(results)
  }, [query, options, selectedOptions])
  const addOptionToSelected = (option) => {
    setSelectedOptions((prev) => [...prev, option])
    toast.success(`${option?.label} agregado`)
  }
  const resetAfterAdd = () => {
    // quitar el foco del input y eliminar la consulta
    inputRef.current?.blur()
    setQuery('')
  }
  const handleEnterPress = () => {
    if (filteredOptions.length === 1) {
      addOptionToSelected(filteredOptions[0])
      resetAfterAdd()
      return
    }
    toast.error('Selecciona un usuario para agregarlo')
  }
  const handleOptionClicked = (option) => {
    addOptionToSelected(option)
    resetAfterAdd()
  }
  const handleAddAll = () => {
    setSelectedOptions(options)
    toast.success('Todos los elementos fueron agregados')
    resetAfterAdd()
  }
  return (
    <div className={`relative ${isDisabled && 'opacity-40'}`}>
      <input
        ref={inputRef}
        placeholder={placeholder}
        className="bg-[#ffffff0a] border border-solid border-onyx rounded-xl px-4 py-5 text-anti-flash-white w-full placeholder:text-dim-gray"
        type="text"
        onFocus={(e) => {
          e.stopPropagation()
          setIsFocused(true)
        }}
        onBlur={(e) => {
          e.stopPropagation()
          setIsFocused(false)
        }}
        value={query}
        onChange={(e) => {
          e.stopPropagation()
          setQuery(e.target.value)
        }}
        disabled={(selectedOptions?.length === options?.length) || isDisabled}
        onKeyDown={(e) => {
          e.stopPropagation()
          if (e.key === 'Enter') {
            e.preventDefault()
            handleEnterPress()
            return
          }
        }}
      />
      {selectedOptions?.length === options?.length && (
        <div
          className="absolute inset-0 bg-transparent"
          onClick={() => toast.error('No hay mas opciones para agregar')}
        />
      )}
      <div
        className={`p-3 bg-eerie-black rounded-lg absolute mt-3 w-full z-50 ${
          isFocused ? 'block' : 'hidden'
        }`}
      >
        {filteredOptions?.map((option) => {
          const result = selectedOptions?.find(
            (opt) => opt?.value === option?.value
          )
          if (result !== undefined)
            return <React.Fragment key={option?.value}></React.Fragment>
          return (
            <button
              className="p-2 block hover:bg-[#ffffff0a] w-full text-left rounded-lg transition-colors duration-300"
              key={option?.value}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault() // Prevenir el evento de blur
                handleOptionClicked(option)
              }}
            >
              {option?.label}
            </button>
          )
        })}
        <button
          className="mt-4 p-2 block bg-fire-engine-red hover:bg-fire-engine-red/80 w-full rounded-lg transition-colors duration-300"
          type="button"
          onMouseDown={(e) => {
            e.preventDefault() // Prevenir el evento de blur
            handleAddAll()
          }}
        >
          Agregar todos
        </button>
      </div>
    </div>
  )
}

MultiSelect.propTypes = {
  options: PropTypes.array,
  placeholder: PropTypes.string,
  selectedOptions: PropTypes.array,
  setSelectedOptions: PropTypes.func,
  isDisabled: PropTypes.bool
}
