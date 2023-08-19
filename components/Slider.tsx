import React, { FC } from 'react';
import { Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
// @ts-ignore  
import SwiperCore, {Autoplay} from 'swiper/core';
import { Navigation, Pagination } from 'swiper';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import classNames from 'classnames';


interface ISliderPhoto {
    description?: string
    filename: string
    filesize: number
    filetype: string
    position: number
}

interface ISliderProps {
    photos: ISliderPhoto[] | string[]
    customClass?: string
    slidesPerView: number
    autoplay?: boolean
}

SwiperCore.use([Autoplay]);

const Slider:FC <ISliderProps> = ({ photos, slidesPerView, customClass, autoplay = false }) => {

    return (
        <Swiper
            className={classNames('Slider')}
            // slidesPerView={slidesPerView}
            spaceBetween={10}
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            speed={1000}
            loop={true}
            autoplay={autoplay}
            breakpoints={{
                // when window width is >= 640px
                480: {
                  slidesPerView: 1,
                },
                // when window width is >= 768px
                768: {
                  slidesPerView: (slidesPerView != 1) ? 2 : 1,
                },
                1200: {
                    slidesPerView: slidesPerView
                }
            }}
            >
            {photos.map((photo, idx) => 
                <SwiperSlide key={idx}>
                    <Box className={classNames('SliderPicture', customClass)}>
                        <Image 
                            layout="fill" 
                            placeholder="blur" 
                            blurDataURL="../img/blur-large.jpg" 
                            // src={photo.filename ? photo.filename : photo}
                            src={typeof photo === 'string' ? photo : photo.filename}
                            alt={typeof photo === 'string' ? '' : photo.description ? photo.description : ''} 
                        />
                    </Box>
                </SwiperSlide>
            )}
        </Swiper>
    )
}

export default Slider;
