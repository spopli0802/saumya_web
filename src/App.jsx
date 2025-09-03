import React, { useState } from "react";
import VinylScroller from "./VinylScroller";
import "./App.css";

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState('vinyl');

  // Handle image selection and navigation
  const handleImageClick = (imageIndex, imageData) => {
    console.log(`Navigating to image ${imageIndex}: ${imageData.src}`);
    setSelectedImage(imageData);
    
    // You can customize this navigation logic
    if (imageIndex === 0) {
      setCurrentPage('portfolio');
    } else if (imageIndex === 1) {
      setCurrentPage('about');
    } else if (imageIndex === 2) {
      setCurrentPage('contact');
    } else {
      setCurrentPage('gallery');
    }
  };

  // Go back to vinyl view
  const goBack = () => {
    setCurrentPage('vinyl');
    setSelectedImage(null);
  };

  // Render different pages based on selection
  if (currentPage !== 'vinyl') {
    return (
      <div className="page-container">
        <button onClick={goBack} className="back-button">
          ← Back to Vinyl View
        </button>
        <div className="page-content">
          <h1>{currentPage.charAt(0).toUpperCase() + currentPage.slice(1)} Page</h1>
          {selectedImage && (
            <div className="selected-image">
              <img src={selectedImage.src} alt="Selected" />
              <p>You clicked on image {selectedImage.src}</p>
            </div>
          )}
          <p>This is the {currentPage} page. Customize it with your content!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="main-title">Suamya Sukthankar</h1>
          </div>
          <div className="header-right">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="instagram-link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <button className="contact-button">Contact</button>
          </div>
        </div>
      </header>
      
      {/* Main Vinyl Content - Exactly the same */}
      <VinylScroller onImageClick={handleImageClick} />
    </div>
  );
}
