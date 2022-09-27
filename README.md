# Projeto Boladão T3

Remake do [projeto boladão de t.tv/alinepontocom](https://github.com/alinevitoriasi/boladao-web) utilizando o [create t3 app](https://create.t3.gg)

## Como iniciar?

```bash
git clone https://github.com/thlmenezes/boladao-t3
cd boladao-t3
npm install
cp .env.example .env
npm run build
npm run start
```

### Pré-requisitos

Ter instalado, pelo menos nas versões abaixo, as ferramentas `npm` e `node`

```json
"engines": {
  "npm": "8.1.0",
  "node": "16.13.0"
},
```

## Distribuição

Utilizar [Vercel](https://vercel.com/), quando possível, por suas integrações com a plataforma NextJS

## Licença

Esse projeto foi licenciado pela MIT License - ver [LICENSE.md](LICENSE.md) para mais detalhes

## Contribuindo

Favor seguir as regras do ESLint, Prettier e Commitlint

### Problemas Comuns

- Caso os commit hooks não rodem, tente usar `scripts/husky-chmod`: comando de uma linha que modifica os arquivos dentro da pasta `.husky`, permitindo que sejam executados como scripts.

- Caso a lista de gitmojis esteja desatualizada, tente usar `scripts/fetch-gitmojis`: script node para buscar a lista de gitmojis de gitmoji.dev no github.

## Agradecimentos

- Aline Vitória: [GitHub](https://github.com/alinevitoriasi), [Twitch](https://www.twitch.tv/alinepontocom)
  - Todos os direitos reservados pela ideia original do projeto boladão-{[web](https://github.com/alinevitoriasi/boladao-web),[backend](https://github.com/alinevitoriasi/boladao-backend)}, esse repositório se trata de uma prova de conceito baseada nos mesmos requisitos e critérios de aceitação extraídos à partir do projeto pronto, sem utilizar detalhes de implementação ou código de qualquer forma (por isso licenciado de forma distinta).
