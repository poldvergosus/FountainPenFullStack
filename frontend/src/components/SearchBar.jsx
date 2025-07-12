import React, { useContext} from 'react'
import { ShopContext } from "../context/ShopContext";

const SearchBar = () => {

    const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);

  return showSearch? (
    <div className='text-center'>
        <div className='inline-flex items-baseline justify-center border-b-[3px] border-primary px-5 pt-4 pb-2 mx-3 w-3/4 sm:w-1/2 '>
      <input value={search} onChange={(e)=>setSearch(e.target.value)} className=' text-primary text-center flex-1 outline-none bg-inherit text-md' type = "text" placeholder='Искать'/>
    </div>
    </div>
  ):null
}

export default SearchBar
