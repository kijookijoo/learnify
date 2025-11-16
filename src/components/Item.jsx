import './Item.css'
export function Item({ title, description, mode, category, rating, onLike }) {
    return (
        <>
            <div className="item-container">
                <div className="item-title">{title}</div>
                <div className="item-desc">{description}</div>
                <div className="item-meta">
                    <span className="pill">{mode === 'online' ? 'Online' : 'In-person'}</span>
                    <span className="pill">{category.replace('_', ' ')}</span>
                    <span className="pill">⭐ {rating}</span>
                </div>
                <div className="item-actions">
                    <button className="btn" onClick={() => onLike?.()}> Like 👍</button>
                    <button className="btn btn-primary">Join</button>
                </div>
            </div>
        </>
    );
}
