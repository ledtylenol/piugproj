import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

const KNOWN_USERS_KEY = 'ratio-kitchen-known-users'

function getKnownUsers() {
	try {
		return JSON.parse(localStorage.getItem(KNOWN_USERS_KEY) || '[]')
	} catch { return [] }
}

function addKnownUser(username) {
	const users = getKnownUsers()
	if (!users.includes(username)) {
		localStorage.setItem(KNOWN_USERS_KEY, JSON.stringify([...users, username]))
	}
}

export default function Login() {
	const { login } = useUser()
	const navigate = useNavigate()
	const [username, setUsername] = useState('')
	const [error, setError] = useState('')
	const knownUsers = getKnownUsers()

	const handleLogin = () => {
		const clean = username.trim().toLowerCase()
		if (!clean) { setError('Introdu un nume de utilizator.'); return }
		if (!/^[a-z0-9_-]+$/.test(clean)) {
			setError('Numele utilizatorului poate avea doar litere, cifre, - si _')
			return
		}
		addKnownUser(clean)
		login(clean)
		navigate('/')
	}

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') handleLogin()
	}

	const handleQuickLogin = (name) => {
		login(name)
		navigate('/')
	}

	return (
		<div className="login-page">
			<div className="login-card">
				<div className="login-brand">
					<span className="logo-the">Cartea</span>
					<span className="login-brand-main">Pe Parti</span>
				</div>

				<div className="login-divider" />

				<div className="login-body">
					<h1 className="login-heading">Bine ai revenit</h1>
					<p className="login-sub">
						Introdu numele de utilizator pentru a accesa cartea voastra personala.
					</p>

					<div className="login-field">
						<label className="login-label">Nume De Utilizator</label>
						<input
							className={`login-input ${error ? 'input-error' : ''}`}
							type="text"
							placeholder="ex. gigel, marcel…"
							value={username}
							autoFocus
							onChange={(e) => { setUsername(e.target.value); setError('') }}
							onKeyDown={handleKeyDown}
						/>
						{error && <p className="error-msg">{error}</p>}
						<p className="login-hint">
							Numai litere, numere, <code>-</code> si <code>_</code>.
						</p>
					</div>

					<button className="btn-login" onClick={handleLogin}>
						Deschide Cartea →
					</button>
				</div>

				{knownUsers.length > 0 && (
					<div className="login-returning">
						<p className="returning-label">Logheaza-te ca</p>
						<div className="returning-users">
							{knownUsers.map((u) => (
								<button key={u} className="returning-chip" onClick={() => handleQuickLogin(u)}>
									{u}
								</button>
							))}
						</div>
					</div>
				)}

				<div className="login-footer-note">
					Retetele sunt stocate local, dupa nume.
				</div>
			</div>
		</div>
	)
}
