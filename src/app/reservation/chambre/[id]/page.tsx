import { getRoomBookings } from "@/lib/room";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { BedRounded, Person2Rounded } from "@mui/icons-material";
import Container from "@mui/material/Container";

const CarouselI = dynamic(() => import("@/components/Carousel"), {
  ssr: false,
});

const Reservation = dynamic(() => import("@/components/Reservation"), {
  ssr: false,
});

export default async function page({ params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const data = await getRoomBookings(id);
    return (
      <section>

        <div id="pg-room" style={{ marginTop: '80px' }}>
          <div>
            <CarouselI
              image={data.room_images.map(
                (e: any) => process.env.NEXT_PUBLIC_BUCKET + "/" + e.image_path
              )}
            />
            <div className="p-4">
              <div className="flex items-center justify-between w-full">
                <h1>{data.name}</h1>
              </div>
              <div>
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
            </div>
          </div>
          <Reservation
            etablissement_id={data.etablissement_id}
            id_room={data.id}
            price={data.price}
          />
        </div>

      </section>
    );
  } catch (error) {
    console.log(error);
    return notFound();
  }
}
