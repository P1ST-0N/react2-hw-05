import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./MovieCast.module.css";

import { getFilmsDetails } from "../../js/films-api";

import LoaderMoreInform from "../../components/Loader/LoaderMoreInform";
import MovieCastItem from "../MovieCastItem/MovieCastItem";

const MovieCast = () => {
  const { id } = useParams();
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(false);

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
            <li className={style.castItem} key={cast.id}>
              <MovieCastItem dataCast={cast} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default MovieCast;
