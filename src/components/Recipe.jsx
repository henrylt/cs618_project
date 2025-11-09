import PropTypes from 'prop-types'
import { User } from './User.jsx'
export function Recipe({ title, ingredients, author, image }) {
  return (
    <article>
      <h3>{title}</h3>
      <div>Ingredients: {ingredients}</div>
      <br />
      <div>
        <img style={{ width: '50%' }} src={image} alt={`${title}`} />
      </div>
      <br />
      {author && (
        <em>
          <br /> By <User id={author} />
        </em>
      )}
    </article>
  )
}
Recipe.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.string,
  image: PropTypes.string,
  author: PropTypes.string,
}
