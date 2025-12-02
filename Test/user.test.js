// test/user.test.js
const request = require('supertest');
const app = require('../app');

describe('API de Usuarios', () => {
  beforeEach(() => {
    if (app.users) app.users = [];
  });

  it('GET /users debería devolver lista vacía al inicio', async () => {
    const res = await request(app).get('/users');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /users debería crear un usuario válido', async () => {
    const nuevoUsuario = {
      nombre: "Juan Pérez",          
      email: "juan.perez@espe.edu.ec"
    };

    const res = await request(app)
      .post('/users')
      .send(nuevoUsuario);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.nombre).toBe(nuevoUsuario.nombre);
    expect(res.body.email).toBe(nuevoUsuario.email);
  });

  it('POST /users debería rechazar datos inválidos (sin nombre)', async () => {
    const res = await request(app)
      .post('/users')
      .send({ email: "solo@email.com" });

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it('POST /users debería rechazar email inválido', async () => {
    const res = await request(app)
      .post('/users')
      .send({ 
        nombre: "Ana",
        email: "esto-no-es-un-email"
      });

    expect(res.status).toBe(400);
  });

  it('GET /users debería devolver los usuarios creados', async () => {
    await request(app)
      .post('/users')
      .send({ nombre: "Maria Gomez", email: "maria@espe.edu.ec" });

    const res = await request(app).get('/users');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].nombre).toBe("María Gómez");
  });
});