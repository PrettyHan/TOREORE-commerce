import React from "react";
import { Container, Grid } from "@mui/material";

function Ad() {
    return (
        <Container style={{ minHeight: "calc(100vh - 180px)" }}>
            <div
                style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <img src="https://cdn.pixabay.com/photo/2015/08/25/11/50/shop-906722_960_720.jpg" />
                <p
                    style={{
                        fontSize: "50px",
                        fontWeight: "bold",
                        color: "#E0777D",
                        fontStyle: "italic",
                    }}
                >
                    TOREOLRE 합정점 GRAND OPEN !!!
                </p>
            </div>
        </Container>
    );
}

export default Ad;
