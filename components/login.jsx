import { useState } from "react";
import { Container, Spacer, Modal, Button, Input } from "@nextui-org/react";
import { SummonDetails } from "./summon_details";

export function Login() {
  const [badgeNumber, setBadgeNumber] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(""); // Add token state
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ BadgeNumber: badgeNumber, PinCode: pinCode }),
      });

      if (response.status === 200) {
        const data = await response.json();
        // Store the token in state
        setToken(data.token);
        setLoggedIn(true);
      } else {
        window.alert("Invalid Badge Number OR Pin Code");
      }
    } catch (error) {
      window.alert("Error: " + error);
    }
  };

  const closeAlertHandler = () => {
    setAlertVisible(false);
  };

  return (
    <Container
      justify="center"
      align="center"
      css={{ height: "100vh", paddingTop: "2rem" }}
    >
      {!loggedIn ? (
        <Container
          css={{
            maxWidth: "465px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
          }}
        >
          <Container justify="center" align="center" marginBottom={2}>
            <h3>Jury Duty Lookup</h3>
          </Container>
          <Container>
            <form>
              <Input
                label="Enter Badge Number"
                value={badgeNumber}
                onChange={(e) => setBadgeNumber(e.target.value)}
                size="medium"
                required
                css={{
                  marginBottom: "1rem",
                  borderColor: "blue",
                  borderRadius: "8px",
                }}
              />
              <Spacer y={1} />
              <Input
                label="Enter Pin Code"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                size="medium"
                required
                css={{
                  marginBottom: "1rem",
                  borderColor: "blue",
                  borderRadius: "8px",
                }}
              />
              <Spacer y={1} />
              <Container justify="center" align="center">
                <Button
                  onPress={handleLogin}
                  disabled={!badgeNumber || !pinCode}
                  auto
                  size="medium"
                  css={{
                    background: "linear-gradient(to right, #6c63ff)",
                    color: "white",
                    fontWeight: "bold",
                    padding: "8px 15px",
                    backgroundSize: "10% 110%",
                  }}
                >
                  Sign In
                </Button>
                <Spacer y={1} />
              </Container>
            </form>
          </Container>
        </Container>
      ) : (
        <Container>
          <SummonDetails token={token} />
        </Container>
      )}

      <Modal closeButton blur open={alertVisible} onClose={closeAlertHandler}>
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <p>Invalid Pincode or Badge number</p>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeAlertHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Login;
