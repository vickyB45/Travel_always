import React from 'react'
import Topbar from '../components/header/Topbar'
import Navbar from '../components/header/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import DomesticPackages from '../components/DomesticPackages'
import ThailandSpecial from '../components/ThailandSpecial'
import InternationalPackages from '../components/InternationalPackages'
import Hotels from '../components/Hotels'
import CashbackSection from '../components/CashbackSection'
import StatsCounter from '../components/StatsCounter'
import Reviews from '../components/Reviews'
import Blog from '../components/Blog'
import EnquiryForm from '../components/EnquiryForm'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div id='hero'>
        <Topbar />
        <Navbar />
        <Hero />
        <About />
        <DomesticPackages />
        <ThailandSpecial />
        <InternationalPackages />
        <Hotels />
        <CashbackSection />
        <StatsCounter />
        <Reviews />
        <Blog />
        <EnquiryForm />
        <Footer />
    </div>
  )
}

export default Home