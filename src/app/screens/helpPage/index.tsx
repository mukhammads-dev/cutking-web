import React, { useState } from "react";
import Container from "@mui/material/Container";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PhoneIcon from "@mui/icons-material/Phone";
import PlaceIcon from "@mui/icons-material/Place";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

import { faq, terms } from "../../../lib/data/faq";
import { SHOP } from "../../../lib/data/shop";

import "../../../styles/help.css";

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) =>
    setOpenIndex((prev) => (prev === index ? null : index));

  return (
    <div className="help-page">
      <div className="ck-page-head">
        <Container maxWidth="lg">
          <div className="crumb">Help</div>
          <h1>Common questions</h1>
          <p>
            Can't find your answer? Call us — it's faster on the phone.
          </p>
        </Container>
      </div>

      <div className="ck-page-body">
        <Container maxWidth="lg">
          <div className="ck-help-grid">
            <div className="ck-accordion">
              {faq.map((item, index) => (
                <div
                  key={item.question}
                  className={
                    openIndex === index ? "ck-acc-item open" : "ck-acc-item"
                  }
                >
                  <button
                    className="ck-acc-head"
                    onClick={() => toggle(index)}
                    aria-expanded={openIndex === index}
                  >
                    {item.question}
                    <ExpandMoreIcon className="chevron" fontSize="small" />
                  </button>
                  {openIndex === index ? (
                    <div className="ck-acc-body">{item.answer}</div>
                  ) : null}
                </div>
              ))}
            </div>

            <aside>
              <div className="ck-terms-card" style={{ marginBottom: 16 }}>
                <h4>Contact</h4>
                <div className="ck-side-row">
                  <PhoneIcon fontSize="inherit" /> {SHOP.phone}
                </div>
                <div className="ck-side-row">
                  <PlaceIcon fontSize="inherit" /> {SHOP.address}
                </div>
                <div className="ck-side-row">
                  <MailOutlineIcon fontSize="inherit" /> {SHOP.email}
                </div>
              </div>

              <div className="ck-terms-card">
                <h4>House rules</h4>
                {terms.map((term) => (
                  <div key={term.title} className="ck-term">
                    <div className="tt">{term.title}</div>
                    <div className="tb">{term.body}</div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </Container>
      </div>
    </div>
  );
}
