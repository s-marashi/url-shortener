import { Statistics } from "./Statistics";

export interface StatisticsQueue {
    push(statistics: Statistics): Promise<void>
}
