import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

import { CartItem } from "../../../lib/types/search";
import { buildImageUrl } from "../../../lib/config";
import { formatPrice } from "../../../lib/utils/format";
import { formatDuration } from "../../../lib/utils/date";
import { RippleBadge } from "../../theme/styled";

export interface BookingCartProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  totalPrice: number;
  totalDuration: number;
}

export default function BookingCart(props: BookingCartProps) {
  const {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
    totalPrice,
    totalDuration,
  } = props;

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleGoBooking = () => {
    handleClose();
    navigate("/booking");
  };

  return (
    <>
      <Tooltip title="Booking cart">
        <IconButton onClick={handleOpen} aria-label="Booking cart">
          <RippleBadge badgeContent={cartItems.length} invisible={!cartItems.length}>
            <ShoppingBagOutlinedIcon />
          </RippleBadge>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              mt: 1,
              border: "1px solid var(--light2)",
              borderRadius: "var(--r-lg)",
              boxShadow: "var(--sh-lg)",
              overflow: "hidden",
            },
          },
        }}
        MenuListProps={{ sx: { p: 0 } }}
      >
        <div className="ck-cart-menu">
          <div className="ck-cart-head">
            <span className="ck-cart-title">
              Selected services ({cartItems.length})
            </span>
            {cartItems.length > 0 ? (
              <Tooltip title="Clear cart">
                <IconButton size="small" onClick={onDeleteAll}>
                  <DeleteSweepIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            ) : null}
          </div>

          {cartItems.length === 0 ? (
            <div className="ck-cart-empty">
              Nothing selected yet.
              <br />
              Add a service to start.
            </div>
          ) : (
            <>
              <div className="ck-cart-list">
                {cartItems.map((item) => (
                  <div key={item._id} className="ck-cart-row">
                    <img
                      className="ck-cart-img"
                      src={buildImageUrl(item.image)}
                      alt={item.name}
                    />

                    <div className="ck-cart-info">
                      <div className="ck-cart-name">{item.name}</div>
                      <div className="ck-cart-meta">
                        {formatPrice(item.price)} ·{" "}
                        {formatDuration(item.duration)}
                      </div>
                    </div>

                    <div className="ck-cart-qty">
                      <IconButton size="small" onClick={() => onRemove(item)}>
                        <RemoveIcon sx={{ fontSize: 15 }} />
                      </IconButton>
                      <span>{item.quantity}</span>
                      <IconButton size="small" onClick={() => onAdd(item)}>
                        <AddIcon sx={{ fontSize: 15 }} />
                      </IconButton>
                      <IconButton size="small" onClick={() => onDelete(item)}>
                        <CloseIcon sx={{ fontSize: 15 }} />
                      </IconButton>
                    </div>
                  </div>
                ))}
              </div>

              <div className="ck-cart-foot">
                <div className="ck-cart-sum">
                  <span>Total duration</span>
                  <span>{formatDuration(totalDuration)}</span>
                </div>
                <div className="ck-cart-sum total">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>

                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<EventAvailableIcon />}
                  onClick={handleGoBooking}
                >
                  Choose a time
                </Button>
              </div>
            </>
          )}
        </div>
      </Menu>
    </>
  );
}
