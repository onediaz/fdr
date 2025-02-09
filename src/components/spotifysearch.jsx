import { Autocomplete, Flex, HighlightMatch, Image } from "@aws-amplify/ui-react";
import { useEffect, useState, useRef } from "react";
import { spotifyPrediction } from "../functions/spotify.js";
import SpotifyWebPlayer from "./spotifywebplayer.jsx";

const SpotifySearch = () => {
  const [searchOption, setSearchOption] = useState('');
  const [musicOptions, setMusicOptions] = useState([]);
  const debounceTimeout = useRef(null); // Ref to store the timeout ID
  const [track, setTrack] = useState(null);

  const onChange = (event) => {
    setSearchOption(event.target.value);
  };

  const onClear = () => {
    setSearchOption('');
    setTrack(null);
  };

  const onSelect = (option) => {
    setTrack(option);
  }

  useEffect(() => {
    const fetchOptions = async () => {
      if (!searchOption) return; // Add a check to avoid unnecessary calls
      let tracks = await spotifyPrediction(searchOption);
      console.log("Fetched tracks:", tracks);

      // Properly map tracks to the format expected by Autocomplete
      const mappedTracks = tracks.map(track => ({
        label: track.name,
        id: track.id,
        name: track.name,
        artist: track.artists[0]?.name,
        imgUrl: track.album?.images[2]?.url,
        previewUrl: track?.preview_url
      }));

      console.log("Mapped tracks:", mappedTracks);
      setMusicOptions(mappedTracks);
    };

    if (searchOption !== '') {
      // Clear the previous timeout if it exists
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      // Set a new timeout to call fetchOptions after 250ms
      debounceTimeout.current = setTimeout(() => {
        fetchOptions();
      }, 250);
    }

    // Cleanup function to clear timeout if the component unmounts or searchOption changes
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [searchOption]);

  const renderOption = (option, value) => {
    const { name, artist, imgUrl } = option;
    return (
      <Flex alignItems="center">
        <Image src={imgUrl || ''} alt={name} width="48px" height="48px" />
        <HighlightMatch query={value}>{`${name} by ${artist}`}</HighlightMatch>
      </Flex>
    );
  };

  return (
    <>
      <Autocomplete
        label="Autocomplete"
        value={searchOption}
        options={musicOptions}
        placeholder="Search song here..."
        onChange={onChange}
        renderOption={renderOption}
        onClear={onClear}
        onSelect={onSelect}
      />
      
      Current Track: {track && track.name}
      <SpotifyWebPlayer track={track} setTrack={setTrack}/>
    </>
  );
};

export default SpotifySearch;
