import { config } from "dotenv";

import { addQuestions } from "./addQuestions";

config();

const commands: Record<string, () => Promise<void>> = {
    "add-questions": addQuestions
};

const command = process.argv[2];

if (commands[command]) {
    commands[command]()
        .then(() => process.exit(0))
        .catch((e) => {
            console.error(e);
            process.exit(1);
        });
} else {
    console.log("Unknown command");
}