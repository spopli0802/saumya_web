import * as React from "react";
import { motion, useMotionTemplate, useMotionValue, useTransform, useSpring } from "framer-motion";

/** Hard-coded image stack with 30 images for infinite scrolling */
const LAYERS = [
  { src: "https://framerusercontent.com/images/ivKAk1QY4dgdCO4NGtJzScTTqYc.png" },
  { src: "https://framerusercontent.com/images/DnhqVj3PWvTkfHMIZOfWMEsuE.png" },
  { src: "https://framerusercontent.com/images/M8DRQx4FLjXoabfA5xneWuUN8.png" },
  { src: "https://framerusercontent.com/images/9pl497JuoPyHrCKRyKuD0f6bbY4.png" },
  { src: "https://framerusercontent.com/images/dhR8sBvImPT95LmNC7qoabhwQ.png" },
  { src: "https://framerusercontent.com/images/EwDumDS2t1oJUmFldiswYIAzCY.png" },
  { src: "https://framerusercontent.com/images/zpLhnPRYkE32Ws9lSjgLPF78Y.png" },
  { src: "https://framerusercontent.com/images/89vQCykE66vsNukWeQNGrmZtUM.png" },
  { src: "https://framerusercontent.com/images/nhoaJqS3eBlS5UNOyK4Cn0EWI2Y.png", fit: "cover" },
  { src: "https://framerusercontent.com/images/U1fI4kxu2h0dkB39cFDsvJuKc.png" },
  { src: "https://framerusercontent.com/images/E5UQdLXwdGUXNnzlTrMEyzzPRE.png" },
  { src: "https://framerusercontent.com/images/LosEfdw6kZg4XVad09xHCII3NA.png", fit: "contain" },
  { src: "https://framerusercontent.com/images/feTxU0GQO2297LStCstjznKEuK0.png", fit: "contain" },
  { src: "https://framerusercontent.com/images/lLG8T8CVT3bs3sgsZYqpThw8.png" },
  { src: "https://framerusercontent.com/images/WbOjiDXhuR3dM6GQ2Czsi7VVs.png", fit: "contain" },
  { src: "https://framerusercontent.com/images/EWUxMa44NHT7bmXsz0XPTR8FXZc.png", fit: "contain" },
  // Adding more images to reach 30 total
  { src: "https://framerusercontent.com/images/ivKAk1QY4dgdCO4NGtJzScTTqYc.png" },
  { src: "https://framerusercontent.com/images/DnhqVj3PWvTkfHMIZOfWMEsuE.png" },
  { src: "https://framerusercontent.com/images/M8DRQx4FLjXoabfA5xneWuUN8.png" },
  { src: "https://framerusercontent.com/images/9pl497JuoPyHrCKRyKuD0f6bbY4.png" },
  { src: "https://framerusercontent.com/images/dhR8sBvImPT95LmNC7qoabhwQ.png" },
  { src: "https://framerusercontent.com/images/EwDumDS2t1oJUmFldiswYIAzCY.png" },
  { src: "https://framerusercontent.com/images/zpLhnPRYkE32Ws9lSjgLPF78Y.png" },
  { src: "https://framerusercontent.com/images/89vQCykE66vsNukWeQNGrmZtUM.png" },
  { src: "https://framerusercontent.com/images/nhoaJqS3eBlS5UNOyK4Cn0EWI2Y.png", fit: "cover" },
  { src: "https://framerusercontent.com/images/U1fI4kxu2h0dkB39cFDsvJuKc.png" },
  { src: "https://framerusercontent.com/images/E5UQdLXwdGUXNnzlTrMEyzzPRE.png" },
  { src: "https://framerusercontent.com/images/LosEfdw6kZg4XVad09xHCII3NA.png", fit: "contain" },
  { src: "https://framerusercontent.com/images/feTxU0GQO2297LStCstjznKEuK0.png", fit: "contain" },
  { src: "https://framerusercontent.com/images/lLG8T8CVT3bs3sgsZYqpThw8.png" },
  { src: "https://framerusercontent.com/images/WbOjiDXhuR3dM6GQ2Czsi7VVs.png", fit: "contain" },
  { src: "https://framerusercontent.com/images/EWUxMa44NHT7bmXsz0XPTR8FXZc.png", fit: "contain" },
];

