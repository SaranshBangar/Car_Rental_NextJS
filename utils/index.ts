import { manufacturers } from "@/constants";
import { CarProps, FilterProps } from "@/types";



// export async function fetchCars(filters: FilterProps) {
//     const { manufacturer, year, model, limit, fuel } = filters;

//     const headers = {
//         'X-RapidAPI-Key': '73ecf0f144msh3fef46810f2e44fp133370jsn85e8a7971f1b',
//         'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
//     }

//     try {
//         const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`, {
//             headers: headers,
//         });

//         if (!response.ok) {
//             throw new Error(`Failed to fetch data: ${response.statusText}`);
//         }

//         const result = await response.json();

//         return result;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         return null; // or handle the error in any other appropriate way
//     }
// }

export async function fetchCars(filters: FilterProps) {
    const { manufacturer, year, model, limit, fuel } = filters;
  
    const headers: HeadersInit = {
        'X-RapidAPI-Key': '73ecf0f144msh3fef46810f2e44fp133370jsn85e8a7971f1b',
        'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
    }
  
    const response = await fetch(
      `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
      {
        headers: headers,
      }
    );
  
    const result = await response.json();
  
    return result;
  }


export const calculateCarRent = (city_mpg : number, year : number) => {
    const basePricePerDay = 50;
    const mileageFactor = 0.1;
    const ageFactor = 0.05;
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;
    const rentalPerDay = basePricePerDay + mileageRate + ageRate;
    return rentalPerDay.toFixed(0);
};

export const generateCarImageUrl = (car : CarProps, angle? : string) => {
    const url = new URL('https://cdn.imagin.studio/getimage');
    const { make, year, model } = car;
    url.searchParams.append('customer', 'hrjavascript-mastery');
    url.searchParams.append('make', make);
    url.searchParams.append('modelFamily', model.split(' ')[0]);
    url.searchParams.append('zoomType', 'fullscreen');
    url.searchParams.append('modelYear', `${year}`);
    url.searchParams.append('angle', `${angle}`);
    return `${url}`;
} 

export const updateSearchParams = (type: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(type, value);
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
    const newUrl = `${window.location.origin}${newPathname}`;
    return newUrl;
}
