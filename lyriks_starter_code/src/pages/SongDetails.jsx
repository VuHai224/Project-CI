import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { setActiveSong, playPause } from "../redux/features/playerSlice";
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from "../redux/services/shazamCore";
const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery({ songid });
  const {
    data,
    isFetching: isFetchingSongRelatedSongs,
    error,
  } = useGetSongRelatedQuery({ songid });

  const handePauseClick = () => {
    dispatch(playPause(false));
  };
  const handePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  if (isFetchingSongDetails || isFetchingSongRelatedSongs)
    return <Loader title="Searching song details" />;
  if (error) return <Error></Error>;

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId="" songData={songData}></DetailsHeader>
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold"></h2>
        <div className="mt-5">
          {songData?.sections[1].type === "LYRICS" ? (
            songData?.sections[1].text.map((line, i) => (
              <p
                key={`lyrics-${line}-${i}`}
                className=" text-gray-400 text-base my-1"
              >
                {line}
              </p>
            ))
          ) : (
            <p className=" text-gray-400 text-base my-1">
              Sorry , no lyrics found!
            </p>
          )}
        </div>
      </div>
      <RelatedSongs
        data={data?.tracks}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handePauseClick={handePauseClick}
        handePlayClick={handePlayClick}
        //artistId={artistId}
      ></RelatedSongs>
    </div>
  );
};

export default SongDetails;
