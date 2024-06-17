import request from 'supertest';
import app from '../app';


// Mock the config.json file
describe('GET /getTest', () => {
  beforeEach(async ()=>{
      jest.clearAllMocks()
  })

  it('should return the correct test result for the given user parameters', async () => {
    const response = await request(app)
      .post('/getTest')
      .send({
        age: 10,
        name: 'Israel',
        favorite_animal: 'parrot'
      })
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.text).toBe('im result a2');
  });

  it('should return the same test for the same user ', async ()=>{

      const userPayload = {
          age: 55,
          name: 'Daniel',
          favorite_animal: 'cat'
      };
      const expectedResult = 'im result b3';

      const firstResponse = await request(app)
          .post('/getTest')
          .send(userPayload)
          .set('Accept', 'application/json');

      expect(firstResponse.text).toBe(expectedResult);

      const secondResponse = await request(app)
          .post('/getTest')
          .send(userPayload)
          .set('Accept', 'application/json');

      expect(secondResponse.text).toBe(expectedResult);
  })

  it('should return 404 if no matching test is found', async () => {
    const response = await request(app)
      .post('/getTest')
      .send({
        age: 5,
        name: 'Unknown',
        favorite_animal: 'unicorn'
      })
      .set('Accept', 'application/json');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'No matching test found' });
  });

  it('should return 400 if required parameters are missing', async () => {
    const response = await request(app)
      .post('/getTest')
      .send({
        age: 10,
        name: 'Israel'
      })
      .set('Accept', 'application/json');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'age, name, and favorite_animal are required' });
  });
});
