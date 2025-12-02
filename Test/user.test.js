const request = require('supertest');
const app = require('../app'); 
const { Controller } = require('../Controllers/userController');

const controller = new Controller();

beforeEach(() => {
    controller.database = [];  
});

describe('Pruebas API Usuarios - Jest + Supertest', () => {

    it('GET / debe devolver 404 y mensaje cuando no hay usuarios', async () => {
        const res = await request(app).get('/');

        expect(res.status).toBe(404);
        expect(res.body.message).toBe('No hay usuarios registrados');
    });

    it('POST /new debe crear un usuario válido (usa TU NOMBRE REAL aquí)', async () => {
        const res = await request(app)
            .post('/new')
            .send({
                name: "Juan Pérez",           
                email: "jperez23@espe.edu.ec"   
            });

        expect(res.status).toBe(201);
        expect(res.body).toBe('Usuario Creado');
    });

    it('GET / debe devolver 200 y lista de usuarios después de crear uno', async () => {
        await request(app).post('/new').send({
            name: "Ana López",
            email: "ana@espe.edu.ec"
        });

        const res = await request(app).get('/');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(1);
        expect(res.body[0].name).toBe('Ana López'); 
    });

    it('POST /new debe rechazar nombre inválido (menos de 3 letras o con números)', async () => {
        const res = await request(app)
            .post('/new')
            .send({
                name: "Ab1",
                email: "test@dominio.com"
            });

        expect(res.status).toBe(500);
        expect(res.body.message).toContain('Nombre o correo invalidos');
    });

    it('POST /new debe rechazar email sin @ ni dominio', async () => {
        const res = await request(app)
            .post('/new')
            .send({
                name: "Carlos Pérez",
                email: "carlosgmail.com"
            });

        expect(res.status).toBe(500);
        expect(res.body.message).toContain('Nombre o correo invalidos');
    });

    it('Flujo completo: crear varios usuarios → GET debe mostrarlos todos', async () => {
        await request(app).post('/new').send({ name: "María González", email: "maria@espe.edu.ec" });
        await request(app).post('/new').send({ name: "Luis Ramírez",   email: "luis@espe.edu.ec" });

        const res = await request(app).get('/');
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
        expect(res.body[0].name).toBe("María González");
        expect(res.body[1].name).toBe("Luis Ramírez");
    });

    it('Debe aceptar nombres con espacios y ñ (cobertura extra)', async () => {
        const res = await request(app)
            .post('/new')
            .send({
                name: "José María Ñáñez",
                email: "jose@espe.edu.ec"
            });

        expect(res.status).toBe(201);
    });
});