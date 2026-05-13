<div align="center">

<img src="https://img.shields.io/badge/AuthVaultix-TypeScript%20SDK-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="AuthVaultix TS SDK"/>

# 🔐 AuthVaultix TypeScript SDK

**The official TypeScript/Node.js SDK for [AuthVaultix](https://authvaultix.com) — Secure License & Authentication API**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Axios](https://img.shields.io/badge/Axios-1.7-5A29E4?style=flat-square&logo=axios)](https://axios-http.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Windows-0078D6?style=flat-square&logo=windows)](https://authvaultix.com)

</div>

---

## 📖 Overview

`authvaultix.ts` is a lightweight, easy-to-integrate TypeScript SDK that connects your Node.js applications to the **AuthVaultix** authentication and license management API. It provides secure user authentication with **Hardware ID (HWID) binding**, making license abuse and account sharing virtually impossible.

### ✨ Features

| Feature | Description |
|---|---|
| 🔑 **License Login** | Authenticate using just a license key |
| 👤 **Username & Password Login** | Standard credential-based login with HWID lock |
| 📝 **User Registration** | Register new users with a valid license key |
| 🖥️ **HWID Binding** | Automatic hardware fingerprinting via Windows SID |
| 📊 **Subscription Details** | View expiry dates and remaining subscription time |
| ⚡ **Fast & Minimal** | Zero bloat — only `axios` as a dependency |

---

## 📁 Project Structure

```
authvaultix-ts/
├── src/
│   ├── authvaultix.ts   # Core SDK class
│   └── main.ts          # Example CLI integration
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v8 or higher
- Windows OS (required for HWID fingerprinting via PowerShell)
- An active [AuthVaultix](https://authvaultix.com) account with an application created

### 1. Clone the Repository

```bash
git clone https://github.com/AuthVaultix-typescript-Example.git
cd AuthVaultix-typescript-Example
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Your App Credentials

Open `src/main.ts` and fill in your AuthVaultix application details:

```typescript
const AuthVaultixApp = new AuthVaultix(
  "YourAppName",       // Application name from AuthVaultix dashboard
  "YOUR_OWNER_ID",     // Your Owner ID
  "YOUR_SECRET",       // Your application secret
  "1.0"                // Your application version
);
```

> ⚠️ **Never hardcode secrets in production.** Use environment variables (e.g., `process.env.AUTHVAULTIX_SECRET`).

### 4. Build & Run

```bash
# Compile TypeScript
npm run build

# Run the application
npm start
```

---

## 💻 SDK Usage

### Import & Initialize

```typescript
import { AuthVaultix } from "./authvaultix.ts";

const auth = new AuthVaultix(
  "MyApp",
  "xxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "1.0"
);

// Must be called first before any other method
await auth.Init();
```

---

### 🔐 Login (Username + Password)

Authenticate an existing user. HWID is automatically captured and verified.

```typescript
await auth.Login("john_doe", "securepassword123");
```

**Console Output:**
```
✅ Logged in!

=== User Data ===
Username: john_doe
IP: 103.xx.xx.xx
HWID: S-1-5-21-XXXXXXXXX

=== Subscriptions ===
    Subscriptions : Premium
    Expiry    : 5/1/2025, 12:00:00 AM
    Time Left : 27d 4h 30m
```

---

### 📝 Register (New User)

Register a new user with a valid license key. HWID is bound at registration.

```typescript
await auth.Register("new_user", "mypassword", "XXXXX-XXXXX-XXXXX-XXXXX");
```

---

### 🗝️ License Login

Authenticate using only a license key — no username/password required.

```typescript
await auth.License("XXXXX-XXXXX-XXXXX-XXXXX");
```

---

## 🖥️ Interactive CLI (main.ts)

The included `main.ts` provides a ready-to-use command-line interface:

```
[1] Login
[2] Register
[3] License Login
[4] Exit
Choose option: _
```

---

## ⚙️ API Reference

### `new AuthVaultix(appName: string, ownerId: string, secret: string, version: string)`

| Parameter | Type | Description |
|---|---|---|
| `appName` | `string` | Application name (from AuthVaultix dashboard) |
| `ownerId` | `string` | Your unique Owner ID |
| `secret` | `string` | Application secret key |
| `version` | `string` | Application version string |

---

### Authentication Methods

| Method | Signature | Description |
|---|---|---|
| `Init()` | `async Init(): Promise<boolean>` | Initialize session with AuthVaultix API |
| `Login()` | `async Login(username, password): Promise<boolean>` | Login with credentials + HWID |
| `Register()` | `async Register(username, password, license, email?): Promise<boolean>` | Register new user |
| `LicenseLogin()` / `License()` | `async LicenseLogin(licenseKey): Promise<boolean>` | License-key only authentication |
| `Logout()` | `async Logout(): Promise<void>` | Terminate session |

---

### User & Session Management

| Method | Signature | Description |
|---|---|---|
| `Check()` | `async Check(): Promise<boolean>` | Validates active session |
| `Upgrade()` | `async Upgrade(username, licenseKey): Promise<boolean>` | Upgrade user account |
| `ForgotPassword()`| `async ForgotPassword(username, email): Promise<boolean>` | Trigger password reset |
| `ChangeUsername()`| `async ChangeUsername(newUsername): Promise<void>` | Change username |

---

### Data & Variables

| Method | Signature | Description |
|---|---|---|
| `GetVar()` | `async GetVar(varName): Promise<string \| null>` | Fetch user variable |
| `SetVar()` | `async SetVar(varName, value): Promise<boolean>` | Set user variable |
| `GetGlobalVar()` | `async GetGlobalVar(varKey): Promise<string \| null>` | Fetch global variable |
| `Download()` | `async Download(fileId): Promise<{success, message, fileBytes}>` | Securely download file |

---

### Security & Communication

| Method | Signature | Description |
|---|---|---|
| `Log()` | `async Log(message): Promise<{success, message}>` | Send log to dashboard |
| `FetchOnline()` | `async FetchOnline(): Promise<{success, message, users}>` | Get online clients |
| `Ban()` | `async Ban(reason?): Promise<{success, message}>` | Ban current user |
| `CheckBlacklist()`| `async CheckBlacklist(): Promise<{success, message}>` | Check HWID blacklist |
| `ChatSend()` | `async ChatSend(message, channel): Promise<{success, message}>` | Send chat message |
| `ChatFetch()` | `async ChatFetch(channel): Promise<any[] \| null>` | Retrieve chat history |

---

### Properties

- `CurrentUser`: Object containing user info, HWID, IP, subscriptions, etc.
- `SessionId`: Active session token.
- `Initialized`: Boolean indicating if SDK is initialized.

---

## 🔒 Security Notes

- **HWID Locking** — Each license/account is locked to the user's Windows SID, preventing account sharing.
- **Session-Based API** — Each `Init()` call generates a unique session ID for secure request signing.
- **Credential Safety** — Store your `ownerid`, `secret`, and app `name` in environment variables, never in source code.

```typescript
// ✅ Recommended: use environment variables
const auth = new AuthVaultix(
  process.env.APP_NAME!,
  process.env.OWNER_ID!,
  process.env.APP_SECRET!,
  "1.0"
);
```

---

## 🛠️ Development

```bash
# Install dependencies
npm install

# Compile TypeScript
npm run build

# Run compiled output
npm start
```

**`tsconfig.json`** is pre-configured for ESM module output targeting Node.js.

---

## 📦 Dependencies

| Package | Version | Purpose |
|---|---|---|
| `axios` | `^1.7.7` | HTTP requests to AuthVaultix API |
| `typescript` | `^5.7.2` | TypeScript compiler (dev) |
| `@types/node` | `^22.9.0` | Node.js type definitions (dev) |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🌐 Links

- 🔗 **Website**: [authvaultix.com](https://authvaultix.com)
- 📧 **Support**: Open an [Issue](https://github.com/YOUR_USERNAME/authvaultix-ts/issues)
- 📚 **API Docs**: [authvaultix.com/docs](https://authvaultix.com)

---

<div align="center">

Made with ❤️ for the **AuthVaultix** ecosystem

⭐ **Star this repo if it helped you!** ⭐

</div>
