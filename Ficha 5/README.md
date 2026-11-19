# Ficha 5

## API

Base URL: `http://localhost:3000`

### `GET /api/cartas`

- Recebe: nada.
- Responde: `200 OK` com um array de cartas. Cada carta inclui `id`, `name`, `type` e `attack` (e pode incluir outros campos).

### `POST /api/cartas`

- Recebe um corpo JSON com `name`, `type` e `attack`. `name` e `type` são obrigatórios e não podem estar vazios; o servidor atribui o `id`.
- Responde:
  - `201 Created` com a carta criada.
  - `400 Bad Request` com uma mensagem de erro se faltar `name` ou `type`.

Exemplo de corpo:

```json
{
  "name": "Dragão de Cobalto",
  "type": "Criatura",
  "attack": 7
}
```

### `DELETE /api/cartas/:id`

- Recebe o `id` da carta no URL; não recebe corpo.
- Responde:
  - `204 No Content` quando a carta é apagada.
  - `404 Not Found` com uma mensagem de erro se não existir uma carta com esse ID.

As cartas são guardadas em `server/cartas.json` e mantidas depois de reiniciar o servidor.

## Preflight CORS

O primeiro pedido é `OPTIONS /api/cartas`, enviado automaticamente pelo browser para verificar CORS antes do POST cross-origin com JSON.
Sem o middleware `cors`, a resposta ao preflight não tinha os cabeçalhos CORS necessários e o browser bloqueava o POST.
Assim, a rota POST não era executada e o seu `console.log` não aparecia no terminal.

## Persistência da carta

Só com `setCards`, a carta vivia no estado React e desaparecia ao fazer F5 na app.
Com POST sem ficheiro, vivia no array em memória do server: F5 não a apagava, mas reiniciar o server sim.
Com `cartas.json`, também fica no disco, por isso sobrevive ao F5 e ao reinício do server.
