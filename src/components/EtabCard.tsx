import Link from "next/link";

export default function EtabCard({ data }: { data: any }) {
  return (
    <Link href={"/etablissement/" + data.id}>
      <div
        className="etab-card"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_BUCKET}/${data.etablissement_images[0].image_path})`,
        }}
      >
        <div className="etab-info">
          <h1>{data.name}</h1>
          <h3>{data.location}</h3>
        </div>
      </div>
    </Link>
  );
}
