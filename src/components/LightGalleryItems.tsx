"use client";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

export default function LightGalleryItems({images}: {images: any[]}) {
  return (
    <LightGallery plugins={[lgThumbnail, lgZoom]} height="100px" addClass="gallery-container" >
      {images.map((i: any) => (
        <a
          href={`${process.env.NEXT_PUBLIC_BUCKET}/${i.image_path}`}
          key={i.id}
        >
          <img
          style={{width: 300, height: 200}}
            src={`${process.env.NEXT_PUBLIC_BUCKET}/${i.image_path}`}
            alt="Room image"
          />
        </a>
      ))}
    </LightGallery>
  );
}
