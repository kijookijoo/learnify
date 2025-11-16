import './NavigationBar.css'
import { Link } from 'react-router-dom'

export function NavigationBar() {
    return (
        <>
        <div className="navigation-container">
            <Link className="navigation-item" to="/">Browse</Link>
            <Link className="navigation-item" to="/learn">Learn</Link>
            <Link className="navigation-item" to="/achievements">Achievements</Link>
        </div>
        </>
    );
}
