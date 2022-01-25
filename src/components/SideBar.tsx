import { useSelectedGenreContext } from "../hook/SelectedGenreHook";
import { Button } from '../components/Button';

export function SideBar() {

  const { selectedGenre, genres, getGenreId, selectedGenreId } = useSelectedGenreContext();
  
  function handleClickButton(id: number) {
    getGenreId(id)
  }

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  )
}