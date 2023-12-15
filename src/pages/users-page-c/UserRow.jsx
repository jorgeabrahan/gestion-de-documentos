import PropTypes from 'prop-types'
import { Save } from '../../assets/icons'
import { USER_ROLES } from '../../stores'
import { RowContentLayout } from './RowContentLayout'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { updateUserRole } from '../../firebase/database'
import { ActionButton } from '../../components'

export const UserRow = ({
  user = { uid: '', displayName: '', email: '', role: '' },
  currentUser = { uid: '' },
  isChangingUserRole,
  setIsChangingUserRole
}) => {
  const [userRole, setUserRole] = useState(user?.role)
  const handleSave = () => {
    if (userRole === user?.role) {
      toast.error('No ha realizado ningun cambio')
      return
    }
    setIsChangingUserRole(true)
    const updateUserPromise = updateUserRole(user.uid, userRole)

    toast.promise(updateUserPromise, {
      loading: 'Actualizando...',
      success: (
        <span>
          <strong>{user.displayName}</strong> ahora es {userRole}
        </span>
      ),
      error: (
        <span>
          <strong>{user.displayName}</strong> no se pudo actualizar
        </span>
      )
    })

    updateUserPromise.finally(() => setIsChangingUserRole(false))
  }
  return (
    <RowContentLayout key={user.uid}>
      <p className="text-sm">
        {user.displayName} {currentUser.uid === user.uid && '(Tú)'}
      </p>
      <p className="text-sm">{user.email}</p>
      <form>
        <select
          className={`bg-eerie-black-800 px-3 py-1 rounded-lg text-sm w-max border border-solid border-anti-flash-white ${
            currentUser.uid === user.uid
              ? 'cursor-not-allowed'
              : 'cursor-pointer'
          }`}
          name="role"
          id="role"
          value={userRole}
          onChange={(e) => setUserRole(e.target.value)}
          disabled={currentUser.uid === user.uid || isChangingUserRole}
        >
          {Object.keys(USER_ROLES).map((key) => {
            return (
              <option key={key} value={key}>
                {key}
              </option>
            )
          })}
        </select>
      </form>
      <div className="flex items-center gap-3">
        <ActionButton
          text="Guardar"
          isDisabled={currentUser.uid === user.uid || isChangingUserRole}
          handleClick={handleSave}
        >
          <Save />
        </ActionButton>
        {/* <ActionButton text="Eliminar" isDisabled={currentUser.uid === user.uid}>
          <Delete />
        </ActionButton> */}
      </div>
    </RowContentLayout>
  )
}

UserRow.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    displayName: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string
  }),
  currentUser: PropTypes.shape({
    uid: PropTypes.string
  }),
  isChangingUserRole: PropTypes.bool,
  setIsChangingUserRole: PropTypes.func
}
