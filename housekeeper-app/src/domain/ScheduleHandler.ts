import { RequestHandler } from "./RequestHandler";

export interface ScheduleHandler {
    schedule(runPlan: string, handler: RequestHandler<Date>): void;
}
