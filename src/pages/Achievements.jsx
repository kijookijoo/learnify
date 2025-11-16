export function Achievements() {
    const badges = [
        { id: 1, name: 'First Skill Swap', desc: 'Taught your first session', color: '#06d6a0' },
        { id: 2, name: '5-Star Mentor', desc: 'Average rating 4.8+', color: '#ffd166' },
        { id: 3, name: 'Streak x7', desc: 'Learned 7 days in a row', color: '#ef476f' },
        { id: 4, name: 'Community Builder', desc: 'Hosted a group session', color: '#118ab2' },
    ];

    return (
        <>
        <div className='topbar'>
            <div className='brand'>Achievements</div>
        </div>
        <div className='badges-container'>
            {badges.map(b => (
                <div key={b.id} style={{
                    background: '#fff',
                    border: '1px solid #e5e5e5',
                    borderRadius: 12,
                    padding: 16,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12
                }}>
                    <div style={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        background: b.color
                    }} />
                    <div>
                        <div style={{ fontWeight: 700 }}>{b.name}</div>
                        <div style={{ color: '#555', fontSize: 14 }}>{b.desc}</div>
                    </div>
                </div>
            ))}
        </div>
        </>
    );
}


