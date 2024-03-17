const auth = require('../../src/middlewares/auth');
const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken');

describe('Unit Auth Tests', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    req = {
      headers: {
        authorization: 'token'
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  it('Valid Token', async () => {
    const email = 'test@gmail.com.br';
    const decodedToken = { email: email };
    jwt.verify.mockResolvedValue(decodedToken);

    await auth(req, res, next);

    expect(req.userEmail).toBe(email);
    expect(next).toHaveBeenCalled();
  });

  it('Token not provided', async () => {
    delete req.headers.authorization;

    await auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token is not provided' });
    expect(next).not.toHaveBeenCalled();
  })

  it('Invalid token', async () => {
    jwt.verify.mockRejectedValue(new Error('Invalid token'));

    await auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid token' });
    expect(next).not.toHaveBeenCalled();
  });
})