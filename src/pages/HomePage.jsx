import { useEffect, useState } from 'react'
import { authStore, dataStore } from '../stores'
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
  const [isRefreshing, setIsRefreshing] = useState(false)
  useEffect(() => {
    const result = documents?.filter(
      (doc) =>
        doc?.recipients?.find((recipient) => recipient?.uid === user?.uid) !==
        undefined
    )
    if (result !== null && result?.length > 0) setDocumentsSentToYou(result)
  }, [documents, user?.uid])
  return (
    <>
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
          <DocumentsTable
            documents={documentsSentToYou.sort(
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
