const pool = require('../data/config');

const router = (app) => {

    //Users routes
    app.get('/', (request, response) => {
        response.send({
            message: 'Bienvenido a Node.js Express REST API Manuel Andre Gutierrez Davila'
        });
    });
    app.get('/users', (request, response) => {
        pool.query('SELECT * FROM users ', (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });

    app.get('/users/:id', (request, response) => {
        const id = request.params.id;
        pool.query('SELECT * FROM users WHERE id = ?', id, (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });

    app.post('/users', (request, response) => {
        pool.query('INSERT INTO users SET ?', request.body, (error, result) => {
            if (error) throw error;
            response.status(201).send(`User added with id ${result.insertId}`);
        });
    });

    app.put('/users/:id', (request, response) => {
        const id = request.params.id;
        pool.query('UPDATE users SET ? WHERE id = ?', [request.body, id], (error, result) => {
            if (error) throw error;
            response.send('User updated successfully');
        });
    });

    app.delete('/users/:id', (request, response) => {
        const id = request.params.id;
        pool.query('DELETE FROM users WHERE id = ?', id, (error, result) => {
            if (error) throw error;
            response.send('User deleted');
        });
    });

    //Product routes

   
    app.get('/products', (request, response) => {
        pool.query('SELECT * FROM products', (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });

    app.get('/products/:id', (request, response) => {
        const id = request.params.id;
        pool.query('SELECT * FROM products WHERE id = ?', id, (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });

    app.post('/products', (request, response) => {
        pool.query('INSERT INTO products SET ?', request.body, (error, result) => {
            if (error) throw error;
            response.status(201).send(`User added with id ${result.insertId}`);
        });
    });

    app.put('/products/:id', (request, response) => {
        const id = request.params.id;
        pool.query('UPDATE products SET ? WHERE id = ?', [request.body, id], (error, result) => {
            if (error) throw error;
            response.send('User updated successfully');
        });
    });

    app.delete('/products/:id', (request, response) => {
        const id = request.params.id;
        pool.query('DELETE FROM products WHERE id = ?', id, (error, result) => {
            if (error) throw error;
            response.send('User deleted');
        });
    });

};

module.exports = router;