"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaStar } from 'react-icons/fa';

export default function Testimoni() {
  return (
    <>
      <Swiper
        breakpoints={{
          320: {
            slidesPerView: 1.3,
          },
          640: {
            slidesPerView: 1.5,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 3.5,
          },
          1280: {
            slidesPerView: 3.5,
          }
        }}
        spaceBetween={30}
        pagination={{
          clickable: false,
        }}
        modules={[Pagination]}
        className="mySwiper h-72 max-w-4xl
        "
      >
        <SwiperSlide className='w-64 border shadow-md rounded-4xl p-6 text-center'>
          <div className='flex flex-col gap-4'>
            <p className='line-clamp-6'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <h4 className='font-semibold text-2xl'>Nama 123</h4>
            <div className='flex items-center justify-center gap-1 text-yellow-300
            '>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className='w-64 border shadow-md rounded-4xl p-6 text-center'>
          <div className='flex flex-col gap-4'>
            <p className='line-clamp-6'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <h4 className='font-semibold text-2xl'>Nama 123</h4>
            <div className='flex items-center justify-center gap-1 text-yellow-300
            '>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className='w-64 border shadow-md rounded-4xl p-6 text-center'>
          <div className='flex flex-col gap-4'>
            <p className='line-clamp-6'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <h4 className='font-semibold text-2xl'>Nama 123</h4>
            <div className='flex items-center justify-center gap-1 text-yellow-300
            '>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className='w-64 border shadow-md rounded-4xl p-6 text-center'>
          <div className='flex flex-col gap-4'>
            <p className='line-clamp-6'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <h4 className='font-semibold text-2xl'>Nama 123</h4>
            <div className='flex items-center justify-center gap-1 text-yellow-300
            '>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className='w-64 border shadow-md rounded-4xl p-6 text-center'>
          <div className='flex flex-col gap-4'>
            <p className='line-clamp-6'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <h4 className='font-semibold text-2xl'>Nama 123</h4>
            <div className='flex items-center justify-center gap-1 text-yellow-300
            '>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className='w-64 border shadow-md rounded-4xl p-6 text-center'>
          <div className='flex flex-col gap-4'>
            <p className='line-clamp-6'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <h4 className='font-semibold text-2xl'>Nama 123</h4>
            <div className='flex items-center justify-center gap-1 text-yellow-300
            '>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}