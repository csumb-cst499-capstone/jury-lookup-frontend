import { useState, useEffect, Suspense } from "react";
import { Container, Card, Row, Text } from "@nextui-org/react";

export function Homepage({ data = [] }) {
  const [apiData, setApiData] = useState(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/hello");
        const json = await res.json();
        setApiData(json);
      } catch (error) {
        console.log("error: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
        <img src="/msc-jcc-logo.png" alt="Court Image" />
      <Row align="middle" css={{ marginBottom: "1rem" }}>
        <Text
          h1
          size={60}
          css={{
            textGradient: "45deg, $red700 -20%, $red700 50%",
            marginLeft: "1rem",
          }}
          weight="bold"
        >
          JURY DUTY SERVICE
        </Text>
      </Row>
    </div>
  );
}

export default Homepage;