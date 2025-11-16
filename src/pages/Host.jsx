import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function Host({ onCreate }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [mode, setMode] = useState('online') // online | in_person | hybrid
    const [category, setCategory] = useState('tech')
    const [dateText, setDateText] = useState('') // MM DD YYYY
    const [timeText, setTimeText] = useState('') // HH:MM (24h) or HH:MM AM/PM
    const [error, setError] = useState('')
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        setError('')
        if (!title.trim() || !description.trim() || !dateText.trim() || !timeText.trim()) {
            setError('Please fill in title, description, date, and time.')
            return
        }
        // Parse dateText: accepts "MM DD YYYY" or "MM YYYY DD"
        const trimmed = dateText.trim()
        let mm = 0, dd = 0, yyyy = 0
        const m1 = trimmed.match(/^(\d{1,2})[\/\-\s](\d{1,2})[\/\-\s](\d{4})$/) // MM DD YYYY
        const m2 = trimmed.match(/^(\d{1,2})[\/\-\s](\d{4})[\/\-\s](\d{1,2})$/) // MM YYYY DD
        if (m1) {
            mm = parseInt(m1[1], 10)
            dd = parseInt(m1[2], 10)
            yyyy = parseInt(m1[3], 10)
        } else if (m2) {
            mm = parseInt(m2[1], 10)
            yyyy = parseInt(m2[2], 10)
            dd = parseInt(m2[3], 10)
        } else {
            setError('Date must be in MM DD YYYY or MM YYYY DD format.')
            return
        }
        if (mm < 1 || mm > 12 || dd < 1 || dd > 31) {
            setError('Invalid date.')
            return
        }
        // Parse timeText: HH:MM or HH:MM AM/PM
        let hours = 0, minutes = 0
        const time = timeText.trim()
        const ampmMatch = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
        const twentyFourMatch = time.match(/^(\d{1,2}):(\d{2})$/)
        if (ampmMatch) {
            hours = parseInt(ampmMatch[1], 10)
            minutes = parseInt(ampmMatch[2], 10)
            const ampm = ampmMatch[3].toUpperCase()
            if (hours < 1 || hours > 12 || minutes < 0 || minutes > 59) {
                setError('Invalid time.')
                return
            }
            if (ampm === 'PM' && hours !== 12) hours += 12
            if (ampm === 'AM' && hours === 12) hours = 0
        } else if (twentyFourMatch) {
            hours = parseInt(twentyFourMatch[1], 10)
            minutes = parseInt(twentyFourMatch[2], 10)
            if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
                setError('Invalid time.')
                return
            }
        } else {
            setError('Time must be HH:MM or HH:MM AM/PM.')
            return
        }
        const local = new Date(yyyy, mm - 1, dd, hours, minutes, 0)
        const iso = local.toISOString()
        onCreate?.({
            title: title.trim(),
            description: description.trim(),
            mode,
            category,
            schedule: iso,
        })
        navigate('/')
        setTitle('')
        setDescription('')
        setMode('online')
        setCategory('tech')
        setDateText('')
        setTimeText('')
    }

    return (
        <>
        <div className='topbar'>
            <div className='brand'>Host a Session</div>
        </div>
        <div style={{ padding: 16 }}>
            <form onSubmit={handleSubmit} style={{
                background: '#fff',
                border: '1px solid #e5e5e5',
                borderRadius: 12,
                padding: 16,
                maxWidth: 840,
                marginLeft: 0,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 12
            }}>
                {error && <div style={{ color: '#b91c1c' }}>{error}</div>}
                <label>
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>Title</div>
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="search"
                        placeholder="Title"
                        style={{ width: '100%', boxSizing: 'border-box' }}
                    />
                </label>
                <label>
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>Description</div>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Description ... "
                        style={{
                            width: '95%',
                            minHeight: 90,
                            padding: 12,
                            border: '1px solid #d6d6d6',
                            borderRadius: 10,
                            fontSize: 14
                        }}
                    />
                </label>
                <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
                    <label style={{ width: '100%' }}>
                        <div style={{ fontWeight: 600, marginBottom: 4 }}>Meeting Type</div>
                        <select className="topbar-select" value={mode} onChange={e => setMode(e.target.value)}>
                            <option value="online">Online</option>
                            <option value="in_person">In-person</option>
                            <option value="hybrid">Hybrid</option>
                        </select>
                    </label>
                    <label style={{ width: '100%' }}>
                        <div style={{ fontWeight: 600, marginBottom: 4 }}>Topic</div>
                        <select className="topbar-select" value={category} onChange={e => setCategory(e.target.value)}>
                            <option value="tech">Tech</option>
                            <option value="creative">Creative</option>
                            <option value="academics">Academics</option>
                            <option value="finance">Finance</option>
                            <option value="health_fitness">Health & fitness</option>
                            <option value="community_hobbies">Community & hobbies</option>
                        </select>
                    </label>
                    <label style={{ width: '100%', maxWidth: 300 }}>
                        <div style={{ fontWeight: 600, marginBottom: 4 }}>Date (MM DD YYYY)</div>
                        <input
                            type="text"
                            className="topbar-select"
                            placeholder="MM YYYY DD"
                            value={dateText}
                            onChange={e => setDateText(e.target.value)}
                            style={{ width: '90%' }}
                        />
                    </label>
                    <label style={{ width: '100%' }}>
                        <div style={{ fontWeight: 600, marginBottom: 4 }}>Time</div>
                        <input
                            type="text"
                            className="topbar-select"
                            placeholder="ex. 12:00PM"
                            value={timeText}
                            onChange={e => setTimeText(e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </label>
                </div>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                    <button type="submit" className="btn btn-primary">Create Session</button>
                </div>
            </form>
        </div>
        </>
    )
}


