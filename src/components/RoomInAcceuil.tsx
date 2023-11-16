import React from "react";
import CardA from "./CardA";
import { notFound } from "next/navigation";
import { getAllRoom } from "@/lib/room";
import Link from "next/link";

// const CardA = dynamic(() => import('@/components/CardA'), {ssr: false})
export default async function RoomInAcceuil() {
  let data: any = null;

  data = await getAllRoom();
  try {
    return (
      <div className="accueil-container flex flex-col gap-1">
        <h3
          style={{
            fontSize: 20,
            marginBottom: "10px",
            fontWeight: "bold",
          }}
        >
          Les hébergements que les clients adorent
        </h3>
        <div className="grille">
          {data ? (
            data?.map((room: any) => (
              <Link href={`reservation/chambre/${room.id}`} key={room.id}>
                <CardA
                  nom={room.name}
                  location={room.etablissement_id.location}
                  etablissement={room.etablissement_id.name}
                  image={`${process.env.NEXT_PUBLIC_BUCKET}/${room.room_images[0].image_path}`}
                  price={room.price}
                />
              </Link>
            ))
          ) : (
            <p>Chargement ...</p>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
    return notFound();
  }
}
