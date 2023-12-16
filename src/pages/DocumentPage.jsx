import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { DOCUMENT_STATES, MODAL_IDS, dataStore } from '../stores'
import toast from 'react-hot-toast'
import {
  ActionButton,
  SecondaryDescription,
  SectionSubtitle,
  SectionTitle
} from '../components'
import {
  AddComment,
  Minus,
  OpenExternal,
  Plus,
  Refresh,
  Save
} from '../assets/icons'
import {
  getComments,
  getDocuments,
  updateDocumentState
} from '../firebase/database'
import { Comments } from './document-page-c'

export const DocumentPage = () => {
  let { documentId } = useParams()
  const navigate = useNavigate()
  const {
    documents,
    setModalToShow,
    documentComments,
    setDocumentComments,
    setDocuments
  } = dataStore((store) => store)
  const [currentDocument, setCurrentDocument] = useState(null)
  const [documentStatus, setDocumentStatus] = useState(currentDocument?.state)
  const [dateTime, setDateTime] = useState({
    date: null,
    time: null
  })
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showAdditional, setShowAdditional] = useState(false)
  useEffect(() => {
    const result = documents.find((document) => document?.id === documentId)
    if (result === undefined) {
      navigate('/', { replace: true })
      toast.error('No se encontro el documento')
      return
    }
    setCurrentDocument(result)
  }, [documentId, documents, navigate])
  useEffect(() => {
    // se limpian los comentarios cada vez que se abra la vista de un documento
    setDocumentComments([])
    getComments(documentId).then((res) => {
      if (res?.error !== null) {
        toast.error('No se pudieron obtener los comentarios')
        return
      }
      if (res?.comments?.length > 0) setDocumentComments(res?.comments)
    })
  }, [documentId])
  // Efecto para extraer la fecha y la hora del documento actual
  useEffect(() => {
    if (currentDocument === null) return
    setDocumentStatus(currentDocument?.state)
    let creationTimeAndDate = new Date(currentDocument?.creationTimeAndDate)
    let year = creationTimeAndDate.getFullYear() // Año
    let month = creationTimeAndDate.getMonth() + 1 // Mes (getMonth() devuelve un valor de 0 a 11, por lo que se suma 1)
    let date = creationTimeAndDate.getDate() // Día del mes
    let hours = creationTimeAndDate.getHours() // Horas
    let minutes = creationTimeAndDate.getMinutes() // Minutos
    setDateTime({
      date: `${year}-${month}-${date}`,
      time: `${hours}:${minutes}`
    })
  }, [currentDocument])
  const handleSave = () => {
    if (documentStatus === currentDocument?.state) {
      toast.error('No has realizado ningun cambio en el estado')
      return
    }
    setIsRefreshing(true)
    updateDocumentState(documentId, documentStatus)
      .then((res) => {
        if (res?.error !== null) {
          toast.error('No se pudo actualizar el estado del documento')
          return
        }
        toast.success(`Ahora el estado de el documento es ${documentStatus}`)
        setIsRefreshing(true)
        getDocuments()
          .then((res) => {
            if (res.error !== null) {
              toast.error('No se pudieron recargar los documentos')
              return
            }
            setDocuments(res?.documents)
            toast.success('Documentos recargados')
          })
          .finally(() => {
            setIsRefreshing(false)
          })
      })
      .catch(() => {
        toast.error('No se pudo actualizar el estado del documento')
      })
      .finally(() => setIsRefreshing(false))
  }
  return (
    <section className="w-full h-full relative">
      <section className="w-full grid grid-cols-2 gap-10">
        <div>
          <SecondaryDescription text="Asunto del documento: " />
          <SectionTitle text={currentDocument?.subject} />
          <SecondaryDescription text="Descripción del documento: " />
          <SectionSubtitle text={currentDocument?.description} />
        </div>
        <aside>
          <SecondaryDescription
            className="mb-2"
            text="Estado del documento: "
          />
          <form className="flex gap-3">
            <select
              className="bg-[#ffffff0a] border border-solid border-onyx px-3 py-2 rounded-md text-sm w-max focus:outline-none"
              id="documentStatus"
              name="documentStatus"
              value={documentStatus}
              onChange={(e) => setDocumentStatus(e.target?.value)}
              disabled={isRefreshing}
            >
              {Object.keys(DOCUMENT_STATES)?.map((key) => (
                <option key={key} value={DOCUMENT_STATES[key]}>
                  {key}
                </option>
              ))}
            </select>
            <button
              className="bg-celtic-blue p-2 rounded-full w-max"
              onClick={handleSave}
              disabled={isRefreshing}
            >
              <Save />
            </button>
          </form>
          {currentDocument?.files?.length > 0 && (
            <>
              <SecondaryDescription
                className="mb-2 mt-4"
                text="Archivos adjuntos: "
              />
              <div className="flex flex-wrap gap-3">
                {currentDocument?.files?.map((file) => (
                  <p
                    className="bg-raisin-black-800 px-4 py-1 w-max rounded-lg text-sm flex items-center gap-2"
                    key={file?.path}
                  >
                    <span>{file?.path}</span>
                    <a
                      className="bg-fire-engine-red-500 p-2 rounded-full flex"
                      href={file?.url}
                      target="_blank"
                      rel="noreferrer"
                      download
                    >
                      <OpenExternal dimensions="15px" />
                    </a>
                  </p>
                ))}
              </div>
            </>
          )}
        </aside>
      </section>
      <section className="flex items-center justify-end gap-3 my-5">
        <ActionButton
          text="Refrescar"
          handleClick={() => {
            setIsRefreshing(true)
            toast(() => <span>Recargando comentarios...</span>)
            getComments(documentId)
              .then((res) => {
                if (res?.error !== null) {
                  toast.error('No se pudieron cargar los comentarios')
                  return
                }
                setDocumentComments(res?.comments)
              })
              .finally(() => {
                setIsRefreshing(false)
              })
          }}
          isDisabled={
            isRefreshing || documentStatus === DOCUMENT_STATES.cerrado
          }
        >
          <Refresh dimensions="15px" />
        </ActionButton>
        <ActionButton
          text="Agregar comentario"
          handleClick={() => {
            setModalToShow(MODAL_IDS.addComment)
          }}
          isDisabled={
            isRefreshing || documentStatus === DOCUMENT_STATES.cerrado
          }
        >
          <AddComment dimensions="15px" />
        </ActionButton>
      </section>
      <section>
        {documentComments?.length < 1 ? (
          <SecondaryDescription
            className="text-center py-40"
            text="Una vez se hayan agregado comentarios se mostraran aquí"
          />
        ) : (
          <Comments comments={documentComments} />
        )}
      </section>
      <section
        className={`bg-raisin-black-800 p-5 rounded-2xl max-w-[430px] grid gap-2 fixed ${
          showAdditional ? 'bottom-4' : '-bottom-[300px]'
        } w-full right-2 md:right-4 transition-[bottom] duration-500`}
      >
        <div className="flex items-center justify-between">
          <SectionTitle text="Información adicional" />
          <button
            className={`${
              showAdditional ? 'bg-fire-engine-red-500' : 'bg-celtic-blue'
            } transition-colors duration-500 p-2 rounded-full flex items-center justify-center w-max`}
            onClick={() => setShowAdditional((prev) => !prev)}
          >
            {showAdditional ? <Minus /> : <Plus />}
          </button>
        </div>
        <div className="h-[280px] overflow-y-scroll grid gap-2">
          <div>
            <SecondaryDescription text="ID del documento: " />
            <p className="text-neutral-100 text-[15px] truncate">
              {currentDocument?.id}
            </p>
          </div>
          <div>
            <SecondaryDescription text="Fecha de creación: " />
            <p className="text-neutral-100 text-[15px] truncate">
              {dateTime?.date}
            </p>
          </div>
          <div>
            <SecondaryDescription text="Hora de creación: " />
            <p className="text-neutral-100 text-[15px] truncate">
              {dateTime?.time}
            </p>
          </div>
          <div>
            <SecondaryDescription text="Remitente: " />
            <p className="text-neutral-100 text-[15px] truncate">
              <strong>({currentDocument?.sender?.role})</strong>{' '}
              {currentDocument?.sender?.displayName}
            </p>
          </div>
          <div>
            <SecondaryDescription text="Tipo de documento: " />
            <p className="text-neutral-100 text-[15px] truncate">
              {currentDocument?.documentType?.label}
            </p>
          </div>
          <div>
            <SecondaryDescription text="Destinatario(s): " />
            {currentDocument?.recipients?.map((recipient) => (
              <p
                key={recipient?.uid}
                className="text-neutral-100 text-[15px] truncate"
              >
                {recipient?.displayName}
              </p>
            ))}
          </div>
        </div>
      </section>
    </section>
  )
}
