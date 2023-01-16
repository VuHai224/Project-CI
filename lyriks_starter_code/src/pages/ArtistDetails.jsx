import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { useGetArtistDetailQuery } from "../redux/services/shazamCore";
const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: artistData, isFetching: isFetchingArtistDetails } =
    useGetArtistDetailQuery({ artistId });
  if (isFetchingArtistDetails) return <Loader title="Loading artist details" />;
  //if (error) return <Error></Error>;
  return (
    <div className="flex flex-col">
      <DetailsHeader
        artistId={artistId}
        artistData={artistData?.resources?.artists[`${artistId}`]}
      ></DetailsHeader>

      <RelatedSongs
        data={Object.values(artistData?.resources?.songs)}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      ></RelatedSongs>
    </div>
  );
};

export default ArtistDetails;
