import React from "react";

import dynamic from "next/dynamic";
import CardA from "./CardA";
import { notFound } from "next/navigation";
import { getAllTable } from "@/lib/table";
import Link from "next/link";
import "@/styles/accueil.scss";
// const CardA = dynamic(() => import('@/components/CardA'), {ssr: false})
export default async function TableInAcceuil() {
  let data: any = null;

  data = await getAllTable();
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
          Des tables que tu pourrais aimer
        </h3>

        <div className="grille">
          {data ? (
            data?.map((table: any) => (
              <Link href={`reservation/table/${table.id}`} key={table.id}>
                <CardA
                  nom={table.type}
                  location={table.etablissement_id.location}
                  etablissement={table.etablissement_id.name}
                  image={`${process.env.NEXT_PUBLIC_BUCKET}/${table.tables_images[0].image_path}`}
                  price={table.price}
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
