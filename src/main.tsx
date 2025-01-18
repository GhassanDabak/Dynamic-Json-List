import DynamicJsonList from "components/DynamicJsonList/DynamicJsonList.component";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const data = {
  name: "John Doe",
  age: 25,
  address: {
    street: "123 Main St",
    city: "New York",
    state: "NY",
  },
  phoneNumbers: ["212-555-1234", "646-555-4567"],
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DynamicJsonList data={data} onClick={(path) => console.log(path)} />
  </StrictMode>
);
