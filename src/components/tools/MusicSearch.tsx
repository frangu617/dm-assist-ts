import React, { useState, useRef } from "react";
import {
  Typography,
  IconButton,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Slider,
  Checkbox,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

interface Track {
  name: string;
  file: string;
}

const AudioPlayer: React.FC = () => {
  const [audioSrc, setAudioSrc] = useState<string>("");
  const [currentTrackName, setCurrentTrackName] = useState<string>("");
  const [volume, setVolume] = useState<number>(100);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const audioRef = useRef<HTMLAudioElement>(new Audio());

  const tracks: Track[] = [
    { name: "Tavern Music 1", file: "/audio/music/tavern1.mp3" },
    { name: "Tavern Music 2", file: "/audio/music/tavern2.mp3" },
    { name: "Tavern Ambience", file: "/audio/music/tavern3.wav" },
    // Add more tracks here
  ];

  const playAudio = (track: Track) => {
    setAudioSrc(track.file);
    setCurrentTrackName(track.name);
    if (audioRef.current) {
      audioRef.current.src = track.file;
      audioRef.current.play();
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setCurrentTrackName("");
  };

  const handleVolumeChange = (_: Event, newValue: number | number[]) => {
    const newVolume = Array.isArray(newValue) ? newValue[0] : newValue;
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
    setVolume(newVolume);
  };

  const toggleFavorite = (track: Track) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [track.name]: !prevFavorites[track.name],
    }));
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Audio Player
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Now Playing: {currentTrackName || "None"}
        </Typography>
        <List>
          {tracks.map((track, index) => (
            <ListItem key={index}>
              <Checkbox
                icon={<StarBorderIcon />}
                checkedIcon={<StarIcon />}
                checked={favorites[track.name] || false}
                onChange={() => toggleFavorite(track)}
              />
              <ListItemText primary={track.name} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="play"
                  onClick={() => playAudio(track)}
                >
                  <PlayArrowIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Box mt={2} display="flex" justifyContent="center" alignItems="center">
          <VolumeDownIcon />
          <Slider
            value={volume}
            onChange={handleVolumeChange}
            aria-labelledby="continuous-slider"
            min={0}
            max={100}
          />
          <VolumeUpIcon />
          <IconButton
            color="secondary"
            onClick={pauseAudio}
            disabled={!audioSrc}
          >
            <PauseIcon />
          </IconButton>
          <IconButton onClick={stopAudio} disabled={!audioSrc}>
            <StopIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AudioPlayer;
