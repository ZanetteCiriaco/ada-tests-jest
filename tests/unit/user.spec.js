const UserService = require("../../src/services/user-service");

jest.mock('../../src/schemas/User', () => ({
    create: jest.fn().mockImplementation(() => {
        return {id: '123456'}
    }),
    findOne: jest.fn().mockImplementation((query) => {
        if(query.email === "teste@gmail.com") {
            return {email: "teste@gmail.com", password: "password"};
        }

        return undefined;   
    })
}));

describe('User Unit Tests', () => {

    describe('Service', () => {
        it('Create User', async() => {
            const response = await UserService.createUser({ 
                name: "fulano", 
                email: "fulano@gmail.com", 
                password: "password"
            })

            expect(response).toEqual({id: '123456'});
        })

        it("User Exists And Check Password", async() => {
            const response = await UserService.userExistsAndCheckPassword({
                email: "teste@gmail.com",
                password: "password"
            })

            expect(response).toBeTruthy();
        })

        it('User not exists', async () => {
            const result = await UserService.userExistsAndCheckPassword({
                email: 'naoExistente@gmail.com',
                password: 'password123'
            });

            expect(result).toBeFalsy();
        });

        it('Wrong password', async () => {

            expect.assertions(1);
            await expect(UserService.userExistsAndCheckPassword({
                email: 'teste@gmail.com',
                password: 'incorrectPassword'
            })).rejects.toEqual({ status: 400, message: 'As senhas não batem' });
        });
    })
})