import React, { useState, useRef } from 'react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const AudioPlayer = () => {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  const handleMuteToggle = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <audio ref={audioRef} loop autoPlay>
        <source src="/audio/naruto_ending_1.mp3" type="audio/mp3" />
        Votre navigateur ne supporte pas l'élément audio.
      </audio>
      <button onClick={handleMuteToggle} className="text-white text-2xl">
        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>
    </div>
  );
};

export default AudioPlayer;