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

  // Автоматическая генерация slug из заголовка
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

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData()

      formData.append("title", title);
      formData.append("excerpt", excerpt);
      formData.append("content", content);
      formData.append("author", author);
      formData.append("slug", slug || generateSlug(title));

      image1 && formData.append("image1", image1)

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

      <div className='w-full'>
        <p className='mb-2 font-medium'>Изображение статьи</p>
        <label htmlFor="image1" className="cursor-pointer">
          <img 
            className='w-full max-w-md h-64 object-cover border rounded' 
            src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} 
            alt="" 
          />
          <input 
            onChange={(e) => setImage(e.target.files[0])} 
            type="file" 
            id='image1' 
            hidden 
            required 
          />
        </label>
      </div>

      <div className='w-full max-w-2xl'>
        <p className='mb-2 font-medium'>Заголовок статьи</p>
        <input 
          onChange={(e) => {
            setTitle(e.target.value)
            if (!slug) setSlug(generateSlug(e.target.value))
          }} 
          value={title} 
          className='w-full px-3 py-2 border rounded' 
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
          className='w-full px-3 py-2 border rounded' 
          type="text" 
          placeholder='kak-vybrat-pervuyu-ruchku' 
        />
        <p className='text-xs text-gray-500 mt-1'>
          Будет сгенерирован автоматически из заголовка
        </p>
      </div>

      <div className='w-full max-w-2xl'>
        <p className='mb-2 font-medium'>Краткое описание (для превью)</p>
        <textarea 
          onChange={(e) => setExcerpt(e.target.value)} 
          value={excerpt} 
          className='w-full px-3 py-2 border rounded' 
          rows="3"
          placeholder='Краткое описание статьи для отображения на главной странице' 
          required 
        />
      </div>

      <div className='w-full max-w-2xl'>
        <p className='mb-2 font-medium'>Полный текст статьи</p>
        <textarea 
          onChange={(e) => setContent(e.target.value)} 
          value={content} 
          className='w-full px-3 py-2 border rounded' 
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
          className='w-full px-3 py-2 border rounded' 
          type="text" 
          placeholder='Администратор' 
        />
      </div>

      <button 
        type='submit' 
        className='px-8 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded transition'
      >
        Опубликовать статью
      </button>
    </form>
  )
}

export default AddBlog