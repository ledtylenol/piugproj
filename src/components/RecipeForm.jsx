import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const emptyIngredient = () => ({ id: Date.now().toString() + Math.random(), name: '', parts: 1 })

export default function RecipeForm({ initial, onSubmit, submitLabel = 'Salveaza Reteta' }) {
	const navigate = useNavigate()
	const [name, setName] = useState(initial?.name ?? '')
	const [description, setDescription] = useState(initial?.description ?? '')
	const [ingredients, setIngredients] = useState(
		initial?.ingredients?.length ? initial.ingredients : [emptyIngredient()]
	)
	const [instructions, setInstructions] = useState(initial?.instructions ?? '')
	const [errors, setErrors] = useState({})

	const validate = () => {
		const e = {}
		if (!name.trim()) e.name = 'Numele retetei este obligatoriu'
		if (ingredients.some(i => !i.name.trim())) e.ingredients = 'Toate ingredientele au nevoie de un nume'
		if (ingredients.some(i => Number(i.parts) <= 0 || isNaN(Number(i.parts)))) e.parts = 'Partile trebuie sa fie pozitive'
		return e
	}

	const handleSubmit = () => {
		const e = validate()
		if (Object.keys(e).length) { setErrors(e); return }
		const id = onSubmit({ name, description, ingredients, instructions })
		navigate(id ? `/recipe/${id}` : '/')
	}

	const updateIngredient = (id, field, value) => {
		setIngredients(prev => prev.map(i => i.id === id ? { ...i, [field]: value } : i))
	}

	const addIngredient = () => setIngredients(prev => [...prev, emptyIngredient()])

	const removeIngredient = (id) => {
		if (ingredients.length === 1) return
		setIngredients(prev => prev.filter(i => i.id !== id))
	}

	const moveIngredient = (index, dir) => {
		const next = [...ingredients]
		const target = index + dir
		if (target < 0 || target >= next.length) return
			;[next[index], next[target]] = [next[target], next[index]]
		setIngredients(next)
	}

	return (
		<div className="recipe-form">
			{/* Name */}
			<div className="form-group">
				<label className="form-label">Numele Retetei</label>
				<input
					className={`form-input ${errors.name ? 'input-error' : ''}`}
					placeholder="ex. Sarmale Cu Varza Acra"
					value={name}
					onChange={e => setName(e.target.value)}
				/>
				{errors.name && <p className="error-msg">{errors.name}</p>}
			</div>

			{/* Description */}
			<div className="form-group">
				<label className="form-label">O Descriere Scurta <span className="optional">(optional)</span></label>
				<input
					className="form-input"
					placeholder="ex. Numai bune de Craciun"
					value={description}
					onChange={e => setDescription(e.target.value)}
				/>
			</div>

			{/* Ingredients */}
			<div className="form-group">
				<div className="form-label-row">
					<label className="form-label">Ingrediente</label>
					<span className="form-hint">Partile sunt relative, 1:2:2 este echivalent cu 10:20:20</span>
				</div>

				{(errors.ingredients || errors.parts) && (
					<p className="error-msg">{errors.ingredients || errors.parts}</p>
				)}

				<div className="ingredients-form-list">
					<div className="ing-form-header">
						<span>Parti</span>
						<span>Ingredient</span>
					</div>
					{ingredients.map((ing, i) => (
						<div key={ing.id} className="ing-form-row">
							<input
								type="number"
								className="form-input parts-input"
								min="0.01"
								step="0.25"
								value={ing.parts}
								onChange={e => updateIngredient(ing.id, 'parts', e.target.value)}
							/>
							<input
								className="form-input"
								placeholder="ex. orez, carne, varza…"
								value={ing.name}
								onChange={e => updateIngredient(ing.id, 'name', e.target.value)}
							/>
							<div className="ing-form-controls">
								<button
									type="button"
									className="ctrl-btn"
									onClick={() => moveIngredient(i, -1)}
									disabled={i === 0}
									title="Move up"
								>↑</button>
								<button
									type="button"
									className="ctrl-btn"
									onClick={() => moveIngredient(i, 1)}
									disabled={i === ingredients.length - 1}
									title="Move down"
								>↓</button>
								<button
									type="button"
									className="ctrl-btn remove-btn"
									onClick={() => removeIngredient(ing.id)}
									disabled={ingredients.length === 1}
									title="Remove"
								>×</button>
							</div>
						</div>
					))}
				</div>
				<button type="button" className="btn-add-ingredient" onClick={addIngredient}>
					+ Adauga Ingredient
				</button>
			</div>

			{/* Instructions */}
			<div className="form-group">
				<label className="form-label">Instructiuni de Preparare <span className="optional">(optional)</span></label>
				<p className="form-hint">Paragrafe separate printr-o linie noua.</p>
				<textarea
					className="form-textarea"
					rows={10}
					placeholder="Descrieti pasii de preparare…"
					value={instructions}
					onChange={e => setInstructions(e.target.value)}
				/>
			</div>

			{/* Actions */}
			<div className="form-actions">
				<button type="button" className="btn-ghost" onClick={() => navigate(-1)}>
					Anuleaza
				</button>
				<button type="button" className="btn-primary" onClick={handleSubmit}>
					{submitLabel}
				</button>
			</div>
		</div>
	)
}
