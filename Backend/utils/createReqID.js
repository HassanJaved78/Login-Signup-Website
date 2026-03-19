import crypto from "crypto";

export default function createReqID() {
    return crypto.randomBytes(32).toString("hex");
}