import { Link } from 'react-router-dom'
import { ColTitle } from './ColTitle'
import { RowTitleLayout } from './RowTitleLayout'
import { Tag } from './Tag'
import PropTypes from 'prop-types'
import { DOCUMENT_STATES } from '../stores'

export const DocumentsTable = ({ documents = [] }) => {
  return (
    <section className="bg-raisin-black-800 p-5 rounded-2xl">
      <RowTitleLayout gridClassNameOverWrite="grid-cols-5 gap-3">
        <ColTitle text="Fecha y hora" />
        <ColTitle text="Tipo de documento" />
        <ColTitle text="Asunto" />
        <ColTitle text="Descripción" />
        <ColTitle text="Estado" />
      </RowTitleLayout>
      <section className="grid gap-3">
        {documents?.map((document) => {
          let backgroundColor = 'bg-yellow'
          if (document?.state === DOCUMENT_STATES.proceso)
            backgroundColor = 'bg-celtic-blue'
          if (document?.state === DOCUMENT_STATES.cerrado) backgroundColor = ''
          return (
            <Link
              to={`/documentos/${document?.id}`}
              key={document?.id}
              className="grid grid-cols-5 gap-3 py-[6px] cursor-pointer"
            >
              <p className="text-sm">{document?.creationTimeAndDate}</p>
              <p className="text-sm font-semibold">
                {document?.documentType?.label}
              </p>
              <p className="truncate text-sm">{document?.subject}</p>
              <p className="line-clamp-3 text-sm">{document?.description}</p>
              <Tag text={document?.state} className={backgroundColor} />
            </Link>
          )
        })}
      </section>
    </section>
  )
}

DocumentsTable.propTypes = {
  documents: PropTypes.array
}
