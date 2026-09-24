import React, { useMemo } from "react";
import Container from "@mui/material/Container";

import useReveal from "../../hooks/useReveal";
import { staticStats, ShopStat } from "../../../lib/data/events";

interface StatsProps {
  serviceCount: number;
  masterCount: number;
}

export default function Stats({ serviceCount, masterCount }: StatsProps) {
  const { ref, revealClass } = useReveal<HTMLElement>();

  const cells = useMemo<ShopStat[]>(
    () => [
      staticStats[0],
      { id: "barbers", value: String(masterCount || "—"), label: "Barbers" },
      { id: "services", value: String(serviceCount || "—"), label: "Services" },
      staticStats[1],
    ],
    [serviceCount, masterCount]
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
