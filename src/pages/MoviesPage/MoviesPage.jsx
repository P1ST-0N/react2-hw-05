import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import style from "./MoviesPage.module.css";

import { getFilmsSearch } from "../../js/films-api";

import SearchBox from "../../components/SearchBox/SearchBox";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";

const MoviesPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useParams();
  const searchQuery = searchParams.get("search");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSearchResults([]);

    const searchData = async (query, page) => {
      try {
        setLoading(true);

        const response = await getFilmsSearch(query, page);
        setSearchResults(response.results);
        setTotalPages(response.total_pages);

        if (!response.total_results) {
          toast(
            "Sorry, we have not found the films for your request. Try to write it differently.",
            {
              duration: 5000,
            }
          );
        } else {
          toast.success(`Wow! We found ${response.total_results} films`);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      searchData(searchQuery, currentPage);
    }
  }, [currentPage, searchQuery]);

  return (
    <main>
      <section>
        <SearchBox></SearchBox>
        <Toaster></Toaster>
        <Loader />
        <MovieList />
        <div>
          <button></button>
          <button></button>
        </div>
      </section>
    </main>
  );
};

export default MoviesPage;
