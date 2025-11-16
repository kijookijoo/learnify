import { useMemo, useState } from 'react'
import { Item } from '../components/Item'

export function Home({ sessions, credits, streak, onLike, onJoin, scheduled = [] }) {
    const [searchQuery, setSearchQuery] = useState('')
    const [modeFilter, setModeFilter] = useState('all') // all | online | in_person | hybrid
    const [topicFilter, setTopicFilter] = useState('all') // all | category

    const filteredSessions = useMemo(() => {
        const q = searchQuery.trim().toLowerCase()
        return sessions.filter(s => {
            const title = String(s.title || '').toLowerCase()
            const desc = String(s.description || '').toLowerCase()
            const category = String(s.category || '').toLowerCase()
            const matchesQuery = !q || title.includes(q) || desc.includes(q) || category.replace('_', ' ').includes(q)
            const matchesMode =
                modeFilter === 'all' ||
                modeFilter === 'hybrid' ||
                s.mode === modeFilter
            const matchesTopic =
                topicFilter === 'all' ||
                s.category === topicFilter
            return matchesQuery && matchesMode && matchesTopic
        })
    }, [sessions, searchQuery, modeFilter, topicFilter])

    return (
        <>
        <div className='topbar'>
            <div className='brand'>Mentee</div>
            <input
                className='search'
                placeholder='Search sessions...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
                aria-label="Filter by meeting type"
                className='topbar-select'
                value={modeFilter}
                onChange={(e) => setModeFilter(e.target.value)}
            >
                <option value="all">All types</option>
                <option value="online">Online</option>
                <option value="in_person">In-person</option>
                <option value="hybrid">Hybrid</option>
            </select>
            <select
                aria-label="Filter by topic"
                className='topbar-select'
                value={topicFilter}
                onChange={(e) => setTopicFilter(e.target.value)}
            >
                <option value="all">All topics</option>
                <option value="tech">Tech</option>
                <option value="creative">Creative</option>
                <option value="academics">Academics</option>
                <option value="finance">Finance</option>
                <option value="health_fitness">Health & fitness</option>
                <option value="community_hobbies">Community & hobbies</option>
            </select>
        </div>
        <div className='sessions-container'>
            {filteredSessions.map(s => {
                const isReserved = scheduled.some(x => x.id === s.id)
                return (
                    <Item
                        key={s.id}
                        session={s}
                        title={s.title}
                        description={s.description}
                        mode={s.mode}
                        category={s.category}
                        rating={s.rating}
                        onLike={onLike}
                        onJoin={() => { if (!isReserved) onJoin?.(s) }}
                        isReserved={isReserved}
                    />
                )
            })}
        </div>
        </>
    );
}


