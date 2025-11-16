import './App.css'
import { NavigationBar } from './components/NavigationBar'
import { useMemo, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Learn } from './pages/Learn'
import { Achievements } from './pages/Achievements'

function App() {
    const [credits, setCredits] = useState(0)
    const [streak, setStreak] = useState(1)

    const sessions = useMemo(() => ([
        { id: 1, title: 'Intro to Excel', description: 'Learn formulas and charts.', mode: 'online', category: 'tech', rating: 4.8 },
        { id: 2, title: 'Beginner Mandarin', description: 'Speak basic phrases.', mode: 'in_person', category: 'academics', rating: 4.6 },
        { id: 3, title: 'Poster Design', description: 'Layout and typography basics.', mode: 'online', category: 'creative', rating: 4.7 },
        { id: 4, title: 'Public Speaking 101', description: 'Confidence and structure.', mode: 'in_person', category: 'community_hobbies', rating: 4.5 },
        { id: 5, title: 'Budgeting Basics', description: 'Personal finance tools.', mode: 'online', category: 'finance', rating: 4.4 },
        { id: 6, title: 'Yoga for Focus', description: '15-min flow.', mode: 'in_person', category: 'health_fitness', rating: 4.9 },
    ]), [])

    function handleThumbsUp() {
        setCredits(prev => prev + 1)
    }

    return (
        <>
            <div className='header-container'>
                <NavigationBar />
            </div>

            <div className='page-content'>
                <Routes>
                    <Route path="/" element={
                        <Home
                            sessions={sessions}
                            credits={credits}
                            streak={streak}
                            onLike={handleThumbsUp}
                        />
                    } />
                    <Route path="/learn" element={<Learn />} />
                    <Route path="/achievements" element={<Achievements />} />
                </Routes>
            </div>


        </>
    )
}

export default App
