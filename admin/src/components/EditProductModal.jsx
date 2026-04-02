import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import ColorPicker from './ColorPicker.jsx'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const EditProductModal = ({ product, token, onClose, onSuccess }) => {
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
  const [title, setTitle] = useState(product.title || "")
  const [desc, setDesc] = useState(product.desc || "")
  const [price, setPrice] = useState(product.price || "")
  const [popular, setPopular] = useState(product.popular || false)
  const [category, setCategory] = useState(product.category || "Перьевые ручки")
  const [brand, setBrand] = useState(product.brand || BRANDS[0].value)
  const [nibmaterial, setNibmaterial] = useState(product.nibmaterial || false)
  const [size, setSize] = useState(product.size || "EF")
  const [details, setDetails] = useState(product.details || "")
  const [stock, setStock] = useState(product.stock || 0)

  const [colors, setColors] = useState(() => {
    const saved = localStorage.getItem('colors');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].id) {
          return parsed;
        }
      } catch (e) {
            console.log(e);
      }
    }
    localStorage.removeItem('colors');
    return PRESET_COLORS;
  })

  const [selectedColors, setSelectedColors] = useState(() => {
    if (!product.colors || product.colors.length === 0) return [];

    return product.colors.map(productColor => {
      if (productColor.id) {
        const found = colors.find(c => c.id === productColor.id);
        if (found) return found.id;
      }
      const found = colors.find(c => c.hex === productColor.hex && c.name === productColor.name);
      if (found) return found.id;
      const foundByHex = colors.find(c => c.hex === productColor.hex);
      if (foundByHex) return foundByHex.id;
      return null;
    }).filter(id => id !== null);
  });

  useEffect(() => {
    localStorage.setItem('colors', JSON.stringify(colors));
  }, [colors]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData()

      formData.append("id", product._id);
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

      if (image1) {
        formData.append("image1", image1)
      }

      const response = await axios.post(backendUrl + "/api/product/update", formData, {
        headers: { token }
      })

      if (response.data.success) {
        toast.success("Товар успешно обновлен!")
        onSuccess();
        onClose();
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Редактировать товар</h2>
          <button
            onClick={onClose}
            className="text-2xl hover:text-red-500 transition"
          >
            ×
          </button>
        </div>

        <form onSubmit={onSubmitHandler} className='flex flex-col p-6 gap-4'>
          <div>
            <p className='mb-2 font-medium'>Изображение товара</p>
            <div className='flex gap-4 items-center'>
              <label htmlFor="edit-image1" className="cursor-pointer">
                <img
                  className='w-32 h-32 object-contain border rounded'
                  src={!image1 ? (product.image || assets.upload_area) : URL.createObjectURL(image1)}
                  alt=""
                />
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id='edit-image1'
                  hidden
                />
              </label>
              <div className="text-sm text-gray-600">
                <p>Текущее изображение слева</p>
                <p>Нажмите, чтобы загрузить новое</p>
              </div>
            </div>
          </div>

          <div>
            <p className='mb-2 font-medium'>Название продукта</p>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className='w-full px-3 py-2 border rounded'
              type="text"
              placeholder='Название'
              required
            />
          </div>

          <div>
            <p className='mb-2 font-medium'>Подзаголовок</p>
            <input
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              className='w-full px-3 py-2 border rounded'
              type="text"
              placeholder='Подзаголовок'
              required
            />
          </div>

          <div>
            <p className='mb-2 font-medium'>Цена</p>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className='w-full px-3 py-2 border rounded sm:w-[200px]'
              type="Number"
              placeholder='6020'
              required
            />
          </div>

          <div>
            <p className='mb-2 font-medium'>Количество на складе</p>
            <input
              onChange={(e) => setStock(e.target.value)}
              value={stock}
              className='w-full px-3 py-2 border rounded sm:w-[200px]'
              type="Number"
              min="0"
              placeholder='0'
              required
            />
          </div>

          <div className='flex gap-6'>
            <div className='flex gap-2 items-center'>
              <input
                type="checkbox"
                id="edit-popular"
                checked={popular}
                onChange={e => setPopular(e.target.checked)}
              />
              <label className='cursor-pointer' htmlFor="edit-popular">Популярный товар</label>
            </div>

            <div className='flex gap-2 items-center'>
              <input
                type="checkbox"
                id="edit-nibmaterial"
                checked={nibmaterial}
                onChange={e => setNibmaterial(e.target.checked)}
              />
              <label className='cursor-pointer' htmlFor="edit-nibmaterial">Золотое перо</label>
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div>
              <p className='mb-2 font-medium'>Категория</p>
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className='w-full px-3 py-2 border rounded'
              >
                <option value="Перьевые ручки">Перьевые ручки</option>
                <option value="Аксессуары для перьевых ручек">Аксессуары для перьевых ручек</option>
                <option value="Чернила">Чернила</option>
                <option value="Бумажные принадлежности">Бумажные принадлежности</option>
              </select>
            </div>

            <div>
              <p className='mb-2 font-medium'>Размер пера</p>
              <select
                onChange={(e) => setSize(e.target.value)}
                value={size}
                className='w-full px-3 py-2 border rounded'
              >
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
            <p className='mb-2 font-medium'>Бренд</p>
            <select
              onChange={(e) => setBrand(e.target.value)}
              value={brand}
              className='w-full px-3 py-2 border rounded'
            >
              {BRANDS.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
            </select>
          </div>

          <div>
            <p className='mb-2 font-medium'>Описание</p>
            <textarea
              onChange={(e) => setDetails(e.target.value)}
              value={details}
              className='w-full px-3 py-2 border rounded'
              rows="4"
              placeholder='История производства, сведения о производителе'
              required
            />
          </div>

          <ColorPicker
            colors={colors}
            setColors={setColors}
            selected={selectedColors}
            setSelected={setSelectedColors}
          />

          <div className="flex gap-3 pt-4">
            <button
              type='submit'
              className='px-8 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded transition'
            >
              Сохранить изменения
            </button>
            <button
              type='button'
              onClick={onClose}
              className='px-8 py-3 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded transition'
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProductModal