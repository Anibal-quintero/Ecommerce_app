const request = require('supertest')
const app = require('../app');
require('../models')

let id;
let token;

beforeAll(async() => {
    const user = {
        email: "test@gmail.com",
        password: "test1234"
    }
    const res = await request(app).post('/users/login').send(user);
    token = res.body.token;
});

test('GET /products', async () => { 
    const res = await  request(app).get('/Products');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /products', async () => { 
    const prd = {
        title: "Ejemplo",
        description: "Ejemplo Description",
        brand: "Ejemplo",
        price: 12.32
    }
    const res = await request(app).post('/products')
        .send(prd)
        .set('Authorization', `Bearer ${token}`)
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.title).toBe(prd.title);
});

test('DELETE /products', async () => { 
    const res = await request(app)
        .delete(`/products/${id}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});