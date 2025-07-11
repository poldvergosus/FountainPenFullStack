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

    ]
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
    ]
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
    ]
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
    ]
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
      {
        name: 'Прозрачный',
        hex: 'transparent',
        isTransparent: true
      }
    ]
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
      {
        name: 'Прозрачный',
        hex: 'transparent',
        isTransparent: true
      }
    ]
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
    ]
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
      {
        name: 'Прозрачный',
        hex: 'transparent',
        isTransparent: true
      },
    ]
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
    ]
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
    ]
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
    ]
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
      { name: "Желтый", hex: "#D8B735" },
    ]
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
    ]
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
    ]
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
    ]
  },

];