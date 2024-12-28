import React, { useEffect, useRef, useState, memo, useCallback } from "react";
import { Volume, VolumeX, ArrowDown, Play } from "lucide-react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

const VIDEOS = [
  "/videos/hero-1.mp4",
  "/videos/hero-2.mp4",
  "/videos/hero-3.mp4",
  "/videos/hero-4.mp4"
];

const VIDEO_INTERVAL = 10000;
const PARTICLE_COUNT = 5000;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const buttonVariants = {
  idle: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};

const VideoBackground = memo(({ src, isMuted, isActive, onLoadStart, onLoadEnd }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: isActive ? 1 : 0 }}
    transition={{ duration: 1 }}
    className="absolute inset-0"
  >
    <video
      autoPlay
      loop
      playsInline
      muted={isMuted}
      className="w-full h-full object-cover"
      onLoadStart={onLoadStart}
      onLoadedData={onLoadEnd}
    >
      <source src={src} type="video/mp4" />
      <track kind="captions" />
    </video>
  </motion.div>
));

const AudioController = memo(({ isAudioLoaded, isMuted, onToggle }) => (
  <motion.button
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: isAudioLoaded ? 1 : 0, y: isAudioLoaded ? 0 : 20 }}
    transition={{ duration: 0.3 }}
    onClick={onToggle}
    variants={buttonVariants}
    whileHover="hover"
    whileTap="tap"
    className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-4 py-2
             bg-black/30 backdrop-blur-sm border border-yellow-400/30
             text-yellow-400 rounded-full hover:bg-yellow-400/10"
  >
    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume className="w-4 h-4" />}
    <span className="text-sm font-medium">{isMuted ? "Activer" : "Désactiver"}</span>
  </motion.button>
));

// Optimized Particle System
class ParticleSystem {
  constructor(canvas, width, height) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });

    this.init(width, height);
  }

  init(width, height) {
    this.camera.position.set(0, 0, 5);
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;

      colors[i] = Math.random() * 0.3 + 0.7;
      colors[i + 1] = Math.random() * 0.3 + 0.7;
      colors[i + 2] = Math.random() * 0.2;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.015,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
    this.scene.add(this.particles);
  }

  animate = () => {
    this.particles.rotation.y += 0.0005;
    this.particles.rotation.x += 0.0002;
    this.renderer.render(this.scene, this.camera);
  }

  resize = (width, height) => {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  cleanup = () => {
    this.renderer.dispose();
    this.particles.geometry.dispose();
    this.particles.material.dispose();
  }
}

const Hero = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const containerRef = useRef(null);
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const particleSystemRef = useRef(null);
  const rafRef = useRef(null);

  // Update dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setDimensions({ width: clientWidth, height: clientHeight });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Video rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % VIDEOS.length);
    }, VIDEO_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  // Three.js setup
  useEffect(() => {
    if (!canvasRef.current || !dimensions.width) return;

    particleSystemRef.current = new ParticleSystem(
      canvasRef.current,
      dimensions.width,
      dimensions.height
    );

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      particleSystemRef.current?.animate();
    };

    animate();

    const handleResize = () => {
      if (particleSystemRef.current && dimensions.width) {
        particleSystemRef.current.resize(dimensions.width, dimensions.height);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafRef.current);
      particleSystemRef.current?.cleanup();
    };
  }, [dimensions]);

  const handleMuteToggle = useCallback(() => {
    if (!audioRef.current) return;

    if (isMuted) {
      audioRef.current.muted = false;
      audioRef.current.volume = 0;
      audioRef.current.play()
        .then(() => {
          gsap.to(audioRef.current, {
            volume: 0.5,
            duration: 1
          });
        })
        .catch(console.error);
    } else {
      gsap.to(audioRef.current, {
        volume: 0,
        duration: 0.5,
        onComplete: () => {
          audioRef.current.muted = true;
          audioRef.current.pause();
        }
      });
    }
    setIsMuted(!isMuted);
  }, [isMuted]);

  // GSAP background animation
  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { backgroundColor: "rgba(0, 0, 0, 0)" },
      { backgroundColor: "rgba(0, 0, 0, 0.5)", duration: 2, repeat: -1, yoyo: true }
    );
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-gray-900"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Video Layer */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          {VIDEOS.map((video, index) => (
            currentVideoIndex === index && (
              <VideoBackground
                key={video}
                src={video}
                isMuted={isMuted}
                isActive={true}
                onLoadStart={() => setIsLoading(true)}
                onLoadEnd={() => setIsLoading(false)}
              />
            )
          ))}
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/40 z-[1]" />
      </div>

      {/* Particle Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[2] pointer-events-none"
      />

      {/* Audio */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onCanPlayThrough={() => setIsAudioLoaded(true)}
        className="hidden"
      >
        <source src="/audio/loop.mp3" type="audio/mp3" />
      </audio>

      {/* Content */}
      <motion.div
        className="relative z-[3] h-full container mx-auto px-4"
        variants={containerVariants}
      >
        <div className="h-full flex flex-col items-center justify-center text-center">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 mb-8"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            Découvrez les Meilleurs
            <br />
            Animes et Mangas
          </motion.h1>

          <motion.p
            className="max-w-2xl text-lg sm:text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            Explorez notre sélection unique et trouvez votre prochaine série préférée.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.a
              href="/top-media"
              className="group relative px-8 py-4 bg-yellow-400 rounded-xl overflow-hidden"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.div
                className="absolute inset-0 bg-yellow-300"
                initial={{ y: "100%" }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-1 font-bold text-gray-900 flex items-center gap-2">
                Explorer le Top 2025
                <Play className="w-4 h-4" />
              </span>
            </motion.a>

            <motion.a
              href="/about"
              className="px-8 py-4 border-2 border-yellow-400/50 text-yellow-400 rounded-xl
                hover:bg-yellow-400/10 transition-colors duration-300"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              En savoir plus
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-6 h-6 text-yellow-400/70" />
        </motion.div>
      </motion.div>

      <AudioController
        isAudioLoaded={isAudioLoaded}
        isMuted={isMuted}
        onToggle={handleMuteToggle}
      />
    </motion.div>
  );
};

export default memo(Hero);