import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import ColorPicker from '../components/ColorPicker.jsx'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {

  const PRESET_COLORS = [
    { name: "Голубой", hex: "#229ED9" },
    { name: "Синий", hex: "#1e40af" },
    { name: "Красный", hex: "#ef4444" },
    { name: "Зеленый", hex: "#22c55e" },
    { name: "Прозрачный", hex: "transparent", isTransparent: true }
  ];

  const BRANDS = [
    { value: "Kaweco", label: "Kaweco" },
    { value: "Lamy", label: "Lamy" },
    { value: "Sailor", label: "Sailor" },
    { value: "TWSBI", label: "TWSBI" },
    { value: "Platinum", label: "Platinum" },
    { value: "Pilot", label: "Pilot" },
    { value: "Visconti", label: "Visconti" },
    { value: "Parker", label: "Parker" },
    { value: "Diplomat", label: "Diplomat" }
  ];


  const [image1, setImage] = useState(null)
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [price, setPrice] = useState("")
  const [popular, setPopular] = useState(false)
  const [category, setCategory] = useState("Перьевые ручки")
  const [brand, setBrand] = useState(BRANDS[0].value)
  const [nibmaterial, setNibmaterial] = useState(false)
  const [size, setSize] = useState("EF")
  const [colors, setColors] = useState(() => {
    const saved = localStorage.getItem('colors');
    return saved ? JSON.parse(saved) : PRESET_COLORS;
  })
  const [selectedColors, setSelectedColors] = useState([]);;

  useEffect(() => {
    localStorage.setItem('colors', JSON.stringify(colors));
  }, [colors]);

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

      formData.append("colors", JSON.stringify(selectedColors.map(idx => colors[idx])));

      image1 && formData.append("image1", image1)

      const response = await axios.post(backendUrl + "/api/product/add", formData, {
        headers: {
          token
        }
      })
      if (response.data.success) {
        toast.success("Товар успешно добавлен!")

        setTitle('')
        setDesc('')
        setImage(null)
        setPrice('')
        setPopular(false)
        setCategory('Перьевые ручки')
        setBrand('')
        setNibmaterial(false)
        setSize('EF')
        setDetails('')
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
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
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image1' hidden required />
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
            <option value="BB">Double Broad</option>
            <option value="Fude">Fude</option>
          </select>
        </div>
      </div>

      <div >
        <p className='mb-2'>Бренд</p>
        <select onChange={(e) => setBrand(e.target.value)} value={brand} className='w-full px-3 py-2'>
          {BRANDS.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
        </select>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Описание</p>
        <textarea onChange={(e) => setDetails(e.target.value)} value={details} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Истоия производства, сведения о производителе' required />
      </div>

      <ColorPicker colors={colors} setColors={setColors} selected={selectedColors}
        setSelected={setSelectedColors} />
      <button type='submit' className='w-28 py-3 mt-4 text-white bg-primary'>Добавить</button>
    </form>
  )
}

export default Add
