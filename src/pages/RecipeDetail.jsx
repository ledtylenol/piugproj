import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useRecipes } from '../context/RecipeContext'

export default function RecipeDetail() {
	const { id } = useParams()
	const navigate = useNavigate()
	const { getRecipe, deleteRecipe } = useRecipes()
	const recipe = getRecipe(id)
	const [multiplier, setMultiplier] = useState(1)
	const [confirmDelete, setConfirmDelete] = useState(false)

	if (!recipe) {
		return (
			<div className="not-found">
				<p>Reteta nu a fost gasita :(.</p>
				<Link to="/">← Inapoi</Link>
			</div>
		)
	}

	const totalParts = recipe.ingredients.reduce((sum, i) => sum + Number(i.parts), 0)

	const handleDelete = () => {
		if (confirmDelete) {
			deleteRecipe(id)
			navigate('/')
		} else {
			setConfirmDelete(true)
		}
	}

	return (
		<div className="page-detail">
			<div className="detail-back">
				<Link to="/" className="back-link">← Index</Link>
			</div>

			<div className="detail-header">
				<div>
					<h1 className="detail-title">{recipe.name}</h1>
					{recipe.description && <p className="detail-desc">{recipe.description}</p>}
				</div>
				<div className="detail-actions">
					<Link to={`/edit/${id}`} className="btn-secondary">Edit</Link>
					<button
						className={`btn-danger ${confirmDelete ? 'confirming' : ''}`}
						onClick={handleDelete}
					>
						{confirmDelete ? 'Sunteti siguri?' : 'Sterge'}
					</button>
				</div>
			</div>

			<div className="detail-body">
				{/* Ingredients section */}
				<section className="section-ingredients">
					<div className="section-heading">
						<h2>Ingrediente</h2>
						<div className="multiplier-control">
							<label>Scale ×</label>
							<button onClick={() => setMultiplier(m => Math.max(0.25, m - 0.25))}>−</button>
							<span className="multiplier-value">{multiplier}</span>
							<button onClick={() => setMultiplier(m => m + 0.25)}>+</button>
						</div>
					</div>

					<div className="ingredients-list">
						{recipe.ingredients.map((ing) => {
							const pct = Math.round((ing.parts / totalParts) * 100)
							return (
								<div key={ing.id} className="ingredient-row">
									<div className="ing-info">
										<span className="ing-name">{ing.name}</span>
										<span className="ing-parts">
											{ing.parts * multiplier} part{ing.parts * multiplier !== 1 ? 'i' : 'e'}
										</span>
									</div>
									<div className="ing-bar-track">
										<div className="ing-bar-fill" style={{ width: `${pct}%` }} />
									</div>
									<span className="ing-pct">{pct}%</span>
								</div>
							)
						})}
					</div>

					<div className="ratio-summary">
						<p className="ratio-label">Parte</p>
						<p className="ratio-string">
							{recipe.ingredients.map((ing, i) => (
								<span key={ing.id}>
									{i > 0 && <span className="ratio-sep"> : </span>}
									<strong>{ing.parts}</strong>
									<span className="ratio-name"> {ing.name}</span>
								</span>
							))}
						</p>
					</div>
				</section>

				{/* Instructions section */}
				{recipe.instructions && (
					<section className="section-instructions">
						<h2>Preparare</h2>
						<div className="instructions-body">
							{recipe.instructions.split('\n\n').map((para, i) => (
								<p key={i}>{para}</p>
							))}
						</div>
					</section>
				)}
			</div>
		</div>
	)
}
