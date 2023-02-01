import React from 'react';
import { Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {Autoplay} from 'swiper/core';
import { Navigation, Pagination } from 'swiper';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import classNames from 'classnames';

SwiperCore.use([Autoplay]);


const Slider = ({ photos, slidesPerView, autoplay = false }) => {
    return (
        <Swiper
            className={classNames('Slider')}
            slidesPerView={slidesPerView}
            spaceBetween={10}
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            speed={1000}
            loop={true}
            autoplay={autoplay}
            >
            {photos.map((photo, idx) => 
                <SwiperSlide key={idx}>
                    <Box className={classNames('SliderPicture')}>
                        <Image 
                            layout="fill" 
                            placeholder="blur" 
                            blurDataURL="../img/blur-large.jpg" 
                            src={photo.filename ? photo.filename : photo} 
                            alt={photo.description ? photo.description : ''} 
                        />
                    </Box>
                </SwiperSlide>
            )}
        </Swiper>
    )
}

export default Slider;
