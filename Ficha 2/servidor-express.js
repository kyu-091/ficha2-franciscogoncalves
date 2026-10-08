const express = require('express');
const app = express();
const port = 3000;

const cards = [
    { name: "Pikachu", type: "Elétrico", attack: 55, defense: 40 },
    { name: "Mimikyu", type: "Fantasma/Fada", attack: 90, defense: 80 },
    { name: "Charizard", type: "Fogo/Voador", attack: 84, defense: 78 },
    { name: "Gengar", type: "Fantasma/Venenoso", attack: 65, defense: 60 },
    { name: "Mew", type: "Psíquico", attack: 100, defense: 90 }
];

app.get('/', (req, res) => {
    const numCartas = cards.length
    res.send(`<h1>Bem-vindo ao meu site!</h1><p>Número de cartas: ${numCartas}</p>`);
})

app.get('/sobre', (req, res) => {
    res.send(`Francisco Cabral Gonçalves - TGPSI24T`);
})

app.get('/cartas', (req, res) => {
    const items = cards.map(card => `<li>${card.name} - Tipo: ${card.type} - Ataque: ${card.attack} - Defesa: ${card.defense}</li>`).join("");
    res.send(`<h1>Cartas Pokémon</h1><ul>${items}</ul>`);
})

app.get('/cartas/aleatoria', (req, res) => {
    const card = cards[Math.floor(Math.random() * cards.length)];
    res.end(`<h1>Cartas escolhida: ${card.name}</h1>`);
})

app.get('/agora', (req, res) => {
    const agora = new Date().toLocaleString("pt-PT");
    res.end(`<h1>Data: ${agora} horas</h1>`);
})

app.use((req, res) => {
    res.status(404).send('404 Not found');
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})