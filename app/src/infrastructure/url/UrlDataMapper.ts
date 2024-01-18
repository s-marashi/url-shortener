import { injectable } from "inversify";
import { DataMapper } from "../../domain/DataMapper";
import { Url } from "../../domain/url/Url";
import { ObjectId } from "mongodb";

@injectable()
export class UrlDataMapper implements DataMapper<Url>
{
    toDomain(dalEntity: any): Url {
        return new Url(
            dalEntity.short,
            dalEntity.long,
            dalEntity.lastVisitedAt,
            dalEntity.visitCount,
            dalEntity.userId.toString(),
            dalEntity._id.toString(),
        );
    }

    toDalEntity(url: Url): any {
        const dal = {
            short: url.getShort(),
            long: url.getLong(),
            lastVisitedAt: url.getLastVisitedAt(),
            visitCont: url.getVisitCount(),
            userId: ObjectId.createFromHexString(url.getUserId()),
        };

        if (url.getId() !== "") {
            dal["_id"] = ObjectId.createFromHexString(url.getId());
        }

        return dal;
    }
}
