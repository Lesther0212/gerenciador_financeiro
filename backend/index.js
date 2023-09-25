const express = require('express');
const app = express();
const mysql = require('mysql2/promise');
const porta = 3000;

const connection = mysql.createPool({
    host: 'localhost',
    port: 3306,
    database: 'mydb',
    user: 'root',
    password: ''
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/pessoa', async (req, res) => {
    try {
        const [query] = await connection.execute('SELECT * FROM pessoa');
        res.status(200).json(query);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao buscar pessoas' });
    }
});

app.get('/pessoa/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [query] = await connection.execute('SELECT * FROM pessoa WHERE id = ?', [id]);
        if (query.length === 0) return res.status(404).json({ mensagem: 'Pessoa não encontrada' });
        res.status(200).json(query);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao buscar pessoa' });
    }
});

app.get('/pessoa/buscarnome/:nome', async (req, res) => {
    const { nome } = req.params;
    try {
        const [query] = await connection.execute('SELECT * FROM pessoa WHERE nome LIKE ?', [`%${nome}%`]);
        if (query.length === 0) return res.status(404).json({ mensagem: 'Nenhuma pessoa encontrada' });
        res.status(200).json(query);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao buscar pessoas por nome' });
    }
});

app.get('/pessoa/buscaremail/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const [query] = await connection.execute('SELECT * FROM pessoa WHERE email LIKE ?', [`%${email}%`]);
        if (query.length === 0) return res.status(404).json({ mensagem: 'Nenhuma pessoa encontrada' });
        res.status(200).json(query);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao buscar pessoas por email' });
    }
});

app.post('/pessoa', async (req, res) => {
    const { nome, email } = req.body;
    try {
        const [query] = await connection.execute('INSERT INTO pessoa (nome, email) VALUES (?, ?)', [nome, email]);
        res.status(201).json(query);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao criar pessoa' });
    }
});

app.put('/pessoa/:id', async (req, res) => { 
    const { id } = req.params;
    const { nome, email } = req.body;
    try {
        const [query] = await connection.execute('UPDATE pessoa SET nome = ?, email = ? WHERE id = ?', [nome, email, id]);
        res.status(200).json(query);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao atualizar pessoa' });
    }
});

app.delete('/pessoa/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [query] = await connection.execute('DELETE FROM pessoa WHERE id = ?', [id]);
        res.status(200).json(query);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao deletar pessoa' });
    }
});

app.listen(porta, () => console.log(`Servidor está rodando na porta ${porta}`));
