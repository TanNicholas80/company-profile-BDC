"use client"

import Image from "next/image";
import Footer from "./(landing)/_components/Footer";
import Navbar from "./(landing)/_components/Navbar";
import { Button } from "./components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import * as React from "react";
import { useState, useEffect } from "react";
import Testimoni from "./(landing)/_components/Testimoni";
import { FaCalendarDay, FaClock, FaInstagram, FaSuitcase, FaWhatsapp } from "react-icons/fa";

export default function Home() {
  const images = [
    '/images/carouselImage_1.jpg',
    '/images/carouselImage_2.jpg',
    '/images/carouselImage_3.jpg',
  ];

  const totalSlides = images.length;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  // Fungsi navigasi yang memperbarui state dan navigasi carousel
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const handleIndicatorClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="mt-24">
      <Navbar />

      {/* Hero Section Start Here */}
      <section className="p-3 md:p-6 xl:px-20">
        <div className="banner-hero relative rounded-4xl min-h-56 md:min-h-96 overflow-hidden shadow-sm">
          <Image className="background-banner w-full absolute -z-50" src="/images/backgroundHero.jpg" alt="Background Image" width={1280} height={1280} sizes="100vw" />
          <Image className="hero-image-1" src="/images/toothHero.png" alt="Hero Image" width={180} height={180} />
          <Image className="hero-image-2" src="/images/toothHero.png" alt="Hero Image" width={180} height={180} />
          <Image className="hero-image-3" src="/images/toothHero.png" alt="Hero Image" width={180} height={180} />
          <div className=" h-full w-full absolute flex flex-col gap-2 md:gap-3 xl:gap-8 text-center items-center justify-center p-6">
            <h1 className="text-text font-semibold text-2xl md:text-5xl">Your Bright Smile,<br className="xl:hidden" /> <span className="text-primary-red font-semibold">Our Commitment</span></h1>
            <p className="text-gray-600 text-xs md:text-3xl md:font-semibold">Berdedikasi untuk memberikan perawatan gigi <br className="hidden xl:block" /> terbaik bagi Anda dan keluarga.</p>
            <Button asChild variant="outline" className="bg-transparent border-primary-red rounded-4xl hover:bg-white hover:text-primary-red transition-colors duration-300 md:text-lg md:font-semibold md:px-8 py-6">
              <Link href="/" className="text-primary-red">Buat Janji Temu</Link>
            </Button>
          </div>
        </div>
      </section>
      {/* Hero Section End Here */}

      {/* About Section Start Here */}
      <section className="p-6 md:p-8 xl:px-16">
        <div className="about-us flex flex-col gap-3 md:gap-6">

          <div className="md:flex">
            <div className="about-hero rounded-4xl flex flex-col gap-2 z-20 overflow-hidden min-h-52 md:min-w-1/2 xl:min-w-1/3 px-8 text-white">
              <h1 className="mt-16 text-2xl font-semibold">TENTANG</h1>
              <p className="text-lg mr-6">Bungah Family Dental Care</p>
              <Button asChild className="w-fit bg-transparent rounded-full hover:bg-white hover:text-primary-red flex justify-center transition-all duration-300">
                <Link href="/">Selengkapnya <ChevronRight /></Link>
              </Button>
            </div>

            <div className="px-6 py-3">
              <p className="text-gray-600 text-sm text-justify leading-6"><span className="text-text font-bold text-lg">Bungah Family Dental Care</span> merupakan klinik gigi keluarga yang berlokasi di Jl. Hasanuddin, sekitar 500 meter di belakang Stasiun Kereta Api Poncol, menuju ke arah Perumahan Tanah Mas. Dengan tim dokter berpengalaman dan fasilitas modern, kami melayani pasien dari segala usia, mulai dari anak-anak hingga lansia. </p>
              <div className="flex-col gap-6 md:flex-row hidden xl:flex mt-3">
                <div className="px-8 py-5 bg-accentColor-125 rounded-4xl shadow-xl">
                  <p className="text-gray-600 text-sm text-justify leading-6"><span className="font-bold text-lg text-text">Visi kami adalah</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                </div>

                <div className="px-8 py-5 bg-accentColor-125 rounded-4xl shadow-xl">
                  <p className="text-gray-600 text-sm text-justify leading-6"><span className="font-bold text-lg text-text">Misi kami adalah</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 md:flex-row xl:hidden">
            <div className="px-8 py-5 bg-accentColor-125 rounded-4xl shadow-xl">
              <p className="text-gray-600 text-sm text-justify leading-6"><span className="font-bold text-lg text-text">Visi kami adalah</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
            </div>

            <div className="px-8 py-5 bg-accentColor-125 rounded-4xl shadow-xl">
              <p className="text-gray-600 text-sm text-justify leading-6"><span className="font-bold text-lg text-text">Misi kami adalah</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
            </div>
          </div>
        </div>
      </section>
      {/* About Section End Here */}

      {/* Service Section Start Here */}
      <section className="p-6 md:p-8 xl:px-16">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">LAYANAN <br className="md:hidden" /> KAMI</h1>
          <Button asChild className="w-fit bg-transparent rounded-full text-primary-red border border-primary-red hover:bg-gray-200 hover:text-primary-red flex justify-center items-center transition-all duration-300">
            <Link href="/">Lihat Semua <ChevronRight /></Link>
          </Button>
        </div>

        <div className="px-10 py-6 md:px-28">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <div className="rounded-4xl overflow-hidden shadow-xl">
              <div className="relative">
                <Image className="h-32 object-cover" src="/images/card_image_scaling.jpeg" alt="Scalling Pembersihan Karang Gigi" width={512} height={512} />
                <div className="text-white flex flex-col justify-center items-center absolute left-10 bottom-0 translate-y-1/2 bg-accentColor-950 p-4 rounded-full border-4 border-white">
                  <svg className="w-6 h-6 text-white fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path d="M112 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm40 304l0 128c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-223.1L59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l58.3-97c17.4-28.9 48.6-46.6 82.3-46.6l29.7 0c33.7 0 64.9 17.7 82.3 46.6l58.3 97c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9L232 256.9 232 480c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-128-16 0z" />
                  </svg>
                  <p className="text-xs">Dewasa</p>
                </div>
              </div>
              <div className="p-6 flex flex-col gap-2">
                <h1 className="mt-6 text-lg font-semibold min-h-12 line-clamp-2">SCALLING (PEMBERSIHAN KARANG GIGI)</h1>
                <p className="line-clamp-3 text-xs min-h-12">prosedur yang dilakukan untuk membersihkan atau menghilangkan karang gigi yang menempel di permukaan gigi, terutama di dekat garis gusi. </p>
                <Link className="group flex w-fit items-center gap-1 relative text-black transition-colors duration-200 hover:text-gray-600" href="/">
                  <span className="group-hover:text-gray-600 transition-colors duration-200">Lihat detail</span>
                  <ChevronRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:text-gray-600" />
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black opacity-0 scale-y-0 transition-all duration-200 group-hover:opacity-100 group-hover:scale-y-100 group-hover:bg-gray-600"></span>
                </Link>
              </div>
            </div>
            <div className="rounded-4xl overflow-hidden shadow-xl">
              <div className="relative">
                <Image className="h-32 object-cover" src="/images/card_image_consultation.jpg" alt="Scalling Pembersihan Karang Gigi" width={512} height={512} />
                <div className="text-white flex flex-col justify-center items-center absolute left-10 bottom-0 translate-y-1/2 bg-accentColor-950 p-4 rounded-full border-4 border-white">
                  <svg className="w-6 h-6 text-white fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path d="M112 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm40 304l0 128c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-223.1L59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l58.3-97c17.4-28.9 48.6-46.6 82.3-46.6l29.7 0c33.7 0 64.9 17.7 82.3 46.6l58.3 97c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9L232 256.9 232 480c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-128-16 0z" />
                  </svg>
                  <p className="text-xs">Dewasa</p>
                </div>
              </div>
              <div className="p-6 flex flex-col gap-2">
                <h1 className="mt-6 text-lg font-semibold min-h-12 line-clamp-2">KONSULTASI GIGI</h1>
                <p className="line-clamp-3 text-xs min-h-12">kunjungan ke dokter gigi untuk mendapat masukan terkait kesehatan gigi dan mulut, serta mendapat saran untuk perawatan gigi jika diperlukan.</p>
                <Link className="group flex w-fit items-center gap-1 relative text-black transition-colors duration-200 hover:text-gray-600" href="/">
                  <span className="group-hover:text-gray-600 transition-colors duration-200">Lihat detail</span>
                  <ChevronRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:text-gray-600" />
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black opacity-0 scale-y-0 transition-all duration-200 group-hover:opacity-100 group-hover:scale-y-100 group-hover:bg-gray-600"></span>
                </Link>
              </div>
            </div>
            <div className="rounded-4xl overflow-hidden shadow-xl">
              <div className="relative">
                <Image className="h-32 object-cover" src="/images/card_image_child.jpg" alt="Scalling Pembersihan Karang Gigi" width={512} height={512} />
                <div className="text-white flex flex-col justify-center items-center absolute left-10 bottom-0 translate-y-1/2 bg-accentColor-950 p-4 rounded-full border-4 border-white">
                  <svg className="w-6 h-6 text-white fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                    <path d="M160 0a64 64 0 1 1 0 128A64 64 0 1 1 160 0zM88 480l0-80-17.8 0c-10.9 0-18.6-10.7-15.2-21.1l31.1-93.4L57.5 323.3c-10.7 14.1-30.8 16.8-44.8 6.2s-16.8-30.7-6.2-44.8L65.4 207c22.4-29.6 57.5-47 94.6-47s72.2 17.4 94.6 47l58.9 77.7c10.7 14.1 7.9 34.2-6.2 44.8s-34.2 7.9-44.8-6.2l-28.6-37.8L265 378.9c3.5 10.4-4.3 21.1-15.2 21.1L232 400l0 80c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-80-16 0 0 80c0 17.7-14.3 32-32 32s-32-14.3-32-32zM480 0a64 64 0 1 1 0 128A64 64 0 1 1 480 0zm-8 384l0 96c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-179.5L395.1 321c-9.4 15-29.2 19.4-44.1 10s-19.4-29.2-10-44.1l51.7-82.1c17.6-27.9 48.3-44.9 81.2-44.9l12.3 0c33 0 63.7 16.9 81.2 44.9L619.1 287c9.4 15 4.9 34.7-10 44.1s-34.7 4.9-44.1-10L552 300.5 552 480c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-96-16 0z" />
                  </svg>
                  <p className="text-xs">Anak-anak</p>
                </div>
              </div>
              <div className="p-6 flex flex-col gap-2">
                <h1 className="mt-6 text-lg font-semibold min-h-12 line-clamp-2">PERAWATAN SALURAN GIGI ANAK</h1>
                <p className="line-clamp-3 text-xs min-h-12">Perawatan saluran akar gigi anak adalah prosedur yang dilakukan untuk memperbaiki gigi anak  yang terinfeksi atau rusak hingga mencapai pulpa gigi</p>
                <Link className="group flex w-fit items-center gap-1 relative text-black transition-colors duration-200 hover:text-gray-600" href="/">
                  <span className="group-hover:text-gray-600 transition-colors duration-200">Lihat detail</span>
                  <ChevronRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:text-gray-600" />
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black opacity-0 scale-y-0 transition-all duration-200 group-hover:opacity-100 group-hover:scale-y-100 group-hover:bg-gray-600"></span>
                </Link>
              </div>
            </div>
            <div className="rounded-4xl overflow-hidden shadow-xl">
              <div className="relative">
                <Image className="h-32 object-cover" src="/images/card_image_gigi_palsu.jpg" alt="Scalling Pembersihan Karang Gigi" width={512} height={512} />
                <div className="text-white flex flex-col justify-center items-center absolute left-10 bottom-0 translate-y-1/2 bg-accentColor-950 p-4 rounded-full border-4 border-white">
                  <svg className="w-6 h-6 text-white fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                    <path d="M160 0a64 64 0 1 1 0 128A64 64 0 1 1 160 0zM88 480l0-80-17.8 0c-10.9 0-18.6-10.7-15.2-21.1l31.1-93.4L57.5 323.3c-10.7 14.1-30.8 16.8-44.8 6.2s-16.8-30.7-6.2-44.8L65.4 207c22.4-29.6 57.5-47 94.6-47s72.2 17.4 94.6 47l58.9 77.7c10.7 14.1 7.9 34.2-6.2 44.8s-34.2 7.9-44.8-6.2l-28.6-37.8L265 378.9c3.5 10.4-4.3 21.1-15.2 21.1L232 400l0 80c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-80-16 0 0 80c0 17.7-14.3 32-32 32s-32-14.3-32-32zM480 0a64 64 0 1 1 0 128A64 64 0 1 1 480 0zm-8 384l0 96c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-179.5L395.1 321c-9.4 15-29.2 19.4-44.1 10s-19.4-29.2-10-44.1l51.7-82.1c17.6-27.9 48.3-44.9 81.2-44.9l12.3 0c33 0 63.7 16.9 81.2 44.9L619.1 287c9.4 15 4.9 34.7-10 44.1s-34.7 4.9-44.1-10L552 300.5 552 480c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-96-16 0z" />
                  </svg>
                  <p className="text-xs">Anak-anak</p>
                </div>
              </div>
              <div className="p-6 flex flex-col gap-2">
                <h1 className="mt-6 text-lg font-semibold min-h-12 line-clamp-2">PENCETAKAN GIGI ANAK</h1>
                <p className="line-clamp-3 text-xs min-h-12">Perawatan saluran akar gigi anak adalah prosedur yang dilakukan untuk memperbaiki gigi anak  yang terinfeksi atau rusak hingga mencapai pulpa gigi</p>
                <Link className="group flex w-fit items-center gap-1 relative text-black transition-colors duration-200 hover:text-gray-600" href="/">
                  <span className="group-hover:text-gray-600 transition-colors duration-200">Lihat detail</span>
                  <ChevronRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:text-gray-600" />
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black opacity-0 scale-y-0 transition-all duration-200 group-hover:opacity-100 group-hover:scale-y-100 group-hover:bg-gray-600"></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Service Section End Here */}

      {/* WhyChooseUs Section Start Here */}
      <section className="px-3 py-6 md:px-7 xl:py-8 xl:px-28 bg-accentColor-125">
        {/* WhyChoosUs */}
        <div className="px-3 xl:flex">

          <div className="flex flex-col gap-3 mt-3">
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-2xl text-text font-semibold">MENGAPA MEMILIH KAMI?</h1>
              <p className="text-gray-600">Memilih klinik gigi yang tepat sangat penting. Kami menggabungkan keahlian, teknologi canggih, dan suasana ramah keluarga untuk memberikan perawatan terbaik.</p>
            </div>
            <div className="flex items-start gap-2">
              <Image className="h-12 w-12 shrink-0" src="/icons/icon-award.svg" alt="Dokter yang berpengalaman" width={50} height={50} />
              <div>
                <h3 className="text-lg font-semibold text-text">Dokter yang berpengalaman</h3>
                <p className="text-xs text-gray-600">Profesional terampil yang memberikan perawatan ahli dengan sentuhan personal.</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Image className="h-12 w-12 shrink-0" src="/icons/icon-person-group.svg" alt="Perawatan Gigi yang Family-Friendly" width={50} height={50} />
              <div>
                <h3 className="text-lg font-semibold text-text">Perawatan Gigi yang Family-Friendly</h3>
                <p className="text-xs text-gray-600">Perawatan lembut yang dirancang untuk segala usia.</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Image className="h-12 w-12 shrink-0" src="/icons/icon-tooth.svg" alt="Perawatan Gigi yang Family-Friendly" width={50} height={50} />
              <div>
                <h3 className="text-lg font-semibold text-text">Teknologi Gigi Canggih</h3>
                <p className="text-xs text-gray-600">Menggunakan inovasi terbaru untuk perawatan yang presisi dan efektif.</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Image className="h-12 w-12 shrink-0" src="/icons/icon-calendar.svg" alt="Perawatan Gigi yang Family-Friendly" width={50} height={50} />
              <div>
                <h3 className="text-lg font-semibold text-text">Booking Mudah & Jadwal Fleksibel</h3>
                <p className="text-xs text-gray-600">Janji temu tanpa ribet yang menyesuaikan dengan kesibukan Anda.</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <h1 className="text-text text-2xl font-semibold">HASIL KAMI</h1>
            <p className="text-gray-600">Lihat transformasi luar biasa yang dialami oleh para pasien kami.</p>
            <div className="flex flex-col items-center">
              <div className="w-full max-w-sm mx-auto relative group overflow-hidden">
                {/* Overlay hitam */}
                <div className="absolute z-10 inset-1 bg-black bg-opacity-50 opacity-0 group-hover:opacity-50 rounded-4xl transition-opacity duration-300"></div>

                {/* Container slides */}
                <div
                  className="flex transition-transform duration-300"
                  style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                  {images.map((src, index) => (
                    <div key={index} className="w-full flex-shrink-0 p-1 relative">
                      <Image src={src} alt={`Slide ${index + 1}`} width={512} height={512} className="w-full h-72 object-cover rounded-4xl" />
                    </div>
                  ))}
                </div>

                {/* Tombol navigasi */}
                <button
                  onClick={handlePrev}
                  className="absolute hidden group-hover:flex z-10 left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-md items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                <button
                  onClick={handleNext}
                  className="absolute hidden group-hover:flex z-10 right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-md items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>

              {/* Indicators */}
              <div className="flex gap-2 mt-4 justify-center">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleIndicatorClick(index)}
                    className={`transition-all h-2 rounded-full ${activeIndex === index ? "w-6 bg-primary-red" : "w-2 bg-gray-400"}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* WhyChooseUs Section End Here */}

      {/* Testimoni Section Start Here */}
      <section className="p-6 md:p-8 flex flex-col xl:flex-row gap-6">
        <div className="text-center flex flex-col gap-2 p-3 items-center">
          <h1 className="text-2xl text-text font-semibold">ULASAN DAN RATING KAMI</h1>
          <p className="text-gray-600">Masukan Anda sangat berarti! Kami bangga telah melayani begitu banyak pasien yang puas.</p>
          <Button asChild className="w-fit bg-primary-red rounded-full text-white border border-primary-red hover:bg-gray-200 hover:text-primary-red flex justify-center items-center transition-all duration-300">
            <Link href="/">Beri Ulasan & Penilaian <ChevronRight /></Link>
          </Button>
        </div>

        <div className="w-full">
          <Testimoni />
        </div>
      </section>
      {/* Testimoni Section End Here */}

      {/* Booking Section Start Here */}
      <section className="p-4 md:px-8 xl:px-12">
        <div className="bg-accentColor-950 rounded-4xl px-6 py-8 text-center">
          <div className="text-gray-200 flex flex-col gap-2">
            <h1 className="text-white text-2xl font-semibold">ATUR JADWAL PERIKSA ANDA SEKARANG</h1>
            <p>Cek jadwal dokter kami dan buat janji temu hanya dalam beberapa klik. Anda bisa berkonsultasi via WhatsApp atau langsung melakukan pemesanan.</p>
          </div>

          <div className="md:flex items-center md:justify-center md:my-8 xl:my-0">
            <Image src="/images/booking_image.png" alt="Booking" width={512} height={512} className="w-full max-w-96 xl:max-w-72 object-cover" />

            <div className="flex flex-col gap-4 xl:flex-row">
              <div className="flex text-left gap-2 bg-white p-6 rounded-3xl">
                <Image className="max-w-20 h-40 object-cover rounded-3xl object-center" src="/images/drg_lucia.png" alt="drg. Lucia Surjani Tanojo, DESS" width={512} height={512} />
                <div>
                  <h5 className="text-lg font-semibold">drg. Lucia Surjani Tanojo, DESS</h5>
                  <p className="text-xs text-gray-400">Dokter Gigi</p>
                  <p className="text-xs text-gray-400 flex items-center gap-2 mt-1">
                    <FaSuitcase />
                    7 Tahun Pengalaman
                  </p>
                  <div className="w-full h-0.5 mt-2 bg-gray-200"></div>
                  <p className="text-xs text-gray-400 flex items-center gap-2 mt-1">
                    <FaCalendarDay />
                    Senin, Selasa, Rabu
                  </p>
                  <p className="text-xs text-gray-400 flex items-center gap-2 mt-1">
                    <FaClock />
                    09.00 AM - 17.00 WIB
                  </p>
                </div>
              </div>
              <div className="flex text-left gap-2 bg-white p-6 rounded-3xl">
                <Image className="max-w-20 h-40 object-cover rounded-3xl object-center" src="/images/drg_caroline.jpg" alt="drg. Lucia Surjani Tanojo, DESS" width={512} height={512} />
                <div>
                  <h5 className="text-lg font-semibold">drg. Caroline Manuela Hartato</h5>
                  <p className="text-xs text-gray-400">Dokter Gigi</p>
                  <p className="text-xs text-gray-400 flex items-center gap-2 mt-1">
                    <FaSuitcase />
                    7 Tahun Pengalaman
                  </p>
                  <div className="w-full h-0.5 mt-2 bg-gray-200"></div>
                  <p className="text-xs text-gray-400 flex items-center gap-2 mt-1">
                    <FaCalendarDay />
                    Kamis, Jumat, Sabtu
                  </p>
                  <p className="text-xs text-gray-400 flex items-center gap-2 mt-1">
                    <FaClock />
                    09.00 AM - 17.00 WIB
                  </p>
                </div>
              </div>
              <div className="flex text-left gap-2 bg-white p-6 rounded-3xl">
                <Image className="max-w-20 h-40 object-cover rounded-3xl object-center" src="/images/drg_gressy.jpg" alt="drg. Lucia Surjani Tanojo, DESS" width={512} height={512} />
                <div>
                  <h5 className="text-lg font-semibold">drg. Gresy Christina Wijaya</h5>
                  <p className="text-xs text-gray-400">Dokter Gigi</p>
                  <p className="text-xs text-gray-400 flex items-center gap-2 mt-1">
                    <FaSuitcase />
                    7 Tahun Pengalaman
                  </p>
                  <div className="w-full h-0.5 mt-2 bg-gray-200"></div>
                  <p className="text-xs text-gray-400 flex items-center gap-2 mt-1">
                    <FaCalendarDay />
                    Senin, Selasa, Rabu
                  </p>
                  <p className="text-xs text-gray-400 flex items-center gap-2 mt-1">
                    <FaClock />
                    09.00 AM - 17.00 WIB
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:justify-center gap-4 mt-6">
            <Button asChild variant="outline" className="bg-[#25D366] w-full md:w-fit rounded-4xl hover:opacity-80 hover:text-white hover:bg-[#25D366] transition-colors duration-300 text-lg font-semibold md:px-8 py-6">
              <Link href="/" className="text-white"><FaWhatsapp className="text-lg font-semibold" /> Konsultasi via WhatsApp</Link>
            </Button>
            <Button asChild variant="outline" className="bg-white w-fit rounded-4xl hover:opacity-80 hover:text-white hover:bg-primary-red transition-colors duration-300 md:text-lg md:font-semibold md:px-8 py-6">
              <Link href="/" className="text-primary-red">Buat Janji Temu</Link>
            </Button>
          </div>
        </div>
      </section>
      {/* Booking Section End Here */}

      {/* Location Section Start Here */}
      <section className="p-3 xl:flex">
        <div className="px-12 xl:w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.370380213311!2d110.408759074997!3d-6.965559593034983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70f4bc7ba7e7ff%3A0x15619ec891695f15!2sFamily%20Dental%20Care%20Drg%20Lucia%20Surjani%20%26%20Rekan!5e0!3m2!1sid!2sid!4v1744119706933!5m2!1sid!2sid"
            width="100%"
            height="100%"
            className="border-0 rounded-4xl min-h-80"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="px-3 py-3 xl:pr-12">
          <div className="flex flex-col py-3 gap-2 text-center xl:text-left">
            <h1 className="text-2xl text-text font-semibold">LOKASI KAMI</h1>
            <div className="text-gray-600">
              <p>JL. Hasanudin, Blok AA 1 Ruko C, Purwosari, Panggung Lor,</p>
              <p>Kec. Semarang Utara, Kota Semarang</p>
              <p>Jawa Tengah 50176</p>
              <p>Indonesia</p>
            </div>
          </div>

          <div className="h-0.5 w-full bg-gray-400"></div>

          <div className="text-center py-4 xl:text-left ">
            <h1 className="text-2xl text-text font-semibold">SOSIAL MEDIA KAMI</h1>
            <div className="flex flex-col gap-3 py-3 md:flex-row md:justify-center">
              <Button asChild variant="outline" className="bg-primary-red w-full md:w-fit rounded-4xl hover:opacity-80 hover:text-white hover:bg-primary-red transition-colors duration-300 text-lg font-semibold md:px-8 py-6">
                <Link href="/" className="text-white"><FaInstagram className="text-lg font-semibold" /> semarangdentist</Link>
              </Button>
              <Button asChild variant="outline" className="bg-[#25D366] w-full md:w-fit rounded-4xl hover:opacity-80 hover:text-white hover:bg-[#25D366] transition-colors duration-300 text-lg font-semibold md:px-8 py-6">
                <Link href="/" className="text-white"><FaWhatsapp className="text-lg font-semibold" /> +62 857-0183-7246</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Location Section End Here */}

      <Footer />
    </div>
  );
}
