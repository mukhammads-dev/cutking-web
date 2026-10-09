import React, { useMemo } from "react";
import Container from "@mui/material/Container";

import useReveal from "../../hooks/useReveal";
import { useLanguage } from "../../hooks/useLanguage";
import { getStaticStats, ShopStat } from "../../../lib/data/events";

interface StatsProps {
  serviceCount: number;
  masterCount: number;
}

export default function Stats({ serviceCount, masterCount }: StatsProps) {
  const { ref, revealClass } = useReveal<HTMLElement>();
  const { t, lang } = useLanguage();

  const staticStats = getStaticStats(lang);

  const cells = useMemo<ShopStat[]>(
    () => [
      staticStats[0],
      { id: "barbers", value: String(masterCount || "—"), label: t("home.stats.barbers") },
      { id: "services", value: String(serviceCount || "—"), label: t("home.stats.services") },
      staticStats[1],
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [serviceCount, masterCount, lang]
  );

  return (
    <section className={`ck-stats ${revealClass}`} ref={ref}>
      <Container maxWidth="lg">
        <div className="ck-stats-plate">
          {cells.map((cell, index) => (
            <div
              key={cell.id}
              className={index % 2 === 0 ? "ck-stat" : "ck-stat gold"}
            >
              <span className="ck-stat-bar" />
              <div className="ck-stat-num">{cell.value}</div>
              <div className="ck-stat-label">{cell.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
