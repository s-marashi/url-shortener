import { RequestHandler } from "../domain/RequestHandler";
import { ScheduleHandler } from "../domain/ScheduleHandler";
import cron from 'node-cron';

export class CronScheduleHandler implements ScheduleHandler {
    schedule(runPlan: string, handler: RequestHandler<Date>): void {
        if (!cron.validate(runPlan)) {
            return;
        }

        cron.schedule(runPlan, async (mode: Date | string) => {
            await handler.consume(new Date());
        });
    }
}
