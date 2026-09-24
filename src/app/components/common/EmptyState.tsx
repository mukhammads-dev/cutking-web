import React, { ReactNode } from "react";

interface EmptyStateProps {
  title?: string;
  text?: string;
  icon?: string;
  action?: ReactNode;
}

export default function EmptyState({
  title = "Nothing here yet",
  text,
  icon = "/icons/empty-list.svg",
  action,
}: EmptyStateProps) {
  return (
    <div className="empty-state">
      <img src={icon} alt="" aria-hidden="true" />
      <div className="empty-title">{title}</div>
      {text ? <div className="empty-text">{text}</div> : null}
      {action}
    </div>
  );
}
