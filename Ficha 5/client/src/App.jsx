import { useEffect, useState } from "react";
import Card from "./Card";

function App() {
  const [cards, setCards] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [attack, setAttack] = useState("");
  const [error, setError] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Todas");
  const [search, setSearch] = useState("");
  const [randomCard, setRandomCard] = useState(null);
  const [sorted, setSorted] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/cartas")
      .then((res) => { return res.json(); })
      .then((data) => { setCards(data); })
      .catch((error) => { console.error("Erro ao carregar cartas:", error); setError(error); })
      .finally(() => { setLoading(false); });
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    setSubmitError(null);
    try {
      const response = await fetch("http://localhost:3000/api/cartas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, type, attack: Number(attack) }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const card = await response.json();
      setCards([...cards, card]);
      setName("");
      setType("");
      setAttack("");
    } catch (error) {
      console.error("Erro ao adicionar carta:", error);
      setSubmitError(error instanceof Error ? error.message : "Erro ao adicionar carta.");
    }
  }

  let visible = cards
    .filter((card) => filter === "Todas" || card.type === filter)
    .filter((card) => card.name.toLowerCase().includes(search.toLowerCase()));

  if (sorted) {
    visible = [...visible].sort((a, b) => b.attack - a.attack);
  }

  function pickRandom() {
    setRandomCard(cards[Math.floor(Math.random() * cards.length)]);
  }

  return (
    <main>
      <h1>A minha coleção</h1>

      <p>
        Tenho {cards.length} cartas · a mostrar {visible.length}
      </p>

      {loading && <p>A carregar cartas…</p>}
      {error && <p>Erro ao carregar cartas.</p>}

      <h2>Adicionar carta</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label>
          Tipo
          <select value={type} onChange={(event) => setType(event.target.value)}>
            <option value="">Escolhe um tipo</option>
            <option value="Criatura">Criatura</option>
            <option value="Feitiço">Feitiço</option>
          </select>
        </label>
        <label>
          Ataque
          <input
            type="number"
            min="0"
            value={attack}
            onChange={(event) => setAttack(event.target.value)}
            required
          />
        </label>
        <button type="submit">Adicionar</button>
      </form>
      {submitError && <p role="alert">{submitError}</p>}

      <div>
        <button onClick={() => setFilter("Todas")}>Todas</button>
        <button onClick={() => setFilter("Criatura")}>Só criaturas</button>
        <button onClick={() => setFilter("Feitiço")}>Só feitiços</button>
        <button onClick={() => setSorted(!sorted)}>
          {sorted ? "Ordem original" : "Ordenar por ataque"}
        </button>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Procurar pelo nome…"
      />

      {visible.length === 0 ? (
        <p>Nenhuma carta corresponde.</p>
      ) : (
        <ul>
          {visible.map((card) => (
            <Card key={card.name} {...card} />
          ))}
        </ul>
      )}

      <h2>Carta à sorte</h2>
      <button onClick={pickRandom}>Escolher outra</button>
      {randomCard && (
        <p>
          <b>{randomCard.name}</b> — {randomCard.type} · ataque {randomCard.attack} ·
          defesa {randomCard.defense}
        </p>
      )}
    </main>
  );
}

export default App;
