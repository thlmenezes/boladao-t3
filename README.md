# Projeto Boladão T3

Remake do [projeto boladão de t.tv/alinepontocom](https://github.com/alinevitoriasi/boladao-web) utilizando o [create t3 app](https://create.t3.gg)

## Como iniciar?

```bash
git clone https://github.com/thlmenezes/boladao-t3
cd boladao-t3
npm install
cp .env.example .env
npm run build
npx prisma migrate dev
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

Os git hooks não são obrigatórios, caso queira utilizá-los habilite-os manualmente removendo a linha `exit 0` e somente no seu ambiente local, não enviando para o github.

### CI

- Todos os commits do PR serão validados de acordo com as regras do arquivo [`commitlint.config.js`](./commitlint.config.js), utilize o comando para validar localmente sua branch

```bash
npx commitlint --from=HEAD~$(git --no-pager rev-list main..HEAD --count)
```

- Todo o código será validado utilizando o ESLint, recomendamos o uso de extensões para ir validando o código conforme ele é escrito, caso queira validar sua area de staging do git pode-se usar `npx lint-staged`, e para os casos mais gerais temos os seguintes comandos

```bash
npm run lint
npx eslint src --ext=ts,tsx
```

### Problemas Comuns

- Caso os commit hooks não rodem, tente usar `scripts/husky-chmod`: comando de uma linha que modifica os arquivos dentro da pasta `.husky`, permitindo que sejam executados como scripts.

- Caso a lista de gitmojis esteja desatualizada, tente usar `scripts/fetch-gitmojis`: script node para buscar a lista de gitmojis de gitmoji.dev no github.

## Agradecimentos

- Aline Vitória: [GitHub](https://github.com/alinevitoriasi), [Twitch](https://www.twitch.tv/alinepontocom)
  - Todos os direitos reservados pela ideia original do projeto boladão-{[web](https://github.com/alinevitoriasi/boladao-web),[backend](https://github.com/alinevitoriasi/boladao-backend)}, esse repositório se trata de uma prova de conceito baseada nos mesmos requisitos e critérios de aceitação extraídos à partir do projeto pronto, sem utilizar detalhes de implementação ou código de qualquer forma (por isso licenciado de forma distinta).
