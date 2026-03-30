import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const AddBlog = ({ token }) => {
  const [image1, setImage] = useState(null)
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [author, setAuthor] = useState("Администратор")
  const [slug, setSlug] = useState("")
  const [isDragging, setIsDragging] = useState(false)

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[а-яё]/g, (char) => {
        const cyrillicToLatin = {
          'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
          'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
          'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
          'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
          'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
        };
        return cyrillicToLatin[char] || char;
      })
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

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
      formData.append("excerpt", excerpt);
      formData.append("content", content);
      formData.append("author", author);
      formData.append("slug", slug || generateSlug(title));
      formData.append("image1", image1)

      const response = await axios.post(backendUrl + "/api/blog/add", formData, {
        headers: { token }
      })

      if (response.data.success) {
        toast.success("Статья успешно добавлена!")
        setTitle('')
        setExcerpt('')
        setContent('')
        setImage(null)
        setSlug('')
        setAuthor('Администратор')
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-4'>
      <h1 className='text-2xl font-bold mb-2'>Добавить статью в блог</h1>

      {/* ✅ Убрали required из скрытого input */}
      <div className='w-full'>
        <p className='mb-2 font-medium'>
          Изображение статьи <span className="text-red-500">*</span>
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
                {/* Кнопка удаления */}
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
            {/* ✅ Убрали required */}
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

      <div className='w-full max-w-2xl'>
        <p className='mb-2 font-medium'>
          Заголовок статьи <span className="text-red-500">*</span>
        </p>
        <input 
          onChange={(e) => {
            setTitle(e.target.value)
            if (!slug) setSlug(generateSlug(e.target.value))
          }} 
          value={title} 
          className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500' 
          type="text" 
          placeholder='Например: Как выбрать свою первую перьевую ручку' 
          required 
        />
      </div>

      <div className='w-full max-w-2xl'>
        <p className='mb-2 font-medium'>URL статьи (slug)</p>
        <input 
          onChange={(e) => setSlug(e.target.value)} 
          value={slug} 
          className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500' 
          type="text" 
          placeholder='kak-vybrat-pervuyu-ruchku' 
        />
        <p className='text-xs text-gray-500 mt-1'>
          Будет сгенерирован автоматически из заголовка
        </p>
      </div>

      <div className='w-full max-w-2xl'>
        <p className='mb-2 font-medium'>
          Краткое описание (для превью) <span className="text-red-500">*</span>
        </p>
        <textarea 
          onChange={(e) => setExcerpt(e.target.value)} 
          value={excerpt} 
          className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500' 
          rows="3"
          placeholder='Краткое описание статьи для отображения на главной странице' 
          required 
        />
      </div>

      <div className='w-full max-w-2xl'>
        <p className='mb-2 font-medium'>
          Полный текст статьи <span className="text-red-500">*</span>
        </p>
        <textarea 
          onChange={(e) => setContent(e.target.value)} 
          value={content} 
          className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500' 
          rows="12"
          placeholder='Полный текст статьи...' 
          required 
        />
      </div>

      <div className='w-full max-w-2xl'>
        <p className='mb-2 font-medium'>Автор</p>
        <input 
          onChange={(e) => setAuthor(e.target.value)} 
          value={author} 
          className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500' 
          type="text" 
          placeholder='Администратор' 
        />
      </div>

      <button 
        type='submit' 
        className='px-8 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded transition shadow-md hover:shadow-lg'
      >
        Опубликовать статью
      </button>
    </form>
  )
}

export default AddBlog