import * as React from "react";
import { motion, useMotionTemplate, useMotionValue, useTransform, useSpring } from "framer-motion";

// Helper functions for project information
const getProjectCategory = (title) => {
  if (title.includes("Photographs")) return "PHOTOGRAPHY";
  if (title.includes("Art Commissions")) return "ART";
  if (title.includes("Collages")) return "MIXED MEDIA";
  if (title.includes("Singapore")) return "PHOTOGRAPHY";
  if (title.includes("Independent")) return "INDEPENDENT";
  if (title.includes("Portraits")) return "PORTRAITURE";
  if (title.includes("Sketches")) return "SKETCHES";
  if (title.includes("Chair")) return "PRODUCT DESIGN";
  if (title.includes("Farm")) return "ARCHITECTURE";
  if (title.includes("fieldhouse")) return "ARCHITECTURE";
  if (title.includes("Guitar")) return "PRODUCT DESIGN";
  if (title.includes("Kaira")) return "ARCHITECTURE";
  if (title.includes("Lake")) return "ARCHITECTURE";
  if (title.includes("Brick")) return "ARCHITECTURE";
  return "PROJECT";
};

const getProjectLocation = (title) => {
  if (title.includes("Singapore")) return "Singapore";
  if (title.includes("Farm")) return "Farm to Table";
  if (title.includes("fieldhouse")) return "Roseland";
  if (title.includes("Lake")) return "Lake Meadows";
  if (title.includes("Brick")) return "Urban Context";
  return "Various Locations";
};

const getProjectDescription = (title) => {
  if (title.includes("Photographs")) return "A collection of landscape and architectural photography capturing the essence of natural and built environments through careful composition and lighting.";
  if (title.includes("Art Commissions")) return "Custom artwork created for specific clients, showcasing creative interpretation and technical skill across various mediums.";
  if (title.includes("Collages")) return "Mixed media collages that explore texture, composition, and narrative through the layering of different materials and imagery.";
  if (title.includes("Singapore")) return "Documentary photography project capturing the urban landscape and cultural diversity of Singapore through architectural and street photography.";
  if (title.includes("Independent")) return "Personal creative projects exploring themes of identity, space, and human interaction through various artistic mediums.";
  if (title.includes("Portraits")) return "Portrait photography focusing on capturing authentic expressions and the unique character of each individual subject.";
  if (title.includes("Sketches")) return "Hand-drawn sketches and conceptual drawings exploring ideas, forms, and spatial relationships through traditional drawing techniques.";
  if (title.includes("Chair")) return "Furniture design project exploring ergonomics, aesthetics, and functionality through innovative chair design concepts.";
  if (title.includes("Farm")) return "Architectural design for sustainable farm-to-table facilities, integrating agricultural and dining experiences.";
  if (title.includes("fieldhouse")) return "Architectural project focusing on community spaces and sustainable design principles for the Fieldhouse at Roseland.";
  if (title.includes("Guitar")) return "Product design project creating functional and aesthetically pleasing guitar stand solutions for musicians.";
  if (title.includes("Kaira")) return "Architectural competition entry exploring innovative design solutions for community development and cultural spaces.";
  if (title.includes("Lake")) return "Urban planning and architectural design project for the Lake Meadows Grid, focusing on sustainable community development.";
  if (title.includes("Brick")) return "Architectural intervention project exploring the relationship between historical context and contemporary design through brick construction.";
  return "A creative project showcasing innovative design thinking and artistic expression across various disciplines.";
};

