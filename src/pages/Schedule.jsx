export function Schedule({ scheduled = [] }) {
    return (
        <>
        <div className='topbar'>
            <div className='brand'>My Schedule</div>
        </div>
        <div className='sessions-container'>
            {scheduled.length === 0 && (
                <div style={{
                    gridColumn: '1 / -1',
                    color: '#666',
                    padding: 24
                }}>
                    No sessions scheduled yet. Join a session to add it here.
                </div>
            )}
            {scheduled.map(s => (
                <div key={s.id} className="note-card" style={{
                    padding: 12,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8
                }}>
                    <div style={{ fontWeight: 700 }}>{s.title}</div>
                    <div style={{ color: '#444' }}>{s.description}</div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <span className="pill">{s.mode === 'online' ? 'Online' : 'In-person'}</span>
                        <span className="pill">{s.category.replace('_', ' ')}</span>
                    </div>
                    <div style={{ color: '#6b7280', fontSize: 14 }}>
                        {new Date(s.schedule).toLocaleString()}
                    </div>
                </div>
            ))}
        </div>
        </>
    );
}


