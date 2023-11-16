import { getOneEtablissement } from "@/lib/etablissement";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { Container, IconButton, Tooltip } from "@mui/material";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import { getAllRoomForOne } from "@/lib/room";
import { getAllTableForOne } from "@/lib/table";
import RoomCard from "@/components/RoomCard";
import TableCard from "@/components/TableCard";
import HotelNav from "@/components/HotelNav";
import RestaurantNav from "@/components/RestaurantNav";

const CarteModal = dynamic(() => import("@/components/modal/Modal-carte"), {
  ssr: false,
});

const Map = dynamic(() => import("@/components/map/Map"), {
  ssr: false,
})
const CarouselI = dynamic(() => import("@/components/Carousel"), {
  ssr: false,
});
const RatingClient = dynamic(() => import("@/components/RatingClient"), {
  ssr: false,
});
const NavigationSwitch = dynamic(() => import("@/components/RoomTableNav"), {
  ssr: false,
});

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const data = await getOneEtablissement(id);
    const rooms = await getAllRoomForOne(id);
    const tables = await getAllTableForOne(id);
    return (

      <section>
        <Container>
          <div className="pg-etab" style={{ marginTop: '90px' }}>
            <CarouselI
              image={data.etablissement_images.map(
                (i: any) => process.env.NEXT_PUBLIC_BUCKET + "/" + i.image_path
              )}
            />
            <div className="p-4">
              <div className="flex items-center justify-between w-full">
                <h1>{data.name}</h1>
                <Tooltip title="Favoris" arrow>
                  <IconButton>
                    <FavoriteBorderOutlined sx={{ fontSize: 35 }} />
                  </IconButton>
                </Tooltip>
              </div>
              <div>
                <RatingClient />
                <p>{data.description}</p>
                <p>test eto</p>

                {data && <CarteModal items={[data]} />}
              </div>
              <div>
                <div style={{ position: "sticky", top: 69, padding: "5px 0", background: "white" }}>
                  {data.type === "hotel restaurant" && <NavigationSwitch />}
                  {data.type === "hotel" && <HotelNav />}
                  {data.type === "restaurant" && <RestaurantNav />}
                </div>
                <div id="chambre-list">
                  {rooms.map((r: any) => (
                    <RoomCard data={r} key={r.id} />
                  ))}
                </div>
                <div id="table-list">
                  {tables.map((t: any) => (
                    <TableCard data={t} key={t.id} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section >
    );
  } catch (error) {
    console.log(error);
    return notFound();
  }
}
