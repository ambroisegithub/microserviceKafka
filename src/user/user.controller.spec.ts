import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';
import * as request from 'supertest';

describe('UserController', () => {
  let app: INestApplication;
  let createdUserId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Create a user
    const createUserResponse = await request(app.getHttpServer())
      .post('/users')
      .send({
        email: 'test@example.com',
        password: 'testpassword',
      });

    createdUserId = createUserResponse.body.id;

    console.log('User created:', createUserResponse.body);
  });

  afterAll(async () => {
    await app.close();
  }, 10000);

  it('/users (GET all)', async () => {
    const response = await request(app.getHttpServer()).get('/users');

    console.log('GET all users:', response.body);

    expect(response.status).toBe(200);
    // You might want to further validate the response body here
  });

  it('/users/:id (GET one)', async () => {
    const response = await request(app.getHttpServer()).get(
      `/users/${createdUserId}`,
    );

    console.log('GET user by ID:', response.body);

    expect(response.status).toBe(200);
    // You might want to further validate the response body here
  });

  it('/users/:id (PUT)', async () => {
    const response = await request(app.getHttpServer())
      .put(`/users/${createdUserId}`)
      .send({
        email: 'updated@example.com',
        password: 'updatedpassword',
      });

    console.log('Update user:', response.body);

    expect(response.status).toBe(200);
    // You might want to further validate the response body here
  });

  it('/users/:id (PUT)', async () => {
    const response = await request(app.getHttpServer())
      .put(`/users/${createdUserId}`)
      .send({
        email: 'updated@example.com',
        password: 'updatedpassword',
      });

    console.log('Update user:', response.body);

    expect(response.status).toBe(200);
    // You might want to further validate the response body here
  });

  it('/users/:id (DELETE)', async () => {
    // Delete the user
    const deleteUserResponse = await request(app.getHttpServer()).delete(
      `/users/${createdUserId}`,
    );

    console.log('Delete user:', deleteUserResponse.body);

    expect(deleteUserResponse.status).toBe(200); // Or you can use 204 if you're not returning content

    // Create a new user after deletion
    const createUserResponse = await request(app.getHttpServer())
      .post('/users')
      .send({
        email: 'newuser@example.com',
        password: 'newuserpassword',
      });

    createdUserId = createUserResponse.body.id;

    console.log('New user created:', createUserResponse.body);
  });
});
