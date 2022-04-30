import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode";

import {
  Typography,
  Grid,
  Dialog,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";

function OrderUserCard({ setOrderUser }) {
  const [open, setOpen] = useState(false);

  const postCodeStyle = {
    display: "block",
    position: "absolute",
    top: "20%",
    width: "400px",
    height: "400px",
    padding: "7px",
    zIndex: 100,
  };

  const handleAddressComplete = (data) => {
    console.log(data.address);
  };

  const handleAddress2 = (event) => {
    setOrderUser((current) => {
      return {
        ...current,
        zipcode: {
          ...current.zipcode,
          address2: event.target.value,
        },
      };
    });
  };

  const handleMessage = (event) => {
    setOrderUser((current) => {
      return {
        ...current,
        message: event.target.value,
      };
    });
  };
  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        주소
      </Typography>
      <Dialog
        open={open}
        onClose={() => setOpen(!open)}
        scroll={"body"}
        PaperProps={{ sx: { width: "30%", height: "100%" } }}
      >
        <DialogContent>
          <DaumPostcode
            style={postCodeStyle}
            autoClose
            onComplete={handleAddressComplete}
          />
          <Button
            variant={"outlined"}
            onClick={() => {
              setOpen(!open);
            }}
          >
            닫기
          </Button>
        </DialogContent>
      </Dialog>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button size="large" onClick={() => setOpen(!open)}>
            주소찾기
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="상세주소"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            onChange={handleAddress2}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="message"
            name="message"
            label="메세지"
            fullWidth
            autoComplete="message"
            variant="standard"
            onChange={handleMessage}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default OrderUserCard;
