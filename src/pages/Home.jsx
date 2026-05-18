import { Link } from 'react-router-dom'
import { useRecipes } from '../context/RecipeContext'

export default function Home() {
	const { recipes } = useRecipes()

	return (
		<div className="page-home">
			<div className="home-header">
				<div className="home-header-text">
					<p className="eyebrow">O colectie de</p>
					<h1 className="home-title"><em>Retete</em> <br />Proportionale</h1>
					<p className="home-subtitle">
						Ingrediente sub forma de parti; scalate dupa nevoie
					</p>
				</div>
				<div className="recipe-count-badge">
					<span className="count-number">{recipes.length}</span>
					<span className="count-label">retet{recipes.length !== 1 ? 'e' : 'a'}</span>
				</div>
			</div>

			{recipes.length === 0 ? (
				<div className="empty-state">
					<p>Nu avem retete. Inca.</p>
					<Link to="/new" className="btn-primary">Scrie-ti prima reteta →</Link>
				</div>
			) : (
				<div className="recipe-grid">
					{recipes.map((recipe, i) => (
						<Link to={`/recipe/${recipe.id}`} key={recipe.id} className="recipe-card" style={{ '--i': i }}>
							<div className="card-number">{String(i + 1).padStart(2, '0')}</div>
							<div className="card-body">
								<h2 className="card-title">{recipe.name}</h2>
								{recipe.description && (
									<p className="card-desc">{recipe.description}</p>
								)}
								<div className="card-ingredients">
									{recipe.ingredients.slice(0, 4).map((ing) => (
										<span key={ing.id} className="ing-pill">
											{ing.parts}pt {ing.name}
										</span>
									))}
									{recipe.ingredients.length > 4 && (
										<span className="ing-pill ing-more">+{recipe.ingredients.length - 4} mai multe</span>
									)}
								</div>
							</div>
							<div className="card-arrow">→</div>
						</Link>
					))}
				</div>
			)}
		</div>
	)
}
