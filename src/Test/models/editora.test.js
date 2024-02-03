import { describe, it, expect, jest } from '@jest/globals';
import Editora from '../../models/editora.js';

describe('Teste do modelo Editora', () => {
    const objetoEditora = {
        nome: 'CDC',
        cidade: 'Sao Paulo',
        email: 'cdc@cdc.com.br'
    };

    it.skip('Deve instanciar uma nova editora', () => {
        const editora = new Editora(objetoEditora);
        expect(editora).toEqual(expect.objectContaining(objetoEditora));
    });

    it.skip('Deve retornar todas as editoras', async () => {
        const dados = await Editora.pegarEditoras();
        
        expect(dados.length).toBeGreaterThanOrEqual(1);
    });
    
    it.skip('Deve criar um novo editora com sucesso', async () => {
        const editora = new Editora(objetoEditora);
        
        editora.salvar().then((data) => {
            expect(data.nome).toBe('CDC');
            expect(data.cidade).toBe('Sao Paulo',);
            expect(data.email).toBe('cdc@cdc.com.br');
        })
    });

    it.skip('Deve retornar a editora pelo ID', async () => {
        const editora = new Editora(objetoEditora);
        const dados = await editora.salvar();
        const dadosRetornados = await Editora.pegarPeloId(dados.id);

        expect(dadosRetornados).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                ...objetoEditora,
                created_at: expect.any(String),
                updated_at: expect.any(String),
            })
        );
    });

    it.skip('Deve retornar a editora pelo ID com dados mockados', async () => {
        const editora = new Editora(objetoEditora);
      
        editora.salvar = jest.fn().mockReturnValue({
            id: 6,
            nome: 'CDC',
            cidade: 'Sao Paulo',
            email: 'cdc@cdc.com.br',
            created_at: '2022-10-01',
            updated_at: '2022-10-01',
        })

        const dadosRetornados = editora.salvar();

        expect(dadosRetornados).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                ...objetoEditora,
                created_at: expect.any(String),
                updated_at: expect.any(String),
            })
        );

    });
})