import { useEffect, useState } from 'react'
import { DOCUMENT_STATES, authStore, dataStore } from '../stores'
import {
  ActionButton,
  DocumentsTable,
  SecondaryDescription,
  SectionSubtitle,
  SectionTitle
} from '../components'
import toast from 'react-hot-toast'
import { getDocuments } from '../firebase/database'
import { Refresh } from '../assets/icons'

export const HomePage = () => {
  const { documents, setDocuments } = dataStore((store) => store)
  const { user } = authStore((store) => store)
  const [documentsSentToYou, setDocumentsSentToYou] = useState([])
  const [filteredDocuments, setFilteredDocuments] = useState([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [documentState, setDocumentState] = useState('todos')
  useEffect(() => {
    const result = documents?.filter(
      (doc) =>
        doc?.recipients?.find((recipient) => recipient?.uid === user?.uid) !==
        undefined
    )
    if (result !== null && result?.length > 0) setDocumentsSentToYou(result)
  }, [documents, user?.uid])
  useEffect(() => {
    const results = documentsSentToYou?.filter(doc => {
      if (documentState === 'todos') return true
      return doc?.state === documentState
    })
    setFilteredDocuments(results)
  }, [documentState, documentsSentToYou])
  return (
    <>
      <form
        className="flex items-center justify-end mb-3 gap-3"
      >
        <p className='text-dim-gray text-sm'>Filtrar por estado</p>
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
      </section>
      <section>
        <div className="my-10">
          <SectionTitle text="Enviados para tí" />
          <SectionSubtitle text="Todos los documentos que te han enviado compañeros de tu organización apareceran aquí" />
        </div>
        {documentsSentToYou?.length === 0 ? (
          <SecondaryDescription
            className="text-center py-40"
            text="Espera a recibir documentos para verlos aqui"
          />
        ) : (
          (filteredDocuments?.length < 1) ? (
            <SecondaryDescription className='text-center py-20' text={`No se encontraron documentos con el estado ${documentState}`} />
          ) : (
            <DocumentsTable
              documents={filteredDocuments.sort(
                (a, b) =>
                  new Date(b.creationTimeAndDate) -
                  new Date(a.creationTimeAndDate)
              )}
            />
          )
        )}
      </section>
    </>
  )
}
