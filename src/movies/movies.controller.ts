import { Controller, Get, Param, Post, Delete, Put, Patch, Body, Query, Res, Req } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/Movie.entity';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get('search')
  search(@Query('year') year: number) {
    return `we are searching a movie made after: ${year}`;
  }

  @Get('/:id')
  getOne(@Param('id') id: number): Movie {
    return this.moviesService.getOne(id);
  }

  @Post()
  create(@Body() movieData: CreateMovieDTO) {
    return this.moviesService.create(movieData);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.moviesService.deleteOne(id);
  }

  @Patch(':id')
  patch(@Param('id') id: number, @Body() updateData: UpdateMovieDTO) {
    return this.moviesService.update(id, updateData);
  }
}
