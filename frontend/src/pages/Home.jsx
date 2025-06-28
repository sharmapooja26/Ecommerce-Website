import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";

import NewsletterBox from "../components/NewsletterBox";
import Testimonials from "../components/Testimonials";
import FaQ from "../components/FaQ.jsx";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <FaQ />
      <Testimonials />
      <NewsletterBox />
    </div>
  );
};

export default Home;
