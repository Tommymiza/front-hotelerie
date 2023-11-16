import React from "react";
import "@/styles/footer.scss";
import Link from "next/link";
import { Container } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="col-1">
          <div className="footer-logo">
            <h3>U-Reservation</h3>
          </div>
          <div className="footer-content">
            <p>
              {"Copyright © "}
              <Link color="inherit" href="https://unit-fianara.com">
                UN-IT
              </Link>{" "}
              {new Date().getFullYear()}
              {"."}
            </p>
          </div>
        </div>
        <div className="col-1">
          <div className="footer-title">
            <h3>Liens utiles</h3>
          </div>
          <div className="footer-content">
            <ul>
              <li><Link href={"/"}>Accueil</Link></li>
              <li>Blog</li>
              <li><Link href={"/contact"}>Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="col-1">
          <div className="footer-title">
            <h3>A propos</h3>
          </div>
          <div className="footer-content">
            <ul>
              <li>Qui sommes-nous?</li>
              <li>FAQ</li>
              <li>Termes et polices</li>
            </ul>
          </div>
        </div>
        <div className="col-1">
          <div className="footer-title">
            <h3>Suvez nous sur</h3>
          </div>
          <div className="social-links">
            <ul>
              <li>
                <FacebookIcon />
              </li>
              <li>
                <InstagramIcon />
              </li>
              <li>
                <TwitterIcon />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
