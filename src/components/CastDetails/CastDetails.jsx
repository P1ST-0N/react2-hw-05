import { Link, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import css from "./CastDetails.module.css";
import noMovieImg from "../../assets/img/image-not-found.jpg";
import { getPersonDetails } from "../../js/films-api";

const CastDetails = () => {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        //
        console.log(id);

        const data = await getPersonDetails(id);

        console.log(data);

        setData(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getData();
  }, [id]);

  const location = useLocation();
  console.log(location.pathname);

  const cameBack = location.state?.from ?? "/";

  return (
    <>
      <Link className={css.btn} to={cameBack}>
        Go Back
      </Link>
      {loading ? (
        "Loading..."
      ) : (
        <>
          <div className={css.imgWrap}>
            <Link to={`/cast/${id}`}>
              {data.profile_path ? (
                <img
                  className={css.img}
                  alt={data.name}
                  src={`https://image.tmdb.org/t/p/w500${data.profile_path}`}
                />
              ) : (
                <img className={css.img} src={noMovieImg} alt="not available" />
              )}
            </Link>

            <div className={css.descrWrap}>
              <h1>{data.name}</h1>
              <p className={css.descrTitle}>Biography</p>
              <p>{data.biography}</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CastDetails;
