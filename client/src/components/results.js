import React from "react";
import './results.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.css';
import image1 from '../images/r1.jpg';
import image2 from '../images/r2.jpg';

SwiperCore.use([Navigation, Pagination, Autoplay]);

const Results= () => {

    const feedbackData = [
        { image: image1 },
        { image: image2 },
        { image: image1 },
        { image: image2 },
        { image: image1 },
       
      ];
  


    return(
        <div className="results">
        <h3>Results</h3>
<div className="feedback-section">
      <Swiper spaceBetween={60} slidesPerView={4} autoplay={{ delay: 5000 }}>
        {feedbackData.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="results-card">
              {item.image && <img src={item.image}  alt={`Feedback Image ${index}`}/>}
              
            
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

        </div>
    );
}

export default Results;