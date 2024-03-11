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

const MovieDetailsPage = () => {};

export default MovieDetailsPage;
