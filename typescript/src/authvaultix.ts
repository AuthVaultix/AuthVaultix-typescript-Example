import axios from "axios";
import { execSync } from "child_process";

interface AuthConfig {
  name: string;
  ownerid: string;
  secret: string;
  version: string;
}

export class AuthvAultix {
  private name: string;
  private ownerid: string;
  private secret: string;
  private version: string;
  private sessionid: string | null = null;
  private BASE_URL = "https://authvaultix.com/api/1.0/";

  constructor(config: AuthConfig) {
    this.name = config.name;
    this.ownerid = config.ownerid;
    this.secret = config.secret;
    this.version = config.version;
  }

  private async sendRequest(payload: Record<string, string>) {
    try {
      const params = new URLSearchParams(payload);
      const response = await axios.post(this.BASE_URL, params);
      return response.data;
    } catch (error: any) {
      console.error("❌ HTTP Error:", error.message);
      process.exit(1);
    }
  }

  private getHWID(): string {
    try {
      const output = execSync(
        `powershell -Command "[System.Security.Principal.WindowsIdentity]::GetCurrent().User.Value"`,
        { encoding: "utf8" }
      ).trim();
      return output || "UNKNOWN_HWID";
    } catch {
      return "UNKNOWN_HWID";
    }
  }

  async Init() {
    console.log("Connecting...");
    const resp = await this.sendRequest({
      type: "init",
      name: this.name,
      ownerid: this.ownerid,
      secret: this.secret,
      ver: this.version,
    });

    if (resp.success) {
      this.sessionid = resp.sessionid;
      console.log("✅ Initialized Successfully!");
    } else {
      console.log("❌ Init Failed:", resp.message || "Unknown error");
      process.exit(1);
    }
  }

  async Login(username: string, password: string) {
    const resp = await this.sendRequest({
      type: "login",
      sessionid: this.sessionid!,
      username,
      pass: password,
      hwid: this.getHWID(),
      name: this.name,
      ownerid: this.ownerid,
    });

    if (resp.success) {
      console.log("✅ Logged in!");
      this.printUserInfo(resp.info);
    } else {
      console.log("❌ Login Failed:", resp.message);
    }
  }

  async Register(username: string, password: string, license: string) {
    const resp = await this.sendRequest({
      type: "register",
      sessionid: this.sessionid!,
      username,
      pass: password,
      key: license,
      hwid: this.getHWID(),
      name: this.name,
      ownerid: this.ownerid,
    });

    if (resp.success) {
      console.log("✅ Registered Successfully!");
      this.printUserInfo(resp.info);
    } else {
      console.log("❌ Register Failed:", resp.message);
    }
  }

  async License(license: string) {
    const resp = await this.sendRequest({
      type: "license",
      sessionid: this.sessionid!,
      key: license,
      hwid: this.getHWID(),
      name: this.name,
      ownerid: this.ownerid,
    });

    if (resp.success) {
      console.log("✅ License Login Successful!");
      this.printUserInfo(resp.info);
    } else {
      console.log("❌ License Login Failed:", resp.message);
    }
  }

  private printUserInfo(info: any) {
    console.log("\n👤 User Info:");
    console.log(" Username:", info.username);
    console.log(" HWID:", info.hwid);
    console.log(" IP:", info.ip);
    if (info.subscriptions) {
      console.log(" Subscriptions:");
      info.subscriptions.forEach((sub: any) =>
        console.log(`  - ${sub.subscription} | Expires: ${sub.expiry}`)
      );
    }
  }
}
