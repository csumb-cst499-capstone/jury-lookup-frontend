import React, { Suspense, useState } from "react";
import { SummonDetails } from "./summon_details";

function Login() {
  const [badgeNumber, setBadgeNumber] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [buttonState, setButtonState] = useState(0);

  const handleLogin = async () => {
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
    <div className="flex justify-center items-center h-screen">
      {!loggedIn ? (
        <div className="w-full max-w-md px-6 py-8 bg-white rounded-lg shadow-md">
          <h3 className="text-3xl font-bold text-center mb-4">
            Jury Duty Lookup
          </h3>
          <form>
            <div className="mb-4">
              <label className="block font-bold text-slate-400 mb-1">Badge Number</label>
              <input
                value={badgeNumber}
                onChange={(e) => setBadgeNumber(e.target.value)}
                className="w-full px-4 py-2 border  border-blue-500 rounded-lg"
                placeholder="Enter Badge Number"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-slate-400 font-bold mb-1">Pin Code</label>
              <input
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                className="w-full px-4 py-2 border border-blue-500 rounded-lg"
                placeholder="Enter Pin Code"
                required
              />
            </div>
            <div className="flex justify-center items-center">
              <button
                onClick={handleLogin}
                disabled={!badgeNumber || !pinCode}
                className={`${
                  buttonState === 3
                    ? "bg-green-500"
                    : buttonState === 4
                    ? "bg-red-500"
                    : "bg-gradient-to-r from-blue-600 to-purple-600"
                } text-white font-bold px-6 py-2 rounded-lg transition-colors duration-300 ease-in-out hover:bg-opacity-75`}
              >
                {buttonState === 2
                  ? "Loading..."
                  : buttonState === 3
                  ? "Success!"
                  : buttonState === 4
                  ? "Invalid Credentials"
                  : "Sign In"}
              </button>
            </div>
          </form>
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
