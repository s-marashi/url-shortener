import { Resolve } from "../domain/resolve/Resolve";
import { injectable } from "inversify";

@injectable()
export class StatisticsApplication {
    async send(resolve: Resolve): Promise<void> {
        return;
    }
}
