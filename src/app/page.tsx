import RoomInAcceuil from "@/components/RoomInAcceuil";
import TableInAccueil from "@/components/TableInAccueil";
import { getAllEtablissement } from "@/lib/etablissement";
import { Container } from "@mui/material";
import Link from "next/link";
import dynamic from "next/dynamic";

const Banner = dynamic(() => import("@/components/Banner"), { ssr: false });

export default async function Home() {
  let data = null;
  let villeDistinct: Set<string> | null = null;
  try {
    data = await getAllEtablissement();
    const ville = data.map((etab) => etab.location);
    villeDistinct = new Set(ville);
  } catch (error) {
    console.log(error);
  }
  return (
    <main>
      <Banner />
      <section>
        <Container
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            gap: "3rem",
          }}
        >
          <div>
            <h3
              style={{ fontSize: 20, marginBottom: "10px", fontWeight: "bold" }}
            >
              Explorer Madagascar
            </h3>
            <div className="flex w-full flex-col">
              {data ? (
                <div>
                  <div className="grille">
                    {Array.from(villeDistinct!).map((ville, index) => (
                      <Link href={`/ville/${ville}`} key={index}>
                        <div className="categorie">
                          <img src={`/villes/${ville}.jpg`} alt={ville} />
                          <p>{ville}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div>Chargement...</div>
              )}
            </div>
          </div>
          <RoomInAcceuil />
          <TableInAccueil />
        </Container>
      </section>
    </main>
  );
}
