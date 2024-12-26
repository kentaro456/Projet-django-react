import React, { useEffect, useRef, useState, memo } from "react";
import { Volume, VolumeX, ArrowDown } from "lucide-react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

const VIDEO_INTERVAL = 10000;

const VideoBackground = memo(({ src, isMuted, className }) => (
  <video autoPlay loop playsInline muted={isMuted} className={className}>
    <source src={src} type="video/mp4" />
    <track kind="captions" />
  </video>
));

VideoBackground.displayName = "VideoBackground";

const Hero = () => {
  const videos = [
    "/videos/hero-1.mp4",
    "/videos/hero-2.mp4",
    "/videos/hero-3.mp4",
    "/videos/hero-4.mp4"
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true); // Start with muted audio
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);
  const audioRef = useRef(null);
  const videoContainerRef = useRef(null);
  const heroCanvasRef = useRef(null);

  useEffect(() => {
    // Change the video every VIDEO_INTERVAL milliseconds
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, VIDEO_INTERVAL);

    return () => clearInterval(interval);
  }, [videos.length]);

  const handleMuteToggle = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.muted = false;
        audioRef.current.volume = 1.0;
        audioRef.current.play().catch((err) => console.error("Audio play failed:", err));
      } else {
        audioRef.current.muted = true;
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    // Automatically play audio and ensure it's unmuted when the component mounts
    if (audioRef.current) {
      audioRef.current.muted = false; // Unmute by default
      audioRef.current.play().catch((err) => console.error("Audio play failed:", err));
    }

    // Basic Three.js setup for particles and camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    heroCanvasRef.current.appendChild(renderer.domElement);

    // Lighting setup
    const pointLight = new THREE.PointLight(0xffcc00, 1, 10);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    // Particle system setup
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10; // Random position in 3D space
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xffcc00,
      size: 0.02, // Smaller particles
      transparent: true,
      opacity: 0.7, // Slightly transparent particles
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      particles.rotation.y = elapsedTime * 0.1; // Rotate particles

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Handle resizing
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0" ref={videoContainerRef}>
        <VideoBackground
          src={videos[currentVideoIndex]}
          isMuted={isMuted}
          className="w-full h-full object-cover transition-opacity duration-1000"
        />
        <link
          rel="preload"
          href={videos[(currentVideoIndex + 1) % videos.length]}
          as="video"
          type="video/mp4"
        />
      </div>

      {/* Background Audio */}
      <audio
        ref={audioRef}
        onCanPlayThrough={() => setIsAudioLoaded(true)}
        loop
        preload="auto"
        className="hidden"
      >
        <source src="/audio/loop.mp3" type="audio/mp3" />
        <track kind="captions" />
      </audio>

      {/* Three.js Canvas */}
      <div ref={heroCanvasRef} className="absolute inset-0 z-0" />

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-yellow-400 drop-shadow-lg tracking-tight">
          Découvrez les Meilleurs Animes et Mangas de 2025
        </h1>
        <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
          Plongez dans l'univers fascinant des animes et mangas. Explorez les classements,
          lisez des critiques et trouvez votre prochaine série préférée.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 sm:space-x-4">
          <a
            href="/top-media"
            className="inline-flex items-center justify-center px-8 py-4 bg-yellow-400 text-gray-900 font-semibold rounded-full shadow-lg hover:bg-yellow-500 transition-all transform hover:scale-110"
          >
            Voir le Top 2025
          </a>
          <a
            href="/about"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-yellow-400 text-yellow-400 font-semibold rounded-full hover:bg-yellow-400 hover:text-gray-900 transition-all transform hover:scale-110"
          >
            En savoir plus
          </a>
        </div>

        {/* Mute Toggle Button */}
        {isAudioLoaded && (
          <button
            onClick={handleMuteToggle}
            aria-label={isMuted ? "Activer le son" : "Désactiver le son"}
            className="mt-8 inline-flex items-center px-6 py-3 border-2 border-yellow-400 text-yellow-400 font-semibold rounded-full hover:bg-yellow-400 hover:text-gray-900 opacity-70 hover:opacity-100 transition-all transform hover:scale-110"
          >
            {isMuted ? (
              <VolumeX className="mr-2 h-4 w-4" />
            ) : (
              <Volume className="mr-2 h-4 w-4" />
            )}
            {isMuted ? "Activer le son" : "Désactiver le son"}
          </button>
        )}
      </div>
    </section>
  );
};

export default memo(Hero);
