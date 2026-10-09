import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ScheduleIcon from "@mui/icons-material/Schedule";

import { Service } from "../../../lib/types/service";
import { CartItem } from "../../../lib/types/search";
import { buildImageUrl } from "../../../lib/config";
import { formatPrice, truncate } from "../../../lib/utils/format";
import { formatDuration } from "../../../lib/utils/date";
import { sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import { useLanguage } from "../../hooks/useLanguage";

interface ServiceCardProps {
  service: Service;
  onAdd: (item: CartItem) => void;

  showAddButton?: boolean;
  isNew?: boolean;
  rank?: number;
}

export default function ServiceCard({
  service,
  onAdd,
  showAddButton = false,
  isNew = false,
  rank,
}: ServiceCardProps) {
  const { t, te } = useLanguage();
  const navigate = useNavigate();

  const imagePath = buildImageUrl(service.serviceImages?.[0]);

  const handleOpen = () => navigate(`/services/${service._id}`);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAdd({
      _id: service._id,
      quantity: 1,
      name: service.serviceName,
      price: service.servicePrice,
      image: service.serviceImages?.[0] ?? "",
      duration: service.serviceDuration,
    });
    sweetTopSmallSuccessAlert(t("common.addedToCart"));
  };

  return (
    <article className="ck-service-card">
      <div
        className="ck-service-media"
        onClick={handleOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleOpen()}
        aria-label={`${service.serviceName} — details`}
      >
        <img src={imagePath} alt={service.serviceName} loading="lazy" />

        <span className="ck-service-collection tag tag-coral">
          {te(service.serviceCollection)}
        </span>

        {isNew ? <span className="ck-service-new">{t("common.new")}</span> : null}

        {rank ? (
          <span className="ck-service-rank">
            {t("services.rankBooked").replace("{rank}", String(rank))}
          </span>
        ) : null}

        <span className="ck-service-views">
          <VisibilityIcon fontSize="inherit" />
          {service.serviceViews ?? 0}
        </span>

        <div className="ck-service-add">
          <Tooltip title={t("common.addToCart")}>
            <Fab size="small" color="primary" onClick={handleAdd}>
              <AddIcon fontSize="small" />
            </Fab>
          </Tooltip>
        </div>
      </div>

      <div className="ck-service-body">
        <h3 className="ck-service-name">{service.serviceName}</h3>
        <p className="ck-service-desc">
          {truncate(service.serviceDesc, 78) || t("common.noDescription")}
        </p>

        <div className="ck-service-foot">
          <span className="ck-service-price">
            {formatPrice(service.servicePrice)}
          </span>
          <span className="ck-service-duration">
            <ScheduleIcon fontSize="inherit" />
            {formatDuration(service.serviceDuration)}
          </span>
        </div>

        {showAddButton ? (
          <Button
            fullWidth
            variant="outlined"
            size="small"
            startIcon={<AddIcon />}
            onClick={handleAdd}
            sx={{ mt: 1.5 }}
          >
            {t("common.addToCart")}
          </Button>
        ) : null}
      </div>
    </article>
  );
}
