"use strict";
// src/CustomConsole.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomConsole = void 0;
class CustomConsole {
    constructor(errorEndpoint) {
        this.production = process.env.NODE_ENV === "production";
        this.errorEndpoint = errorEndpoint || "https://example.com/error-log";
    }
    log(...args) {
        if (!this.production) {
            console.log(...args);
        }
    }
    error(...args) {
        if (this.production) {
            this.sendToServer("error", args.join(" "));
        }
        else {
            console.error(...args);
        }
    }
    sendToServer(type, message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(this.errorEndpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ type, message }),
                });
                const data = yield response.json();
                console.log("Server response:", data);
            }
            catch (error) {
                console.error("Error sending data:", error);
            }
        });
    }
}
exports.CustomConsole = CustomConsole;
