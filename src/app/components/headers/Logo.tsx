import React from "react";
import { Link } from "react-router-dom";
import { SHOP } from "../../../lib/data/shop";

interface LogoProps {

  static?: boolean;
}

export default function Logo({ static: isStatic = false }: LogoProps) {
  const content = (
    <>
      <span className="ck-logo-mark" aria-hidden="true">
        <svg
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <line x1="20" y1="4" x2="8.12" y2="15.88" />
          <line x1="14.47" y1="14.48" x2="20" y2="20" />
          <line x1="8.12" y1="8.12" x2="12" y2="12" />
        </svg>
      </span>

      <span className="ck-logo-text">
        <span className="ck-logo-name">
          Cut<em>King</em>
        </span>
        <span className="ck-logo-tag">{SHOP.tagline}</span>
      </span>
    </>
  );

  if (isStatic) {
    return <div className="ck-logo">{content}</div>;
  }

  return (
    <Link to="/" className="ck-logo" aria-label="CutKing — home">
      {content}
    </Link>
  );
}
