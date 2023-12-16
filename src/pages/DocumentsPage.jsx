import toast from 'react-hot-toast'
import { AddDocument, ManageDocumentTypes, Refresh } from '../assets/icons'
import {
  ActionButton,
  DocumentsTable,
  SecondaryDescription,
  SectionSubtitle,
  SectionTitle
} from '../components'
import {
  DOCUMENT_STATES,
  MODAL_IDS,
  USER_ROLES,
  authStore,
  dataStore
} from '../stores'
import { useEffect, useState } from 'react'
import { getDocuments } from '../firebase/database'

export const DocumentsPage = () => {
  const { setModalToShow } = dataStore((store) => store)
  const { documents, users, documentTypes, setDocuments } = dataStore(
    (store) => store
  )
  const [documentState, setDocumentState] = useState('todos')
  const { user } = authStore((store) => store)
  const [isRefreshing, setIsRefreshing] = useState((store) => store)
  const [documentsSentByYou, setDocumentsSentByYou] = useState([])
  const [filteredDocuments, setFilteredDocuments] = useState([])
  useEffect(() => {
    const result = documents?.filter((doc) => doc?.sender?.uid === user?.uid)
    setDocumentsSentByYou(result)
  }, [documents, user?.uid])
  useEffect(() => {
    const results = documentsSentByYou?.filter((doc) => {
      if (documentState === 'todos') return true
      return doc?.state === documentState
    })
    setFilteredDocuments(results)
  }, [documentState, documentsSentByYou])
  return (
    <>
      <form className="flex items-center justify-end mb-3 gap-3">
        <p className="text-dim-gray text-sm">Filtrar por estado</p>
        <select
          className="bg-[#ffffff0a] border border-solid border-onyx px-3 py-2 rounded-full text-sm w-max focus:outline-none"
          id="documentState"
          name="documentState"
          value={documentState}
          onChange={(e) => setDocumentState(e.target?.value)}
        >
          <option value="todos">todos</option>
          {Object.keys(DOCUMENT_STATES)?.map((key) => (
            <option key={key} value={DOCUMENT_STATES[key]}>
              {key}
            </option>
          ))}
        </select>
      </form>
      <section className="flex items-center justify-end gap-3">
        <ActionButton
          text="Refrescar"
          handleClick={() => {
            setIsRefreshing(true)
            toast(() => <span>Recargando documentos...</span>)
            getDocuments()
              .then((res) => {
                if (res.error !== null) {
                  toast.error('No se pudieron cargar los documentos')
                  return
                }
                setDocuments(res?.documents)
                toast.success('Documentos recargados')
              })
              .finally(() => {
                setIsRefreshing(false)
              })
          }}
          isDisabled={isRefreshing}
        >
          <Refresh dimensions="15px" />
        </ActionButton>
        <ActionButton
          text="Administrar tipos"
          handleClick={() => {
            setModalToShow(MODAL_IDS.manageDocumentTypes)
          }}
          isDisabled={user?.role !== USER_ROLES.admin || isRefreshing}
        >
          <ManageDocumentTypes dimensions="15px" />
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
              toast.error(
                'No hay tipos de documentos creados por el administrador'
              )
              return
            }
            setModalToShow(MODAL_IDS.createDocument)
          }}
          isDisabled={isRefreshing}
        >
          <AddDocument dimensions="15px" />
        </ActionButton>
      </section>
      <section>
        <div className="my-10">
          <SectionTitle text="Enviados por tí" />
          <SectionSubtitle text="Todos los documentos que has enviado a compañeros de tu organización apareceran aquí" />
        </div>
        {documentsSentByYou?.length === 0 ? (
          <SecondaryDescription
            className="text-center py-40"
            text="Crea documentos para verlos aqui"
          />
        ) : filteredDocuments?.length < 1 ? (
          <SecondaryDescription
            className="text-center py-20"
            text={`No se encontraron documentos con el estado ${documentState}`}
          />
        ) : (
          <DocumentsTable
            documents={filteredDocuments.sort(
              (a, b) =>
                new Date(b.creationTimeAndDate) -
                new Date(a.creationTimeAndDate)
            )}
          />
        )}
      </section>
    </>
  )
}
