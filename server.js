```javascript
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Lista de logins permitidos (armazenada no servidor)
const ALLOWED_LOGINS = ["Jogador1", "Jogador2", "Jogador3"]; // Substitua pelos logins reais
const AUTH_TOKEN = "SEU_TOKEN_SECRETO_AQUI"; // Substitua por um token único e seguro

// Middleware para CORS e parsing de JSON
app.use(cors({ origin: /.+\.tribalwars\.com\.pt$/ })); // Permite apenas Tribal Wars
app.use(express.json());

// Endpoint para verificar login
app.post('/auth/verify-login', (req, res) => {
    const { login, token } = req.body;

    // Verifica o token de autenticação
    if (token !== AUTH_TOKEN) {
        return res.status(401).json({ authorized: false, message: "Token inválido" });
    }

    // Verifica se o login foi fornecido
    if (!login) {
        return res.status(400).json({ authorized: false, message: "Login não fornecido" });
    }

    // Verifica se o login está na lista permitida
    const isAuthorized = ALLOWED_LOGINS.includes(login);
    res.json({ authorized: isAuthorized, message: isAuthorized ? "Autorizado" : "Login não autorizado" });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
```
