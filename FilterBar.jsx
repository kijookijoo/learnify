import { useMemo } from 'react'
import './FilterBar.css'

export function FilterBar({ mode, setMode, category, setCategory }) {
    const categories = useMemo(() => ([
        'all',
        'tech',
        'creative',
        'academics',
        'finance',
        'health_fitness',
        'community_hobbies'
    ]), []);

    return (
        <>
        <div className="filterbar-container">
            <div className="filter-group">
                <label className="filter-label">Mode</label>
                <div className="segmented">
                    <button
                        className={mode === 'all' ? 'seg active' : 'seg'}
                        onClick={() => setMode('all')}
                    >All</button>
                    <button
                        className={mode === 'online' ? 'seg active' : 'seg'}
                        onClick={() => setMode('online')}
                    >Online</button>
                    <button
                        className={mode === 'in_person' ? 'seg active' : 'seg'}
                        onClick={() => setMode('in_person')}
                    >In-person</button>
                </div>
            </div>
            <div className="filter-group">
                <label className="filter-label">Category</label>
                <select
                    className="select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    {categories.map(c => (
                        <option key={c} value={c}>{c.replace('_', ' ')}</option>
                    ))}
                </select>
            </div>
        </div>
        </>
    );
}


