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
        <div className="relative overflow-x-hidden">
            <SocialSidebar />
            <div id="home"><Profile /></div>
            <div id="about"><About /></div>
            <div id="skill"><SkillSection /></div>
            <div id="experience"><Experience /></div>
            <div id="projects"><Projects /></div>
            <div id="achievements"><Achievements /></div>
            <div id="certificates"><Certificate /></div>
           
            {/* Other sections like Projects, Experience can be added here */}
        </div>
    );
};

export default Home;