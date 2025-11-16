import './Item.css'
import { useState } from 'react'
export function Item({ session, title, description, mode, category, rating, onLike, onJoin, isReserved = false }) {
    const [liked, setLiked] = useState(false)

    function handleToggleLike() {
        setLiked(prev => {
            const next = !prev
            if (next) onLike?.()
            return next
        })
    }
    return (
        <>
            <div className="item-container">
                <div className="item-title">{title}</div>
                <div className="item-desc">{description}</div>
                <div className="item-meta">
                    <span className="pill">{mode === 'online' ? 'Online' : 'In-person'}</span>
                    <span className="pill">{category.replace('_', ' ')}</span>
                    <span className="pill">⭐ {rating}</span>
                    {isReserved && <span className="pill" style={{ background: '#d1fae5', color: '#065f46' }}>Reserved</span>}
                </div>
                <div className="item-actions">
                    <button
                        className="btn"
                        onClick={handleToggleLike}
                        aria-pressed={liked}
                        aria-label={liked ? 'Unlike' : 'Like'}
                        title={liked ? 'Unlike' : 'Like'}
                    >
                        <img
                            src={liked ? '/liked.png' : '/not_liked.png'}
                            alt={liked ? 'Liked' : 'Not liked'}
                            style={{ width: 20, height: 20, verticalAlign: 'middle' }}
                        />
                    </button>
                    <button className="btn btn-primary" onClick={() => onJoin?.(session)} disabled={isReserved}>
                        {isReserved ? 'Reserved' : 'Join'}
                    </button>
                </div>
            </div>
        </>
    );
}
