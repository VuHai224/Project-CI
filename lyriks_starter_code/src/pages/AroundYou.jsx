import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { useGetSongByCountryQuery } from "../redux/services/shazamCore";

const AroundYou = () => {
  const [country, setCountry] = useState("en-US");
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching, error } = useGetSongByCountryQuery(country);

  if (loading && isFetching)
    return <Loader title="Loading Songs Around You"></Loader>;
  if (error) return <Error></Error>;
  console.log(data);
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around You
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.tracks?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data?.tracks}
            i={i}
          ></SongCard>
        ))}
      </div>
    </div>
  );
};

export default AroundYou;
