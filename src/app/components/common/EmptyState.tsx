import React, { ReactNode } from "react";
import { useLanguage } from "../../hooks/useLanguage";

interface EmptyStateProps {
  title?: string;
  text?: string;
  icon?: string;
  action?: ReactNode;
}

export default function EmptyState({
  title,
  text,
  icon = "/icons/empty-list.svg",
  action,
}: EmptyStateProps) {
  const { t } = useLanguage();
  const resolvedTitle = title ?? t("common.nothingHereYet");

  return (
    <div className="empty-state">
      <img src={icon} alt="" aria-hidden="true" />
      <div className="empty-title">{resolvedTitle}</div>
      {text ? <div className="empty-text">{text}</div> : null}
      {action}
    </div>
  );
}
