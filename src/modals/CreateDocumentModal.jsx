import { useEffect, useState } from 'react'
import {
  Input,
  InputFile,
  ItemsRow,
  MultiSelect,
  PrimaryButton,
  Select,
  Textarea
} from '../components'
import { DOCUMENT_STATES, authStore, dataStore } from '../stores'
import { ModalLayout } from './ModalLayout'
import toast from 'react-hot-toast'
import { useForm } from '../hooks/useForm'
import { FileRow } from './change-document-modal-c'
import { addDocument } from '../firebase/database'
import { v4 as uuidv4 } from 'uuid'
import { uploadFile } from '../firebase/storage'

const createUsersOptions = (users, currentUser) => {
  const options = []
  for (const user of users) {
    if (user?.uid === currentUser?.uid) continue
    options.push({ value: user.uid, label: user.displayName })
  }
  return options
}

export const CreateDocumentModal = () => {
  const { user } = authStore((store) => store)
  const { users, documentTypes, addDocument: addDocumentToStore } = dataStore((store) => store)
  const [dateTime, setDateTime] = useState('')
  const [isPerformingAsync, setIsPerformingAsync] = useState(false)
  const [files, setFiles] = useState([])
  const {
    subject,
    description,
    selectedDocumentType,
    onInputChange,
    onResetForm
  } = useForm({
    subject: '',
    description: '',
    selectedDocumentType: documentTypes[0]?.id
  })
  const [options, setOptions] = useState([])
  const [selectedOptions, setSelectedOptions] = useState([])
  // cargar la fecha y la hora actual
  useEffect(() => {
    const date = new Date()
    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const day = ('0' + date.getDate()).slice(-2)
    const hours = ('0' + date.getHours()).slice(-2)
    const minutes = ('0' + date.getMinutes()).slice(-2)

    setDateTime(`${year}-${month}-${day}T${hours}:${minutes}`)
  }, [])
  useEffect(() => {
    if (users.length === 0) return
    setOptions(createUsersOptions(users, user))
  }, [users])
  const handleRemoveSelectedOption = (clickedOption) => {
    setSelectedOptions(
      selectedOptions.filter((option) => option?.value !== clickedOption?.value)
    )
    toast.success(`${clickedOption?.label} eliminado`)
  }
  const handleDelete = (fileToDelete) => {
    setFiles((prevFiles) =>
      prevFiles.filter((file) => file?.path !== fileToDelete?.path)
    )
    toast.success(`${fileToDelete?.name} eliminado`)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (subject?.trim()?.length === 0 || description?.trim()?.length === 0) {
      toast.error('Debe llenar todos los campos')
      return
    }
    if (selectedOptions.length === 0) {
      toast.error('Debe seleccionar por lo menos un destinatario')
      return
    }
    const id = uuidv4()
    setIsPerformingAsync(true)
    try {
      let fileUrls = []
      // Verifica si hay archivos para subir
      if (files.length > 0) {
        // Sube los archivos al Storage y obtén las URLs
        fileUrls = await Promise.all(files.map((file) => uploadFile(id, file)))
        toast.success('Los archivos se subieron con éxito')
      }

      const document = {
        id,
        state: DOCUMENT_STATES.solicitud,
        creationTimeAndDate: dateTime,
        sender: user,
        documentType: documentTypes.find(
          (dt) => dt?.id === selectedDocumentType
        ),
        recipients: selectedOptions.map((option) => ({
          ...option,
          uid: option?.value,
          displayName: option?.label
        })),
        subject,
        description,
        files:
          files.length > 0
            ? files.map((file, index) => ({ ...file, url: fileUrls[index] }))
            : []
      }

      // Sube el documento a Firestore
      const docResult = await addDocument(document)

      if (docResult.error) {
        toast.error('No se pudo agregar el documento')
        return
      }
      // resetear el formulario
      onResetForm()
      // quitar todos los destinatarios seleccionados
      setSelectedOptions([])
      // limpiar todos los archivos
      setFiles([])
      addDocumentToStore(document)
      toast.success('Documento creado con exito')
    } catch (error) {
      toast.error('Ocurrió un error al agregar el documento')
    } finally {
      setIsPerformingAsync(false)
    }
  }
  return (
    <ModalLayout
      title="Crear documento"
      isCloseButtonDisabled={isPerformingAsync}
    >
      <form
        className="grid gap-4 max-h-[600px] overflow-y-scroll"
        onSubmit={handleSubmit}
      >
        <Input
          label="Fecha de creación"
          type="datetime-local"
          id="creationTimeAndDate"
          value={dateTime}
          handleChange={() => {}}
          isDisabled={true}
        />
        <Input
          label="Remitente"
          type="text"
          id="sender"
          value={user.displayName}
          handleChange={() => {}}
          isDisabled={true}
        />
        <Select
          label="Tipo de documento"
          id="selectedDocumentType"
          value={selectedDocumentType}
          handleChange={onInputChange}
          options={documentTypes.map((dt) => ({ ...dt, value: dt?.id }))}
          isDisabled={isPerformingAsync}
        />
        <ItemsRow
          elements={selectedOptions}
          setSelectedElements={setSelectedOptions}
          handleRemoveSelectedElement={handleRemoveSelectedOption}
          isDisabled={isPerformingAsync}
        />
        <MultiSelect
          placeholder="Agrega destinatarios"
          options={options}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          isDisabled={isPerformingAsync}
        />
        <Input
          label="Asunto"
          type="text"
          id="subject"
          value={subject}
          handleChange={onInputChange}
          isRequired={true}
          isDisabled={isPerformingAsync}
        />
        <Textarea
          label="Descripción"
          id="description"
          value={description}
          handleChange={onInputChange}
          isRequired={true}
          isDisabled={isPerformingAsync}
        />
        <InputFile
          onDrop={(acceptedFiles) => setFiles(acceptedFiles)}
          isDisabled={isPerformingAsync}
        />
        {files?.length > 0 && (
          <section className="bg-eerie-black-800 p-4 rounded-xl">
            <div className="grid grid-cols-4 gap-2 mb-2">
              <p className="font-semibold">Nombre</p>
              <p className="font-semibold">Extensión</p>
              <p className="font-semibold">Tamaño</p>
              <p className="font-semibold">Acciones</p>
            </div>
            <div className="grid gap-2">
              {files !== null &&
                files?.map((file) => {
                  const sizeInMB = file?.size / 1048576
                  const sizeInKB = file?.size / 1024
                  const size =
                    sizeInMB < 1
                      ? `${sizeInKB.toFixed(2)} KB`
                      : `${sizeInMB.toFixed(2)} MB`
                  const nameSplitted = file?.name?.split('.')
                  return (
                    <FileRow
                      key={`${file?.path}-${file?.name}`}
                      file={file}
                      nameSplitted={nameSplitted}
                      size={size}
                      handleDelete={() => handleDelete(file)}
                      isDisabled={isPerformingAsync}
                    />
                  )
                })}
            </div>
          </section>
        )}
        <PrimaryButton
          text="Agregar documento"
          isDisabled={isPerformingAsync}
        />
      </form>
    </ModalLayout>
  )
}
