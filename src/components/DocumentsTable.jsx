import { ColTitle } from './ColTitle'
import { RowTitleLayout } from './RowTitleLayout'
import { Tag } from './Tag'
import PropTypes from 'prop-types'

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
        {documents?.map((document) => (
          <div
            key={document?.id}
            className="grid grid-cols-5 gap-3 py-[6px] cursor-pointer"
          >
            <p className="text-sm">{document?.creationTimeAndDate}</p>
            <p className="text-sm font-semibold">
              {document?.documentType?.label}
            </p>
            <p className="truncate text-sm">{document?.subject}</p>
            <p className="line-clamp-3 text-sm">{document?.description}</p>
            <Tag text={document?.state} />
          </div>
        ))}
      </section>
    </section>
  )
}

DocumentsTable.propTypes = {
  documents: PropTypes.array
}
