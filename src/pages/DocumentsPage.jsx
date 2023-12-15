import toast from 'react-hot-toast'
import { AddDocument, ManageDocumentTypes } from '../assets/icons'
import { ActionButton } from '../components'
import { MODAL_IDS, USER_ROLES, authStore, dataStore } from '../stores'
import { PageLayout } from './PageLayout'

export const DocumentsPage = () => {
  const { setModalToShow } = dataStore((store) => store)
  const { users, documentTypes } = dataStore((store) => store)
  const { user } = authStore((store) => store)
  return (
    <PageLayout>
      <section className="flex items-center justify-end gap-3">
        <ActionButton
          text="Administrar tipos"
          handleClick={() => {
            setModalToShow(MODAL_IDS.manageDocumentTypes)
          }}
          isDisabled={user?.role !== USER_ROLES.admin}
        >
          <ManageDocumentTypes />
        </ActionButton>
        <ActionButton
          text="Crear documento"
          handleClick={() => {
            // si el unico usuario en la base de datos es el del remitente
            if (users.length < 2) {
              toast.error('No hay usuarios a quienes enviarle un documento')
              return
            }
            if (documentTypes?.length < 1) {
              toast.error('No hay tipos de documentos creados por el administrador')
              return
            }
            setModalToShow(MODAL_IDS.createDocument)
          }}
        >
          <AddDocument />
        </ActionButton>
      </section>
    </PageLayout>
  )
}
