# Exemplos de uso

Este diretório contém exemplos de uso do `connect-flash` em várias versões do Express.

## Estrutura

- `express2/` — exemplo para Express 2.x
- `express3/` — exemplo para Express 3.x
- `express4/` — exemplo para Express 4.x
- `express5/` — exemplo para Express 5.x

Cada exemplo inclui:

- `app.js` — aplicação de exemplo
- `package.json` — dependências necessárias
- `views/index.ejs` — template de renderização

## Como executar

1. Entre na pasta do exemplo desejado:

```bash
cd examples/express4
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor:

```bash
node app.js
```

4. Abra no navegador:

```text
http://localhost:3000
```

## Observações por versão

- `express2/`
  - Usa a API antiga de Express 2.x.
  - O middleware `flash` é usado com `flash({ unsafe: true })` para sobrepor a implementação interna do Express 2.

- `express3/`
  - Usa a API de middleware do Express 3.x.
  - Exemplo mais parecido com a versão original do pacote.

- `express4/`
  - Usa `express-session` para gerenciar sessão.
  - Exemplo compatível com aplicações Express 4 modernas.

- `express5/`
  - Usa a mesma abordagem de sessão do Express 4.
  - Exemplo preparado para o estilo atual do Express 5.

## Nota

Se você estiver publicando o pacote como `connect-flash-now`, use os exemplos de Express 4 ou 5 para validar a integração em aplicações modernas.