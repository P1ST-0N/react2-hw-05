import style from "./MovieCastItem.module.css";
import imgNotFound from "../../assets/img/image-not-found.jpg";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getPersonDetails } from "../../js/films-api";

const MovieCastItem = ({ dataCast: { profile_path, name, character } }) => {
  //
  //   const { castId } = useParams();
  //   const [data, setData] = useState(null);
  //   const [loading, setLoading] = useState(true);

  const urlImg = `https://image.tmdb.org/t/p/w500/${profile_path}`;

  //
  //   useEffect(() => {
  //     const getData = async () => {
  //       try {
  //         setLoading(true);

  //         const data = await getPersonDetails(castId);

  //         console.log(data);
  //         setData(data);
  //       } catch (error) {
  //         console.log(error);
  //       } finally {
  //         setLoading(false);
  //       }
  //       getData();
  //     };
  //   }, [castId]);

  return (
    <div>
      <img
        className={style.castImg}
        src={profile_path ? urlImg : imgNotFound}
        alt={name}
        // width="200"
        // height="300"
      />
      <div className={style.castItemThumb}>
        <h3 className={style.castItemTitle}>{name}</h3>
        <p className={style.castItemCharacter}>
          <span className={style.castItemSpan}>Character</span>
          {character}
        </p>
        {/* <p>
          <span className={style.castItemSpan}>Biography</span>
          {biography}
        </p> */}
      </div>
    </div>
  );
};

export default MovieCastItem;
