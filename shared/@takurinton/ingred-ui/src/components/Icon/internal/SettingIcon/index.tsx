import * as React from "react";
import { IconProps } from "../../Icon";

const SettingIcon: React.FunctionComponent<IconProps> = ({ type, fill }) => {
  switch (type) {
    case "fill":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            fill={fill}
            d="M9.954,2.21a9.99,9.99,0,0,1,4.091,0,4,4,0,0,0,5.412,3.123A9.99,9.99,0,0,1,21.5,8.876a4,4,0,0,0,0,6.248,10.043,10.043,0,0,1-2.046,3.543,4,4,0,0,0-5.41,3.121,9.99,9.99,0,0,1-4.091,0,4,4,0,0,0-5.412-3.125A9.99,9.99,0,0,1,2.5,15.121a4,4,0,0,0,0-6.246A10.043,10.043,0,0,1,4.544,5.332a4,4,0,0,0,5.41-3.121ZM12,15a3,3,0,1,0-3-3A3,3,0,0,0,12,15Z"
          />
        </svg>
      );
    case "line":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0 0h24v24H0V0z" />
          <path
            fill={fill}
            d="M3.34,17a10.018,10.018,0,0,1-.978-2.326,3,3,0,0,0,0-5.347,9.99,9.99,0,0,1,2.5-4.337A3,3,0,0,0,9.5,2.316a9.99,9.99,0,0,1,5.007,0A3,3,0,0,0,19.135,4.99a10.078,10.078,0,0,1,2.5,4.336,3,3,0,0,0,0,5.347,9.99,9.99,0,0,1-2.5,4.337A3,3,0,0,0,14.5,21.684a9.99,9.99,0,0,1-5.007,0A3,3,0,0,0,4.865,19.01,10.018,10.018,0,0,1,3.34,17ZM9,17.2a4.993,4.993,0,0,1,2.25,2.77,7.986,7.986,0,0,0,1.5,0,5,5,0,0,1,5.776-3.335,7.933,7.933,0,0,0,.748-1.3,5,5,0,0,1,0-6.668,8.126,8.126,0,0,0-.75-1.3A5,5,0,0,1,12.75,4.034a7.986,7.986,0,0,0-1.5,0A5,5,0,0,1,5.475,7.368a7.99,7.99,0,0,0-.748,1.3,5,5,0,0,1,0,6.668,8.126,8.126,0,0,0,.75,1.3A4.993,4.993,0,0,1,9,17.2ZM12,15a3,3,0,1,1,3-3A3,3,0,0,1,12,15Zm0-2a1,1,0,1,0-1-1A1,1,0,0,0,12,13Z"
          />
        </svg>
      );
  }
};

export { SettingIcon };
