const pool = require('../data/config');

const router = (app) => {
    app.get('/', (request, response) => {
        response.send({
            message: 'Bienvenido a Node.js Express REST API Manuel Andre Gutierrez Davila'
        });
    });


    //Users routes

    app.get('/users', async (request, response) => {
        const db = await pool;
        const results = await db.request().query('SELECT * FROM users ', (error, result) => {
            if (error) throw error;
            const resultar = result.recordsets.reduce((obj, item) => obj[item.id] = item.nombre, obj, {});
            
            response.send(resultar);
        });
    });

    app.get('/users/:id', async (request, response) => {
        const db = await pool;
        const id = request.params.id;
        const results = await db.request().query('SELECT * FROM users WHERE id = ?', id, (error, result) => {
            if (error) throw error;
            response.send(result.recordsets);
        });
    });

    app.post('/users', async (request, response) => {
        const db = await pool;
        const results = await db.request().query('INSERT INTO users SET ?', request.body, (error, result) => {
            if (error) throw error;
            response.status(201).send(`User added with id ${result.insertId}`);
        });
    });

    app.put('/users/:id', async (request, response) => {
        const db = await pool;
        const id = request.params.id;
        const results = await db.request().query('UPDATE users SET ? WHERE id = ?', [request.body, id], (error, result) => {
            if (error) throw error;
            response.send('User updated successfully');
        });
    });

    app.delete('/users/:id', async (request, response) => {
        const db = await pool;
        const id = request.params.id;
        const results = await db.request().query('DELETE FROM users WHERE id = ?', id, (error, result) => {
            if (error) throw error;
            response.send('User deleted');
        });
    });

    //Product routes


    app.get('/products', async (request, response) => {
        const db = await pool;
        const results = await db.request().query('SELECT * FROM products', (error, result) => {
            if (error) throw error;
            response.send(result.recordsets);
        });
    });

    app.get('/products/:id', async (request, response) => {
        const db = await pool;
        const id = request.params.id;
        const results = await db.request().query('SELECT * FROM products WHERE id = ?', id, (error, result) => {
            if (error) throw error;
            response.send(result.recordsets);
        });
    });

    app.post('/products', async (request, response) => {
        const db = await pool;
        const results = await db.request().query('INSERT INTO products SET ?', request.body, (error, result) => {
            if (error) throw error;
            response.status(201).send(`User added with id ${result.insertId}`);
        });
    });

    app.put('/products/:id', async (request, response) => {
        const db = await pool;
        const id = request.params.id;
        const results = await db.request().query('UPDATE products SET ? WHERE id = ?', [request.body, id], (error, result) => {
            if (error) throw error;
            response.send('User updated successfully');
        });
    });

    app.delete('/products/:id', async (request, response) => {
        const db = await pool;
        const id = request.params.id;
        const results = await db.request().query('DELETE FROM products WHERE id = ?', id, (error, result) => {
            if (error) throw error;
            response.send('User deleted');
        });
    });
};

module.exports = router;