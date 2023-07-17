import React, { Suspense, useState } from "react";
import { SummonDetails } from "./summon_details";
import { Input, Button } from "@nextui-org/react";
import "../styles/animations.css"; // Import the CSS file containing animations

function Login() {
  const [badgeNumber, setBadgeNumber] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [buttonState, setButtonState] = useState(0);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      setButtonState(2);
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ BadgeNumber: badgeNumber, PinCode: pinCode }),
      });

      if (response.status === 200) {
        const data = await response.json();
        setButtonState(3);
        setToken(data.token);
        setLoggedIn(true);
      } else {
        setButtonState(4);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setButtonState(1);
      }
    } catch (error) {
      setButtonState(4);
    }
  };

  return (
    <div className="justify-center">
      {!loggedIn ? (
        <div className="flex justify-center items-center h-screen">
          <div className="w-full max-w-md px-6 py-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-large shadow-md">
            <h3 className="text-3xl font-bold text-white text-center mb-8">
              Jury Duty Lookup
            </h3>
            <hr className="mb-8" />
            <form>
              <div className="mb-8">
                <Input
                  type="text"
                  label="Badge Number"
                  value={badgeNumber}
                  onChange={(e) => setBadgeNumber(e.target.value)}
                  className="w-full rounded-lg"
                  isRequired
                  placeholder="Enter your badge number"
                />
              </div>
              <div className="mb-8">
                <Input
                  type="password"
                  label="Pin Code"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  className="w-full rounded-lg"
                  isRequired
                  placeholder="Enter your pin code"
                />
              </div>
              <div className="flex justify-center items-center mt-6">
                <Button
                  onClick={(event) => handleLogin(event)}
                  isDisabled={!badgeNumber || !pinCode}
                  className={`${
                    buttonState === 3
                      ? "bg-green-500"
                      : buttonState === 4
                      ? "bg-red-500 animate-shake"
                      : "bg-pink-500"
                  } text-white font-bold px-6 py-2 rounded-lg transition-colors duration-300 ease-in-out hover:bg-opacity-75 mb-8`}
                >
                  {buttonState === 2
                    ? "Loading..."
                    : buttonState === 3
                    ? "Success!"
                    : buttonState === 4
                    ? "Invalid Credentials"
                    : "Sign In"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <div>
            <SummonDetails token={token} />
          </div>
        </Suspense>
      )}
    </div>
  );
}

export default Login;
