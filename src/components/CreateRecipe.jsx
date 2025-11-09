import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createRecipe } from '../api/recipes.js'
import { useAuth } from '../contexts/AuthContext.jsx'
export function CreateRecipe() {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [ingredients, setIngredients] = useState()
  const [token] = useAuth()
  const queryClient = useQueryClient()

  const createRecipeMutation = useMutation({
    mutationFn: () => createRecipe(token, { title, ingredients, image }),
    onSuccess: () => queryClient.invalidateQueries(['recipes']),
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    createRecipeMutation.mutate()
  }
  if (!token) return <div>Please log in to create new recipes</div>
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='create-title'>Title: </label>
        <input
          type='text'
          name='create-title'
          id='create-title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <br />
      <br />
      <div>
        <label htmlFor='create-ingredients' style={{ display: 'block' }}>
          Ingredients:{' '}
        </label>
        <textarea
          style={{ col: '40' }}
          name='create-ingredients'
          id='create-ingredients'
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor='create-image'>Image: </label>
        <input
          type='text'
          name='create-image'
          id='createimage'
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <br />

      <input
        type='submit'
        value={createRecipeMutation.isPending ? 'Creating...' : 'Create'}
        disabled={!title || createRecipeMutation.isPending}
      />

      {createRecipeMutation.isSuccess ? (
        <>
          <br /> Recipe created successfully!
        </>
      ) : null}
    </form>
  )
}
