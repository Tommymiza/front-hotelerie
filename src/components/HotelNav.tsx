import { HotelRounded } from "@mui/icons-material";

export default function HotelNav() {
  return (
    <div
      className="flex relative font-bold my-4 items-center"
      style={{
        boxShadow: "0 0 5px rgba(0,0,0,0.2)",
        borderRadius: 7,
        overflow: "hidden",
      }}
    >
      <p
        style={{
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
          width: "100%",
        }}
        className="nav-btn"
      >
        <HotelRounded /> Chambres
      </p>
      <span
        style={{
          background: "var(--primary)",
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          transition: ".4s",
          zIndex: -1,
        }}
      ></span>
    </div>
  )
}
