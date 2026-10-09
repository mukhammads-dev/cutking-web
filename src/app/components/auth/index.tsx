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
import { useLanguage } from "../../hooks/useLanguage";
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

export default function AuthenticationModal({
  mode,
  onClose,
  onSwitch,
}: AuthenticationModalProps) {
  const { t } = useLanguage();
  const { setAuthMember } = useGlobals();

  const PERKS = [
    t("auth.perk1"),
    t("auth.perk2"),
    t("auth.perk3"),
    t("auth.perk4"),
  ];

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
      await sweetTopSuccessAlert(t("auth.welcome"), 1400);
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
      await sweetTopSuccessAlert(t("auth.loggedIn"), 1200);
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
            <IconButton size="small" onClick={handleClose} aria-label={t("common.close")}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>

          <aside className="ck-auth-visual">
            <Logo static />

            <div className="ck-auth-quote">
              <h3>
                {t("auth.quoteTitle1")}
                <br />
                {t("auth.quoteTitle2")}
              </h3>
              <p>{t("auth.quoteText")}</p>
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
              {isSignup ? t("auth.createAccount") : t("auth.login")}
            </h2>
            <p className="sub">
              {isSignup ? t("auth.createAccountSub") : t("auth.loginSub")}
            </p>

            <div className="ck-auth-fields">
              <TextField
                label={t("auth.username")}
                value={memberNick}
                onChange={(e) => setMemberNick(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="username"
                fullWidth
              />

              {isSignup ? (
                <TextField
                  label={t("auth.phone")}
                  value={memberPhone}
                  onChange={(e) => setMemberPhone(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="010-1234-5678"
                  autoComplete="tel"
                  fullWidth
                />
              ) : null}

              <TextField
                label={t("auth.password")}
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
                {isSignup ? t("auth.createAccountBtn") : t("auth.loginBtn")}
              </Button>
            </div>

            <div className="ck-auth-switch">
              {isSignup ? t("auth.alreadyHaveAccount") : t("auth.noAccount")}
              <button
                type="button"
                onClick={() => onSwitch(isSignup ? "login" : "signup")}
              >
                {isSignup ? t("auth.logIn") : t("auth.signUp")}
              </button>
            </div>
          </section>
        </div>
      </Fade>
    </Modal>
  );
}
