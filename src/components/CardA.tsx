import React from 'react'
import '@/styles/cardA.scss';


interface Props {
  nom: string;
  etablissement?: string;
  location: string;
  image: string;
  price?: number | string;
}
export default function CardA({
  nom,
  etablissement,
  location,
  image,
  price
}: Props
) {

  return (
    <div className='card-container'>
      <div className="card-images">
        <img src={image} className="card-image" />
      </div>
      <div className="card-info">
        <div>
          <h3>{nom}</h3>
          <p>{`${etablissement ? etablissement + ", " + location : location}`}</p>
        </div>
        <div className='card-price'>
          {price && <p>A partir de : <span>{price.toLocaleString('mg-MG', { style: 'decimal' })} Ar</span> </p>}
        </div>
      </div>

    </div>
  )
}
