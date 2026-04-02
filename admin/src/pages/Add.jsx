import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import ColorPicker from '../components/ColorPicker.jsx'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {

  const PRESET_COLORS = [
    { id: "color_1", name: "Красный", hex: "#ef4444" },
    { id: "color_2", name: "Черный", hex: "#000000" },
    { id: "color_3", name: "Белый", hex: "#ffffff" },
    { id: "color_4", name: "Голубой", hex: "#229ED9" },
    { id: "color_5", name: "Синий", hex: "#1e40af" },
    { id: "color_6", name: "Желтый", hex: "#f7ef5f" },
    { id: "color_7", name: "Фиолетовый", hex: "#bd1fdb" },
    { id: "color_8", name: "Зеленый", hex: "#22c55e" },
    { id: "color_9", name: "Коричневый", hex: "#9d511b" },
    { id: "color_10", name: "Прозрачный", hex: "transparent", isTransparent: true }
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
  const [isDragging, setIsDragging] = useState(false)
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
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].id) {
          return parsed;
        }
      } catch (e) {}
    }
    localStorage.removeItem('colors');
    return PRESET_COLORS;
  })

  const [selectedColors, setSelectedColors] = useState([]);

  useEffect(() => {
    localStorage.setItem('colors', JSON.stringify(colors));
  }, [colors]);

  const [details, setDetails] = useState("")
  const [stock, setStock] = useState(0)

  // Drag & Drop handlers
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        setImage(file);
      } else {
        toast.error('Пожалуйста, загрузите изображение');
      }
    }
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image1) {
      toast.error('Пожалуйста, загрузите изображение');
      return;
    }

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
      formData.append("stock", stock);

      const selectedColorObjects = selectedColors
        .map(id => colors.find(color => color.id === id))
        .filter(Boolean);

      formData.append("colors", JSON.stringify(selectedColorObjects));
      formData.append("image1", image1)

      const response = await axios.post(backendUrl + "/api/product/add", formData, {
        headers: { token }
      })

      if (response.data.success) {
        toast.success("Товар успешно добавлен!")
        setTitle('')
        setDesc('')
        setImage(null)
        setPrice('')
        setPopular(false)
        setCategory('Перьевые ручки')
        setBrand(BRANDS[0].value)
        setNibmaterial(false)
        setSize('EF')
        setDetails('')
        setStock(0)
        setSelectedColors([])
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
      
      {/* Drag & Drop загрузка изображения */}
      <div className='w-full'>
        <p className='mb-2 font-medium'>
          Изображение товара <span className="text-red-500">*</span>
        </p>
        <div
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative w-full max-w-md h-64 border-2 border-dashed rounded-lg
            transition-all duration-200 cursor-pointer
            ${isDragging
              ? 'border-blue-500 bg-blue-50'
              : image1
                ? 'border-green-500'
                : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
            }
          `}
        >
          <label htmlFor="image1" className="absolute inset-0 cursor-pointer">
            {!image1 ? (
              <div className="flex flex-col items-center justify-center h-full p-4">
                <svg
                  className="w-16 h-16 text-gray-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="text-gray-600 text-center mb-2 font-medium">
                  {isDragging
                    ? 'Отпустите файл для загрузки'
                    : 'Перетащите изображение сюда'
                  }
                </p>
                <p className="text-gray-400 text-sm text-center">
                  или нажмите для выбора файла
                </p>
                <p className="text-gray-400 text-xs mt-2">
                  Поддерживаются: JPG, PNG, GIF (макс. 5 МБ)
                </p>
              </div>
            ) : (
              <div className="relative h-full group">
                <img
                  className='w-full h-full object-cover rounded-lg'
                  src={URL.createObjectURL(image1)}
                  alt="Превью"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center rounded-lg">
                  <p className="text-white text-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Нажмите для замены
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setImage(null);
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition shadow-lg z-10"
                  title="Удалить изображение"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id='image1'
              accept="image/*"
              hidden
            />
          </label>
        </div>
        {!image1 && (
          <p className="text-xs text-red-500 mt-1">Загрузка изображения обязательна</p>
        )}
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

      <div className='w-full'>
        <p className='mb-2'>Количество на складе</p>
        <input onChange={(e) => setStock(e.target.value)} value={stock} className='w-full px-3 py-2 sm:w-[200px]' type="Number" min="0" placeholder='0' required />
      </div>

      <div className='w-full flex gap-2 mt-2'>
        <input type="checkbox" id="popular" checked={popular} onChange={e => setPopular(e.target.checked)} />
        <label className='cursor-pointer' htmlFor="popular"> Отобразить в популярном?</label>
      </div>

      <div className='w-full flex gap-2 mt-2'>
        <input type="checkbox" id="nibmaterial" checked={nibmaterial} onChange={e => setNibmaterial(e.target.checked)} />
        <label className='cursor-pointer' htmlFor="nibmaterial"> Золотое перо</label>
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Категория</p>
          <select onChange={(e) => setCategory(e.target.value)} value={category} className='w-full px-3 py-2'>
            <option value="Перьевые ручки">Перьевые ручки</option>
            <option value="Аксессуары для перьевых ручек">Аксессуары для перьевых ручек</option>
            <option value="Чернила">Чернила</option>
            <option value="Бумажные принадлежности">Бумажные принадлежности</option>
          </select>
        </div>
        <div>
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

      <div>
        <p className='mb-2'>Бренд</p>
        <select onChange={(e) => setBrand(e.target.value)} value={brand} className='w-full px-3 py-2'>
          {BRANDS.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
        </select>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Описание</p>
        <textarea onChange={(e) => setDetails(e.target.value)} value={details} className='w-full max-w-[500px] px-3 py-2' placeholder='История производства, сведения о производителе' required />
      </div>

      <ColorPicker
        colors={colors}
        setColors={setColors}
        selected={selectedColors}
        setSelected={setSelectedColors}
      />

      <button type='submit' className='w-28 py-3 mt-4 text-white bg-primary'>Добавить</button>
    </form>
  )
}

export default Add