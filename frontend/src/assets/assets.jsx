// Герои
import heroPage from "./images/hero_page_alt.png";
import heroSvg from "./images/heropage_cutout.svg";

// Логотипы и иконки
import logo from "./images/ink_quill.svg";
import footerLogo from "./images/footer_icon.webp";
import blogLogo from "./images/blog_logo.svg";
import newsletterLogo from "./images/newsletter_logo.svg";
import background from "./images/footer.svg";

// Руки
import handLeft from "./images/hand_left.svg";
import handRight from "./images/hand_right.svg";

// Корзина и поиск
import cartSprite from "./images/cart_sprite.webp";
import searchSprite from "./images/search_sprite.webp";
import searchIcon from "./images/search_glass.svg";

// Соцсети
import tgIcon from "./images/tg.svg";
import vkIcon from "./images/vk.svg";

export const assets = {
  logo,
  footerLogo,
  blogLogo,
  heroPage,
  heroSvg,
  handLeft,
  handRight,
  newsletterLogo,
  background,
  ui: {
    cartSprite,
    searchSprite,
    searchIcon,
  },
  social: {
    tgIcon,
    vkIcon,
  }
}
export const products = [
  {
    id: 1,
    image: "/images/prd1.jpg",
    title: "Kaweco Student EF 50's Rock",
    desc: "кремовый корпус, синий колпачок",
    price: 6080,
    popular: true,
    category: "перьевые ручки",
    brand: "Kaweco",
    nibmaterial: false,
    size: "EF",
    colors: [
      { name: "Синий", hex: "#1e40af" },
      { name: "Белый", hex: "#FFFFFF" }
    ],
    details: `Перьевая ручка в винтажном стиле - Kaweco Student. Такие перьевые ручки Kaweco впервые появилась более 100 лет назад в маленьком магазине рядом с Университетом Heidelberg в 1883 году и были разработаны специально для студентов.

Новый цвет классической ручки Kaweco Student - корпус кремового цвета гармонично сочетается с синим колпачком и позолоченными элементами отделки.

Корпус ручки сделан из акриловой смолы (используется технология литья под высоким давлением). Позолоченный элементы отделки. Гладкая, прохладная, с небольшой талией грип-секция. Позолоченное стальное перо EF c иридиевым наконечником. Колпачок на резьбе.

В ручке используется стальное перо Kaweco, и это перо можно легко поменять (перо просто “выкручивается” из корпуса вместе с небольшой пластиковой тубой). К ручке Kaweco Student подходят любые сменные перья серии Kaweco 60.

В комплекте к ручке прилагается картридж с синими чернилами (картридж спрятан внутри корпуса ручки и его нужно аккуратно вытряхнуть оттуда перед использованием). Вообще в корпус ручки помещается два картриджа international - один в рабочем состоянии, второй - “про запас” или полноразмерный конвертор.

Преимущества ручки Kaweco Student:
1. Винтажный, но вполне уместный и пропорционально-атлетический дизайн.
2. Корпус вмещает 2 картриджа international short.
3. Стандартное стальное перо Kaweco 60.

Комплект поставки: жестяная, с ретро-дизайном коробочка, маленькая инструкция (она же гарантия и сертификат подлинности), ручка, один синий картридж.

Вес ручки - 25 грамм, длина закрытой ручки - 13.2 мм, без колпачка -11.9 см, с колпачком, надетым на противоположный конец ручки, ручка превращается в полноразмерный пишущий инструмент - 15.8 см.

Сделано в Германии.`
  },
  {
    id: 2,
    image: "/images/prd2.jpg",
    title: "Platinum Plaisir",
    desc: "Bali Citrus",
    price: 1400,
    popular: true,
    category: "перьевые ручки",
    brand: "Platinum",
    nibmaterial: false,
    size: "M",
    colors: [
      { name: "Желтый", hex: "#D8B735" }
    ],
    details: `Практичная перьевая ручка Platinum Plaisir 0.3 (толщина линии близка к японским перьям F). Старший брат ручки знаменитой Platinum Preppy c полностью обновленным корпусом. Пластичное перо 0.3, прозрачная грип-секция и роскошный, гладкий корпус-сигара. Легкий и прочный алюминиевый корпус ручки покрыт зеркальным хромом.

Преимущества ручки не ограничиваются внешним видом. Колпачок Platinum Plaisir сделан по технологии, которая позволяет надежно изолировать перо от внешнего мира и уберечь чернила от высыхания. По заявлению производителя, ручка Platinum Plaisir может лежать заправленной с закрытым колпачком до года без полного высыхания чернил.

Ручка заправляется картриджами формата Platinum (с шариком для перемешивания чернил) или чернилами из флакона с использованием конвертора для перьевой ручки CON-500. В комплекте - один черный картридж Platinum.

Преимущества:
1. Прочный корпус.
2. Роскошный экстерьер.
3. Знакомое, сбалансированное стальное перо.

Вес ручки - 17.5 г, длина ручки с закрытым колпачком - 14.3 см. Ручка поставляется в прозрачной пластиковой коробке-блистере.

Сделано в Японии.`
  },
  {
    id: 3,
    image: "/images/prd3.jpg",
    title: "Sailor LeCoule",
    desc: "Teal Green MF (темно-бирюзовый корпус)",
    price: 5030,
    popular: false,
    category: "перьевые ручки",
    brand: "Sailor",
    nibmaterial: true,
    size: "MF",
    colors: [
      { name: "Черный", hex: "#212326" }
    ],
    details: `Перьевая ручка Sailor LeCoule. Строгий и классический внешний вид. Корпус ручки сделан из темно-бирюзового пластика. Строгое золотистое стальное перо традиционной для фирмы Sailor формы с небольшой гравировкой (якорем, который является логотипом Sailor, и названием компании).

Форма корпуса и клип повторяют форму ручек премиального класса из серии Sailor Professional Gear.

Серия Sailor LeCoule выпускается только с пером MF (medium-fine), но несмотря на такую переходную маркировку, ручка пишет тонко, как стандартное японское перо F. У ручки картриджно-конверторная система заправки, к ней подходят картриджи и конверторы формата Sailor.

Вес ручки 12.5 грамма. Длина ручки с закрытым колпачком - 123 мм. Без колпачка - 108 мм. С колпачком надетым, на обратную сторону ручки - 140 мм.

Комплект поставки: подарочная коробка из черного картона, ручка Sailor LeCoule, два черных картриджа стандарта Sailor.

Сделано в Японии.`
  },
  {
    id: 4,
    image: "/images/prd4.jpg",
    title: "Kaweco ALsport F 0.7мм",
    desc: "синий состаренный",
    price: 6080,
    popular: true,
    category: "перьевые ручки",
    brand: "Kaweco",
    nibmaterial: false,
    size: "F",
    colors: [
      { name: "Синий", hex: "#1e40af" }
    ],
    details: ""
  },
  {
    id: 5,
    image: "/images/prd5.jpg",
    title: "TWSBI ECO",
    desc: "Persian Green F (персидский зеленый)",
    price: 6080,
    popular: true,
    category: "перьевые ручки",
    brand: "TWSBI",
    nibmaterial: false,
    size: "B",
    colors: [
      { name: "Голубой", hex: "#229ED9" },
      { name: "Синий", hex: "#1e40af" },
      { name: "Прозрачный", hex: "transparent", isTransparent: true }
    ],
    details: ""
  },
  {
    id: 6,
    image: "/images/prd6.jpg",
    title: "Platinum Century #3776",
    desc: "Nice Lavande F",
    price: 29495,
    popular: false,
    category: "перьевые ручки",
    brand: "Platinum",
    nibmaterial: false,
    size: "F",
    colors: [
      { name: "Фиолетовый", hex: "#842183" },
      { name: "Прозрачный", hex: "transparent", isTransparent: true }
    ],
    details: ""
  },
  {
    id: 7,
    image: "/images/prd7.jpg",
    title: "Lamy Al-Star",
    desc: "Harry Potter Special Edition Hufflepuff EF (желтый корпус)",
    price: 8020,
    popular: false,
    category: "перьевые ручки",
    brand: "Lamy",
    nibmaterial: false,
    size: "EF",
    colors: [
      { name: "Желтый", hex: "#D8B735" }
    ],
    details: ""
  },
  {
    id: 8,
    image: "/images/prd8.jpg",
    title: "Platinum Century #3776",
    desc: "Nice Rose F (прозрачный корпус)",
    price: 29495,
    popular: false,
    category: "перьевые ручки",
    brand: "Platinum",
    nibmaterial: false,
    size: "F",
    colors: [
      { name: "Прозрачный", hex: "transparent", isTransparent: true }
    ],
    details: ""
  },
  {
    id: 9,
    image: "/images/prd9.jpg",
    title: "Diplomat Excellence",
    desc: "A2 Skyline Red M",
    price: 19080,
    popular: false,
    category: "перьевые ручки",
    brand: "Diplomat",
    nibmaterial: false,
    size: "M",
    colors: [
      { name: "Красный", hex: "#AE3B18" }
    ],
    details: ""
  },
  {
    id: 10,
    image: "/images/prd10.jpg",
    title: "Kaweco AL Sport",
    desc: "Piston Filler EF (черный матовый)",
    price: 21980,
    popular: false,
    category: "перьевые ручки",
    brand: "Kaweco",
    nibmaterial: false,
    size: "EF",
    colors: [
      { name: "Черный", hex: "#212326" }
    ],
    details: ""
  },
  {
    id: 11,
    image: "/images/prd11.jpg",
    title: "Lamy 2000",
    desc: "BB (стальной корпус)",
    price: 65230,
    popular: false,
    category: "перьевые ручки",
    brand: "Lamy",
    nibmaterial: false,
    size: "BB",
    colors: [
      { name: "Серый", hex: "#848484" }
    ],
    details: ""
  },
  {
    id: 12,
    image: "/images/prd12.jpg",
    title: "Kaweco Liliput",
    desc: "F (латунный корпус)",
    price: 13608,
    popular: false,
    category: "перьевые ручки",
    brand: "Kaweco",
    nibmaterial: false,
    size: "F",
    colors: [
      { name: "Желтый", hex: "#D8B735" }
    ],
    details: ""
  },
  {
    id: 13,
    image: "/images/prd13.jpg",
    title: "Sailor Fude de Mannen",
    desc: "Green (fude 55°)",
    price: 21980,
    popular: false,
    category: "перьевые ручки",
    brand: "Sailor",
    nibmaterial: false,
    size: "Fude",
    colors: [
      { name: "Зеленый", hex: "#528935" }
    ],
    details: ""
  },
  {
    id: 14,
    image: "/images/prd14.jpg",
    title: "Visconti Mirage Horn",
    desc: "EF",
    price: 19260,
    popular: false,
    category: "перьевые ручки",
    brand: "Visconti",
    nibmaterial: false,
    size: "EF",
    colors: [
      { name: "Серый", hex: "#848484" },
      { name: "Черный", hex: "#212326" }
    ],
    details: ""
  },
  {
    id: 15,
    image: "/images/prd15.jpg",
    title: "TWSBI Diamond",
    desc: "580AL Mini M",
    price: 13340,
    popular: false,
    category: "перьевые ручки",
    brand: "TWSBI",
    nibmaterial: "",
    size: "M",
    colors: [
      { name: "Прозрачный", hex: "#1e40af" }
    ],
    details: ""
  }

];