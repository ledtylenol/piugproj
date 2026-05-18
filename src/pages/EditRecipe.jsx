import { useParams, Link } from 'react-router-dom'
import { useRecipes } from '../context/RecipeContext'
import RecipeForm from '../components/RecipeForm'

export default function EditRecipe() {
	const { id } = useParams()
	const { getRecipe, updateRecipe } = useRecipes()
	const recipe = getRecipe(id)

	if (!recipe) {
		return (
			<div className="not-found">
				<p>Reteta nu a fost gasita :(.</p>
				<Link to="/">← Inapoi</Link>
			</div>
		)
	}

	const handleUpdate = (data) => {
		updateRecipe(id, data)
		return null // navigate back to the recipe
	}

	return (
		<div className="page-form">
			<div className="page-form-header">
				<p className="eyebrow">Editare</p>
				<h1>{recipe.name}</h1>
			</div>
			<RecipeForm
				initial={recipe}
				onSubmit={(data) => { handleUpdate(data); return id }}
				submitLabel="Salveaza Schimbarile"
			/>
		</div>
	)
}
