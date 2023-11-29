const request = require('supertest')
const app = require('../app')
require('../models')

let id;
let token;

test('POST /users', async () => {  // create user no repeat
    const user = {
        firstName: "Ejemplo2",
        lastName: "Ejemplo2",
        email: "Ejemplo2@gmail.com",
        password: "cualquiercosa123",
        phone: "2347598343"
    }
    const res = await request(app)
        .post('/users').send(user)
        .set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(user.firstName);
    expect(res.body.id).toBeDefined();
});

test('POST /users/login', async () => { 
    const userLogin = {
        email: "Ejemplo2@gmail.com",
        password: "cualquiercosa123",
    }
    const res = await request(app).post(`/users/login`).send(userLogin);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
});

test('GET /users', async () => { 
    const res = await request(app).get('/users').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('PUT /users/id', async () => { 
    const actualizateUser = {
        firstName: "Ejemplo3",
    }
    const res = await request(app).put(`/users/${id}`)
        .send(actualizateUser)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(actualizateUser.firstName);
});

test('DELETE /users/id', async () => { 
    const res = await request(app).delete(`/users/${id}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});