import { useRef, useState } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize
} from "lucide-react";

export default function UltraVideoPlayer({ src }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);

  const togglePlay = () => {
    if (playing) videoRef.current.pause();
    else videoRef.current.play();
    setPlaying(!playing);
  };

    const toggleMute = () => {
    videoRef.current.muted = !muted;
    setMuted(!muted);
     };

  const toggleFullscreen = () => {
    if (!fullscreen) videoRef.current.requestFullscreen?.();
    else document.exitFullscreen?.();
    setFullscreen(!fullscreen);
  };

  const handleProgress = () => {
    const percent =
      (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(percent);
  };

  return (
    <div
      className="relative w-full bg-black rounded-2xl overflow-hidden group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={src}
        onTimeUpdate={handleProgress}
        className="w-full h-64 object-cover"
      />

      {!playing && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Play className="w-20 h-20 text-white/90 drop-shadow-xl hover:scale-110 transition transform" />
        </button>
      )}

      <div
        className={`absolute bottom-0 left-0 right-0 p-3 
          bg-gradient-to-t from-black/70 to-transparent
          transition-opacity duration-300
          ${showControls || !playing ? "opacity-100" : "opacity-0"}
        `}
      >
        <div className="flex items-center gap-3">

          <button
            onClick={togglePlay}
            className="text-white p-2 hover:bg-white/20 rounded-full transition"
          >
            {playing ? <Pause size={22} /> : <Play size={22} />}
          </button>

          <div className="flex-1 h-2 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <button
            onClick={toggleMute}
            className="text-white p-2 hover:bg-white/20 rounded-full transition"
          >
            {muted ? <VolumeX size={22} /> : <Volume2 size={22} />}
          </button>

          <button
            onClick={toggleFullscreen}
            className="text-white p-2 hover:bg-white/20 rounded-full transition"
          >
            {fullscreen ? <Minimize size={22} /> : <Maximize size={22} />}
          </button>
        </div>
      </div>

      <div className="absolute top-3 right-3 bg-white/20 text-white text-xs px-2 py-1 rounded-md backdrop-blur">
        HD
      </div>
    </div>
  );
}
