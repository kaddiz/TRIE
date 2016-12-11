import express                  from 'express';
import React                    from 'react';
import ReactDom                 from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes                   from './routes';

const app = express();

app.use((req, res) => {

  match({ routes, location: req.url },
    (error, redirectLocation, renderProps) => {
      if (redirectLocation) { // Если необходимо сделать redirect
        return res.redirect(301, redirectLocation.pathname + redirectLocation.search);
      }
      if (error) { // Произошла ошибка любого рода
        return res.status(500).send(error.message);
      }
      if (!renderProps) { // Мы не определили путь, который бы подошел для URL
        return res.status(404).send('Not found');
      }

      const componentHTML = ReactDom.renderToString(
          <RouterContext {...renderProps} />
      );

      return res.end(renderHTML(componentHTML));
    }
  );
});

const assetUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:8050/' : '/';

function renderHTML(componentHTML) {
  return `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>TRIE</title>
        <link rel="stylesheet" href="${assetUrl}/bundle.css">
      </head>
      <body>
        <div id="root">${componentHTML}</div>
        <script src="${assetUrl}/bundle.js"></script>
      </body>
    </html>
  `;
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`);
});
