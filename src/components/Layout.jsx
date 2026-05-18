import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

import { useTheme } from '../context/ThemeContext'
export default function Layout() {
	const location = useLocation()
	const navigate = useNavigate()
	const { currentUser, logout } = useUser()

	// inside Layout:
	const { theme, toggle } = useTheme()

	// in the nav, next to the user section:
	const handleLogout = () => {
		logout()
		navigate('/login')
	}

	return (
		<div className="app">
			<header className="site-header">
				<div className="header-inner">
					<Link to="/" className="logo">
						<span className="logo-the">Cartea</span>
						<span className="logo-main">Pe Parti</span>
					</Link>
					<nav className="nav">
						<Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
							Index
						</Link>
						<Link to="/help" className={`nav-link ${location.pathname === '/help' ? 'active' : ''}`}>
							Cum Functioneaza
						</Link>
						<div className="nav-user">
							<span className="nav-username">{currentUser}</span>
							<button className="nav-logout" onClick={handleLogout}>Iesi din cont</button>
						</div>

						<button className="theme-toggle" onClick={toggle} title="Toggle theme">
							Schimba tema ◑
						</button>
						<Link to="/new" className="nav-cta">
							+ Reteta Noua
						</Link>

					</nav>
				</div>
				<div className="header-rule" />
			</header>
			<main className="main-content">
				<Outlet />
			</main>
			<footer className="site-footer">
				<p>Piug 2026</p>
			</footer>
		</div>
	)
}
