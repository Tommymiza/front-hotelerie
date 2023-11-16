"use client";
import React, { useRef } from "react";
import "@/styles/banner.scss";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
export default function Banner() {
  const router = useRouter();
  const form = useRef<HTMLFormElement | null>(null);
  return (
    <div className="banner-container">
      <img src="/img/banner-image.jpg" alt="banner" className="img-banner" />
      <div className="banner">
        <div className="banner-content">
          <h1 className="banner-title">Trouvez votre hôtel et Restaurant</h1>
          <p className="banner-subtitle">
            Trouvez votre hôtel et restaurant idéal
          </p>
        </div>
      </div>
      <div className="banner-search">
        <div className="banner-search-container">
          <div className="banner-search-content">
            <div className="banner-search-input banner-search-content-button">
              <IconButton className="banner-search-button">
                <SearchIcon />
              </IconButton>
            </div>
            <form
              ref={form}
              onSubmit={(e: any) => {
                e.preventDefault();
                router.push(`/search/${form.current?.search.value}`);
              }}
              className="banner-search-input banner-search-content-input"
            >
              <input
                className="banner-search-input-text"
                type="text"
                name="search"
                required
                placeholder="Rechercher un hôtel ou restaurant ou une ville ..."
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
