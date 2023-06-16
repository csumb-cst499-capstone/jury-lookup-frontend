
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
        console.log("Login failed");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setJurorData(null);
    setBadgeNumber("");
    setPinCode("");
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
                background: "linear-gradient(to right, #6c63ff, #ffb6ff)",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Sign In
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Card bordered css={{ boxShadow: "none" }}>
          <Card.Body>
            {jurorData && (
              <div
                css={{
                  padding: "1rem",
                  backgroundColor: "#f2f2f2",
                  borderRadius: "5px",
                }}
              >
                <h3>Juror Information:</h3>
                <p>
                  <strong>First Name:</strong> {jurorData.FirstName}
                </p>
                <p>
                  <strong>Last Name:</strong> {jurorData.LastName}
                </p>
                <p>
                  <strong>Badge Number:</strong> {jurorData.BadgeNumber}
                </p>
                <p>
                  <strong>Summons Date:</strong> {jurorData.SummonsDate}
                </p>
                <p>
                  <strong>Mailing Address:</strong> {jurorData.MailingAddress}
                </p>
                <p>
                  <strong>City:</strong> {jurorData.City}
                </p>
                <p>
                  <strong>State:</strong> {jurorData.State}
                </p>
                <p>
                  <strong>Group Number:</strong> {jurorData.GroupNumber}
                </p>
                <p>
                <strong>Can Postpone:</strong> {jurorData.CanPostpone ? "Yes" : "No"}
</p>
</div>
)}
<Button
onClick={handleLogout}
auto
css={{
  background: "linear-gradient(to right, #6c63ff, #ffb6ff)",
  color: "white",
  fontWeight: "bold",
}}
>
Logout
</Button>
</Card.Body>
</Card>
)}
</Container>
);
}

export default Login;