/** Tweak feel here */
const CONFIG = {
  background: "#edf3ed", // page background
  size: 400,              // card square size (px)
  depth: 1680,            // depth for Z positioning
  step: 210,              // distance between cards on Z (px)
  pageHeightVh: 400,      // 4x viewport height for infinite scrolling
  minOpacity: 0.15,       // minimum opacity for visibility
  startCentered: true,    // show middle card at page top
};

export default function VinylScroller({ onImageClick }) {
  const { background, size, depth, step, pageHeightVh, minOpacity, startCentered } = CONFIG;
  
  // Smooth spring-based travel for user-controlled scrolling
  const travelTarget = useMotionValue(0);
  const travel = useSpring(travelTarget, { stiffness: 70, damping: 22, mass: 0.4 });
  const containerRef = React.useRef(null);
  
  // State for popup modal
  const [selectedProject, setSelectedProject] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Smooth infinite scroll without wrapping jumps
  const handleScroll = React.useCallback((delta) => {
    const currentValue = travelTarget.get();
    const newValue = currentValue + delta;
    
    // Use a much larger range to avoid wrapping jumps
    const maxRange = depth * 10; // 10x the depth for smooth infinite scroll
    let adjustedValue = newValue;
    
    // Only wrap when we're way out of bounds to avoid visual jumps
    if (newValue > maxRange / 2) {
      adjustedValue = newValue - maxRange;
    } else if (newValue < -maxRange / 2) {
      adjustedValue = newValue + maxRange;
    }
    
    travelTarget.set(adjustedValue);
  }, [travelTarget, depth]);

  // Wheel/touch driven inner scrolling, page stays fixed
  React.useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const handleWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY * 0.85; // slightly dampened for smoothness
      handleScroll(delta);
    };

    let lastY = null;
    const onTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) lastY = e.touches[0].clientY;
    };
    const onTouchMove = (e) => {
      if (e.touches && e.touches.length > 0 && lastY !== null) {
        const currentY = e.touches[0].clientY;
        const delta = (lastY - currentY) * 0.85; // mimic wheel deltaY with damping
        lastY = currentY;
        handleScroll(delta);
      }
    };
    const onTouchEnd = () => { lastY = null; };

    node.addEventListener('wheel', handleWheel, { passive: false });
    node.addEventListener('touchstart', onTouchStart, { passive: true });
    node.addEventListener('touchmove', onTouchMove, { passive: false });
    node.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      node.removeEventListener('wheel', handleWheel);
      node.removeEventListener('touchstart', onTouchStart);
      node.removeEventListener('touchmove', onTouchMove);
      node.removeEventListener('touchend', onTouchEnd);
    };
      }, [travelTarget, handleScroll]);

  // Center the middle item at Z≈0
  const offsets = React.useMemo(() => {
    const mid = Math.floor(LAYERS.length / 2);
    return LAYERS.map((_, i) => (i - mid) * step);
  }, [step]);

  // Handle image click to open popup modal
  const handleImageClick = (imageIndex) => {
    setSelectedProject({
      index: imageIndex,
      data: LAYERS[imageIndex]
    });
    setIsModalOpen(true);
  };

  return (
    <div ref={containerRef} style={{ 
      position: "fixed", 
      top: 0, 
      left: 0, 
      width: "100vw", 
      height: "100vh", 
      background,
      overflow: "hidden"
    }}>
      <div style={{ 
        position: "absolute", 
        inset: 0, 
        perspective: 1900, 
        perspectiveOrigin: "50% 50%" 
      }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            transformStyle: "preserve-3d",
            transform: "rotateX(-27deg) rotateY(-45deg)",
            willChange: "transform",
          }}
        >
          {/* Render multiple sets of images for seamless infinite loop */}
          {[-2, -1, 0, 1, 2].map((setIndex) => 
            LAYERS.map((layer, i) => (
              <LayerCard
                key={`${setIndex}-${i}`}
                layer={layer}
                size={size}
                zOffset={offsets[i] + (setIndex * depth * 2)}
                travel={travel}
                depth={depth}
                minOpacity={minOpacity}
                imageIndex={i}
                onImageClick={handleImageClick}
              />
            ))
          )}
        </div>
      </div>
      
      {/* Project Popup Modal */}
      {isModalOpen && selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.8)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px"
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "30px",
              maxWidth: "500px",
              width: "100%",
              maxHeight: "80vh",
              overflow: "auto",
              position: "relative"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                position: "absolute",
                top: "15px",
                right: "20px",
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                color: "#666"
              }}
            >
              ×
            </button>
            
            {/* Project content */}
            <div style={{ marginTop: "10px" }}>
              <img
                src={selectedProject.data.src}
                alt={`Project ${selectedProject.index + 1}`}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "20px"
                }}
              />
              <h2 style={{ margin: "0 0 15px 0", color: "#333" }}>
                Project {selectedProject.index + 1}
              </h2>
              <p style={{ color: "#666", lineHeight: "1.6", margin: "0 0 20px 0" }}>
                This is a detailed description of Project {selectedProject.index + 1}. 
                You can customize this content with specific project information, 
                technologies used, challenges overcome, and results achieved.
              </p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <span style={{
                  background: "#edf3ed",
                  color: "#333",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "14px"
                }}>
                  React
                </span>
                <span style={{
                  background: "#edf3ed",
                  color: "#333",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "14px"
                }}>
                  Framer Motion
                </span>
                <span style={{
                  background: "#edf3ed",
                  color: "#333",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "14px"
                }}>
                  Portfolio
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

