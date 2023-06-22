import { useState } from "react";
import { Container, Card, Button, Input, Spacer } from "@nextui-org/react";
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
    <Container>
      {!loggedIn ? (
        <Container>
          <Card bordered="true" css={{ shadow:"$lg"}}>
          <Spacer y={1} />
          <Card.Header>
            <h3  >Jury Duty Lookup</h3>
          </Card.Header>
          <Card.Body>
            <form display = "flex" justify="center" align="center">
              <Input
              label="Enter Badge Number"
              value={badgeNumber}
              onChange={(e) => setBadgeNumber(e.target.value)}
              size={"md"}
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
              size={"md"}
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
              size={"md"}
              css={{
                background: "linear-gradient(to right, #6c63ff)",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Sign In
                  </Button>
                  </Container>
            </form>
          </Card.Body>
        </Card>
        </Container>        
      ) : (

        <Container>
            <SummonDetails  {...jurorData} />
          </Container>
          
      )}
    </Container>
  );
}

export default Login;