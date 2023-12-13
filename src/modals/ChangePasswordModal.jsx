import { useState } from 'react'
import { Input, PrimaryButton, SecondaryDescription } from '../components'
import { useForm } from '../hooks'
import { ModalLayout } from './ModalLayout'
import { checkPassword } from '../helpers/auth'
import { changePassword } from '../firebase/auth'
import toast from 'react-hot-toast'
import { dataStore } from '../stores'

export const ChangePasswordModal = () => {
    const { setModalToShow } = dataStore((store) => store)
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState(null)
  const { currentPassword, password, confirmPassword, onInputChange, onResetForm } = useForm({
    currentPassword: '',
    password: '',
    confirmPassword: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)
    if (password.trim().length === 0 || confirmPassword.trim().length === 0) {
      setError('Porfavor llena todos los campos')
      return
    }
    const { isValid: isPasswordValid, error: passwordError } =
      checkPassword(password)
    if (!isPasswordValid) {
      setError(passwordError)
      return
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }
    setIsUpdating(true)
    changePassword(currentPassword, password)
      .then(() => {
        toast.success('La contraseña fue actualizada')
        onResetForm()
        setModalToShow(null)
      })
      .catch(() => {
        toast.error('La contraseña no se pudo actualizar')
      })
      .finally(() => setIsUpdating(false))
  }

  return (
    <ModalLayout title="Cambiar contraseña" isCloseButtonDisabled={isUpdating}>
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <Input
          label="Contraseña actual"
          type="password"
          id="currentPassword"
          value={currentPassword}
          handleChange={onInputChange}
        />
        <Input
          label="Nueva contraseña"
          type="password"
          id="password"
          value={password}
          handleChange={onInputChange}
        />
        <Input
          label="Confirmar nueva contraseña"
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          handleChange={onInputChange}
        />
        {error !== null && error !== '' && (
          <SecondaryDescription text={error} />
        )}
        <PrimaryButton
          text="Cambiar contraseña"
          className="w-full"
          isDisabled={isUpdating}
        />
      </form>
    </ModalLayout>
  )
}
