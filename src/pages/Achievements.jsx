export function Achievements({ joinedCount = 0, hostedCount = 0 }) {
    const thresholds = [1, 3, 5, 10]
    const milestones = [
        ...thresholds.map(t => ({ id: `join-${t}`, label: `Join ${t} session${t > 1 ? 's' : ''}`, current: joinedCount, target: t })),
        ...thresholds.map(t => ({ id: `host-${t}`, label: `Host ${t} session${t > 1 ? 's' : ''}`, current: hostedCount, target: t })),
    ];

    return (
        <>
        <div className='topbar'>
            <div className='brand'>Achievements</div>
        </div>
        <div style={{ padding: 16 }}>
            <div style={{ fontWeight: 700, marginBottom: 12 }}>Progress</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                {milestones.map(m => {
                    const pct = Math.min(100, Math.round((m.current / m.target) * 100))
                    const complete = m.current >= m.target
                    return (
                        <div key={m.id} style={{
                            background: complete ? '#ecfdf5' : '#fff',
                            border: `1px solid ${complete ? '#10b981' : '#e5e5e5'}`,
                            borderRadius: 12,
                            padding: 14
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                <div style={{ fontWeight: 600 }}>{m.label}</div>
                                <div style={{ color: complete ? '#059669' : '#6b7280' }}>
                                    {Math.min(m.current, m.target)} / {m.target}
                                </div>
                            </div>
                            <div style={{
                                width: '100%',
                                height: 10,
                                background: complete ? '#d1fae5' : '#f3f4f6',
                                borderRadius: 999,
                                overflow: 'hidden',
                                border: `1px solid ${complete ? '#10b981' : '#e5e7eb'}`
                            }}>
                                <div style={{
                                    width: `${pct}%`,
                                    height: '100%',
                                    background: complete ? '#10b981' : '#7c3aed',
                                    transition: 'width .2s ease'
                                }} />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
        </>
    );
}


