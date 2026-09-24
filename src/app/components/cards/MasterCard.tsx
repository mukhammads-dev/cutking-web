import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { Master } from "../../../lib/types/member";
import { buildImageUrl } from "../../../lib/config";
import { humanizeEnum, truncate } from "../../../lib/utils/format";

interface MasterCardProps {
  master: Master;

  selectable?: boolean;
  selected?: boolean;
  onSelect?: (masterId: string) => void;
}

export default function MasterCard({
  master,
  selectable = false,
  selected = false,
  onSelect,
}: MasterCardProps) {
  const avatar = buildImageUrl(master.memberImage, "/icons/default-user.svg");

  const handleClick = () => {
    if (selectable && onSelect) onSelect(master._id);
  };

  const className = [
    "ck-master-card",
    selectable ? "selectable" : "",
    selected ? "selected" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article
      className={className}
      onClick={handleClick}
      role={selectable ? "button" : undefined}
      tabIndex={selectable ? 0 : undefined}
      aria-pressed={selectable ? selected : undefined}
      onKeyDown={(e) => {
        if (selectable && e.key === "Enter") handleClick();
      }}
    >
      <div className="ck-master-avatar-wrap">
        <img
          className="ck-master-avatar"
          src={avatar}
          alt={master.memberNick}
          loading="lazy"
        />
        <img
          className="ck-master-badge"
          src="/icons/master-badge.svg"
          alt=""
          aria-hidden="true"
        />
      </div>

      <h3 className="ck-master-nick">{master.memberNick}</h3>
      {master.memberExperience ? (
        <div className="ck-master-exp">{master.memberExperience}</div>
      ) : null}

      <div className="ck-master-tags">
        {master.memberSpecialty ? (
          <span className="tag tag-gold">
            {humanizeEnum(master.memberSpecialty)}
          </span>
        ) : null}
      </div>

      <p className="ck-master-desc">
        {truncate(master.memberDesc, 84) || "No description yet."}
      </p>

      {selectable ? (
        <div className="ck-master-check">
          {selected ? (
            <>
              <CheckCircleIcon fontSize="inherit" /> Selected
            </>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
