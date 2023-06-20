import React, { useState } from "react";
import { Container, Card, Button, Input } from "@nextui-org/react";

function Postpone({ data = [] }) {
    useState(() => {
    window.alert("Postpone window is here");
  }, []);

  return (
    <Container>
      <h2>THIS IS THE Postpone Page</h2>
      {/* code goes here working on it/calendar, etc */}
    </Container>
  );
}

export default Postpone;