/** Project images from public folders - ALL images from each project */
const LAYERS = [
  // photographs
  { src: "/photographs/LANDS.jpg", title: "Photographs - LANDS", project: "photographs", allImages: [
    "/photographs/LANDS.jpg",
    "/photographs/WhatsApp Image 2024-07-06 at 01.08.32_2fa98bbf.jpg",
    "/photographs/WhatsApp Image 2024-07-06 at 01.08.30_e8bcfba7.jpg",
    "/photographs/IMG-20240819-WA0114.jpg",
    "/photographs/IMG-20240819-WA0091.jpg",
    "/photographs/IMG-20240819-WA0071.jpg",
    "/photographs/BNW.jpg",
    "/photographs/395ec537-0a8c-43be-bdcb-9c2dea7c1ec9_rw_600.jpg",
    "/photographs/diptych/IMG-20240819-WA0113.jpg",
    "/photographs/diptych/IMG-20240819-WA0111.jpg",
    "/photographs/diptych/IMG-20240819-WA0033.jpg",
    "/photographs/diptych/IMG-20240819-WA0036.jpg",
    "/photographs/australia/aus B.jpg",
    "/photographs/australia/aus C.jpg",
    "/photographs/australia/aus A.jpg",
    "/photographs/LA/IMG-20240819-WA0102.jpg",
    "/photographs/LA/IMG-20240819-WA0098.jpg",
    "/photographs/LA/IMG-20240819-WA0097.jpg",
    "/photographs/CITY OF DREAMS/2bef1756-2e6a-4ed9-8251-2ad6e97e3ba3_rw_3840.jpg"
  ]},
  // ART COMMISSIONS
  { src: "/ART COMMISSIONS/IMG-20240819-WA0107.jpg", title: "Art Commissions", project: "art-commissions", allImages: [
    "/ART COMMISSIONS/IMG-20240819-WA0107.jpg",
    "/ART COMMISSIONS/Black-Market-Goa-7.webp"
  ]},
  // collages
  { src: "/collages/final collage.jpg", title: "Collages", project: "collages", allImages: [
    "/collages/final collage.jpg",
    "/collages/20241013_214832047_iOS.jpg",
    "/collages/20241013_214825454_iOS.jpg",
    "/collages/20241013_214757151_iOS.jpg",
    "/collages/20241013_214750478_iOS.jpg",
    "/collages/20241013_214745486_iOS.jpg",
    "/collages/20241013_214452561_iOS.jpg",
    "/collages/20241013_214445039_iOS.jpg",
    "/collages/20241013_214435046_iOS.jpg",
    "/collages/20241013_214417698_iOS.jpg",
    "/collages/20241013_214342416_iOS.jpg"
  ]},
  // commission 1-Singapore photography
  { src: "/commission 1-Singapore photography/IMG-20240819-WA0101.jpg", title: "Singapore Photography Commission", project: "singapore-photography", allImages: [
    "/commission 1-Singapore photography/IMG-20240819-WA0101.jpg",
    "/commission 1-Singapore photography/IMG-20240819-WA0100.jpg",
    "/commission 1-Singapore photography/IMG-20240819-WA.jpg",
    "/commission 1-Singapore photography/IMG-20240819-WA0099.jpg"
  ]},
  // INDEPENDENT
  { src: "/INDEPENDENT/IMG-20240819-WA0104.jpg", title: "Independent Work", project: "independent", allImages: [
    "/INDEPENDENT/IMG-20240819-WA0104.jpg",
    "/INDEPENDENT/WhatsApp Image 2024-07-06 at 00.47.38_eb63b389.jpg",
    "/INDEPENDENT/IMG-20240819-WA0103.jpg"
  ]},
  // PORTRAITS
  { src: "/PORTRAITS/PORTRAITS.jpg", title: "Portraits", project: "portraits", allImages: [
    "/PORTRAITS/PORTRAITS.jpg",
    "/PORTRAITS/d1407237-8d21-4ee5-801d-ced552b49910_rw_600.png",
    "/PORTRAITS/IMG_0349.jpg",
    "/PORTRAITS/8ad107ad-3209-4117-9a2c-2a23bee4c63b_rw_1200.png"
  ]},
  // sketches
  { src: "/sketches/IMG-20240819-WA0035.jpg", title: "Sketches", project: "sketches", allImages: [
    "/sketches/IMG-20240819-WA0035.jpg",
    "/sketches/WhatsApp Image 2024-08-15 at 15.00.10_05c680d4.jpg",
    "/sketches/WhatsApp Image 2024-08-15 at 14.53.59_aa3ec32a.jpg",
    "/sketches/WhatsApp Image 2024-08-15 at 14.59.14_311eba8c.jpg",
    "/sketches/WhatsApp Image 2024-08-15 at 14.53.59_6213e314.jpg",
    "/sketches/IMG-20240819-WA0076.jpg",
    "/sketches/IMG-20240815-WA0009.jpg",
    "/sketches/IMG-20240815-WA0004.jpg",
    "/sketches/IMG-20240815-WA0003.jpg",
    "/sketches/IMG-20240815-WA0002.jpg",
    "/sketches/IMG-20240815-WA0001.jpg"
  ]},
  // chair
  { src: "/chair/IMG-20240819-WA0084.jpg", title: "Chair Design", project: "chair", allImages: [
    "/chair/IMG-20240819-WA0093.jpg",
    "/chair/IMG-20240819-WA0095.jpg",
    "/chair/IMG-20240819-WA0090.jpg",
    "/chair/IMG-20240819-WA0088.jpg",
    "/chair/IMG-20240819-WA0089.jpg",
    "/chair/IMG-20240819-WA0085.jpg",
    "/chair/IMG-20240819-WA0086.jpg",
    "/chair/IMG-20240819-WA0084.jpg"
  ]},
  // FARM 2 TABLE
  { src: "/FARM 2 TABLE/WhatsApp Image 2024-06-10 at 02.58.15_aaf43cc8.jpg", title: "Farm to Table", project: "farm-to-table", allImages: [
    "/FARM 2 TABLE/WhatsApp Image 2024-06-10 at 02.58.15_aaf43cc8.jpg",
    "/FARM 2 TABLE/SEM 2 STUDIO AVA_SAUMYA/Slide8.JPG",
    "/FARM 2 TABLE/SEM 2 STUDIO AVA_SAUMYA/Slide9.JPG",
    "/FARM 2 TABLE/SEM 2 STUDIO AVA_SAUMYA/Slide6.JPG",
    "/FARM 2 TABLE/SEM 2 STUDIO AVA_SAUMYA/Slide7.JPG",
    "/FARM 2 TABLE/SEM 2 STUDIO AVA_SAUMYA/Slide4.JPG",
    "/FARM 2 TABLE/SEM 2 STUDIO AVA_SAUMYA/Slide5.JPG",
    "/FARM 2 TABLE/SEM 2 STUDIO AVA_SAUMYA/Slide3.JPG",
    "/FARM 2 TABLE/SEM 2 STUDIO AVA_SAUMYA/Slide2.JPG",
    "/FARM 2 TABLE/SEM 2 STUDIO AVA_SAUMYA/Slide15.JPG",
    "/FARM 2 TABLE/SEM 2 STUDIO AVA_SAUMYA/Slide14.JPG",
    "/FARM 2 TABLE/SEM 2 STUDIO AVA_SAUMYA/Slide12.JPG",
    "/FARM 2 TABLE/SEM 2 STUDIO AVA_SAUMYA/Slide13.JPG",
    "/FARM 2 TABLE/SEM 2 STUDIO AVA_SAUMYA/Slide10.JPG",
    "/FARM 2 TABLE/SEM 2 STUDIO AVA_SAUMYA/Slide11.JPG",
    "/FARM 2 TABLE/SEM 2 STUDIO AVA_SAUMYA/Slide1.JPG"
  ]},
  // fieldhouse at Roseland
  { src: "/fieldhouse at Roseland/axons FFF AI.jpg", title: "Fieldhouse at Roseland", project: "fieldhouse", allImages: [
    "/fieldhouse at Roseland/axons FFF AI.jpg",
    "/fieldhouse at Roseland/e6827997-9cc8-456c-8797-e2711e8577bc_rw_1200.png",
    "/fieldhouse at Roseland/dfb3425b-6f5c-4aa8-a598-f4dec294ead2_rw_1200.jpg",
    "/fieldhouse at Roseland/cbfaa6aa-139f-46d4-8135-f356329b54d2_rw_1200.jpg",
    "/fieldhouse at Roseland/b1f8429c-a688-4ab8-8f82-8ccec5a080df_rw_3840.jpg",
    "/fieldhouse at Roseland/beef3f89-38cb-4498-86a9-75de11feb62f_rw_600.png",
    "/fieldhouse at Roseland/WhatsApp Image 2024-07-24 at 00.43.07_2ebedbe5.jpg",
    "/fieldhouse at Roseland/WhatsApp Image 2024-07-24 at 00.43.08_d045a9fa.jpg",
    "/fieldhouse at Roseland/WhatsApp Image 2024-07-24 at 00.43.04_4e6e674c.jpg",
    "/fieldhouse at Roseland/WhatsApp Image 2024-07-24 at 00.43.03_87d714f8.jpg",
    "/fieldhouse at Roseland/WhatsApp Image 2024-07-24 at 00.43.02_87c8ca13.jpg",
    "/fieldhouse at Roseland/WhatsApp Image 2024-07-24 at 00.43.00_ad04ea82.jpg",
    "/fieldhouse at Roseland/WhatsApp Image 2024-07-24 at 00.42.54_d3f6e116.jpg",
    "/fieldhouse at Roseland/IMG-20240819-WA0042.jpg",
    "/fieldhouse at Roseland/IMG-20241001-WA0038[1].jpg",
    "/fieldhouse at Roseland/32957702-ca4a-4dd3-9e04-bae21cebd7d0_rw_600.jpg",
    "/fieldhouse at Roseland/2ca0b69d-7275-4644-93ca-94f9dac3c62f_rw_600.png",
    "/fieldhouse at Roseland/1e900642-6491-4008-a90b-839cdf9c1b8c_rw_600.jpg",
    "/fieldhouse at Roseland/14-15.jpg",
    "/fieldhouse at Roseland/1a488c6b-d05a-44ba-b293-3c77f2da2225_rw_1200.jpg"
  ]},
  // GUITAR STAND
  { src: "/GUITAR STAND/IMG-20240819-WA0083.jpg", title: "Guitar Stand", project: "guitar-stand", allImages: [
    "/GUITAR STAND/IMG-20240819-WA0083.jpg",
    "/GUITAR STAND/IMG-20240819-WA0078.jpg",
    "/GUITAR STAND/IMG-20240819-WA0081.jpg"
  ]},
  // KAIRA LOORO COMPETITION
  { src: "/KAIRA LOORO COMPETITION/eaad2649-53de-4c49-9245-8525c25cb786_rw_1200.jpg", title: "Kaira Looro Competition", project: "kaira-looro", allImages: [
    "/KAIRA LOORO COMPETITION/eaad2649-53de-4c49-9245-8525c25cb786_rw_1200.jpg",
    "/KAIRA LOORO COMPETITION/cc7ad3d2-1810-406a-b8ea-fa2745bdc3d7_rw_1920.jpg"
  ]},
  // LAKE MEADOWS GRID
  { src: "/LAKE MEADOWS GRID/c5b89841-f0a9-4fd3-b70d-e30372e92335_rw_1920.jpg", title: "Lake Meadows Grid", project: "lake-meadows", allImages: [
    "/LAKE MEADOWS GRID/c5b89841-f0a9-4fd3-b70d-e30372e92335_rw_1920.jpg",
    "/LAKE MEADOWS GRID/b7afe212-4887-4b51-81fb-2a47cd0b7e9a_rw_1920.jpg",
    "/LAKE MEADOWS GRID/IMG-20240819-WA0074.jpg",
    "/LAKE MEADOWS GRID/IMG-20240819-WA0075.jpg",
    "/LAKE MEADOWS GRID/IMG-20240819-WA0073.jpg",
    "/LAKE MEADOWS GRID/780f75b6-c7d6-4e0c-8ea4-a6851041eb27_rw_1920.jpg"
  ]},
  // Project 1-brick on the block
  { src: "/Project 1-brick on the block/f0316334-68c3-4696-97b8-acb70d1d7bcd_rw_1920.jpg", title: "Brick on the Block", project: "brick-on-block", allImages: [
    "/Project 1-brick on the block/f0316334-68c3-4696-97b8-acb70d1d7bcd_rw_1920.jpg",
    "/Project 1-brick on the block/e3a354dd-5b37-44b9-9015-4efbd9e76105_rw_1920.jpg",
    "/Project 1-brick on the block/d0a424d0-90fc-4718-b412-e5166f4e3464_rw_3840.jpg",
    "/Project 1-brick on the block/IMG-20240815-WA0008.jpg",
    "/Project 1-brick on the block/9fa5f779-464e-4c79-93ed-81303cb11161_rw_1920.jpg",
    "/Project 1-brick on the block/97e51e01-e0e4-4724-8fb0-b60549f86685_rw_1920.jpg",
    "/Project 1-brick on the block/7ebe5ecd-1329-46cf-a546-7eb7e9f7f77c_rw_1200.jpg",
    "/Project 1-brick on the block/6269a5a5-de17-409a-9fe9-cfa4227c92e7_rw_3840.jpg",
    "/Project 1-brick on the block/0c17904a-e273-42e5-ba56-1d39c1677bf0_rw_1200.jpg"
  ]},
];

