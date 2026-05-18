import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { UserProvider } from './context/UserContext'
import { RecipeProvider } from './context/RecipeContext'
import './index.css'
import { ThemeProvider } from './context/ThemeContext'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<ThemeProvider>
				<UserProvider>
					<RecipeProvider>
						<App />
					</RecipeProvider>
				</UserProvider>
			</ThemeProvider>
		</BrowserRouter>
	</React.StrictMode>
)
