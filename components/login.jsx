import { Suspense, useState } from "react";
import { Container, Spacer, Button, Input } from "@nextui-org/react";
import { SummonDetails } from "./summon_details";

export function Login() {
  const [badgeNumber, setBadgeNumber] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(""); // Add token state
  const [buttonState, setButton] = useState(0); // button can be 0: disabled, 1: enabled, 2: loading, 3: success, 4: error

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
        setButton(3);
        await new Promise((resolve) => setTimeout(resolve, 5000));

        // Set button state to success
      } else {
        setButton(4); // Set button state to error
        // sleep for 2 seconds
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setButton(1); // Set button state to enabled
      }
    } catch (error) {
      setButton(4); // Set button state to error
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
                  onPress={handleLogin}
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
