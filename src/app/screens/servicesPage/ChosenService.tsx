import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { setChosenService } from "./slice";
import { retrieveChosenService } from "./selector";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";

import CuttingService from "../../services/CuttingService";
import { Service } from "../../../lib/types/service";
import { CartItem } from "../../../lib/types/search";
import { buildImageUrl } from "../../../lib/config";
import { formatPrice, humanizeEnum } from "../../../lib/utils/format";
import { formatDuration } from "../../../lib/utils/date";
import { sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";

const actionDispatch = (dispatch: Dispatch) => ({
  setChosenService: (data: Service | null) => dispatch(setChosenService(data)),
});

const chosenServiceRetriever = createSelector(
  retrieveChosenService,
  (chosenService) => ({ chosenService })
);

interface ChosenServiceProps {
  onAdd: (item: CartItem) => void;
}

export default function ChosenService({ onAdd }: ChosenServiceProps) {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();

  const { setChosenService } = actionDispatch(useDispatch());
  const { chosenService } = useSelector(chosenServiceRetriever);

  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (!serviceId) return;
    let alive = true;
    setLoading(true);
    setActiveImage(0);

    const cutting = new CuttingService();
    cutting
      .getService(serviceId)
      .then((data) => {
        if (alive) setChosenService(data);
      })
      .catch((err) => console.error("ChosenService:", err))
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
      setChosenService(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceId]);

  const handleAdd = () => {
    if (!chosenService) return;
    onAdd({
      _id: chosenService._id,
      quantity: 1,
      name: chosenService.serviceName,
      price: chosenService.servicePrice,
      image: chosenService.serviceImages?.[0] ?? "",
      duration: chosenService.serviceDuration,
    });
    sweetTopSmallSuccessAlert("Added to cart");
  };

  const handleBookNow = () => {
    handleAdd();
    navigate("/booking");
  };

  if (loading) return <Loader text="Loading service…" />;

  if (!chosenService) {
    return (
      <Container maxWidth="lg">
        <EmptyState
          title="Service not found"
          text="This service may have been removed or is not active right now."
          action={
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/services")}
            >
              Back to services
            </Button>
          }
        />
      </Container>
    );
  }

  const images =
    chosenService.serviceImages?.length > 0
      ? chosenService.serviceImages
      : [""];

  return (
    <Container maxWidth="lg">
      <Button
        size="small"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/services")}
        sx={{ color: "var(--muted)", mb: 2 }}
      >
        Back to services
      </Button>

      <div className="ck-detail-grid">
        <div className="ck-detail-gallery">
          <img
            className="ck-detail-main-img"
            src={buildImageUrl(images[activeImage])}
            alt={chosenService.serviceName}
          />
          {images.length > 1 ? (
            <div className="ck-detail-thumbs">
              {images.map((img, index) => (
                <img
                  key={`${img}-${index}`}
                  className={
                    index === activeImage
                      ? "ck-detail-thumb active"
                      : "ck-detail-thumb"
                  }
                  src={buildImageUrl(img)}
                  alt={`${chosenService.serviceName} ${index + 1}`}
                  onClick={() => setActiveImage(index)}
                />
              ))}
            </div>
          ) : null}
        </div>

        <div className="ck-detail-info">
          <span className="tag tag-coral">
            {humanizeEnum(chosenService.serviceCollection)}
          </span>

          <h1>{chosenService.serviceName}</h1>

          <p className="ck-detail-desc">
            {chosenService.serviceDesc ||
              "No description yet."}
          </p>

          <div className="ck-detail-meta">
            <div className="ck-meta-box">
              <div className="lbl">Price</div>
              <div className="val price">
                {formatPrice(chosenService.servicePrice)}
              </div>
            </div>
            <div className="ck-meta-box">
              <div className="lbl">Duration</div>
              <div className="val">
                {formatDuration(chosenService.serviceDuration)}
              </div>
            </div>
            <div className="ck-meta-box">
              <div className="lbl">Views</div>
              <div className="val">{chosenService.serviceViews ?? 0}</div>
            </div>
          </div>

          <div className="ck-detail-actions">
            <Button
              variant="contained"
              size="large"
              startIcon={<EventAvailableIcon />}
              onClick={handleBookNow}
            >
              Book now
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<AddIcon />}
              onClick={handleAdd}
            >
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
