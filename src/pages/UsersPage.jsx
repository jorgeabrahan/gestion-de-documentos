import { useEffect, useState } from 'react'
import { authStore, dataStore } from '../stores'
import { SearchInput, UserRow } from './users-page-c'
import { useForm } from '../hooks'
import toast from 'react-hot-toast'
import {
  ActionButton,
  ColTitle,
  RowTitleLayout,
  SectionSubtitle,
  SectionTitle
} from '../components'
import { Refresh } from '../assets/icons'
import { getAllUsers } from '../firebase/database'

export const Users = () => {
  const { user: currentUser } = authStore((store) => store)
  const { users, setUsers } = dataStore((store) => store)
  const [filteredUsers, setFilteredUsers] = useState([])
  const { filterBy, query, onInputChange } = useForm({
    filterBy: 'name',
    query: ''
  })
  const [isChangingUserRole, setIsChangingUserRole] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  useEffect(() => {
    if (users.length !== 0) setFilteredUsers(users)
  }, [users])
  const handleSubmit = (e) => {
    e.preventDefault()
    const filtered = users.filter((fUser) => {
      if (filterBy === 'name')
        return fUser?.displayName
          ?.trim()
          ?.toLowerCase()
          ?.includes(query?.trim()?.toLowerCase())
      return fUser?.email
        ?.trim()
        ?.toLowerCase()
        ?.includes(query?.trim()?.toLowerCase())
    })
    if (filtered.length === 0) {
      toast.error(`No se encontraron resultados para ${query}`)
      return
    }
    setFilteredUsers(filtered)
  }
  return (
    <>
      <form
        className="flex items-center justify-end mb-3 gap-3"
        onSubmit={handleSubmit}
      >
        <select
          className="bg-[#ffffff0a] border border-solid border-onyx px-3 py-2 rounded-full text-sm w-max focus:outline-none"
          id="filterBy"
          name="filterBy"
          value={filterBy}
          onChange={onInputChange}
        >
          <option value="name">Nombre</option>
          <option value="email">Correo</option>
        </select>
        <SearchInput
          placeholder="Busca un usuario"
          value={query}
          handleChange={onInputChange}
        />
      </form>
      <section className="flex items-center justify-end gap-3">
        <ActionButton
          text="Refrescar"
          handleClick={() => {
            setIsRefreshing(true)
            toast(() => <span>Recargando documentos...</span>)
            getAllUsers()
              .then((res) => {
                if (res?.error !== null) {
                  toast.error('No se pudieron cargar los usuarios')
                  return
                }
                setUsers(res?.users)
              })
              .finally(() => {
                setIsRefreshing(false)
              })
          }}
          isDisabled={isRefreshing}
        >
          <Refresh dimensions="15px" />
        </ActionButton>
      </section>
      <div className="my-10">
        <SectionTitle text="Usuarios de tu organización" />
        <SectionSubtitle text="Todos los usuarios que forman parte de tu organización apareceran aquí" />
      </div>
      <section className="bg-raisin-black-800 p-5 rounded-2xl">
        <RowTitleLayout>
          <ColTitle text="Nombre" />
          <ColTitle text="Correo" />
          <ColTitle text="Permisos" />
          <ColTitle text="Acciones" />
        </RowTitleLayout>
        <div className="grid gap-3">
          {filteredUsers.map((user) => (
            <UserRow
              user={user}
              currentUser={currentUser}
              key={user.uid}
              setIsChangingUserRole={setIsChangingUserRole}
              isChangingUserRole={isChangingUserRole}
            />
          ))}
        </div>
      </section>
    </>
  )
}
