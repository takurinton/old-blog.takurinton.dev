import { Button, Flex, Typography } from "@takurinton/ingred-ui";
import React, { useState } from "react";

export const About: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <Flex>
      about page
      <Typography component="p">{count}</Typography>
      <Button onClick={() => setCount((c) => c + 1)}>click</Button>
    </Flex>
  );
};
