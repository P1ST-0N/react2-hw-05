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

  const fallbackImage = {
    image:
      "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg",
  };

  const userScore = film ? (Number(film.vote_average) * 10).toFixed(0) : null;

  return (
    <section className={style.movieDetails}>
      <Link to={backLinkHref}>
        <button className={style.btnLink}></button>
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
              <h2></h2>
              <p></p>
              <p>
                <span></span>
              </p>
              <div>
                <p>
                  <span></span>
                </p>
              </div>
              <h3></h3>
              <p></p>
              <h3></h3>
              <ul>{}</ul>
            </div>
          </div>
          <nav>
            <NavLink></NavLink>
            <NavLink></NavLink>
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
