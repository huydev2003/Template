import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import "./style.css";
import { bannerService } from "../../services/banner.service";
import { useQuery } from '@tanstack/react-query';

export default function Slider() {
    const { data, isLoading } = useQuery(
        ["banner"],
        () => bannerService.fetchAllBanners(),
        {
          retry: 3,
          retryDelay: 1000,
        }
    );
    
  return (

        <>
          <Swiper className="mySwiper">
            {data?.map((item) => (
            <SwiperSlide><img src={item.imagePath} alt={item.nameImage} /></SwiperSlide>
            ))}
          </Swiper>
        </>
      );
}


