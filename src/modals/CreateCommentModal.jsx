import { useParams } from 'react-router-dom'
import { Input, PrimaryButton, Textarea } from '../components'
import { useForm } from '../hooks'
import { ModalLayout } from './ModalLayout'
import toast from 'react-hot-toast'
import { authStore, dataStore } from '../stores'
import { useEffect, useState } from 'react'
import { addComment } from '../firebase/database'

export const CreateCommentModal = () => {
  let { documentId } = useParams()
  const { user } = authStore((store) => store)
  const { setModalToShow, addDocumentComment } = dataStore((store) => store)
  const [dateTime, setDateTime] = useState('')
  const [isAddingComment, setIsAddingComment] = useState(false)
  const { title, description, onInputChange, onResetForm } = useForm({
    title: '',
    description: ''
  })
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
  const handleSubmit = (e) => {
    e.preventDefault()
    if (title?.trim()?.length === 0 || description?.trim()?.length === 0) {
      toast.error('Porfavor llena todos los campos')
      return
    }
    const comment = {
      dateTime,
      sender: user,
      title,
      description
    }
    setIsAddingComment(true)
    addComment(documentId, comment)
      .then((res) => {
        if (res?.error !== null) {
          toast.error('No se pudo agregar el comentario')
          return
        }
        toast.success('El comentario fue agregado con exito')
        addDocumentComment({ ...comment, id: res?.id })
        onResetForm()
        setModalToShow(null)
      })
      .catch(() => {
        toast.error('No se pudo agregar el comentario')
      })
      .finally(() => setIsAddingComment(false))
  }
  return (
    <ModalLayout title="Agregar comentario">
      <form className="grid gap-4" onSubmit={handleSubmit}>
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
        <Input
          label="Titulo comentario"
          value={title}
          id="title"
          handleChange={onInputChange}
          isRequired={true}
          isDisabled={isAddingComment}
        />
        <Textarea
          label="Descripción comentario"
          value={description}
          id="description"
          handleChange={onInputChange}
          isRequired={true}
          isDisabled={isAddingComment}
        />
        <PrimaryButton text="Agregar comentario" isDisabled={isAddingComment} />
      </form>
    </ModalLayout>
  )
}
