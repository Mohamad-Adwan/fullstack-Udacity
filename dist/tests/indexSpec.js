import supertest from 'supertest';
import app from '../index.js';
const request = supertest(app);
describe('Test /api/images endpoint', () => {
    it('should return 400 if parameters are missing', async () => {
        const response = await request.get('/api/images');
        expect(response.status).toBe(400);
    });
    it('should return 200 for valid params', async () => {
        const response = await request.get('/api/images?filename=fjord&width=200&height=200');
        expect(response.status).toBe(200);
    });
});
//# sourceMappingURL=indexSpec.js.map