"use client";
import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import "@/styles/navbar.scss";
import Link from "next/link";
import { useMyContext } from "./Context";
import { FormEvent, useEffect, useRef, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { login, signupadmin, signupclient } from "@/lib/user";
import { supabase } from "@/lib/db";
import { toast } from "react-toastify";
import AcountPopover from "./Account-popover";
import {
  AddHomeRounded,
  LoginRounded,
  MenuOutlined,
  PersonAddAlt1Rounded,
} from "@mui/icons-material";

export default function Navbar() {
  const { user, setUser } = useMyContext();
  const [connect, setConnect] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [dialog, setDialog] = useState("login");
  const [width, setWidth] = useState<number>(document.body.offsetWidth);
  const form = useRef<HTMLFormElement | null>(null);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email: string = form.current!.email.value;
    const password: string = form.current!.password.value;
    setLoading(true);
    try {
      const data = await login({ email, password });
      location.reload();
    } catch (error: any) {
      const err = new String(error);
      if (err.toString().includes("Email")) {
        toast.error("Email non confirmé !", {
          autoClose: 3000,
        });
      } else if (err.toString().includes("client")) {
        toast.error("Vous n'êtes pas un client", {
          autoClose: 3 * 1000,
        });
      } else {
        toast.error("Information invalide", {
          autoClose: 3 * 1000,
        });
      }
    }
    setLoading(false);
  };
  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nom: string = form.current!.nom.value;
    const email: string = form.current!.email.value;
    const password: string = form.current!.password.value;
    setLoading(true);
    try {
      await signupclient({ nom, email, password });
      toast.success("Vérifier votre boîte email !", {
        autoClose: 3000,
      });
    } catch (error) {
      console.log(error);
      toast.error("Veuillez réessayer !", {
        autoClose: 3000,
      });
    }
    setLoading(false);
  };
  const handleSignupAdmin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nom: string = form.current!.nom.value;
    const email: string = form.current!.email.value;
    const password: string = form.current!.password.value;
    setLoading(true);
    try {
      await signupadmin({ nom, email, password });
      toast.success("Vérifier votre boîte email !", {
        autoClose: 3000,
      });
    } catch (error) {
      console.log(error);
      toast.error("Veuillez réessayer !", {
        autoClose: 3000,
      });
    }
    setLoading(false);
  };
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message);
      }
      location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Veuillez réessayer !", {
        autoClose: 3000,
      });
    }
  };
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
        if (current_user.role === "client") {
          setUser({
            id: data.session.user.id,
            nom: current_user.username
              ? current_user.username
              : current_user.name,
            email: data.session.user.email,
          });
        }
      }
    }
    getSession();
    function resizer() {
      setWidth(document.body.offsetWidth);
    }
    window.addEventListener("resize", resizer);
    return () => {
      window.removeEventListener("resize", resizer);
    };
  }, []);
  return (
    <div className="flex nav-main">
      <div className="flex w-full p-4 justify-between items-center nav-container">
        <div id="logo">
          <Link href={"/"}>
            <h1>U-Reservation</h1>
          </Link>
        </div>
        {width > 620 ? (
          <ul className="flex gap-2 items-center">
            <Button
              sx={{ color: "#272727" }}
              onClick={() => {
                setDialog("signupadmin");
                setConnect(true);
              }}
            >
              Ajouter votre établissement
            </Button>
            {!user ? (
              <>
                <Button
                  sx={{ color: "#272727" }}
                  onClick={() => {
                    setDialog("login");
                    setConnect(true);
                  }}
                >
                  Se connecter
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    setDialog("signup");
                    setConnect(true);
                  }}
                >
                  Inscription
                </Button>
              </>
            ) : (
              <>
                <AcountPopover user={user} logout={logout} />
              </>
            )}
          </ul>
        ) : (
          <ul>
            <Tooltip title="Ajouter votre établissement">
              <IconButton
                onClick={() => {
                  setDialog("signupadmin");
                  setConnect(true);
                }}
              >
                <AddHomeRounded />
              </IconButton>
            </Tooltip>
            {user ? (
              <AcountPopover user={user} />
            ) : (
              <>
                <Tooltip title="Connexion client">
                  <IconButton
                    onClick={() => {
                      setDialog("login");
                      setConnect(true);
                    }}
                  >
                    <LoginRounded />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Inscription client">
                  <IconButton
                    onClick={() => {
                      setDialog("signup");
                      setConnect(true);
                    }}
                  >
                    <PersonAddAlt1Rounded />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </ul>
        )}
        <Dialog open={connect} onClose={() => setConnect(false)}>
          <DialogTitle>
            {dialog === "login" && "Connexion client"}
            {dialog === "signup" && "Compte client"}
            {dialog === "signupadmin" && "Compte administrateur"}
          </DialogTitle>
          <DialogContent>
            {dialog === "login" && (
              <form
                ref={form}
                className="flex flex-col gap-2 p-2"
                onSubmit={handleLogin}
              >
                <div>
                  <TextField
                    type="email"
                    label="Email:"
                    name="email"
                    required
                  />
                </div>
                <div>
                  <TextField
                    type="password"
                    label="Mot de passe:"
                    name="password"
                    required
                  />
                </div>
                <LoadingButton type="submit" loading={loading}>
                  Se connecter
                </LoadingButton>
              </form>
            )}
            {dialog === "signup" && (
              <form
                ref={form}
                className="flex flex-col gap-2 p-2"
                onSubmit={handleSignup}
              >
                <div>
                  <TextField type="text" label="Nom:" name="nom" required />
                </div>
                <div>
                  <TextField
                    type="email"
                    label="Email:"
                    name="email"
                    required
                  />
                </div>
                <div>
                  <TextField
                    type="password"
                    label="Mot de passe:"
                    name="password"
                    required
                  />
                </div>
                <LoadingButton type="submit" loading={loading}>
                  Inscription
                </LoadingButton>
              </form>
            )}
            {dialog === "signupadmin" && (
              <form
                ref={form}
                className="flex flex-col gap-2 p-2"
                onSubmit={handleSignupAdmin}
              >
                <div>
                  <TextField type="text" label="Nom:" name="nom" required />
                </div>
                <div>
                  <TextField
                    type="email"
                    label="Email:"
                    name="email"
                    required
                  />
                </div>
                <div>
                  <TextField
                    type="password"
                    label="Mot de passe:"
                    name="password"
                    required
                  />
                </div>
                <LoadingButton type="submit" loading={loading}>
                  Inscription
                </LoadingButton>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
