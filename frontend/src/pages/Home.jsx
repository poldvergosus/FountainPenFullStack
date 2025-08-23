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
      <div className="max-w-[1690px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="my-8 flex flex-col 2xl:flex-row items-stretch gap-8 2xl:gap-16">
          <SidebarLeft />
          <div className="flex flex-col gap-3 flex-1 min-w-0">
            <PopularSlider />
            <CategorySection />
            <NewSection />
          </div>
          <SidebarRight />
        </div>
      </div>

    </div>
  );
};

export default Home;
