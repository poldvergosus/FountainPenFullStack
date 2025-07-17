import React, { useState } from 'react'
import { assets } from '../assets/assets'
import ColorPicker from '../components/ColorPicker.jsx'
import axios from 'axios'
import { backendUrl } from '../App'

const Add = ({ token }) => {

  const PRESET_COLORS = [
    { name: "Голубой", hex: "#229ED9" },
    { name: "Синий", hex: "#1e40af" },
    { name: "Красный", hex: "#ef4444" },
    { name: "Зеленый", hex: "#22c55e" },
    { name: "Прозрачный", hex: "transparent", isTransparent: true }
  ];

  const [image1, setImage] = useState(null)
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [price, setPrice] = useState("")
  const [popular, setPopular] = useState(false)
  const [category, setCategory] = useState("Перьевые ручки")
  const [brand, setBrand] = useState("")
  const [nibmaterial, setNibmaterial] = useState(false)
  const [size, setSize] = useState("EF")
  const [colors, setColors] = useState(PRESET_COLORS);
  const [details, setDetails] = useState("")

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData()

      formData.append("title", title);
      formData.append("desc", desc);
      formData.append("price", price);
      formData.append("popular", popular);
      formData.append("category", category);
      formData.append("brand", brand);
      formData.append("nibmaterial", nibmaterial);
      formData.append("size", size);
      formData.append("details", details);

      formData.append("colors", JSON.stringify(colors));

      image1 && formData.append("image1", image1)

      const response = await axios.post(backendUrl + "/api/product/add", formData, {headers:{token}})
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <p className='mb-2'>
        Загрузить изображение
      </p>
      <div className='flex gap-2'>
        <label htmlFor="image1">
          <img className='w-45' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image1' hidden />
        </label>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Название продукта</p>
        <input onChange={(e) => setTitle(e.target.value)} value={title} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Название' required />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Подзаголовок</p>
        <input onChange={(e) => setDesc(e.target.value)} value={desc} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Подзаголовок' required />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Цена</p>
        <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[200px]' type="Number" placeholder='6020' required />
      </div>

      <div className='w-full flex gap-2 mt-2'>
        <input
          type="checkbox"
          id="popular"
          checked={popular}
          onChange={e => setPopular(e.target.checked)}
        />
        <label className='cursor-pointer' htmlFor="popular"> Отобразить в популярном?</label>
      </div>

      <div className='w-full flex gap-2 mt-2'>
        <input
          type="checkbox"
          id="nibmaterial"
          checked={nibmaterial}
          onChange={e => setNibmaterial(e.target.checked)}
        />
        <label className='cursor-pointer' htmlFor="nibmaterial"> Золотое перо</label>
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div >
          <p className='mb-2'>Категория</p>
          <select onChange={(e) => setCategory(e.target.value)} value={category} className='w-full px-3 py-2'>
            <option value="Перьевые ручки">Перьевые ручки</option>
            <option value="Аксессуары для перьевых ручек">Аксессуары для перьевых ручек</option>
            <option value="Чернила">Чернила</option>
            <option value="Бумажные принадлежности">Бумажные принадлежности</option>
          </select>
        </div>
        <div >
          <p className='mb-2'>Размер пера</p>
          <select onChange={(e) => setSize(e.target.value)} value={size} className='w-full px-3 py-2'>
            <option value="EF">Extra Fine</option>
            <option value="F">Fine</option>
            <option value="M">Medium</option>
            <option value="MF">Medium Fine</option>
            <option value="B">Broad</option>
            <option value="Fude">Fude</option>
          </select>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Бренд</p>
        <input onChange={(e) => setBrand(e.target.value)} value={brand} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Kaweco' required />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Описание</p>
        <textarea onChange={(e) => setDetails(e.target.value)} value={details} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Истоия производства, сведения о производителе' required />
      </div>

      <div className='mb-2'>
        <p className='mb-2'>Размеры пера</p>
        <div className='flex gap-3'>
          <div className='border-[0.2em] border-primary rounded-full text-primary text-xs font-regular flex items-center justify-center w-8 h-8'>
            <p>EF</p>
          </div>

          <div className='border-[0.2em] border-primary rounded-full text-primary text-xs font-regular flex items-center justify-center w-8 h-8'>
            <p>F</p>
          </div>

          <div className='border-[0.2em] border-primary rounded-full text-primary text-xs font-regular flex items-center justify-center w-8 h-8'>
            <p>MF</p>
          </div>

          <div className='border-[0.2em] border-primary rounded-full text-primary text-xs font-regular flex items-center justify-center w-8 h-8'>
            <p>M</p>
          </div>
        </div>
      </div>
      <ColorPicker colors={colors} setColors={setColors} />
      <button type='submit' className='w-28 py-3 mt-4 text-white bg-primary'>Добавить</button>
    </form>
  )
}

export default Add
