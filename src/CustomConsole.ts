// src/CustomConsole.ts

interface ErrorResponse {
  success: boolean;
  message?: string;
}

export class CustomConsole {
  private production: boolean;
  private errorEndpoint: string;

  constructor(errorEndpoint?: string) {
    this.production = process.env.NODE_ENV === "production";
    this.errorEndpoint = errorEndpoint || "https://example.com/error-log";
  }

  log(...args: any[]): void {
    if (!this.production) {
      console.log(...args);
    }
  }

  error(...args: any[]): void {
    if (this.production) {
      this.sendToServer("error", args.join(" "));
    } else {
      console.error(...args);
    }
  }

  private async sendToServer(type: string, message: string): Promise<void> {
    try {
      const response = await fetch(this.errorEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type, message }),
      });

      const data: ErrorResponse = await response.json();
      console.log("Server response:", data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  }
}
