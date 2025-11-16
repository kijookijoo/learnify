import './App.css'
import { NavigationBar } from './components/NavigationBar'
import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Home } from './pages/Home'
import { Achievements } from './pages/Achievements'
import { Schedule } from './pages/Schedule'
import { Host } from './pages/Host'

function App() {
    const [credits, setCredits] = useState(0)
    const [streak, setStreak] = useState(1)

    const [scheduledSessions, setScheduledSessions] = useState([])
    const [sessions, setSessions] = useState([
        { id: 1, title: 'Intro to Excel', description: 'Learn formulas and charts.', mode: 'online', category: 'tech', rating: 4.8, schedule: '2025-11-20T18:00:00Z' },
        { id: 2, title: 'Beginner Mandarin', description: 'Speak basic phrases.', mode: 'in_person', category: 'academics', rating: 4.6, schedule: '2025-11-22T16:00:00Z' },
        { id: 3, title: 'Poster Design', description: 'Layout and typography basics.', mode: 'online', category: 'creative', rating: 4.7, schedule: '2025-11-23T17:30:00Z' },
        { id: 4, title: 'Public Speaking 101', description: 'Confidence and structure.', mode: 'in_person', category: 'community_hobbies', rating: 4.5, schedule: '2025-11-24T15:00:00Z' },
        { id: 5, title: 'Budgeting Basics', description: 'Personal finance tools.', mode: 'online', category: 'finance', rating: 4.4, schedule: '2025-11-25T19:00:00Z' },
        { id: 6, title: 'Yoga for Focus', description: '15-min flow.', mode: 'in_person', category: 'health_fitness', rating: 4.9, schedule: '2025-11-26T12:00:00Z' },
    ])

    const [toastMessage, setToastMessage] = useState('')
    const [showToast, setShowToast] = useState(false)
    const [hostedCount, setHostedCount] = useState(0)
    const [achievedCount, setAchievedCount] = useState(0)
    const [unreadAchievements, setUnreadAchievements] = useState(0)
    const location = useLocation()

    function handleThumbsUp() {
        setCredits(prev => prev + 1)
    }

    function handleJoin(session) {
        setScheduledSessions(prev => {
            const exists = prev.some(s => s.id === session.id)
            if (exists) return prev
            return [...prev, session].sort((a, b) => new Date(a.schedule) - new Date(b.schedule))
        })
        const when = new Date(session.schedule).toLocaleString()
        setToastMessage(`Scheduled: ${session.title} — ${when}`)
        setShowToast(true)
        window.clearTimeout((window).__toastTimerId)
        ;(window).__toastTimerId = window.setTimeout(() => {
            setShowToast(false)
        }, 2200)
    }

    function handleCreateSession(newSession) {
        setSessions(prev => {
            const nextId = prev.length ? Math.max(...prev.map(s => s.id)) + 1 : 1
            const session = { id: nextId, rating: 5.0, ...newSession }
            return [session, ...prev]
        })
        setHostedCount(prev => prev + 1)
        const when = new Date(newSession.schedule).toLocaleString()
        setToastMessage(`Hosted: ${newSession.title} — ${when}`)
        setShowToast(true)
        window.clearTimeout((window).__toastTimerId)
        ;(window).__toastTimerId = window.setTimeout(() => {
            setShowToast(false)
        }, 2200)
    }

    function computeAchievedCount(joined, hosted) {
        const thresholds = [1, 3, 5, 10]
        let total = 0
        thresholds.forEach(t => { if (joined >= t) total += 1 })
        thresholds.forEach(t => { if (hosted >= t) total += 1 })
        return total
    }

    useEffect(() => {
        const joinedCount = scheduledSessions.length
        const total = computeAchievedCount(joinedCount, hostedCount)
        if (total > achievedCount) {
            setUnreadAchievements(prev => prev + (total - achievedCount))
            setAchievedCount(total)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scheduledSessions, hostedCount])

    useEffect(() => {
        if (location.pathname === '/achievements') {
            setUnreadAchievements(0)
        }
    }, [location.pathname])

    return (
        <>
            <div className='header-container'>
                <NavigationBar unreadAchievements={unreadAchievements} />
            </div>

            <div className='page-content'>
                <Routes>
                    <Route path="/" element={
                        <Home
                            sessions={sessions}
                            credits={credits}
                            streak={streak}
                            onLike={handleThumbsUp}
                            onJoin={handleJoin}
                            scheduled={scheduledSessions}
                        />
                    } />
                    <Route path="/achievements" element={
                        <Achievements
                            joinedCount={scheduledSessions.length}
                            hostedCount={hostedCount}
                        />
                    } />
                    {/* Learn route intentionally removed per request */}
                    <Route path="/schedule" element={<Schedule scheduled={scheduledSessions} />} />
                    <Route path="/host" element={<Host onCreate={handleCreateSession} />} />
                </Routes>
            </div>

            {showToast && (
                <div className="toast-container">
                    <div className="toast">{toastMessage}</div>
                </div>
            )}

        </>
    )
}

export default App
