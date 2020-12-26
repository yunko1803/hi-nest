import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll()', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    })
  })

  describe('getOne()', () => {
    it('should return a movie', () => {
      service.create({
        title: 'test movie',
        genres: ['action'],
        year: 2020,
      })
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    })
    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 999 not found.')
      }
    })
  })

  describe('deleteOne()', () => {
    it('should delete a movie', () => {
      service.create({
        title: 'test movie',
        genres: ['action'],
        year: 2020,
      })
      service.deleteOne(1);
      const result = service.getAll();
      expect(result).toEqual([]);
    })
  })

  describe('create()', () => {
    it('should create a movie', () => {
      const tempMovie = {
        title: 'test movie',
        genres: ['action'],
        year: 2020,
      };
      service.create(tempMovie)
      const movie = service.getAll();
      expect(movie).toHaveLength(1);
    })
  })

  describe('updateOne()', () => {
    it('should update a movie', () => {
      service.create({
        title: 'test movie',
        genres: ['action'],
        year: 2020,
      })
      service.update(1, { year: 2030 });
      const movie = service.getOne(1);
      expect(movie.year).toEqual(2030);
    })
  })
});
