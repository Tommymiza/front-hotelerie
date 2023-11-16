"use client";
import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import { LatLngExpression } from 'leaflet';
import { defaultIcon } from './icons';
import dynamic from 'next/dynamic';


const CustomMarker = dynamic(() => import('@/components/map/CustomMarker'), { ssr: false });

interface MapProps {
    items: any[];

}
export default function Map({ items }: MapProps) {
    const pos = [items[0].coordinates.lat, items[0].coordinates.long];


    return (
        <MapContainer
            className='map__container'
            center={pos as LatLngExpression}
            zoom={16}
            scrollWheelZoom={false}
        >

            {items.map(item => (<CustomMarker key={item.id} item={item} />))}

            <TileLayer
                attribution='&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"

            />

        </MapContainer>
    )
}