import L from "leaflet";
import hotelImgLocation from '../../assets/icons/hotel.png';
// import defaultLocation from '../../assets/icons/default.png';
// import restaurantImgLocation from '../../assets/icons/restaurant.png';


export const defaultIcon = L.icon({

    iconSize: [34, 44],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: '/marker/default.png',
    shadowAnchor: [4, 62],  // the same for the shadow
    
});

export const hotelRestoIcon = L.icon({

    iconSize: [34, 44],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: '/marker/lounges.png',
    shadowAnchor: [4, 62],  // the same for the shadow
    
});


export const hotelIcon = L.icon({

    iconSize: [33, 44],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: '/marker/hotels.png',
    shadowAnchor: [4, 62],  // the same for the shadow
    
});


export const restaurantIcon = L.icon({

    iconSize: [33, 44],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: '/marker/restaurants.png',
    shadowAnchor: [4, 62],  // the same for the shadow
    
});