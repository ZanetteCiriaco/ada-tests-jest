const request = require('supertest');
const app = require('../../src/app');
const UserService = require('../../src/services/user-service');
const SessionService = require('../../src/services/session-service');

describe('Session Integrations Tests', function() {

    it('Create Session', async () => {
        jest.spyOn(UserService, 'userExistsAndCheckPassword').mockResolvedValue(true);
        jest.spyOn(SessionService, 'generateToken').mockResolvedValue('token');
        
        const response = await request(app)
          .post('/session')
          .send({
            email: 'newEmail@gmail.com',
            password: 'password'
          });
    
        expect(response.status).toBe(200);
        expect(response.body.token).toBe('token');
    });
});
