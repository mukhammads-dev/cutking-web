import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

import MemberService from "../../services/MemberService";
import { useGlobals } from "../../hooks/useGlobals";
import { MemberUpdateInput } from "../../../lib/types/member";
import { buildImageUrl, Messages } from "../../../lib/config";
import {
  sweetErrorHandling,
  sweetTopSuccessAlert,
} from "../../../lib/sweetAlert";

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export default function Settings() {
  const { authMember, setAuthMember } = useGlobals();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [memberNick, setMemberNick] = useState(authMember?.memberNick ?? "");
  const [memberPhone, setMemberPhone] = useState(authMember?.memberPhone ?? "");
  const [memberAddress, setMemberAddress] = useState(
    authMember?.memberAddress ?? ""
  );
  const [memberDesc, setMemberDesc] = useState(authMember?.memberDesc ?? "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const avatar =
    preview ?? buildImageUrl(authMember?.memberImage, "/icons/default-user.svg");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      sweetErrorHandling(new Error(Messages.error5));
      e.target.value = "";
      return;
    }

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      if (!memberNick.trim()) throw new Error(Messages.error3);

      const input: MemberUpdateInput = {
        memberNick: memberNick.trim(),
        memberPhone: memberPhone.trim(),
        memberAddress: memberAddress.trim(),
        memberDesc: memberDesc.trim(),
      };
      if (imageFile) input.memberImage = imageFile;

      const service = new MemberService();
      const updated = await service.updateMember(input);

      setAuthMember(updated);
      setImageFile(null);
      setPreview(null);

      await sweetTopSuccessAlert("Profile updated", 1400);
    } catch (err) {
      await sweetErrorHandling(err);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setMemberNick(authMember?.memberNick ?? "");
    setMemberPhone(authMember?.memberPhone ?? "");
    setMemberAddress(authMember?.memberAddress ?? "");
    setMemberDesc(authMember?.memberDesc ?? "");
    setImageFile(null);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="ck-form-card">
      <div className="ck-form-card-head">
        <h3>Your details</h3>
        <p>We use these to contact you about bookings.</p>
      </div>

      <div className="ck-form-card-body">
        <div className="ck-avatar-upload">
          <img className="ck-avatar-preview" src={avatar} alt="Avatar" />
          <div>
            <Button
              variant="outlined"
              size="small"
              startIcon={<PhotoCameraIcon />}
              onClick={() => fileRef.current?.click()}
            >
              Choose photo
            </Button>
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              hidden
              onChange={handleFileChange}
            />
            <div className="ck-avatar-hint">
              JPG, PNG or WEBP. A square image looks best.
            </div>
          </div>
        </div>

        <div className="ck-form-grid" style={{ marginTop: 22 }}>
          <TextField
            label="Username"
            value={memberNick}
            onChange={(e) => setMemberNick(e.target.value)}
            fullWidth
          />
          <TextField
            label="Phone number"
            value={memberPhone}
            onChange={(e) => setMemberPhone(e.target.value)}
            placeholder="010-1234-5678"
            fullWidth
          />
          <TextField
            className="ck-form-full"
            label="Address"
            value={memberAddress}
            onChange={(e) => setMemberAddress(e.target.value)}
            fullWidth
          />
          <TextField
            className="ck-form-full"
            label="About you"
            value={memberDesc}
            onChange={(e) => setMemberDesc(e.target.value)}
            multiline
            minRows={3}
            fullWidth
          />
        </div>

        <div className="ck-form-actions">
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving…" : "Save changes"}
          </Button>
          <Button variant="text" sx={{ color: "var(--muted)" }} onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
