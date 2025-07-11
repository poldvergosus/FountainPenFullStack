import React from "react";
import Hero from "../components/Hero";
import InfiniteScroll from "../components/InfiniteScroll";
import SidebarLeft from "../components/SidebarLeft";
import PopularSlider from "../components/PopularSlider";
import SidebarRight from "../components/SideBarRight";
import CategorySection from "../components/CategorySection";
import NewSection from "../components/NewSection";


const Home = () => {
  return (
    <div>
      <Hero />
      <InfiniteScroll />

<div className="w-[50%] max-w-[1690px] mx-auto">
        <div className="flex gap-[4rem] justify-center my-8">
          <SidebarLeft />
          <div className="flex flex-col gap-3 flex-[1_1_60%] max-w-full">
            <PopularSlider />
            <CategorySection />
            <NewSection/>
          </div>
          <SidebarRight />
        </div>
      </div>

    </div>
  );
};

export default Home;
