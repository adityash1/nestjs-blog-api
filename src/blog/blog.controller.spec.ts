import { Test, TestingModule } from '@nestjs/testing';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { getModelToken } from '@nestjs/mongoose';
import { CreatePostDTO } from './dto/create-post.dto';

describe('BlogController', () => {
  let controller: BlogController;
  let service: BlogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogController],
      providers: [
        BlogService,
        {
          provide: getModelToken('Post'),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<BlogController>(BlogController);
    service = module.get<BlogService>(BlogService);
  });

  
  describe('addPost', () => {
    it('should return a success message and new post', async () => {
      const createPostDTO: CreatePostDTO = {
        title: 'Test Title', description: 'Test Content',
        created_by: "Test User",
        created_on: undefined
      };
      const result = { ...createPostDTO };
      jest.spyOn(service, 'addPost').mockImplementation(() => result);

      expect(await controller.addPost({ status: jest.fn() }, createPostDTO)).toEqual({
        message: 'Post has been submitted successfully!',
        post: result,
      });
    });
  });

  describe('editPost', () => {
    it('should return a success message and updated post', async () => {
      const postID = 'postID';
      const createPostDTO: CreatePostDTO = {
        title: 'Test Title', description: 'Test Content',
        created_by: "Test User",
        created_on: undefined
      };
      const result = { ...createPostDTO, postID };
      jest.spyOn(service, 'editPost').mockImplementation(() => result);

      expect(await controller.editPost({ status: jest.fn() }, postID, createPostDTO)).toEqual({
        message: 'Post has been successfully updated',
        post: result,
      });
    });

    it('should throw an error if post does not exist', async () => {
      const postID = 'postID';
      const createPostDTO: CreatePostDTO = {
        title: 'Test Title', description: 'Test Content',
        created_by: "Test User",
        created_on: undefined
      };
      jest.spyOn(service, 'editPost').mockImplementation(() => null);

      try {
        await controller.editPost({ status: jest.fn() }, postID, createPostDTO);
      } catch (error) {
        expect(error.message).toBe('Post does not exist!');
      }
    });
  });

  describe('deletePost', () => {
    it('should return a success message and deleted post', async () => {
      const postID = 'postID';
      const result = { postID };
      jest.spyOn(service, 'deletePost').mockImplementation(() => result);

      expect(await controller.deletePost({ status: jest.fn() }, postID)).toEqual({
        message: 'Post has been deleted!',
        post: result,
      });
    });

    it('should throw an error if post does not exist', async () => {
      const postID = 'postID';
      jest.spyOn(service, 'deletePost').mockImplementation(() => null);

      try {
        await controller.deletePost({ status: jest.fn() }, postID);
      } catch (error) {
        expect(error.message).toBe('Post does not exist!');
      }
    });
  }
});

