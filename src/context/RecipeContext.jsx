import { createContext, useContext, useState, useEffect } from 'react'
import { useUser } from './UserContext'

const RecipeContext = createContext(null)


function storageKey(username) {
	return `ratio-kitchen-recipes-${username}`
}

function loadRecipes(username) {
	if (!username) return []
	try {
		const raw = localStorage.getItem(storageKey(username))
		if (raw) return JSON.parse(raw)
		localStorage.setItem(storageKey(username), JSON.stringify(SAMPLE_RECIPES))
		return []
	} catch {
		return []
	}
}

function saveRecipes(username, recipes) {
	if (!username) return
	localStorage.setItem(storageKey(username), JSON.stringify(recipes))
}

export function RecipeProvider({ children }) {
	const { currentUser } = useUser()
	const [recipes, setRecipes] = useState(() => loadRecipes(currentUser))

	useEffect(() => {
		setRecipes(loadRecipes(currentUser))
	}, [currentUser])

	useEffect(() => {
		if (currentUser) saveRecipes(currentUser, recipes)
	}, [recipes, currentUser])

	const addRecipe = (recipe) => {
		const newRecipe = { ...recipe, id: Date.now().toString(), createdAt: Date.now() }
		setRecipes((prev) => [newRecipe, ...prev])
		return newRecipe.id
	}

	const updateRecipe = (id, updates) => {
		setRecipes((prev) => prev.map((r) => (r.id === id ? { ...r, ...updates } : r)))
	}

	const deleteRecipe = (id) => {
		setRecipes((prev) => prev.filter((r) => r.id !== id))
	}

	const getRecipe = (id) => recipes.find((r) => r.id === id)

	return (
		<RecipeContext.Provider value={{ recipes, addRecipe, updateRecipe, deleteRecipe, getRecipe }}>
			{children}
		</RecipeContext.Provider>
	)
}

export function useRecipes() {
	return useContext(RecipeContext)
}
