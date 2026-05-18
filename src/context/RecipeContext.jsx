import { createContext, useContext, useState, useEffect } from 'react'
import { useUser } from './UserContext'

const RecipeContext = createContext(null)

const SAMPLE_RECIPES = [
  {
    id: '1',
    name: 'Classic Crêpes',
    description: 'Thin French pancakes using the 1:2:2 ratio',
    ingredients: [
      { id: 'a', name: 'eggs', parts: 1 },
      { id: 'b', name: 'milk', parts: 2 },
      { id: 'c', name: 'flour', parts: 2 },
      { id: 'd', name: 'butter (melted)', parts: 0.5 },
    ],
    instructions: `Whisk eggs until light. Add milk gradually, then sift in flour and whisk until smooth. Stir in melted butter. Rest the batter for at least 30 minutes — this is non-negotiable.\n\nHeat a crêpe pan or non-stick skillet over medium-high heat. Lightly butter the surface. Pour a small ladle of batter and tilt the pan to spread it thin. Cook for 60–90 seconds until the edges lift, then flip for 30 seconds.\n\nStack finished crêpes on a plate. They keep well wrapped for 2 days, or freeze with parchment between each.`,
    createdAt: Date.now() - 86400000,
  },
  {
    id: '2',
    name: 'Bread Dough',
    description: "The foundational baker's ratio for lean bread",
    ingredients: [
      { id: 'a', name: 'flour', parts: 5 },
      { id: 'b', name: 'water', parts: 3 },
      { id: 'c', name: 'salt', parts: 0.1 },
      { id: 'd', name: 'yeast', parts: 0.05 },
    ],
    instructions: `Combine flour and salt in a large bowl. Dissolve yeast in warm water (not hot — heat kills yeast). Pour the water-yeast mixture into the flour and mix until shaggy.\n\nTurn out onto a surface and knead for 8–10 minutes until smooth and elastic. The dough should pass the windowpane test: stretch a small piece thin enough to see light through without tearing.\n\nShape into a ball, place in a lightly oiled bowl, cover, and let rise until doubled — roughly 1–2 hours depending on room temperature. Shape, proof again for 45 minutes, then bake at 230°C (450°F) with steam for the first 15 minutes.`,
    createdAt: Date.now() - 172800000,
  },
]

function storageKey(username) {
  return `ratio-kitchen-recipes-${username}`
}

function loadRecipes(username) {
  if (!username) return []
  try {
    const raw = localStorage.getItem(storageKey(username))
    if (raw) return JSON.parse(raw)
    localStorage.setItem(storageKey(username), JSON.stringify(SAMPLE_RECIPES))
    return SAMPLE_RECIPES
  } catch {
    return SAMPLE_RECIPES
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
