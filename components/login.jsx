import { useState } from "react";
import { Container, Button, Input, Spacer } from "@nextui-org/react";
import { SummonDetails } from "./summon_details";

export function Login() {
  const [badgeNumber, setBadgeNumber] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [jurorData, setJurorData] = useState(null);

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
        setJurorData(data);
        setLoggedIn(true);
      } else {
        window.alert("Invalid Badge Number OR Pin Code");
      }
    } catch (error) {
      window.alert("Error: " + error);
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
          shadow="large"
          bordered
          radius="sm"
          padding={4}
          css={{ maxWidth: "465px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", border: "2px solid #ccc",}}
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
                  borderRadius: "5px",
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
                  borderRadius: "5px",
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
                    padding: "9px 18px",
                    backgroundSize: "180% 110%", 
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
          <SummonDetails {...jurorData} />
        </Container>
      )}
    </Container>
  );
}

export default Login;