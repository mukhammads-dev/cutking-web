import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

import Logo from "../headers/Logo";
import MemberService from "../../services/MemberService";
import { useGlobals } from "../../hooks/useGlobals";
import { LoginInput, MemberInput } from "../../../lib/types/member";
import { Messages } from "../../../lib/config";
import {
  sweetErrorHandling,
  sweetTopSuccessAlert,
} from "../../../lib/sweetAlert";

export type AuthMode = "login" | "signup" | null;

interface AuthenticationModalProps {
  mode: AuthMode;
  onClose: () => void;
  onSwitch: (mode: AuthMode) => void;
}

const PERKS = [
  "Book online, no waiting",
  "Choose your favourite barber",
  "All your bookings in one place",
  "Points on every visit",
];

export default function AuthenticationModal({
  mode,
  onClose,
  onSwitch,
}: AuthenticationModalProps) {
  const { setAuthMember } = useGlobals();

  const [memberNick, setMemberNick] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [memberPassword, setMemberPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const isSignup = mode === "signup";
  const open = mode !== null;

  const resetForm = () => {
    setMemberNick("");
    setMemberPhone("");
    setMemberPassword("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSignupRequest = async () => {
    try {
      setBusy(true);
      const isFulfill =
        memberNick.trim() !== "" &&
        memberPhone.trim() !== "" &&
        memberPassword.trim() !== "";
      if (!isFulfill) throw new Error(Messages.error3);

      const input: MemberInput = {
        memberNick: memberNick.trim(),
        memberPhone: memberPhone.trim(),
        memberPassword,
      };

      const member = new MemberService();
      const result = await member.signup(input);

      setAuthMember(result);
      await sweetTopSuccessAlert("Welcome to CutKing!", 1400);
      handleClose();
    } catch (err) {
      handleClose();
      await sweetErrorHandling(err);
    } finally {
      setBusy(false);
    }
  };

  const handleLoginRequest = async () => {
    try {
      setBusy(true);
      const isFulfill =
        memberNick.trim() !== "" && memberPassword.trim() !== "";
      if (!isFulfill) throw new Error(Messages.error3);

      const input: LoginInput = {
        memberNick: memberNick.trim(),
        memberPassword,
      };

      const member = new MemberService();
      const result = await member.login(input);

      setAuthMember(result);
      await sweetTopSuccessAlert("Logged in", 1200);
      handleClose();
    } catch (err) {
      handleClose();
      await sweetErrorHandling(err);
    } finally {
      setBusy(false);
    }
  };

  const submit = () =>
    isSignup ? handleSignupRequest() : handleLoginRequest();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !busy) submit();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 320 } }}
      aria-labelledby="auth-modal-title"
    >
      <Fade in={open}>
        <div className="ck-auth-modal">
          <div className="ck-auth-close">
            <IconButton size="small" onClick={handleClose} aria-label="Close">
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>

          <aside className="ck-auth-visual">
            <Logo static />

            <div className="ck-auth-quote">
              <h3>
                Book in a minute.
                <br />
                No waiting.
              </h3>
              <p>
                Create an account, then choose your barber and time.
              </p>
            </div>

            <div className="ck-auth-perks">
              {PERKS.map((perk) => (
                <div key={perk} className="ck-auth-perk">
                  <CheckCircleOutlineIcon fontSize="inherit" />
                  {perk}
                </div>
              ))}
            </div>
          </aside>

          <section className="ck-auth-form">
            <h2 id="auth-modal-title">
              {isSignup ? "Create an account" : "Log in"}
            </h2>
            <p className="sub">
              {isSignup
                ? "Just three details to get started."
                : "Log in to see and manage your bookings."}
            </p>

            <div className="ck-auth-fields">
              <TextField
                label="Username"
                value={memberNick}
                onChange={(e) => setMemberNick(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="username"
                fullWidth
              />

              {isSignup ? (
                <TextField
                  label="Phone number"
                  value={memberPhone}
                  onChange={(e) => setMemberPhone(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="010-1234-5678"
                  autoComplete="tel"
                  fullWidth
                />
              ) : null}

              <TextField
                label="Password"
                type="password"
                value={memberPassword}
                onChange={(e) => setMemberPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete={isSignup ? "new-password" : "current-password"}
                fullWidth
              />

              <Button
                variant="contained"
                size="large"
                disabled={busy}
                startIcon={isSignup ? <PersonAddAltIcon /> : <LoginIcon />}
                onClick={submit}
                fullWidth
              >
                {isSignup ? "Create account" : "Log in"}
              </Button>
            </div>

            <div className="ck-auth-switch">
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              <button
                type="button"
                onClick={() => onSwitch(isSignup ? "login" : "signup")}
              >
                {isSignup ? "Log in" : "Sign up"}
              </button>
            </div>
          </section>
        </div>
      </Fade>
    </Modal>
  );
}
