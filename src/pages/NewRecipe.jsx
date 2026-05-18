import { useRecipes } from '../context/RecipeContext'
import RecipeForm from '../components/RecipeForm'

export default function NewRecipe() {
	const { addRecipe } = useRecipes()

	return (
		<div className="page-form">
			<div className="page-form-header">
				<p className="eyebrow">Reteta Noua</p>
				<h1>Scrie o Reteta</h1>
				<p className="page-form-subtitle">
					Defineste ingredientele pe parti; proportiile conteaza, nu cantitatile.
				</p>
			</div>
			<RecipeForm onSubmit={addRecipe} submitLabel="Salveaza" />
		</div>
	)
}
