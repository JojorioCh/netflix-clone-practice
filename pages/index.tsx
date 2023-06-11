import Billboard from "@/components/billboard";
import MovieList from "@/components/movieList";
import Navbar from "@/components/navbar";
import useFavourites from "@/hooks/useFavourites";
import UseMovieList from "@/hooks/useMoviesList";

import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default function Home() {
  const { data: movies = [] } = UseMovieList();
  const { data: favourites = [] } = useFavourites();
  return (
    <>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favourites} />
      </div>
    </>
  );
}
