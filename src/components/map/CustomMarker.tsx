"use client";
import React, { useRef } from 'react'
import { Marker, useMap, Popup } from 'react-leaflet'
import 'leaflet.smooth_marker_bouncing';
import { hotelIcon, restaurantIcon, hotelRestoIcon } from './icons';
import { LatLngExpression } from 'leaflet';

interface CustomMarkerProps {
    item: any;

}
const CustomMarker = ({ item }: CustomMarkerProps) => {
    const position: LatLngExpression = [item.coordinates.lat, item.coordinates.long];
    const zoom = 15;
    const map = useMap();
    const markerRef = useRef<any>();
    const TIME_BOUNCE = 1;

    React.useEffect(() => {
        if (markerRef.current) {
            markerRef.current.bounce({ duration: TIME_BOUNCE, height: 20, loop: 1 })
            map.setView(position, zoom);
        }
    }, [markerRef, map])



    return (
        <Marker
            position={position}
            ref={markerRef}

            icon={item.type === 'restaurant' ? restaurantIcon : hotelIcon}
        >
            <Popup>
                {item.name}
            </Popup>
        </Marker>
    )
}

export default CustomMarker