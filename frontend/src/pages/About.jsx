import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div >
      <div className='text-2xl text-center pt-8 border-t'>
        djffjfj
      </div>
      <div className='max-w-6xl w-full mx-auto my-10 px-4 flex flex-col md:flex-row gap-8'>
        <img
          className='w-full max-w-[450px] md:w-[45%] object-cover'
          src={assets.aboutus}
          alt='О нас'
        />

        <div className='flex flex-col gap-6 text-primary md:w-[55%]'>
          <p>
            Что такое Lorem Ipsum?

            Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.
            Почему он используется?

            Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).

            Откуда он появился?

            Многие думают, что Lorem Ipsum - взятый с потолка псевдо-латинский набор слов, но это не совсем так. Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа Hampden-Sydney, штат Вирджиния, взял одно из самых странных слов в Lorem Ipsum, "consectetur", и занялся его поисками в классической латинской литературе. В результате он нашёл неоспоримый первоисточник Lorem Ipsum в разделах 1.10.32 и 1.10.33 книги "de Finibus Bonorum et Malorum" ("О пределах добра и зла"), написанной Цицероном в 45 году н.э. Этот трактат по теории этики был очень популярен в эпоху Возрождения. Первая строка Lorem Ipsum, "Lorem ipsum dolor sit amet..", происходит от одной из строк в разделе 1.10.32

            Классический текст Lorem Ipsum, используемый с XVI века, приведён ниже. Также даны разделы 1.10.32 и 1.10.33 "de Finibus Bonorum et Malorum" Цицерона и их английский перевод, сделанный H. Rackham, 1914 год.
          </p>
          <p>Да все так</p>
        </div>
      </div>

      <div className='text-4xl py-4 max-w-6xl mx-auto px-4'>
        Почему мы?
      </div>

      <div className='max-w-6xl mx-auto px-4'>
        <div className='flex flex-col md:flex-row justify-between gap-6 text-primary text-sm'>
          <div className='flex-1 border px-6 sm:px-10 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Контроль качества:</b>
            <p>Контент первый</p>
          </div>
          <div className='flex-1 border px-6 sm:px-10 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Контроль качества:</b>
            <p>Контент второй</p>
          </div>
          <div className='flex-1 border px-6 sm:px-10 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Контроль качества:</b>
            <p>Контент третий</p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default About

