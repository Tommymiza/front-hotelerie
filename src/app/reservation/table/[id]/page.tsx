import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { Person2Rounded } from "@mui/icons-material";
import { getTableBookings } from "@/lib/table";
import { Chip } from "@mui/material";

const CarouselI = dynamic(() => import("@/components/Carousel"), {
  ssr: false,
});

const ReservationTable = dynamic(
  () => import("@/components/ReservationTable"),
  {
    ssr: false,
  }
);

export default async function page({ params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const data = await getTableBookings(id);
    return (
      <section>
        <div id="pg-room">
          <div className="room-visuel">
            <CarouselI
              image={data.tables_images.map(
                (e: any) => process.env.NEXT_PUBLIC_BUCKET + "/" + e.image_path
              )}
            />
            <div className="p-4">
              <div>
                <div className="flex self-start gap-2">
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
          <ReservationTable
            id_table={data.id}
            price={data.price}
            etablissement_id={data.etablissement_id}
          />
        </div>
      </section>
    );
  } catch (error) {
    console.log(error);
    return notFound();
  }
}
