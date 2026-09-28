import type { PromoCardData } from "../../Components/PromoCard/PromoCard";
import type { ProductCardData } from "../../Components/ProductCard/ProductCard";

import promoLeather from '../../assets/promos/promo-leather.png';
import promoElectronics from '../../assets/promos/promo-electronics.png';
import promoGarden from '../../assets/promos/promo-garden.png';
import promoSummerCare from '../../assets/promos/promo-summer-care.png';
import promoBabyClothes from '../../assets/promos/promo-baby-clothes.png';
import promoWomenClothes from '../../assets/promos/promo-women-clothes.png';

import promoChemicals from '../../assets/promos/promo-chemicals.png';
import promoSwimsuits from '../../assets/promos/promo-swimsuits.png';
import promoSports from '../../assets/promos/promo-sports.png';
import promoChildren from '../../assets/promos/promo-children.png';
import promoMusic from '../../assets/promos/promo-music.png';
import promoSunglasses from '../../assets/promos/promo-sunglasses.png';

import productShoes from '../../assets/products/product-shoes.png';
import productGlasses from '../../assets/products/product-glasses.png';
import productAlarm from '../../assets/products/product-alarm.png';
import productDress from '../../assets/products/product-dress.png';
import productCream from '../../assets/products/product-cream.png';
import productHat from '../../assets/products/product-hat.png';

import saleWoman from '../../assets/products/sale-woman.png';
import saleDishes from '../../assets/products/sale-dishes.png';
import saleMan from '../../assets/products/sale-man.png';
import saleBlender from '../../assets/products/sale-blender.png';
import saleCoat from '../../assets/products/sale-coat.png';
import salePens from '../../assets/products/sale-pens.png';

export const topPromoItems: PromoCardData[] = [
    {
        id: 1,
        title: 'Tools for leather products: favorable prices',
        image: promoLeather,
    },
    {
        id: 2,
        title: 'Electronics with discount: buy time',
        image: promoElectronics,
    },
    {
        id: 3,
        title: 'A set of garden tools: bargain price',
        image: promoGarden,
    },
    {
        id: 4,
        title: 'Summer care cosmetics: freshness and comfort',
        image: promoSummerCare,
    },
    {
        id: 5,
        title: 'Baby clothes up to $25: comfort and style',
        image: promoBabyClothes,
    },
    {
        id: 6,
        title: "Stylish women's clothing: new season",
        image: promoWomenClothes,
    },
];

export const bottomPromoItems: PromoCardData[] = [
    {
        id: 7,
        title: 'Household chemicals up to $15: quality and savings',
        image: promoChemicals,
    },
    {
        id: 8,
        title: 'Swimsuits: competitive prices',
        image: promoSwimsuits,
    },
    {
        id: 9,
        title: 'Sports equipment bestseller: hit sales',
        image: promoSports,
    },
    {
        id: 10,
        title: "Fashionable children's clothes for girls",
        image: promoChildren,
    },
    {
        id: 11,
        title: 'Musical instruments: sale, super prices',
        image: promoMusic,
    },
    {
        id: 12,
        title: "Fashion sunglasses: this month's best sellers",
        image: promoSunglasses,
    },
];

export const trendingProducts: ProductCardData[] = [
    {
        id: 1,
        title: 'Everyday Deadlift Shoes Cross-Trainer',
        image: productShoes,
        price: 18.99,
        rating: 4,
        reviewsCount: 110,
    },
    {
        id: 2,
        title: 'VANLINKER Small Retro Skinny Cat Eye Glasses',
        image: productGlasses,
        price: 11.99,
        rating: 4,
        reviewsCount: 2110,
    },
    {
        id: 3,
        title: 'Classic Analog Alarm Clock, 4-inch',
        image: productAlarm,
        price: 9.99,
        rating: 4,
        reviewsCount: 114,
    },
    {
        id: 4,
        title: "Zeagoo Women's Casual Summer Shirt",
        image: productDress,
        price: 38.74,
        rating: 4,
        reviewsCount: 242,
    },
    {
        id: 5,
        title: 'Fresh Vitamin Nectar Moisture Glow Face Cream',
        image: productCream,
        price: 27.24,
        oldPrice: 52,
        discount: 48,
        rating: 4,
        reviewsCount: 9,
    },
    {
        id: 6,
        title: "SOMALER Women's Cotton Wide Brim Summer Hat",
        image: productHat,
        price: 18.99,
        rating: 4,
        reviewsCount: 1547,
    },
];

export const saleProducts: ProductCardData[] = [
    {
        id: 101,
        title: "REORIA Women's Slimming Double Line Top",
        image: saleWoman,
        price: 14.93,
        oldPrice: 17.99,
        discount: 17,
        rating: 4,
        reviewsCount: 18,
    },
    {
        id: 102,
        title: 'MALACASA LUNA Series 12-Piece Porcelain Set',
        image: saleDishes,
        price: 65.99,
        oldPrice: 85.99,
        discount: 23,
        rating: 4,
        reviewsCount: 113,
    },
    {
        id: 103,
        title: "Hanes Men's Heavyweight Cotton T-Shirt",
        image: saleMan,
        price: 15.46,
        oldPrice: 26,
        discount: 41,
        rating: 4,
        reviewsCount: 1025,
    },
    {
        id: 104,
        title: 'Ninja BN601 Professional Plus Food Processor',
        image: saleBlender,
        price: 89.96,
        oldPrice: 119.65,
        discount: 25,
        rating: 4,
        reviewsCount: 1341,
    },
    {
        id: 105,
        title: "LONDON FOG Women's Single Breasted Coat",
        image: saleCoat,
        price: 119.51,
        oldPrice: 129.99,
        discount: 8,
        rating: 4,
        reviewsCount: 1547,
    },
    {
        id: 106,
        title: 'SHARPIE Fine Point Pens, Assorted Colors',
        image: salePens,
        price: 23.39,
        oldPrice: 25.99,
        discount: 10,
        rating: 4,
        reviewsCount: 660,
    },
];