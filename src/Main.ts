import * as fs from "fs"
import {RandomUtils} from "./utils/RandomUtils";

let random = new RandomUtils();
for(let i = 0;i < 100; i++) {
    console.log(random.random());
}