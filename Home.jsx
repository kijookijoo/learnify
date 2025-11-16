import { Item } from '../components/Item'

export function Home({ sessions, credits, streak, onLike }) {
    return (
        <>
        <div className='topbar'>
            <div className='brand'>Mentee</div>
            <input className='search' placeholder='Search sessions...' />
            <div className='filters'>
                <span>Credits: {credits}</span>
                <span style={{ marginLeft: 12 }}>Streak: {streak}🔥</span>
            </div>
        </div>
        <div className='sessions-container'>
            {sessions.map(s => (
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


