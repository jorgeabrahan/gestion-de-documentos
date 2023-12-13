import { DownArrow } from '../../assets/icons'
import { PrimaryLinkAsButton, Tag } from '../../components'
import { MODAL_IDS, dataStore, authStore } from '../../stores'
import { UserEntriesLayout } from './account-c/UserEntriesLayout'
import { UserEntry } from './account-c/UserEntry'

export const Account = () => {
  const { user } = authStore((store) => store)
  const { setModalToShow } = dataStore((store) => store)
  return (
    <details>
      <summary className="bg-raisin-black-800 px-5 py-3 rounded-full w-max flex items-center gap-1 cursor-pointer">
        <Tag text={user.role} />
        &nbsp;<span className="text-sm">{user.displayName}</span>
        <DownArrow color="#fff" />
      </summary>
      <UserEntriesLayout>
        <UserEntry title="Correo electrónico" text={user.email} />
        <UserEntry title="ID de usuario" text={user.uid} />
        <PrimaryLinkAsButton
          text="Cambiar contraseña"
          handleClick={() => setModalToShow(MODAL_IDS.changePassword)}
        />
      </UserEntriesLayout>
    </details>
  )
}
