import './NavigationBar.css'
import { Link } from 'react-router-dom'

export function NavigationBar({ unreadAchievements = 0 }) {
    return (
        <>
        <div className="navigation-container">
            <div className="navigation-brand">
                <img src="/mentee.png" alt="App icon" className="navigation-icon" />
            </div>
            <Link className="navigation-item" to="/">Browse</Link>
            <Link className="navigation-item" to="/host">Host</Link>
            <Link className="navigation-item" to="/schedule">My Schedule</Link>
            <span className="navigation-item-wrapper">
                <Link className="navigation-item" to="/achievements">Achievements</Link>
                {unreadAchievements > 0 && <span className="nav-dot" />}
            </span>
        </div>
        </>
    );
}
