import app from '../../app.js'
import request from 'supertest'
import { describe, it, expect, jest } from '@jest/globals';

let server;
let idResposta;

beforeEach( () => {
    const port = 8000;
    server = app.listen(port);
})

afterEach( () => {
    server.close();
})

describe('GET em /editoras', () => {
    it('Retorna uma lista de editoras', async () => {
        const resposta = await request(app)
        .get('/editoras')
        .set('Accept', 'appplication/json')
        .expect('content-type', /json/)
        .expect(200);

        expect(resposta.body[0].email).toEqual('e@e.com')
        })
    })

describe('POST em /editoras/id', () => {
    it('Deve adicionar nova editora', async () =>{
        const resposta = await request(app)
        .post('/editoras')
        .send({
            nome: "CDC",
            cidade: "Sao Paulo",
            email:"s@s.com",
        })
        .expect(201)
        idResposta = resposta.body.content.id;
    })
    
})

describe('GET em /editoras/id', () => {
    it('Retorna uma editoras', async () => {
        const resposta = await request(app)
        .get(`/editoras/${idResposta}`)
        .expect(200);

        expect(resposta.body.id).toEqual(idResposta);
        expect(resposta.body.email).toEqual('s@s.com');
        })
    })

describe('PUT em /editoras/id', () => {
    test.each([
        ['nome', { nome: 'Casa do Codigo' }],
        ['cidade', { cidade: 'SP' }],
        ['email', { email: "cdcs@sp.com" }]
    ])('Altera uma %s', async (chave, param) => {

        const requisicao = { request };
        const spy = jest.spyOn(requisicao, 'request');
        await requisicao.request(app)
        .put(`/editoras/${idResposta}`)
        .send(param)
        .expect(204);

        expect(spy).toHaveBeenCalled();
        })
    })

describe('DELETE em /editoras', () => {
    it('Deve remover editora', async () =>{
        await request(app)
        .delete(`/editoras/${idResposta}`)
        .expect(200)
    })
})
