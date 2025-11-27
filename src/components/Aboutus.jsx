import React, { useState } from "react";
import "../components/style.css";
import { Link } from "react-router-dom";

// Import images
import computersImg from "../assets/images/crops.jpg";
import mobilesImg from "../assets/images/fruits.jpg";
import laptopsImg from "../assets/images/vegetables.jpg";
import accessoriesImg from "../assets/images/dairy.jpg";
import grainsImg from "../assets/images/grains.jpg";
import herbsImg from "../assets/images/herbs.jpg";
import PoultryproductsImg from "../assets/images/poultry products.jpg";
import organicProductsImg from "../assets/images/organic_products.jpg";
import agroProcessedImg from "../assets/images/agro_processed.jpg";
import specialtyProductsImg from "../assets/images/specialty_products.jpg";

const AboutUs = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="about-container">
      {/* Enlarged Search Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '32px',
        marginBottom: '16px'
      }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            width: '600px',         // Enlarged width
            padding: '14px',        // Enlarged height
            fontSize: '20px',       // Larger text
            borderRadius: '12px',   // More rounded corners
            border: '1px solid #ccc'
          }}
        />
      </div>

      <h2>About Our Agriculture Platform</h2>
      <p>
        Welcome to our platform: farmer-friendly, connecting farmers directly
        with buyers! List your produce, track sales, and get insights on market
        trends.
      </p>

      <div className="about-grid">
        <Link to="/crops" style={{ cursor: "pointer" }}>
          <div className="about-item">
            <img src={computersImg} alt="Crops" />
            <h3>Crops</h3>
            <p>Explore a variety of grains and staple crops directly from farmers.</p>
          </div>
        </Link>

        <Link to="/fruits" style={{ cursor: "pointer" }}>
          <div className="about-item">
            <img src={mobilesImg} alt="Fruits" />
            <h3>Fruits</h3>
            <p>Fresh and seasonal fruits sourced locally from trusted farmers.</p>
          </div>
        </Link>

        <Link to="/vegetables" style={{ cursor: "pointer" }}>
          <div className="about-item">
            <img src={laptopsImg} alt="Vegetables" />
            <h3>Vegetables</h3>
            <p>Organic and fresh vegetables perfect for your healthy meals.</p>
          </div>
        </Link>

        <Link to="/dairy" style={{ cursor: "pointer" }}>
          <div className="about-item">
            <img src={accessoriesImg} alt="Dairy Products" />
            <h3>Dairy Products</h3>
            <p>High-quality milk and dairy products from local farmers.</p>
          </div>
        </Link>

        <Link to="/grains" style={{ cursor: "pointer" }}>
          <div className="about-item">
            <img src={grainsImg} alt="Grains" />
            <h3>Grains</h3>
            <p>Whole grains of the highest quality for all your baking and cooking needs.</p>
          </div>
        </Link>

        <Link to="/herbs" style={{ cursor: "pointer" }}>
          <div className="about-item">
            <img src={herbsImg} alt="Herbs" />
            <h3>Herbs</h3>
            <p>Fresh herbs that add flavor and aroma to any dish.</p>
          </div>
        </Link>

        <Link to="/poultry products" style={{ cursor: "pointer" }}>
          <div className="about-item">
            <img src={PoultryproductsImg} alt="Livestock and Poultry" />
            <h3>Poultry products</h3>
            <p>High quality livestock and poultry perfect for your farm needs.</p>
          </div>
        </Link>

        <Link to="/organic-products" style={{ cursor: 'pointer' }}>
          <div className="about-item">
            <img src={organicProductsImg} alt="Organic and Natural Products" />
            <h3>Organic and Natural Products</h3>
            <p>Organic seeds, bio-fertilizers, herbal pesticides</p>
          </div>
        </Link>

        <Link to="/agro-processed-products" style={{ cursor: 'pointer' }}>
          <div className="about-item">
            <img src={agroProcessedImg} alt="Agro-processed Products" />
            <h3>Agro-processed Products</h3>
            <p>Jams, pickles, dried fruits, packaged farm products</p>
          </div>
        </Link>

        <Link to="/special-products" style={{ cursor: "pointer" }}>
          <div className="about-item">
            <img src={specialtyProductsImg} alt="Specialty and Local Products" />
            <h3>Specialty and Local Products</h3>
            <p>Traditional, unique farm produce from local farmers.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;
