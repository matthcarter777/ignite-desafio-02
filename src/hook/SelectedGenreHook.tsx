import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { api } from '../services/api';

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

interface SelectedGenreProviderProps {
  children: ReactNode;
}

interface SelectedGenreContextData  {
  selectedGenre: GenreResponseProps;
  getGenreId: (id: number) => void;
  genres: GenreResponseProps[];
  movies: MovieProps[];
  selectedGenreId: number;
}

const SelectedGenreContext = createContext<SelectedGenreContextData>({} as SelectedGenreContextData);

export function SelectedGenreProvider ({ children }: SelectedGenreProviderProps) {

  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  function getGenreId(id: number) {
    setSelectedGenreId(id)
  }

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  return (
    <SelectedGenreContext.Provider
      value={{
        genres,
        movies,
        selectedGenre,
        getGenreId,
        selectedGenreId
      }}
    >
      { children }
    </SelectedGenreContext.Provider>
  )
}

export function useSelectedGenreContext() {
  const context = useContext(SelectedGenreContext);

  return context;
}