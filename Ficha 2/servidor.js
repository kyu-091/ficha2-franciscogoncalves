const http = require("http");

const PORT = 3000;
const cards = [
  { name: "Pikachu", type: "Elétrico", attack: 55, defense: 40 },
  { name: "Mimikyu", type: "Fantasma/Fada", attack: 90, defense: 80 },
  { name: "Charizard", type: "Fogo/Voador", attack: 84, defense: 78 },
  { name: "Gengar", type: "Fantasma/Venenoso", attack: 65, defense: 60 },
  { name: "Mew", type: "Psíquico", attack: 100, defense: 90 }
];

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
    if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        const numCartas = cards.length
        res.end(`<h1>Bem-vindo ao meu site!</h1><p>Número de cartas: ${numCartas}</p>`);
        return;
    }
    
    if (req.url === "/sobre"){
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(`Francisco Cabral Gonçalves - TGPSI24T`);
        return;
    }

    if (req.url === "/cartas"){
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        const items = cards.map(card => `<li>${card.name} - Tipo: ${card.type} - Ataque: ${card.attack} - Defesa: ${card.defense}</li>`).join("");
        res.end(`<h1>Cartas Pokémon</h1><ul>${items}</ul>`);
        return;
    }

    if (req.url === "/cartas/aleatoria"){
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        const card = cards[Math.floor(Math.random() * cards.length)];
        res.end(`<h1>Cartas escolhida: ${card.name}</h1>`);
        return;
    }

    if (req.url === "/agora"){
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        const agora = new Date().toLocaleString("pt-PT");
        res.end(`<h1>Data: ${agora} horas</h1>`);
        return;
    }

    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end("<h1>404 - Página não encontrada</h1>");
    return;
});

server.listen(PORT, () => {
    console.log(`Server a correr em http://localhost:${PORT}`);
});