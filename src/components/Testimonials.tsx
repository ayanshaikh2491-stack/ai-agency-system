import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

const Testimonials = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-center">
      <Swiper
        modules={[Navigation, Autoplay]}
        loop
        autoplay={{ delay: 3000 }}
        spaceBetween={30}
        navigation
      >
        <SwiperSlide>
          <blockquote>
            <p>"Amazing service! They delivered exactly what we needed."</p>
            <footer>— Jane Doe, Client</footer>
          </blockquote>
        </SwiperSlide>
        <SwiperSlide>
          <blockquote>
            <p>"The team was responsive and delivered high-quality work."</p>
            <footer>— John Smith, Client</footer>
          </blockquote>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Testimonials;
