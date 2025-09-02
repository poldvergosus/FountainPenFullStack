import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t font-literata font-bold text-primary">
        Об этом сайте
      </div>

      <div className="max-w-6xl w-full mx-auto my-10 px-4 flex flex-col md:flex-row gap-8">
        <img
          className="w-full max-w-[450px] md:w-[45%] object-cover"
          src={assets.aboutus}
          alt="О проекте: перьевые ручки и типографика"
        />

        <div className="flex flex-col gap-6 text-primary md:w-[55%] leading-relaxed">
          <p>
            Я студентка последнего курса колледжа информационных технологий.
            Лучше всего разрабатывать то, что любишь — а я люблю перьевые ручки.
            Так сложилось, что я много и с удовольствием пишу от руки, поэтому решила
            сделать личный проект именно на эту тему.
          </p>

          <p>
            Визуально вдохновлялась газетной типографикой: строгая сетка, шрифты, небольшие акценты,
            которые добавляют жизни, но не перегружают.
            Самое трудное было найти баланс: хотелось «газетного» максимализма, но пришлось
            жертвовать деталями ради мобильной версии. Первый вариант был куда насыщеннее,
            но сейчас сайт выглядит легче и удобнее. И, если честно, я довольна тем, что получилось:
            проект вышел с характером.
          </p>

          <p>
            Ещё одним стимулом послужил дизайн сайта <i>getpen</i>, который не менялся с 2012 года.
            Компания отличная — и хочется, чтобы их сайт это отражал.
            Свой проект я делала как современную интерпретацию магазина для любителей пера и чернил.
          </p>

          <p>
            В качестве стека выбрала <b>MERN</b> (MongoDB, Express, React, Node.js): он популярен, хорошо задокументирован
            и относительно прост для входа. Единственный минус — в рамках этого проекта я не успела
            познакомиться с PostgreSQL; в следующих работах планирую это исправить и попробовать реляционную модель.
          </p>
        </div>
      </div>


      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-6 text-primary text-sm">
          <div className="flex-1 border px-6 sm:px-10 py-8 sm:py-16 flex flex-col gap-4">
            <b className="font-semibold">Фронтенд</b>
            <ul className="list-disc pl-5 space-y-1">
              <li>React + React Router</li>
              <li>Context API (собственный ShopContext)</li>
              <li>Tailwind CSS + кастомные CSS-модули</li>
              <li>Headless UI (Disclosure), noUiSlider</li>
              <li>Swiper для слайдеров</li>
              <li>Адаптивная верстка и работа с спрайтами/иконками</li>
            </ul>
          </div>

          <div className="flex-1 border px-6 sm:px-10 py-8 sm:py-16 flex flex-col gap-4">
            <b className="font-semibold">Бэкенд</b>
            <ul className="list-disc pl-5 space-y-1">
              <li>Node.js + Express</li>
              <li>MongoDB + Mongoose</li>
              <li>JWT-авторизация, хэширование паролей</li>
              <li>REST API для каталога и корзины</li>
              <li>Валидации и базовая обработка ошибок</li>
            </ul>
          </div>

          <div className="flex-1 border  px-6 sm:px-10 py-8 sm:py-16 flex flex-col gap-4">
            <b className="font-semibold">Планы и развитие</b>
            <ul className="list-disc pl-5 space-y-1">
              <li>Познакомиться с PostgreSQL</li>
              <li>Контейнеризировать проект и задеплоить на свой VPS</li>
              <li>Добавить блог/статьи</li>
              <li>Расширить личный кабинет и историю заказов</li>
              <li>Новые категории: Чернила, Бумага и Аксессуары</li>
              <li>Больше анимаций и газетной эстетики!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About