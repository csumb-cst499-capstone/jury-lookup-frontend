import React, { Suspense, useState } from "react";
import { SummonDetails } from "./summon_details";
import { Button, Input } from "@nextui-org/react";
import Modal from "./Modal";
import "../styles/animations.css";

function Login() {
  const [badgeNumber, setBadgeNumber] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [buttonState, setButtonState] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      setButtonState(2);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ BadgeNumber: badgeNumber, PinCode: pinCode }),
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        setButtonState(3);
        await new Promise((resolve) => setTimeout(resolve, 2000));

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

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-custom-color">
      {!loggedIn ? (
        <div className="flex justify-center items-center h-screen">
          <div className="w-full sm:w-max-65 max-w-md px-6 py-8 bg-custom-colorBox shadow-custom">
            <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">
              Jury Duty Lookup
            </h3>
            <hr className="mb-8" />
            <form>
              <div className="mb-8 shadow-customInput rounded-full">
                <Input
                  type="text"
                  label="Badge Number"
                  name="badgeNumber"
                  value={badgeNumber}
                  onChange={(e) => setBadgeNumber(e.target.value)}
                  className="w-full rounded-lg"
                  isRequired
                  placeholder="Enter your badge number"
                />
              </div>
              <div className="mb-8 shadow-customInput rounded-full">
                <Input
                  type="password"
                  label="Pin Code"
                  name="pinCode"
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
                      : "bg-purple-500"
                  } text-white font-bold px-6 py-2 rounded-lg transition-colors duration-300 ease-in-out hover:bg-opacity-75 mb-8 shadow-customSignin`}
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
              <div className="text-center">
                <Button onPress={openModal} variant="text" color="primary">
                  Need Help?
                </Button>
                <hr className="my-4 w-2/3 mx-auto border border-gray-300" />
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
      {showModal && <Modal closeModal={closeModal} />}
    </div>
  );
}

export default Login;
