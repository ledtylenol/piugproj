import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext(null)

export const THEMES = [
	{ id: 'light', label: 'Light' },
	{ id: 'dark', label: 'Dark' },
	{ id: 'dark-blue', label: 'Dark Blue' },
]

export function ThemeProvider({ children }) {
	const [theme, setTheme] = useState(
		() => localStorage.getItem('ratio-kitchen-theme') || 'light'
	)

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme)
		localStorage.setItem('ratio-kitchen-theme', theme)
	}, [theme])

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export function useTheme() { return useContext(ThemeContext) }
