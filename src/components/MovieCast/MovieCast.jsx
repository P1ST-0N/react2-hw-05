import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";

import style from "./MovieCast.module.css";

import { getFilmsDetails } from "../../js/films-api";

import LoaderMoreInform from "../../components/Loader/LoaderMoreInform";
import MovieCastItem from "../MovieCastItem/MovieCastItem";

const MovieCast = () => {
  const { id } = useParams();
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleClick = async () => {
      try {
        setLoading(true);
        setCredits([]);

        const dataCredits = await getFilmsDetails(id, "/credits");
        setCredits(dataCredits.cast);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    handleClick();
  }, [id]);

  return (
    <section className={style.castSection}>
      {loading && <LoaderMoreInform />}

      {credits && (
        <ul className={style.castList}>
          {credits.map((cast) => (
            <Link
              to={`/cast/${cast.id}`}
              state={{ from: location }}
              key={cast.id}
            >
              <li className={style.castItem}>
                <MovieCastItem dataCast={cast} />
              </li>
            </Link>
          ))}
        </ul>
      )}
    </section>
  );
};

export default MovieCast;
