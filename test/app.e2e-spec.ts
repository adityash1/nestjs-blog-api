import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/blog/post (POST)', () => {
    return request(app.getHttpServer())
      .post('/blog/post')
      .send({
        title: 'New Post',
        description: 'New Post Content',
        created_by: 'Aditya',
      })
      .expect(201)
      .expect({
        post: {
          title: 'New Post',
          description: 'New Post Content',
          created_by: 'Aditya',
          _id: expect.any(String),
          __v: 0,
        },
      });
  });

  it('/blog/post/:postID (PATCH)', () => {
    return request(app.getHttpServer())
      .patch('/blog/post/5e9c8f7f6c2b6d2e6c2c6f3b')
      .send({
        title: 'Updated Post',
        content: 'Updated Post Content',
        created_by: 'Aditya',
      })
      .expect(200)
      .expect({
        title: 'Updated Post',
        content: 'Updated Post Content',
        created_by: 'Aditya',
        created_on: expect.any(String),
        _id: '5e9c8f7f6c2b6d2e6c2c6f3b',
        __v: 0,
      });
  });

  it('/blog/post/:postID (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/blog/post/5e9c8f7f6c2b6d2e6c2c6f3b')
      .expect(200)
      .expect({
        title: 'Updated Post',
        description: 'Updated Post Content',
        _id: '5e9c8f7f6c2b6d2e6c2c6f3b',
        __v: 0,
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
