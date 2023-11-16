import { Container } from "@mui/material";
import { notFound } from "next/navigation";
import "@/styles/ville.scss";
import Link from "next/link";
import CardA from "@/components/CardA";
import { supabase } from "@/lib/db";
import "@/styles/accueil.scss";

export default async function Page({ params }: { params: { search: string } }) {
  try {
    const { search } = params;
    const etab = (
      await supabase
        .from("etablissements")
        .select(`*, etablissement_images(*)`)
        .likeAnyOf("name", [`%${search}%`])
    ).data;
    const rooms = (
      await supabase
        .from("rooms")
        .select(`*, room_images(*), etablissements(*)`)
        .likeAnyOf("name", [`%${search}%`])
    ).data;
    const tables = (
      await supabase
        .from("tables")
        .select(`*, tables_images(*), etablissements(*)`)
        .likeAnyOf("type", [`%${search}%`])
    ).data;
    return (
      <Container sx={{ display: "flex", gap: 3 }}>
        <div className="flex flex-col mt-[100px] w-full">
          <div>
            <h1 className="title pb-3 font-bold">Résultat de &quot;{search}&quot;</h1>
            {etab && etab.length > 0 && (
              <>
                <h3 className="font-bold text-[20px] my-2">Etablissement :</h3>
                <div className="grille">
                  {etab.map((etab: any) => (
                    <Link href={`/etablissement/${etab.id}`} key={etab.id}>
                      <div className="max-w-[300px]">
                        <CardA
                          nom={etab.name}
                          location={etab.location}
                          image={`${process.env.NEXT_PUBLIC_BUCKET}/${etab.etablissement_images[0].image_path}`}
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
            {rooms && rooms.length > 0 && (
              <>
                <h3 className="font-bold text-[20px] my-5">Chambres :</h3>
                <div className="grille">
                  {rooms.map((room: any) => (
                    <Link href={`/reservation/chambre/${room.id}`} key={room.id}>
                      <CardA
                        nom={room.name}
                        location={room.etablissements.location}
                        etablissement={room.etablissements.name}
                        image={`${process.env.NEXT_PUBLIC_BUCKET}/${room.room_images[0].image_path}`}
                        price={room.price}
                      />
                    </Link>
                  ))}
                </div>
              </>
            )}
            {tables && tables.length > 0 && (
              <>
                <h3 className="font-bold text-[20px] my-5">Tables :</h3>
                <div className="grille">
                  {tables.map((table: any) => (
                    <Link href={`/reservation/table/${table.id}`} key={table.id}>
                      <CardA
                        nom={table.type}
                        location={table.etablissements.location}
                        etablissement={table.etablissements.name}
                        image={`${process.env.NEXT_PUBLIC_BUCKET}/${table.tables_images[0].image_path}`}
                        price={table.price}
                      />
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    );
  } catch (error) {
    console.log(error);
    return notFound();
  }
}
