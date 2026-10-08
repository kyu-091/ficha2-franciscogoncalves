# Executar a aplicação React

```bash
cd client
npm install
npm run dev
```

## View Source

Abra o View Source do site Express (porta 3000) e o da app React (porta 5173). O HTML do Express é construído no servidor, enquanto o HTML do React é o template do Vite e o conteúdo é renderizado pelo JavaScript no navegador. Para saber isso, compare o conteúdo mostrado no View Source com as respostas do servidor e com o bundle carregado pelo navegador.

## Network

Abra a guia Network e filtre as cartas ou as mudanças de página. O número exato de requests depende do site e do fluxo testado, portanto não é possível afirmar um valor único sem observá-lo. O Express faz requests ao backend e o React faz requests ao Vite/ao backend conforme carrega os dados e os recursos. Essa diferença acontece porque o Express fornece a página HTML no servidor, enquanto o React pode renderizar o conteúdo no cliente e carregar recursos adicionais.
