const SessionService = require("../../src/services/session-service");
const SessionController = require("../../src/controllers/session-ctrl");
const Email = require("../../src/utils/email-validator");
const UserService = require("../../src/services/user-service");

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn().mockImplementation(() => {
        return "session-token";
    }) 
}));

describe('Session Unit Tests', () => {

    describe('Service', () => {
        it('Generate token', () => {
            const token = SessionService.generateToken("fulano@gmail.com");
            expect(token).toBe('session-token')
        })
    })

    describe('Controller', () => {

        it('Create session', async() => {
            const req = {
                body: {
                    email: 'teste@gmail.com',
                    password: 'senha'
                }
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            UserService.userExistsAndCheckPassword = jest.fn().mockReturnValueOnce({ password: 'password'});
            SessionService.generateToken("fulano@gmail.com");

            await SessionController.create(req, res)

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ token: 'session-token' });
        })

        it('Invalid email', async() => {
            const req = {
                body: {
                    email: 'test@example.com',
                    password: 'password123'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
    
            Email.isValid = jest.fn().mockReturnValueOnce(false);

            try {
                await SessionController.create(req, res);
            } catch (error) {
                expect(error).toEqual('Email inválido')
                expect(res.status).toHaveBeenCalledWith(400);
            }
        })

        it('Invalid password', async() => {
            const req = {
                body: {
                    email: 'test@example.com',
                    password: ''
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
    
            await SessionController.create(req, res);
    
            expect(res.status).toHaveBeenCalledWith(400);
        })

        it('User not found', async() => {
            const req = {
                body: {
                    email: 'fulano@gmail.com',
                    password: 'password'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
    
            Email.isValid = jest.fn().mockReturnValueOnce(true);
            UserService.userExistsAndCheckPassword = jest.fn().mockReturnValueOnce(false)
            await SessionController.create(req, res);
    
            expect(res.status).toHaveBeenCalledWith(404);
        })

        it('Error 500', async() => {
            const req = {
                body: {
                    email: 'teste@gmail.com',
                    password: 'senha'
                }
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            Email.isValid = jest.fn().mockReturnValueOnce(true);
            UserService.userExistsAndCheckPassword = jest.fn().mockReturnValueOnce({ password: 'password'});
            SessionService.generateToken = jest.fn().mockRejectedValueOnce(new Error('Server error'))

            await SessionController.create(req, res)

            expect(res.status).toHaveBeenCalledWith(500);
        })
    })
})