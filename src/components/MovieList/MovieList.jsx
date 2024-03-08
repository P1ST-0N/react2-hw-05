import { Link, useLocation } from "react-router-dom";

import MovieItem from "../MovieItem/MovieItem";
import style from "./MovieList.module.css";

const MovieList = ({ filmsList }) => {
  //   console.log(filmsList);
  const location = useLocation();

  // Проверяем, является ли filmsList массивом и он не пустой перед использованием map()
  if (!Array.isArray(filmsList) || filmsList.length === 0) {
    // Если filmsList не является массивом или пуст, выводим сообщение об ошибке или заглушку
    console.error("filmsList is not a non-empty array!");
    return <div>No films available</div>; // или другое предпочтительное значение
  }

  return (
    <div className={style.container}>
      <ul className={style.filmsList}>
        {filmsList.map((film) => (
          <li key={film.id} className={style.filmItem}>
            <Link to={`/movies/${film.id}`} state={{ from: location }}>
              <MovieItem dataFilm={film} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
