"use client";
import { Container, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/db";
import { toast } from "react-toastify";
import "@/styles/profile.scss";
import { EmailOutlined } from "@mui/icons-material";
import { format } from "date-fns";
import fr from "date-fns/locale/fr";

export default function Page() {
  const [user, setUser] = useState<any>(null);
  const [tableBookings, setTableBookings] = useState<any[]>([]);
  const [roomBookings, setRoomBookings] = useState<any[]>([]);
  const [tabs, setTabs] = useState<number>(0);

  useEffect(() => {
    async function getSession() {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.log(error);
        toast.error("Erreur de connexion !", {
          autoClose: 3000,
        });
        return;
      }
      if (data.session) {
        const current_user = data.session.user.user_metadata;
        setUser({
          id: data.session.user.id,
          nom: current_user.username
            ? current_user.username
            : current_user.name,
          email: data.session.user.email,
        });
      }
    }
    getSession();
  }, []);

  useEffect(() => {
    async function getBookings() {
      try {
        // room bookings
        const { data: roomBooking, error: errorRoomBooking } = await supabase
          .from("room_bookings")
          .select(`*, rooms(*, etablissements(*))`)
          .eq("client_id", user.id);

        // table bookings
        const { data: tableBooking, error: errorTableBooking } = await supabase
          .from("table_bookings")
          .select(`*, tables(*, etablissements(*))`)
          .eq("client_id", user.id);

        if (tableBooking !== null) {
          console.log(tableBooking);
          setTableBookings(tableBooking);
        }
        if (roomBooking !== null) {
          console.log(roomBooking);
          setRoomBookings(roomBooking);
        }
        if (errorRoomBooking) {
          throw new Error(errorRoomBooking.message);
        }
        if (errorTableBooking) {
          throw new Error(errorTableBooking.message);
        }
      } catch (error: any) {
        toast.error(error.message, {
          autoClose: false,
        });
      }
    }
    if (user) {
      getBookings();
    }
  }, [user]);

  return (
    <section>
      <Container>
        <div
          style={{
            marginTop: "100px",
            minHeight: "250px",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <div className="profile">
            {user ? (
              <div className="flex flex-col gap-3">
                <div className="profile-info">
                  <h3 className="profile-name">{user.nom}</h3>
                  <p className="profile-email">
                    <EmailOutlined /> {user.email}
                  </p>
                </div>
                <div className="flex flex-col gap-1 items-center">
                  <h1>Historique de réservation</h1>
                  <Tabs value={tabs} onChange={(e, v) => setTabs(v)}>
                    <Tab
                      label="Chambres"
                      value={0}
                      disabled={roomBookings.length === 0}
                    />
                    <Tab
                      label="Tables"
                      value={1}
                      disabled={tableBookings.length === 0}
                    />
                  </Tabs>
                  {tabs === 0 && roomBookings.length > 0 && (
                    <div className="flex flex-col w-full gap-2">
                      {roomBookings.map((e, i) => (
                        <div className="history" key={i}>
                          <div className="card-title">
                            <h1>{e.rooms.etablissements.name}</h1>
                            <h3>{e.rooms.name}</h3>
                            <p className="chip success">{e.rooms.type}</p>
                          </div>
                          <div className="card-content">
                            <p>
                              {format(new Date(e.date_start), "dd/MM/yyyy", {
                                locale: fr,
                              })}{" "}
                              à{" "}
                              {format(new Date(e.date_start), "dd/MM/yyyy", {
                                locale: fr,
                              })}
                            </p>
                            <div>
                              <h3>Prix total:</h3>
                              <p>
                                {e.total_price.toLocaleString("mg-MG", {
                                  style: "decimal",
                                })}{" "}
                                Ar
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {tabs === 1 && tableBookings.length > 0 && (
                    <div className="flex flex-col w-full gap-2">
                      {tableBookings.map((e, i) => (
                        <div className="history" key={i}>
                          <div className="card-title">
                            <h1>{e.tables.etablissements.name}</h1>
                            <p className="chip success">{e.tables.type}</p>
                          </div>
                          <div className="card-content" style={{gap: 0}}>
                            <div>
                                <p>{format(new Date(e.date), "dd/MM/yyyy", {locale: fr})}</p>
                                <p>{e.hours.split(';')[0]} à {e.hours.split(';')[1]}</p>
                            </div>
                            <div>
                              <h3>Prix total:</h3>
                              <p>
                                {e.total_price.toLocaleString("mg-MG", {
                                  style: "decimal",
                                })}{" "}
                                Ar
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p>Vous n&apos;êtes pas connecté</p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
