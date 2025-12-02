const request = require('supertest');
const app = require('../app'); 
const { Controller } = require('../Controllers/userController');

const controller = new Controller();

beforeEach(() => {
    controller.database = [];  
});

describe('Pruebas API Usuarios - Jest + Supertest', () => {

    it('GET / debe devolver 404 y mensaje cuando no hay usuarios', async () => {
        const res = await request(app).get('/users');

        expect(res.status).toBe(404);
        expect(res.body.message).toBe('No hay usuarios registrados');
    });

    it('POST /users/new debe crear un usuario válido', async () => {
        const res = await request(app)
            .post('/users/new')
            .send({
                name: "Juan Perez",           
                email: "jperez23@espe.edu.ec"   
            });

        expect(res.status).toBe(201);
        expect(res.body.message).toBe('Usuario Creado');
    });

    it('GET / debe devolver 200 y lista de usuarios después de crear uno', async () => {
        await request(app).post('/users/new').send({
            name: "Juan Perez",
            email: "jperez24@espe.edu.ec"
        });

        const res = await request(app).get('/users');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(2);
        expect(res.body[0].name).toBe('Juan Perez'); 
    });

    it('POST /users/new debe rechazar nombre inválido (menos de 3 letras o con números)', async () => {
        const res = await request(app)
            .post('/users/new')
            .send({
                name: "Ab1",
                email: "test@dominio.com"
            });

        expect(res.status).toBe(400);
    });

    it('POST /users/new debe rechazar email sin @ ni dominio', async () => {
        const res = await request(app)
            .post('/users/new')
            .send({
                name: "Carlos Pérez",
                email: "carlosgmail.com"
            });

        expect(res.status).toBe(400);
    });

    it('Flujo completo: crear varios usuarios → GET debe mostrarlos todos', async () => {
        await request(app).post('/users/new').send({ name: "María González", email: "maria@espe.edu.ec" });
        await request(app).post('/users/new').send({ name: "Luis Ramírez",   email: "luis@espe.edu.ec" });

        const res = await request(app).get('/users');
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(4);
        expect(res.body[2].name).toBe("María González");
        expect(res.body[3].name).toBe("Luis Ramírez");
    });

    it('Debe aceptar nombres con espacios y ñ (cobertura extra)', async () => {
        const res = await request(app)
            .post('/users/new')
            .send({
                name: "José Ñáñez",
                email: "jose@espe.edu.ec"
            });

        expect(res.status).toBe(201);
    });
});