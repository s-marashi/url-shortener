import { Url } from "../domain/resolve/Url";
import { injectable } from "inversify";

@injectable()
export class StatisticsApplication {
    async send(url: Url): Promise<void> {
        return;
    }
}
