import { useMemo, useState } from 'react'
import { Item } from '../components/Item'

export function Home({ sessions, credits, streak, onLike }) {
    const [searchQuery, setSearchQuery] = useState('')

    const filteredSessions = useMemo(() => {
        const q = searchQuery.trim().toLowerCase()
        if (!q) return sessions
        return sessions.filter(s => {
            const title = String(s.title || '').toLowerCase()
            const desc = String(s.description || '').toLowerCase()
            const category = String(s.category || '').toLowerCase()
            return (
                title.includes(q) ||
                desc.includes(q) ||
                category.replace('_', ' ').includes(q)
            )
        })
    }, [sessions, searchQuery])

    return (
        <>
        <div className='topbar'>
            <div className='brand'>Skilllift</div>
            <input
                className='search'
                placeholder='Search sessions...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
        <div className='sessions-container'>
            {filteredSessions.map(s => (
                <Item
                    key={s.id}
                    title={s.title}
                    description={s.description}
                    mode={s.mode}
                    category={s.category}
                    rating={s.rating}
                    onLike={onLike}
                />
            ))}
        </div>
        </>
    );
}


