  import React from 'react';
  import { Swiper, SwiperSlide } from 'swiper/react';
  import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
  import 'swiper/swiper-bundle.css';
  import './Feedback.css';


  SwiperCore.use([Navigation, Pagination, Autoplay]);


  const FeedBack = () => {
    const feedbackData = [
      { id: 1, name: 'Ruwan Perera', comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. " },
      { id: 2, name: 'Dasun Harshana', comment:  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. " },
    ];

    return (
      <div className="feedback-section">

        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
        >
          {feedbackData.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="feedback-card">
              <h3>Students' FeedBack</h3>
                  <blockquote>
          
                <h4>{item.name}</h4>
                <p>{item.comment}</p>
                </blockquote>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  };

  export default FeedBack;


