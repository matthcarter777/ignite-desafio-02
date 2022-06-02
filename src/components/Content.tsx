import { memo, useEffect, useState } from 'react';
import { useSelectedGenreContext } from '../hook/SelectedGenreHook';
import lodash from 'lodash';

import { MovieCard } from './MovieCard';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface ContentProps {
  selectedGenre?: GenreResponseProps;
  movies?: MovieProps[];
}

function ContentComponent({ }: ContentProps) {

  const { selectedGenre, movies } = useSelectedGenreContext()

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>
    
      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )
}

export const Content = memo(ContentComponent, (prevProps, nextProps) => {
  return lodash.isEqual(prevProps.movies, nextProps.movies)
})