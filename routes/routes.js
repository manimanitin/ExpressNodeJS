const pool = require('../data/config');
const mssql = require('mssql');

const router = (app) => {
    app.get('/', (request, response) => {
        response.send({
            message: 'Bienvenido a Node.js Express REST API Manuel Andre Gutierrez Davila'
        });
    });


    //Users routes

    app.get('/users', async (request, response) => {
        try {
            const db = await pool;
            const results = await db.request().query('SELECT * FROM users ');
            response.send(results.recordsets.flat());
        } catch (error) {
            console.log(error);
        }

    });

    app.get('/users/:id', async (request, response) => {
        try {
            const db = await pool;
            const id = request.params.id;
            const results = await db.request()
                .input('id', mssql.VarChar, id)
                .query('SELECT * FROM users WHERE id = @id');
            response.send(results.recordsets.flat());
        } catch (error) {
            console.log(error);
        }

    });

    app.post('/users', async (request, response) => {
        try {
            const db = await pool;
            const results = await db.request()
                .input('nombre', mssql.VarChar, request.body.nombre)
                .query('INSERT INTO users OUTPUT INSERTED.id VALUES(@nombre) ');
            response.status(201).send(`User added with id ${results.recordset.flat()[0].id}`);
        } catch (error) {
            console.log(error);
        }

    });

    app.put('/users/:id', async (request, response) => {
        try {
            const db = await pool;
            const id = request.params.id;
            const results = await db.request()
                .input('nombre', mssql.VarChar, request.body.nombre)
                .input('id', mssql.VarChar, id)
                .query('UPDATE users SET nombre = @nombre WHERE id = @id');
            response.send('User updated successfully');
        } catch (error) {
            console.log(error);
        }
    });

    app.delete('/users/:id', async (request, response) => {
        try {
            const db = await pool;
            const id = request.params.id;
            const results = await db.request()
                .input('id', mssql.VarChar, id)
                .query('DELETE FROM users WHERE id = @id');
            response.send('User deleted');
        } catch (error) {
            console.log(error);
        }

     
    });

    //Product routes


    app.get('/products', async (request, response) => {
        try {
            const db = await pool;
            const results = await db.request().query('SELECT * FROM products ');
            response.send(results.recordsets.flat());
        } catch (error) {
            console.log(error);
        }

    });

    app.get('/products/:id', async (request, response) => {
        try {
            const db = await pool;
            const id = request.params.id;
            const results = await db.request()
                .input('id', mssql.VarChar, id)
                .query('SELECT * FROM products WHERE id = @id');
            response.send(results.recordsets.flat());
        } catch (error) {
            console.log(error);
        }

    });

    app.post('/products', async (request, response) => {
        try {
            const db = await pool;
            const results = await db.request()
                .input('nombre', mssql.VarChar, request.body.nombre)
                .query('INSERT INTO products OUTPUT INSERTED.id VALUES(@nombre) ');
            response.status(201).send(`User added with id ${results.recordset.flat()[0].id}`);
        } catch (error) {
            console.log(error);
        }

    });

    app.put('/products/:id', async (request, response) => {
        try {
            const db = await pool;
            const id = request.params.id;
            const results = await db.request()
                .input('nombre', mssql.VarChar, request.body.nombre)
                .input('id', mssql.VarChar, id)
                .query('UPDATE products SET nombre = @nombre WHERE id = @id');
            response.send('User updated successfully');
        } catch (error) {
            console.log(error);
        }
    });

    app.delete('/products/:id', async (request, response) => {
        try {
            const db = await pool;
            const id = request.params.id;
            const results = await db.request()
                .input('id', mssql.VarChar, id)
                .query('DELETE FROM products WHERE id = @id');
            response.send('User deleted');
        } catch (error) {
            console.log(error);
        }

     
    });

};

module.exports = router;