import { useEffect, useRef, useState } from 'react'
import { Input, ItemsRow, PrimaryButton } from '../components'
import { ModalLayout } from './ModalLayout'
import { useForm } from '../hooks'
import { addDocumentType, deleteDocumentType } from '../firebase/database'
import toast from 'react-hot-toast'
import { dataStore } from '../stores'

export const ManageDocumentTypesModal = () => {
  const {
    documentTypes: storeDocumentTypes,
    addDocumentType: addStoreDocumentType,
    removeDocumentType
  } = dataStore((store) => store)
  const [documentTypes, setDocumentTypes] = useState([])
  const [isPerformingAsync, setIsPerformingAsync] = useState(false)
  const storeDocumentTypesLoaded = useRef(false)
  const { documentType, onInputChange, onResetForm } = useForm({
    documentType: ''
  })
  useEffect(() => {
    if (storeDocumentTypes === null || storeDocumentTypes?.length === 0) return
    // si ya se cargaron una vez los document types desde el store no se vuelven a cargar
    if (storeDocumentTypesLoaded.current) return
    setDocumentTypes(storeDocumentTypes.map((dt) => ({ ...dt, value: dt.id })))
    storeDocumentTypesLoaded.current = true
  }, [storeDocumentTypes])
  const handleRemoveDocumentType = (documentTypeToRemove) => {
    setIsPerformingAsync(true)
    const deleteDocTypePromise = deleteDocumentType(documentTypeToRemove?.value)

    toast.promise(deleteDocTypePromise, {
      loading: 'Eliminando tipo de documento...',
      success: (
        <span>
          <strong>{documentTypeToRemove?.value}</strong> eliminado
        </span>
      ),
      error: (
        <span>
          <strong>{documentTypeToRemove?.value}</strong> no se pudo eliminar
        </span>
      )
    })
    deleteDocTypePromise.then((res) => {
      if (res?.error !== null) {
        toast.error('No se pudo eliminar el tipo de documento')
        return
      }
      setDocumentTypes((prev) =>
        prev.filter(
          (documentType) => documentType?.value !== documentTypeToRemove?.value
        )
      )
      removeDocumentType(documentTypeToRemove?.value)
    })
    deleteDocTypePromise.finally(() => {
      setIsPerformingAsync(false)
    })
  }
  const handleAddDocumentType = (e) => {
    e.preventDefault()
    setIsPerformingAsync(true)
    const addDocTypePromise = addDocumentType(documentType)

    toast.promise(addDocTypePromise, {
      loading: 'Agregando tipo de documento...',
      success: (
        <span>
          <strong>{documentType}</strong> agregado
        </span>
      ),
      error: (
        <span>
          <strong>{documentType}</strong> no se pudo agregar
        </span>
      )
    })
    addDocTypePromise.then((res) => {
      if (res.error !== null) {
        toast.error('Ocurrio un error inesperado, lo sentimos!')
        return
      }
      setDocumentTypes((prev) => [
        ...prev,
        { id: res.id, value: res.id, label: documentType }
      ])
      addStoreDocumentType({
        id: res.id,
        label: documentType
      })
    })
    addDocTypePromise.finally(() => {
      setIsPerformingAsync(false)
      onResetForm()
    })
  }
  return (
    <ModalLayout
      title="Administrar tipos"
      isCloseButtonDisabled={isPerformingAsync}
    >
      <form
        className="grid gap-4 max-h-[600px] overflow-y-scroll"
        onSubmit={handleAddDocumentType}
      >
        <ItemsRow
          elements={documentTypes}
          setSelectedElements={setDocumentTypes}
          handleRemoveSelectedElement={handleRemoveDocumentType}
          allowDeletingAll={false}
        />
        <Input
          label="Tipo de documento"
          id="documentType"
          handleChange={onInputChange}
          value={documentType}
          isDisabled={isPerformingAsync}
        />
        <PrimaryButton text="Agregar" isDisabled={isPerformingAsync} />
      </form>
    </ModalLayout>
  )
}
