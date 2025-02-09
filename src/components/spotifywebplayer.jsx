import { Image } from '@aws-amplify/ui-react';
import './styling/SpotifyWebPlayerComponent.css';
import React, { useState, useEffect, useRef } from 'react'
import CrossIcon from '../icons/cross.jsx';
import MusicPlayIcon from '../icons/musicPlay.jsx';
import MusicPauseIcon from '../icons/musicPause.jsx';

const SpotifyWebPlayer = ({ track, setTrack }) => {
  const [isPaused, setPaused] = useState(true)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef(null)

  useEffect(() => {
    if (track?.previewUrl) {
      resetAudioPlayer()

      const newAudio = new Audio(track.previewUrl)
      newAudio.addEventListener('timeupdate', handleTimeUpdate)
      newAudio.addEventListener('ended', handleTrackEnded)
      audioRef.current = newAudio
      
      return () => {
        if (audioRef.current) {
          setPaused(true)
          audioRef.current.pause()
          audioRef.current.removeEventListener('timeupdate', handleTimeUpdate)
          audioRef.current.removeEventListener('ended', handleTrackEnded)
        }
      }
    }
  }, [track])

  useEffect(() => {
    // Clean up audio on unmount
    return () => {
      resetAudioPlayer()
    }
  }, [])

  const resetAudioPlayer = () => {
    if (audioRef.current) {
      setPaused(true)
      audioRef.current.pause()
      audioRef.current.removeEventListener('timeupdate', handleTimeUpdate)
      audioRef.current.removeEventListener('ended', handleTrackEnded)
      audioRef.current = null
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime
      const duration = audioRef.current.duration
      if (duration > 0) {
        const progressPercentage = (currentTime / duration) * 100
        setProgress(progressPercentage)
      }
      requestAnimationFrame(handleTimeUpdate) // Continue the update loop
    }
  }
  
  const handleTrackEnded = () => {
    setPaused(true)
    setProgress(0)
  }

  const playSound = () => {
    if (isPaused) {
      audioRef.current.play()
      setPaused(false)
    } else {
      audioRef.current.pause()
      setPaused(true)
    }
  }

  const removeTrack = () => {
    resetAudioPlayer()
    setTrack(null)
  }

  return (
    <div>
      {track ? (
        
        <div className="spotify_webplayer_container">
          <div className="spotify_webplayer_left">
            <div className="spotify_webplayer_track_container">
              <div className="spotify_webplayer_track_info_container">
                <div className="spotify_webplayer_track_image">
                  <img className="" src={track.imgUrl} alt="Track" />
                </div>
                <div className="spotify_webplayer_track_info">
                  <div className="spotify_webplayer_track_name">{track.name}</div>
                  <div className="spotify_webplayer_track_artist">{track.artist}</div>
                </div>
              </div>
              <div className="spotify_webplayer_play_button">
                <button
                  type="button"
                  onClick={playSound}
                  className={`w-10 h-10 rounded-xl backdrop-blur-[150px] flex justify-center items-center gap-[5px] ${isPaused ? 'bg-white/[0.08]' : 'bg-white'}`}
                >
                  {isPaused ? 
                    <MusicPlayIcon /> :
                    <MusicPauseIcon />
                  }
                </button>
              </div>
            </div>
            <div className="spotify_webplayer_progressbar_container">
              {(progress !== 0 && progress !== 100) && (
                <div className="spotify_webplayer_progressbar">
                  <div 
                    className="spotify_webplayer_progressbar_filled"
                    style={{ width: `${progress}%` }}
                  >
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="spotify-webplayer-right" onClick={removeTrack}>
            <CrossIcon />
          </div>
          
        </div>
      ) : null}
    </div>
  );
};

export default SpotifyWebPlayer;