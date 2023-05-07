const pool = require('../data/config');

const router = (app) => {
    app.get('/', (request, response) => {
        response.send({
            message: 'Bienvenido a Node.js Express REST API'
        });
    });
    app.get('/users', async (request, response) => {
        const db = await pool;
        const result = await db.request().query('SELECT * FROM users', (error, result) => {
            if (error) throw error;
            response.send(result.recordset);
        });
    });
};

module.exports = router;