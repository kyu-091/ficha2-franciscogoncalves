import Card from './Card.jsx'
import './App.css'
import { useState } from 'react'

function App() {

  const [cards, setCards] = useState([
    { id: 25, name: "Pikachu", type1: "Eletric", type2: null, attack: 55, defense: 40 },
    { id: 778, name: "Mimikyu", type1: "Ghost", type2: "Fairy", attack: 90, defense: 80 },
    { id: 6, name: "Charizard", type1: "Fire", type2: "Flying", attack: 84, defense: 78 },
    { id: 94, name: "Gengar", type1: "Ghost", type2: "Poison", attack: 65, defense: 60 },
    { id: 151, name: "Mew", type1: "Psychic", type2: null, attack: 100, defense: 90 }
  ]);

  const [filterType, setFilterType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <>
      <div className="card-controls">
        <button onClick={() => {
          const randomCard = cards[Math.floor(Math.random() * cards.length)];
          setSelectedCard(randomCard);
        }}>
          Random Card
        </button>
      </div>

      {selectedCard && (
        <Card
          key={selectedCard.id}
          name={selectedCard.name}
          type1={selectedCard.type1}
          type2={selectedCard.type2}
          attack={selectedCard.attack}
          defense={selectedCard.defense}
        />
      )}

      <p>I have {cards.length} cards!</p>

      <div className="card-toolbar">
        <div className="card-controls">
          <button onClick={() => setCards([...cards].sort((a, b) => b.attack - a.attack))}>
            Order by Attack
          </button>
          <button onClick={() => setCards([...cards].sort((a, b) => a.id - b.id))}>
            Order by Id
          </button>
        </div>
        <div className="card-controls card-filters" aria-label="Filter cards by type">
          <button onClick={() => setFilterType("All")}>All</button>
          <button onClick={() => setFilterType("Eletric")}>Eletric</button>
          <button onClick={() => setFilterType("Ghost")}>Ghost</button>
          <button onClick={() => setFilterType("Fire")}>Fire</button>
          <button onClick={() => setFilterType("Psychic")}>Psychic</button>
          <button onClick={() => setFilterType("Fairy")}>Fairy</button>
          <button onClick={() => setFilterType("Flying")}>Flying</button>
          <button onClick={() => setFilterType("Poison")}>Poison</button>
        </div>
      </div>

      <input className="card-search" type="text" placeholder="Search cards..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

      <div className="card-grid">
        {cards.filter((card) => (filterType === "All" || card.type1 === filterType || card.type2 === filterType) && card.name.toLowerCase().includes(searchTerm.toLowerCase())).map((card) => (
          <Card
            key={card.id}
            name={card.name}
            type1={card.type1}
            type2={card.type2}
            attack={card.attack}
            defense={card.defense}
          />
        ))}
      </div>
    </>
  )
}

export default App