"use client"

import React from 'react'
import Image from 'next/image'
import StatCard from '../_components/StatCard'

const About = () => {
  return (
    <>
      <section className='p-6 md:p-8 mt-24 flex flex-col gap-3 text-justify md:flex-row md:gap-6'>
        <div className='md:max-w-1/2 md:flex md:flex-col md:justify-between lg:justify-center'>
          <h1 className='text-4xl font-semibold leading-normal'><span className='text-primary-red'>TENTANG KAMI,</span> BUNGAH FAMILY DENTAL CARE</h1>
          <p>Bungah Family Dental Care adalah klinik gigi keluarga yang berlokasi di Jl. Hasanuddin, sekitar 500 m di belakang Stasiun Kereta Api Poncol, menuju ke arah Perumahan Tanah Mas. Dengan tim dokter berpengalaman dan fasilitas modern, kami melayani pasien dari segala usia, mulai dari anak-anak hingga lansia. </p>
        </div>
        <div className='p-6 rounded-4xl md:p-0'>
          <Image className='rounded-4xl max-h-96 object-cover' src="/images/aboutBackground.jpg" width={1920} height={1080} alt="aboutBackground" />
        </div>
      </section>

      <section className='p-6 text-white flex flex-col gap-3 md:grid md:grid-cols-4 md:flex-row text-center'>
        <StatCard
          jumlah="200 +"
          judul="Pasien Ditangani"
          deskripsi="Memberikan perawatan gigi berkualitas untuk setiap senyuman."
        />
        <StatCard
          jumlah="18 +"
          judul="Tahun Pengalaman"
          deskripsi="Menyediakan perawatan gigi dengan keahlian terbaik."
        />
        <StatCard
          jumlah="5.0 ⭐"
          judul="Kepuasan Pasien"
          deskripsi="Mendapatkan rating tinggi dari pasien yang puas dan bahagia."
        />
        <StatCard
          jumlah="25 +"
          judul="Prosedur Berhasil"
          deskripsi="Perawatan canggih dengan hasil yang terbukti efektif."
        />
      </section>

      <section className='px-16 py-8 bg-accentColor-125 xl:flex xl:gap-6'>
        <div className='text-center flex flex-col gap-3 xl:max-w-xl'>
          <h1 className='text-2xl md:text-4xl xl:text-3xl font-semibold'><span className='text-primary-red'>BAGAIMANA</span> KAMI TERBENTUK?</h1>
          <p className='text-justify text-sm md:text-lg'>Dimulai sebagai praktik pribadi drg. Lucia Surjani pada tahun 2007, klinik ini terus berkembang seiring meningkatnya kepercayaan pasien. <span className='text-text font-semibold'>Kini, Bungah Family Dental Care memiliki tim dokter profesional dan fasilitas perawatan gigi modern untuk melayani lebih banyak pasien.</span></p>
        </div>

        <div className='py-8 flex flex-col gap-4 md:grid md:grid-cols-3'>
          <div className='flex p-3 gap-2 bg-white shadow-md rounded-2xl'>
            <div className='max-w-16 max-h-16'>
              <Image className='max-w-8 max-h-8' src="/icons/icon-smallHouse.svg" width={50} height={50} alt="icon-smallHouse" />
            </div>
            <div>
              <h4 className='font-bold text-xl'>2007</h4>
              <p className='text-sm text-gray-600'>drg. Lucia Surjani membuka praktik pribadi.</p>
            </div>
          </div>
          <div className='flex p-3 gap-2 bg-white shadow-md rounded-2xl'>
            <div className='max-w-16 max-h-16'>
              <Image className='max-w-8 max-h-8' src="/icons/icon-smallHouse.svg" width={50} height={50} alt="icon-smallHouse" />
            </div>
            <div>
              <h4 className='font-bold text-xl'>2008</h4>
              <p className='text-sm text-gray-600'>drg. Yani Hastutik bergabung, klinik menambah ruang perawatan.</p>
            </div>
          </div>
          <div className='flex p-3 gap-2 bg-white shadow-md rounded-2xl'>
            <div className='max-w-16'>
              <Image className='max-w-8 max-h-8' src="/icons/icon-smallHouse.svg" width={50} height={50} alt="icon-smallHouse" />
            </div>
            <div>
              <h4 className='font-bold text-xl'>2010</h4>
              <p className='text-sm text-gray-600'>drg. Yesika Wijaya bergabung, memperluas layanan klinik.</p>
            </div>
          </div>
        </div>
      </section>

      <section className='p-6'>
        <div className='text-center'>
          <h1 className='text-2xl md:text-4xl font-semibold'><span className='text-primary-red'>DOKTER KAMI, <br /></span> AHLI DIBALIK SENYUM TERBAIK ANDA</h1>
        </div>
        <div className='pt-3 flex flex-col gap-3 md:grid md:grid-cols-3 md:gap-6'>
          <div className='p-8 border border-black rounded-3xl'>
            <Image className='h-60 w-full object-cover object-center' src="/images/drg_lucia.png" width={1920} height={1080} alt="drLucia" />
            <div>
              <h1 className='text-text text-lg font-semibold'>drg. Lucia Surjani Tanojo, DESS</h1>
              <h4 className='text-gray-600 text-sm'>Dental Hygienist</h4>
            </div>

            <div className='text-gray-600'>
              <ul className='list-disc pl-6 text-sm mt-3'>
                <li>7+ years experience</li>
                <li>BS in Physiology and Chemistry, University of Arizona</li>
                <li>DDS, University of Colorado School of Dental Medicine</li>
              </ul>
            </div>
          </div>
          <div className='p-8 border border-black rounded-3xl'>
            <Image className='h-60 w-full object-cover object-center' src="/images/drg_lucia.png" width={1920} height={1080} alt="drLucia" />
            <div>
              <h1 className='text-text text-lg font-semibold'>drg. Caroline Manuela Hartato</h1>
              <h4 className='text-gray-600 text-sm'>Dental Hygienist</h4>
            </div>

            <div className='text-gray-600'>
              <ul className='list-disc pl-6 text-sm mt-3'>
                <li>7+ years experience</li>
                <li>BS in Physiology and Chemistry, University of Arizona</li>
                <li>DDS, University of Colorado School of Dental Medicine</li>
              </ul>
            </div>
          </div>
          <div className='p-8 border border-black rounded-3xl'>
            <Image className='h-60 w-full object-cover object-center' src="/images/drg_lucia.png" width={1920} height={1080} alt="drLucia" />
            <div>
              <h1 className='text-text text-lg font-semibold'>drg. Gresy Christina Wijaya</h1>
              <h4 className='text-gray-600 text-sm'>Dental Hygienist</h4>
            </div>

            <div className='text-gray-600'>
              <ul className='list-disc pl-6 text-sm mt-3'>
                <li>7+ years experience</li>
                <li>BS in Physiology and Chemistry, University of Arizona</li>
                <li>DDS, University of Colorado School of Dental Medicine</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About