function LayerCard({ layer, zOffset, travel, depth, size, minOpacity, imageIndex, onImageClick }) {
  const [isHovered, setIsHovered] = React.useState(false);

  // Helpers for transforms
  const addOffset = React.useCallback((t) => t + zOffset, [zOffset]);
  const proximity = React.useCallback((v) => {
    const ratio = Math.abs(v) / depth;
    const clamped = ratio > 1 ? 1 : ratio < 0 ? 0 : ratio;
    return 1 - clamped; // 1 near center, 0 far
  }, [depth]);
  const toScale = React.useCallback((c) => 0.6 + 0.4 * c, []);
  const toOpacity = React.useCallback((c) => Math.max(minOpacity, 0.02 + 0.98 * c * c), [minOpacity]);
  const toBlur = React.useCallback((c) => `blur(${(1 - c) * 60}px)`, []);

  // Transform travel to Z position using useTransform
  const z = useTransform(travel, (t) => t + zOffset);
  const close = useTransform(z, (zPos) => proximity(zPos));
  const scale = useTransform(close, (c) => toScale(c));
  const opacity = useTransform(close, (c) => toOpacity(c));
  const blur = useTransform(close, (c) => toBlur(c));

  // Simple hover spring for clean upward movement
  const hoverY = useSpring(0, { stiffness: 300, damping: 25, mass: 0.5 });

  React.useEffect(() => {
    if (isHovered) {
      hoverY.set(-25);
    } else {
      hoverY.set(0);
    }
  }, [isHovered, hoverY]);

  const transform = useMotionTemplate`translate(-50%, -50%) translateY(${hoverY}px) translateZ(${z}px) scale(${scale})`;
  const filterValue = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: size,
        height: size,
        borderRadius: 6,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        background: "#000",
        transform,
        opacity,
        filter: filterValue,
        backfaceVisibility: "hidden",
        willChange: "transform, opacity, filter",
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onImageClick(imageIndex)}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 6,
          overflow: "hidden",
          position: "relative",
        }}
        animate={{
          boxShadow: isHovered 
            ? "0 40px 80px rgba(0,0,0,0.6), 0 0 0 3px rgba(255,255,255,0.2), 0 15px 35px rgba(0,0,0,0.3)" 
            : "0 10px 20px rgba(0,0,0,0.2)"
        }}
      >
        <img
          src={layer.src}
          loading="lazy"
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: layer.fit ?? "cover",
            objectPosition: "center",
            borderRadius: 6,
          }}
          alt={`Portfolio image ${imageIndex + 1}`}
        />
                        {/* Enhanced vinyl reflection effect on hover */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: "linear-gradient(45deg, transparent 20%, rgba(255,255,255,0.4) 40%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.4) 60%, transparent 80%)",
                      borderRadius: 6,
                      pointerEvents: "none",
                    }}
                  />
                )}
      </motion.div>
    </motion.div>
  );
}
