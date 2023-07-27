import { useState, useEffect, Suspense } from "react";
import { Container, Card, Row, Text } from "@nextui-org/react";
import { API } from "../constants/api_constants";

export function Greeting({ data = [] }) {
  const [apiData, setApiData] = useState(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API.hello);
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
      <Text
        h1
        size={60}
        css={{
          textGradient: "45deg, $blue600 -20%, $pink600 50%",
        }}
        weight="bold"
      >
        Hi there!
      </Text>
      <Text
        h3
        size={30}
        css={{
          textGradient: "45deg, $purple600 -20%, $pink600 100%",
        }}
        weight="bold"
      >
        Here is some data from the API:
      </Text>
      <Suspense fallback={<p>Loading...</p>}>
        <Card isHoverable variant="bordered" css={{ mw: "400px" }}>
          <Card.Body>
            <Text color="primary" size={30}>
              {apiData.message}
            </Text>
          </Card.Body>
        </Card>
      </Suspense>
    </div>
  );
}

export default Greeting;
