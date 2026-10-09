import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

import useReveal from "../../hooks/useReveal";
import { useLanguage } from "../../hooks/useLanguage";

const VIDEO_HD = "/video/cutking.mp4";
const VIDEO_SD = "/video/cutking-sd.mp4";
const POSTER = "/video/poster.jpg";

const matches = (query: string): boolean => {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia(query).matches;
};

export default function Showcase() {
  const { t } = useLanguage();
  const { ref, revealClass } = useReveal<HTMLElement>();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const navigate = useNavigate();

  const [source, setSource] = useState(VIDEO_SD);
  const [posterOnly, setPosterOnly] = useState(true);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const stillOnly =
      matches("(prefers-reduced-data: reduce)") ||
      matches("(prefers-reduced-motion: reduce)");
    setSource(matches("(min-width: 1200px)") ? VIDEO_HD : VIDEO_SD);
    setPosterOnly(stillOnly);
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => setPosterOnly(true));
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <section className={`ck-section alt ck-showcase ${revealClass}`} ref={ref}>
      <Container maxWidth="lg">
        <div className="section-head">
          <span className="section-label">{t("home.showcase.label")}</span>
          <h2 className="section-title">{t("home.showcase.heading")}</h2>
          <p className="section-sub">{t("home.showcase.sub")}</p>
        </div>

        <div className="ck-video-frame">
          {posterOnly ? (
            <img
              className="ck-video-el"
              src={POSTER}
              alt="Inside CutKing barbershop"
            />
          ) : (
            <video
              ref={videoRef}
              className="ck-video-el"
              src={source}
              poster={POSTER}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              disablePictureInPicture
              onError={() => setPosterOnly(true)}
            />
          )}

          <div className="ck-video-scrim" />

          <div className="ck-video-overlay">
            <div className="ck-video-copy">
              <h3>{t("home.showcase.chairReady")}</h3>
              <p>{t("home.showcase.handleRest")}</p>
              <Button
                variant="contained"
                startIcon={<EventAvailableIcon />}
                onClick={() => navigate("/booking")}
              >
                {t("home.showcase.bookNow")}
              </Button>
            </div>

            {posterOnly ? null : (
              <button
                type="button"
                className="ck-video-btn"
                onClick={togglePlay}
                aria-label={
                  playing ? t("home.showcase.pauseVideo") : t("home.showcase.playVideo")
                }
              >
                {playing ? (
                  <PauseRoundedIcon fontSize="small" />
                ) : (
                  <PlayArrowRoundedIcon fontSize="small" />
                )}
              </button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
