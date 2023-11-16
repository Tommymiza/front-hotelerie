"use client";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/map/Map"), { ssr: false });

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "550px",
  bgcolor: "background.paper",
  border: "1px solid #f7f7f7",
  borderRadius: "10px",
  boxShadow: 24,
  p: 2,
  gap: 0,
};

export default function CarteModal({ items }: { items: any[] }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="flex justify-center">
      <Button onClick={handleOpen}>Voir sur la carte</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        keepMounted
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <span
                onClick={handleClose}
                style={{
                  cursor: "pointer",
                  width: "20px",
                }}
              >
                &#128473;
              </span>
            </div>
            {items && <Map items={items} />}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
