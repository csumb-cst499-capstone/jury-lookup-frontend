import { Suspense, useState } from "react";
import { Container, Spacer, Button, Input, Modal, Text } from "@nextui-org/react";
import { SummonDetails } from "./summon_details";


export function Login() {
  const [badgeNumber, setBadgeNumber] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(""); // Add token state
  const [buttonState, setButton] = useState(0); // button can be 0: disabled, 1: enabled, 2: loading, 3: success, 4: error
  const [validationVisible, setValidationVisible] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  const closeValidationModal = () => {
    setValidationVisible(false);
  };

  const validateLogin = async () => {
    console.log("validating login...");
    if (badgeNumber.length !== 6) {
      setValidationMessage("Please enter a valid badge number.");
      setValidationVisible(true);
    }

    if (pinCode.length !== 4) {
      setValidationMessage("Please enter a valid pin code.");
      setValidationVisible(true);
    }

    handleLogin();
  };

  const handleLogin = async () => {
    try {
      setButton(2); // Set button state to loading
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

        // Set button state to success
      } else if (response.status === 401) {
        setValidationMessage("Invalid credentials. Please try again.");
        setValidationVisible(true);
      } else {
        setValidationMessage("An error occurred. Please try again later.");
        setValidationVisible(true);
      }
    } catch (error) {
      setValidationMessage("An error occurred. Please try again later.");
      setValidationVisible(true);
    }
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
                name="BadgeNumber"
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
                name="PinCode"
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
                  onClick={ validateLogin }
                  disabled={!badgeNumber || !pinCode}
                  auto
                  size="medium"
                  type="submit"
                  css={{
                    background:
                      buttonState === 3
                        ? "green"
                        : buttonState === 4
                        ? "red"
                        : "linear-gradient(to right, #6c63ff)",
                    color: "white",
                    fontWeight: "bold",
                    padding: "8px 15px",
                    backgroundSize: "10% 110%",
                    animation: buttonState === 4 ? "shake 0.5s" : "none",
                  }}
                >
                  {buttonState === 2
                    ? "Loading..."
                    : buttonState === 3
                    ? "Success!"
                    : buttonState === 4
                    ? "Invalid Credentials"
                    : "Sign In"}
                </Button>
                <Spacer y={1} />
              </Container>
            </form>
          </Container>
          <Modal
            closeButton
            blur
            aria-labelledby="validation-title"
            open={validationVisible}
            onClose={closeValidationModal}
          >
            <Modal.Header>
              <Text id="validation-title" size={18}>
                Error
              </Text>
            </Modal.Header>
            <Modal.Body>
              <center>
                <p>{validationMessage}</p>
              </center>
              <br />
            </Modal.Body>
          </Modal>
        </Container>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <Container>
            <SummonDetails token={token} />
          </Container>
        </Suspense>
      )}
    </Container>
  );
}

export default Login;

<style jsx>{`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-5px);
    }
    50% {
      transform: translateX(5px);
    }
    75% {
      transform: translateX(-5px);
    }
    100% {
      transform: translateX(0);
    }
  }
`}</style>;
