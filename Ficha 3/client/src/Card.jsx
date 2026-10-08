import { useState } from 'react'
import './Card.css'

function Card({ name, type1, type2, attack, defense }) {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <article className="card">
            <div className="card-header">
                <h2>{name}</h2>
                <button
                    className="card-favorite"
                    type="button"
                    onClick={() => setIsFavorite(!isFavorite)}
                >
                    {isFavorite ? '♥' : '♡'}
                </button>
            </div>
            <div className="card-stats">
                <span className="card-stat">
                    <span className="card-stat-label">Type</span>
                    {type1}{type2 && ` / ${type2}`}
                </span>
                <span className="card-stat">
                    <span className="card-stat-label">Attack</span>
                    {attack}
                </span>
                <span className="card-stat">
                    <span className="card-stat-label">Defense</span>
                    {defense}
                </span>
                {attack > 80 && <span className="tag-strong">Strong</span>}
            </div>
        </article>
    )
}

export default Card