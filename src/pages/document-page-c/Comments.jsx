import PropTypes from 'prop-types'
import { SecondaryDescription } from '../../components'
import { useEffect, useState } from 'react';

export const Comments = ({ comments = [] }) => {
    const [sortedComments, setSortedComments] = useState([]);

  useEffect(() => {
    // Ordena los comentarios de más antiguo a más reciente cada vez que 'comments' cambia
    const sorted = [...comments].sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
    setSortedComments(sorted);
  }, [comments]);
  return (
    <section className='grid gap-3 mb-28'>
      {sortedComments?.map((comment) => (
        <div className='bg-raisin-black-800 p-5 rounded-2xl' key={comment?.id}>
          <div className="flex items-baseline gap-3">
            <p className="text-sm text-neutral-300">
              <strong>({comment?.sender?.role})</strong>{' '}
              {comment?.sender?.displayName}
            </p>
            <SecondaryDescription
              text={`${comment?.dateTime?.split('T')[0]} ${
                comment?.dateTime?.split('T')[1]
              }`}
            />
          </div>
          <p className='font-semibold text-lg'>{comment?.title}</p>
          <p className='text-sm'>{comment?.description}</p>
        </div>
      ))}
    </section>
  )
}

Comments.propTypes = {
  comments: PropTypes.array
}
