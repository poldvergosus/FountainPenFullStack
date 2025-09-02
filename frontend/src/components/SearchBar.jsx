import React, { useContext, useEffect } from 'react'
import { ShopContext } from "../context/ShopContext";
import { useNavigate, useLocation } from 'react-router-dom';

const SearchBar = () => {
  const {
    search,
    setSearch,
    showSearch,
    setShowSearch,
    products = [],
  } = useContext(ShopContext) || {};

  const navigate = useNavigate();
  const location = useLocation();

  const searchWords = search.toLowerCase().split(" ").filter(Boolean);

  const matchingProducts = products.filter((product) => {
    const combined = `
    ${product.title}
    ${product.desc}
    ${product.brand}
    ${product.size}
  `.toLowerCase();

    return searchWords.every(word => combined.includes(word));
  }).slice(0, 4);

  const handleSelectProduct = (title) => {
    setSearch(title);
    setShowSearch(false);
    navigate(`/collection?q=${encodeURIComponent(title)}`);
    setSearch('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setShowSearch(false);
    setSearch('');
  }, [location.pathname]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSearch(false);
    navigate(`/collection?q=${encodeURIComponent(search)}`);
    setSearch('');
  };

  return showSearch ? (
    <div className='text-center sticky top-0 z-50'>
      <form onSubmit={handleSubmit}>
        <div className='relative inline-block w-3/4 sm:w-1/2'>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-3/4 text-primary text-center border-b-[2px] border-primary focus:border-primary focus:outline-none bg-white text-md py-2'
            type="text"
            placeholder='Искать'
          />

          {search && (
            <div className="absolute left-0 top-full w-full bg-white border-b-[2x] border-primary rounded shadow z-50">
              {matchingProducts.map((p, i) => (
                <div
                  key={i}
                  onClick={() => handleSelectProduct(p.title)}
                  className="px-4 py-2 text-left cursor-pointer hover:bg-gray-100 text-sm text-primary"
                >
                  {p.title}
                </div>
              ))}

              {products.filter(p => p.title.toLowerCase().includes(search.toLowerCase())).length > 3 && (
                <div
                  onClick={handleSubmit}
                  className="px-4 py-2 text-left cursor-pointer text-primary hover:text-accent font-semibold text-sm"
                >
                  Посмотреть все результаты...
                </div>
              )}
            </div>
          )}
        </div>
      </form>
    </div>
  ) : null;
};

export default SearchBar
