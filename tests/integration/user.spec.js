const request = require('supertest');
const app = require('../../src/app');
const UserService = require('../../src/services/user-service');

describe('User Integrations Tests', function() {

    it('Create New User', async () => {
        jest.spyOn(UserService, 'createUser').mockResolvedValue({id: '1231254125' });
        
        const response = await request(app)
            .post('/user')
            .send({
                name: 'Fulano',
                email: 'newEmail@gmail.com',
                password: 'password'
            });
    
        expect(response.status).toBe(200);
        expect(response.body.id).toBeDefined();
    });
});
