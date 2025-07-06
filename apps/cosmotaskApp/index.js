import { registerRootComponent } from "expo";
import { API_URL } from "@env";
import App from "./App";

console.log("URL:",API_URL);

registerRootComponent(App);
