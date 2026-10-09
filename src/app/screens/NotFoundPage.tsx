import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";

import EmptyState from "../components/common/EmptyState";
import { useLanguage } from "../hooks/useLanguage";

export default function NotFoundPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="ck-page-body">
      <Container maxWidth="lg">
        <EmptyState
          title={t("notFound.title")}
          text={t("notFound.text")}
          action={
            <Button
              variant="contained"
              startIcon={<HomeIcon />}
              onClick={() => navigate("/")}
            >
              {t("notFound.backHome")}
            </Button>
          }
        />
      </Container>
    </div>
  );
}
