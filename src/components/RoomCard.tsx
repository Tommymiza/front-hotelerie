import {
  BedRounded,
  NightsStayRounded,
  Person2Rounded,
  TodayRounded,
} from "@mui/icons-material";
import { Divider } from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";
const LightGalleryItems = dynamic(() => import("./LightGalleryItems"), {
  ssr: false,
});

export default function RoomCard({ data }: { data: any }) {
  return (
    <div className="room-card">
      <h1>{data.name}</h1>
      <div className="room-card-content">
        <div className="info">
          <div className="flex self-start gap-2">
            <p className="flex items-center font-bold">
              <BedRounded />: {data.bed_number}
            </p>
            <p className="flex items-center font-bold">
              <Person2Rounded />: {data.capacity}
            </p>
            <span
              className={data.disponibility ? "chip success" : "chip error"}
            >
              {data.disponibility ? "Disponible" : "Indisponible"}
            </span>
          </div>
          <p>{data.description}</p>
        </div>
        <div className="info">
          <div className="flex flex-col items-center gap-4">
            <p
              style={{
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
                fontSize: 20,
              }}
            >
              {data.price} Ariary / <NightsStayRounded />
            </p>
            <Link href={`/reservation/chambre/${data.id}`}>
              <div className="chip flex gap-2 items-center" style={{background: "#faae61", padding: "10px 20px"}}>
                <TodayRounded />
                Réserver
              </div>
            </Link>
          </div>
        </div>
      </div>
      <LightGalleryItems images={data.room_images} />
      <Divider orientation="horizontal" style={{ marginTop: 10 }} />
    </div>
  );
}
