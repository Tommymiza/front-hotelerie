import EtabCard from "@/components/EtabCard";
import { getAllByLocation } from "@/lib/etablissement";
import { Container } from "@mui/material";
import { notFound } from "next/navigation";
import "@/styles/ville.scss";
import dynamic from "next/dynamic";
import Link from "next/link";
import CardA from "@/components/CardA";

const CarteModal = dynamic(() => import("@/components/modal/Modal-carte"), {
  ssr: false,
});

export default async function page({
  params,
}: {
  params: { location: string };
}) {
  let data: any = null;
  try {
    const { location } = params;
    data = await getAllByLocation(location);
    return (
      <Container sx={{ display: "flex", gap: 3 }}>
        <div className="flex flex-col mt-[100px] w-full">
          <div className="card self-center w-full">
            {data && <CarteModal items={data} />}
          </div>
          <div>
            <h1 className="title pb-3 font-bold">
              {location}
            </h1>
            <div className="grille">
              {data.map((etab: any) => (
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
          </div>
        </div>
      </Container>
    );
  } catch (error) {
    console.log(error);
    return notFound();
  }
}
