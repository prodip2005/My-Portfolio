import React from 'react';
import Profile from '../../Components/Banner/Profile';
import SocialSidebar from '../../Components/SocialSidebar';
import About from '../About/About';
import SkillSection from '../../Components/Skills/SkillSection';
import Experience from '../Experience/Experience';
import Projects from '../../Components/Projects/Projects';
import Achievements from '../../Components/Achievements';
import Certificate from '../../Components/Certificate';
import Contact from '../../Components/Contact';

const Home = () => {
    return (
        <div className="relative w-full overflow-x-hidden">
            <SocialSidebar />
            
            <section id="home"><Profile /></section>
            <section id="about"><About /></section>
            <section id="skill"><SkillSection /></section>
            <section id="experience"><Experience /></section>
            <section id="projects"><Projects /></section>
            <section id="achievements"><Achievements /></section>
            <section id="certificates"><Certificate /></section>
           
        </div>
    );
};

export default Home;