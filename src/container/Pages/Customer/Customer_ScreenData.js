import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { useState } from "react";
import { Button, ButtonGroup, Col, Container, Input, Row } from "reactstrap";

export const Customer_ScreenData = (props) => {
  const [selfPickup, setSelfPickup] = useState(true);
  const [screenNumber, setSreenNumber] = useState("");
  const [seatNumber, setSeatNumber] = useState("");

  const handleTheatreScreenData = (seat_Number, screen_Num, self_pickup) => {
    setSelfPickup(self_pickup);
    const screenData = {
      selfPickup: self_pickup,
      screenNumber: screen_Num,
      seatNumber: seat_Number,
    };

    console.log("screenData : ", screenData);

    props.handleTheatreScreenData(screenData);
  };

  return (
    <div
      style={{
        backgroundColor: "#c5c7c5",
        color: "black",
        paddingBottom: "2%",
      }}
    >
      <Container>
        <Row>
          <FormControl component="fieldset" style={{ marginLeft: "6.8%" }}>
            <RadioGroup
              row
              aria-label="gender"
              name="row-radio-buttons-group"
              defaultValue={"Self-Pickup"}
            >
              <FormControlLabel
                value="Self-Pickup"
                control={<Radio />}
                label="Self Pickup"
                onChange={() => handleTheatreScreenData("","", true)}
              />
              <FormControlLabel
                value="Required-Delivery"
                control={<Radio />}
                label="Required Delivery"
                onClick={() => handleTheatreScreenData("","", false)}
              />
            </RadioGroup>
          </FormControl>
        </Row>
        {!selfPickup && (
          <>
            <Row style={{ marginTop: "2%", marginBottom: "2%" }}>
              <Col xs={9}>
                <div style={{ marginLeft: "10%" }}>
                  Enter Your Screen Number
                </div>
              </Col>
              <Col>
                <Input
                  type="number"
                  style={{ width: "60px" }}
                //   onChange={(e) => setSreenNumber(e.target.value)}
                  onChange={(e) => {
                    setSreenNumber(e.target.value);
                    handleTheatreScreenData(seatNumber, e.target.value, false);
                  }}
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: "2%" }}>
              <Col xs={9}>
                <div style={{ marginLeft: "10%" }}>Enter Your Seat Number</div>
              </Col>
              <Col>
                <Input
                  style={{ width: "60px" }}
                  onChange={(e) => {
                    setSeatNumber(e.target.value);
                    handleTheatreScreenData(e.target.value, screenNumber, false);
                  }}
                />
              </Col>
            </Row>
          </>
        )}{" "}
      </Container>
    </div>
  );
};