/** Tweak feel here */
const CONFIG = {
  background: "#edf3ed", // page background
  size: 400,              // card square size (px)
  depth: 1680,            // depth for Z positioning
  step: 280,              // increased distance between cards on Z (px)
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
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  // Smooth infinite scroll without wrapping jumps
  const handleScroll = React.useCallback((delta) => {
    const currentValue = travelTarget.get();
    const newValue = currentValue + delta;
    
    // Use a much larger range to avoid wrapping jumps
    const maxRange = depth * 8; // 8x the depth for smooth infinite scroll
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
    setCurrentImageIndex(0);
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
          {/* Render multiple sets of images for truly seamless infinite loop */}
          {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((setIndex) => 
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
      
      {/* Project Popup Modal - Redesigned to match reference */}
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
            padding: "40px"
          }}
          onClick={() => {
            setIsModalOpen(false);
            setCurrentImageIndex(0);
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            style={{
              background: "#f8f8f8",
              borderRadius: "0",
              width: "90vw",
              maxWidth: "1200px",
              height: "80vh",
              display: "flex",
              position: "relative",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => {
                setIsModalOpen(false);
                setCurrentImageIndex(0);
              }}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "#e0e0e0",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#333",
                fontSize: "18px",
                zIndex: 10
              }}
            >
              ×
            </button>
            
            {/* Left Panel - Project Information */}
            <div style={{
              width: "35%",
              padding: "60px 40px 40px 40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}>
              <div style={{ color: "#888", fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>
                {getProjectCategory(selectedProject.data.title)}
              </div>
              <h2 style={{ 
                margin: "0 0 30px 0", 
                color: "#333", 
                fontSize: "32px", 
                fontWeight: "700",
                lineHeight: "1.2"
              }}>
                {selectedProject.data.title}
              </h2>
              
              <div style={{ marginBottom: "25px" }}>
                <div style={{ color: "#888", fontSize: "12px", fontWeight: "500", marginBottom: "5px" }}>
                  LOCATION
                </div>
                <div style={{ color: "#333", fontSize: "16px", fontWeight: "500" }}>
                  {getProjectLocation(selectedProject.data.title)}
                </div>
              </div>
              
              <div style={{ marginBottom: "25px" }}>
                <div style={{ color: "#888", fontSize: "12px", fontWeight: "500", marginBottom: "5px" }}>
                  YEAR
                </div>
                <div style={{ color: "#333", fontSize: "16px", fontWeight: "500" }}>
                  2024
                </div>
              </div>
              
              <div>
                <div style={{ color: "#888", fontSize: "12px", fontWeight: "500", marginBottom: "10px" }}>
                  DESCRIPTION
                </div>
                <div style={{ 
                  color: "#333", 
                  fontSize: "15px", 
                  lineHeight: "1.6",
                  fontWeight: "400"
                }}>
                  {getProjectDescription(selectedProject.data.title)}
                </div>
              </div>
            </div>
            
            {/* Right Panel - Image Gallery */}
            <div style={{
              width: "65%",
              position: "relative",
              background: "#000"
            }}>
                              <img
                  src={selectedProject.data.allImages[currentImageIndex]}
                  alt={selectedProject.data.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    objectPosition: "center",
                    backgroundColor: "#f5f5f5"
                  }}
                />
              
              {/* Navigation Arrows */}
              {selectedProject.data.allImages.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex(prev => 
                      prev === 0 ? selectedProject.data.allImages.length - 1 : prev - 1
                    )}
                    style={{
                      position: "absolute",
                      left: "20px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "rgba(255,255,255,0.9)",
                      border: "none",
                      borderRadius: "50%",
                      width: "50px",
                      height: "50px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      fontSize: "18px",
                      color: "#333"
                    }}
                  >
                    ‹
                  </button>
                  
                  <button
                    onClick={() => setCurrentImageIndex(prev => 
                      prev === selectedProject.data.allImages.length - 1 ? 0 : prev + 1
                    )}
                    style={{
                      position: "absolute",
                      right: "20px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "rgba(255,255,255,0.9)",
                      border: "none",
                      borderRadius: "50%",
                      width: "50px",
                      height: "50px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      fontSize: "18px",
                      color: "#333"
                    }}
                  >
                    ›
                  </button>
                </>
              )}
              
              {/* Image Counter */}
              <div style={{
                position: "absolute",
                bottom: "30px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "rgba(0,0,0,0.7)",
                color: "white",
                padding: "8px 16px",
                borderRadius: "20px",
                fontSize: "14px",
                fontWeight: "500"
              }}>
                {currentImageIndex + 1}/{selectedProject.data.allImages.length}
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
      hoverY.set(-50);
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
            objectFit: "contain",
            objectPosition: "center",
            borderRadius: 6,
            backgroundColor: "#f5f5f5"
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
