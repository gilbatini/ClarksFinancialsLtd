#!/usr/bin/env node
import { emitEvent } from "./lib.mjs";

const [event, taskId, track, payloadJson = "{}"] = process.argv.slice(2);
if (!event || !taskId || !track) {
  throw new Error("Usage: emit-event.mjs <event> <task-id> <track> [payload-json]");
}
const result = await emitEvent(event, taskId, track, JSON.parse(payloadJson));
console.log(`${event} ${taskId} -> ${result.destination}`);
