import { useEffect, useState, useMemo } from "react";
import { getFilmsTrendingAccess } from "../../js/films-api";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import style from "./HomePage.module.css";

const HomePage = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const dataFilms = await getFilmsTrendingAccess();
      //   console.log(dataFilms);
      setFilms(dataFilms);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  // Используем useMemo для кэширования результата вызова getFilmsTrendingAccess()
  const memoizedFilms = useMemo(() => films, [films]);

  return (
    <main className={style.mainSection}>
      <h1 className={style.mainTitle}>Trending Today</h1>
      {loading && <Loader />}
      {/* Передаем memoizedFilms в MovieList */}
      <MovieList filmsList={memoizedFilms} />
    </main>
  );
};

export default HomePage;
