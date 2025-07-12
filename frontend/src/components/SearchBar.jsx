import React, { useContext } from 'react'
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch, products } = useContext(ShopContext);
  const navigate = useNavigate();

  const matchingProducts = products
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 4);

  const handleSelectProduct = (title) => {
    setSearch(title);
    navigate('/collection');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSearch(false);
    navigate(`/collection?q=${encodeURIComponent(search)}`);
  };


  return showSearch ? (
    <div className='text-center'>
      <form onSubmit={handleSubmit}>
        <div className='relative inline-block w-3/4 sm:w-1/2'>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-full text-primary text-center border-b-[2px] border-primary focus:border-primary focus:outline-none bg-inherit text-md py-2'
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
