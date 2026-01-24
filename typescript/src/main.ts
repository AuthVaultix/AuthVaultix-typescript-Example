import readline from "readline";
import { AuthvAultix } from "./authvaultix.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


const AuthVaultixApp = new AuthvAultix({
  name: "Teamdeveloperxd",
  ownerid: "5d36476ca4",
  secret: "4e1d8a87787f8af61c5462d12ee16e1f06d53fe314c78e985571db65f0007178",
  version: "1.0"
});

(async () => {
  await AuthVaultixApp.Init();

  console.log("\n[1] Login\n[2] Register\n[3] License Login\n[4] Exit");
  rl.question("Choose option: ", async (choice) => {
    switch (choice) {
      case "1":
        rl.question("Username: ", (username) => {
          rl.question("Password: ", async (password) => {
            await AuthVaultixApp.Login(username.trim(), password.trim());
            rl.close();
          });
        });
        break;

      case "2":
        rl.question("Username: ", (username) => {
          rl.question("Password: ", (password) => {
            rl.question("License: ", async (license) => {
              await AuthVaultixApp.Register(
                username.trim(),
                password.trim(),
                license.trim()
              );
              rl.close();
            });
          });
        });
        break;

      case "3":
        rl.question("License: ", async (license) => {
          await AuthVaultixApp.License(license.trim());
          rl.close();
        });
        break;

      default:
        console.log("Goodbye!");
        rl.close();
    }
  });
})();
