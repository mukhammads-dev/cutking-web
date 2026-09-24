import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";

import EmptyState from "../components/common/EmptyState";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="ck-page-body">
      <Container maxWidth="lg">
        <EmptyState
          title="Page not found"
          text="This page doesn't exist or has moved."
          action={
            <Button
              variant="contained"
              startIcon={<HomeIcon />}
              onClick={() => navigate("/")}
            >
              Back to home
            </Button>
          }
        />
      </Container>
    </div>
  );
}
