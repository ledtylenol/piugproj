import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
	const [theme, setTheme] = useState(
		() => localStorage.getItem('ratio-kitchen-theme') || 'dark'
	)

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme)
		localStorage.setItem('ratio-kitchen-theme', theme)
	}, [theme])

	const toggle = () => setTheme(t => t === 'light' ? 'dark' : 'light')

	return (
		<ThemeContext.Provider value={{ theme, toggle }}>
			{children}
		</ThemeContext.Provider>
	)
}

export function useTheme() { return useContext(ThemeContext) }
