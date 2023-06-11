import Billboard from "@/components/billboard";
import InfoModal from "@/components/infoModal";
import MovieList from "@/components/movieList";
import Navbar from "@/components/navbar";
import useFavourites from "@/hooks/useFavourites";
import useInfoModal from "@/hooks/useInfoModal";
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
  const {isOpen, closeModal} = useInfoModal()
  return (
    <>
    <InfoModal visible={isOpen} onClose={closeModal}/>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favourites} />
      </div>
    </>
  );
}
