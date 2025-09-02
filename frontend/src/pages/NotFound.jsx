import React from 'react'
import { assets } from "../assets/assets";

const NotFound = () => {
  // Размеры
  const diverSize = 'clamp(400px, 50vw, 720px)';
  const octoSize = 'clamp(300px, 54vw, 700px)';

  const diverOffset = { x: 40, y: 30 };
  const octoOffset = { x: 50, y: -30 };
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center text-center px-4 overflow-hidden">
      <img
        src={assets.diver}
        alt=""
        className="absolute pointer-events-none select-none"
        style={{
          width: diverSize,
          height: 'auto',
          top: `${-diverOffset.y}px`,
          right: `${-diverOffset.x}px`,
        }}
      />

      <img
        src={assets.octo}
        alt=""
        className="absolute pointer-events-none select-none"
        style={{
          width: octoSize,
          height: 'auto',
          left: `${octoOffset.x}px`,
          bottom: `${octoOffset.y}px`,
        }}
      />

      <div className="relative z-10">
        <h1 className="font-literata font-extrabold text-primary" style={{ fontSize: "clamp(10rem, 12vw, 30rem)", lineHeight: 1 }}>
          404
        </h1>
        <p
          className="
    mt-3 font-literata 
    inline-block
    px-4 py-2
    rounded
    border-2
    text-white
    bg-[var(--color-primary)]
    border-[var(--color-primary)]
  "
        >
          этой страницы не существует или она в разработке
        </p>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center text-center"
        style={{
          color: '#fff',
          WebkitMaskImage: `url(${assets.diver})`,
          maskImage: `url(${assets.diver})`,
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskSize: diverSize,
          maskSize: diverSize,

          WebkitMaskPosition: `calc(100% + ${diverOffset.x}px) ${-diverOffset.y}px`,
          maskPosition: `calc(100% + ${diverOffset.x}px) ${-diverOffset.y}px`,
          maskMode: 'alpha'
        }}
      >
        <div>
          <h1 className="font-literata font-extrabold" style={{ fontSize: "clamp(10rem, 12vw, 30rem)", lineHeight: 1 }}>404</h1>
          <p
            className="
    mt-3 font-literata 
    inline-block
    px-4 py-2
    rounded
    border-2
    text-white
    bg-[var(--color-primary)]
    border-[var(--color-primary)]
  "
          >
            этой страницы не существует или она в разработке
          </p>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center text-center"
        style={{
          color: '#fff',
          WebkitMaskImage: `url(${assets.octo})`,
          maskImage: `url(${assets.octo})`,
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskSize: octoSize,
          maskSize: octoSize,

          WebkitMaskPosition: `left ${octoOffset.x}px bottom ${octoOffset.y}px`,
          maskPosition: `left ${octoOffset.x}px bottom ${octoOffset.y}px`,
          maskMode: 'alpha'
        }}
      >
        <div>
          <h1 className="font-literata font-extrabold" style={{ fontSize: "clamp(10rem, 12vw, 30rem)", lineHeight: 1 }}>404</h1>
          <p
            className="
    mt-3 font-literata 
    inline-block
    px-4 py-2
    rounded
    border-2
    text-white
    bg-[var(--color-primary)]
    border-[var(--color-primary)]
  "
          >
            этой страницы не существует или она в разработке
          </p>
        </div>
      </div>
    </section>
  );
};

export default NotFound;