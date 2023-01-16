import React from "react";
import { Error, Loader, ArtistCard } from "../components";
import { useGetTopChartQuery } from "../redux/services/shazamCore";

const TopArtists = () => {
  const { data, isFetching, error } = useGetTopChartQuery();

  if (isFetching) return <Loader title="Loading Top Charts"></Loader>;
  if (error) return <Error></Error>;
  console.log(data);
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Top Artists
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.tracks?.map((track) => (
          <ArtistCard key={track.key} track={track}></ArtistCard>
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
