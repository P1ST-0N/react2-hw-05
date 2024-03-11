import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import { format } from "date-fns";
import { GoArrowLeft } from "react-icons/go";
import clsx from "clsx";

import { getFilmsDetails } from "../../js/films-api";

import Loader from "../../components/Loader/Loader";
import style from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const backLinkHref = location.state?.from ?? "/";

  const buildLinkClass = (to) => {
    return clsx(
      style.btnLink,
      location.pathname === to && style.moreInfoLinkActive
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const dataFilm = await getFilmsDetails(id);
        setFilm(dataFilm);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const formatDate = (date) => {
    return format(new Date(date), "MMMM dd yyyy");
  };

  const fallbackImage = {
    image:
      "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg",
  };

  const userScore = film ? (Number(film.vote_average) * 10).toFixed(0) : null;

  return (
    <section className={style.movieDetails}>
      <Link to={backLinkHref}>
        <button className={style.btnLink}>
          <GoArrowLeft size="20" />
          Go Back
        </button>
      </Link>

      {loading && <Loader />}

      {film && (
        <div className={style.movieDetailsSection}>
          <div className={style.movieDetailsThumb}>
            <img
              className={style.movieDetailsImg}
              src={
                film.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${film.poster_path}`
                  : fallbackImage.image
              }
              alt={film.original_title}
              width="350"
              height="500"
            />
            <div>
              <h2 className={style.movieDetailsTitle}>{film.original_title}</h2>
              <p className={style.movieDetailsTagline}>{film.tagline}</p>
              <p className={style.movieDetailsText}>
                <span className={style.spanAccent}>Release date:</span>{" "}
                {formatDate(film.release_date)}
              </p>
              {userScore !== "0" && userScore !== null && (
                <div className={style.movieDetailsScore}>
                  <p className={style.movieDetailsText}>
                    <span className={style.spanAccent}>User Score:</span>{" "}
                    {userScore}&#37;
                  </p>{" "}
                  <span
                    className={
                      userScore < 60 ? style.iconSpilled : style.iconUpright
                    }
                  ></span>
                </div>
              )}
              <h3 className={style.movieDetailsTitleFilm}>Overview</h3>
              <p className={`${style.movieDetailsText} ${style.forLaptop}`}>
                {film.overview}
              </p>
              <h3 className={style.movieDetailsTitleFilm}>Genres</h3>
              <ul className={style.movieDetailsGenresList}>
                {film.genres.map((genre) => (
                  <li className={style.movieDetailsText} key={genre.id}>
                    {genre.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <nav className={style.moreInfo}>
            <NavLink
              className={buildLinkClass(`/movies/${id}/cast`)}
              to={"cast"}
              state={location.state}
            >
              Cast
            </NavLink>
            <NavLink
              className={buildLinkClass(`/movies/${id}/reviews`)}
              to={"reviews"}
              state={location.state}
            >
              Reviews
            </NavLink>
          </nav>
          <Suspense>
            <Outlet />
          </Suspense>
        </div>
      )}
    </section>
  );
};

export default MovieDetailsPage;
