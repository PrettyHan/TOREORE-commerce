import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode";

import {
  Typography,
  Grid,
  Dialog,
  DialogContent,
  TextField,
  Button,
  Box,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

function OrderUserCard({ setOrderUser, orderUser }) {
  const [open, setOpen] = useState(false);

  const isPc = useMediaQuery("(min-width:480px)");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const postCodeStyle = {
    display: "block",
    position: "absolute",
    top: "20%",
    width: "400px",
    height: "600px",
    padding: "7px",
    zIndex: 100,
  };

  const mobilePostCodeStyle = {
    display: "block",
    position: "absolute",
    top: "10%",
    width: "200px",
    height: "300px",
    padding: "7px",
    zIndex: 100,
  };

  const handleAddressComplete = (data) => {
    setOrderUser((current) => {
      return {
        ...current,
        zipcode: {
          ...current.zipcode,
          address1: data.address,
        },
      };
    });
    setOpen(!open);
  };

  const handleAddress1 = (event) => {
    setOrderUser((current) => {
      return {
        ...current,
        zipcode: {
          ...current.zipcode,
          address1: event.target.value,
        },
      };
    });
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
      {isPc ? (
        <>
          <Dialog
            open={open}
            onClose={() => setOpen(!open)}
            scroll={"body"}
            PaperProps={{ sx: { width: "30%", height: "80%" } }}
          >
            <DialogContent>
              <DaumPostcode
                style={postCodeStyle}
                autoClose
                onComplete={handleAddressComplete}
              />
              <Grid container justifyContent="right">
                <Button
                  variant="contained"
                  onClick={() => {
                    setOpen(!open);
                  }}
                >
                  닫기
                </Button>
              </Grid>
            </DialogContent>
          </Dialog>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box>
                <TextField
                  id="address1"
                  name="address1"
                  label={!orderUser.zipcode.address1 ? "주소" : ""}
                  autoComplete="shipping address-line1"
                  variant="outlined"
                  value={orderUser.zipcode.address1}
                  fullWidth
                  onChange={handleAddress1}
                  autoFocus={true}
                />
                <Button size="large" onClick={() => setOpen(!open)}>
                  주소찾기
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="address2"
                name="address2"
                label={!orderUser.zipcode.address2 ? "상세주소" : ""}
                value={orderUser.zipcode.address2}
                autoComplete="shipping address-line2"
                variant="outlined"
                onChange={handleAddress2}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="message"
                name="message"
                label={!orderUser.message ? "메세지" : ""}
                value={orderUser.message}
                autoComplete="message"
                variant="outlined"
                onChange={handleMessage}
                fullWidth
              />
            </Grid>
          </Grid>
        </>
      ) : (
        <div>
          <Dialog
            fullScreen={isPc}
            open={open}
            onClose={() => setOpen(!open)}
            scroll={"body"}
            PaperProps={{ sx: { width: "100%", height: "80%" } }}
          >
            <DialogContent>
              <DaumPostcode
                style={mobilePostCodeStyle}
                autoClose
                onComplete={handleAddressComplete}
              />
              <Grid container justifyContent="right">
                <Button
                  variant="contained"
                  onClick={() => {
                    setOpen(!open);
                  }}
                >
                  닫기
                </Button>
              </Grid>
            </DialogContent>
          </Dialog>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box>
                <TextField
                  id="address1"
                  name="address1"
                  label=""
                  autoComplete="shipping address-line1"
                  variant="outlined"
                  value={orderUser.zipcode.address1}
                  fullWidth
                  onChange={handleAddress1}
                  autoFocus={true}
                />
                <Button size="large" onClick={() => setOpen(!open)}>
                  주소찾기
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="address2"
                name="address2"
                label={!orderUser.zipcode.address2 ? "상세주소" : ""}
                value={orderUser.zipcode.address2}
                autoComplete="shipping address-line2"
                variant="outlined"
                onChange={handleAddress2}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="message"
                name="message"
                label={!orderUser.message ? "메세지" : ""}
                value={orderUser.message}
                autoComplete="message"
                variant="outlined"
                onChange={handleMessage}
                fullWidth
              />
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
}

export default OrderUserCard;
