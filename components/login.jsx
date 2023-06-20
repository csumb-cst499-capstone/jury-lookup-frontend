import { useState } from "react";
import { Container, Card, Button, Input } from "@nextui-org/react";

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
    <Container>
      {!loggedIn ? (
        <Card bordered css={{ boxShadow: "none" }}>
          <Card.Body>
            <Input
              label="Enter Badge Number"
              value={badgeNumber}
              onChange={(e) => setBadgeNumber(e.target.value)}
              required
              css={{
                marginBottom: "1rem",
                borderColor: "blue",
                borderRadius: "5px",
              }}
            />
            <Input
              label="Enter Pin Code"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              required
              css={{
                marginBottom: "1rem",
                borderColor: "blue",
                borderRadius: "5px",
              }}
            />
            <Button
              onClick={handleLogin}
              disabled={!badgeNumber || !pinCode}
              auto
              css={{
                background: "linear-gradient(to right, #6c63ff)",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Sign In
            </Button>
          </Card.Body>
        </Card>
      ) : null}
    </Container>
  );
}

export default Login;