import { injectable } from "inversify";
import { DataMapper } from "../DataMapper";
import { User } from "../../domain/user/User";
import { Email } from "../../domain/Email";
import { ObjectId } from "mongodb";

@injectable()
export class UserDataMapper implements DataMapper<User>
{
    toDomain(dalEntity: any): User {
        let urlIds = [];
        for (const urlObjectId of dalEntity.urls) {
            urlIds.push(urlObjectId.toString());
        }

        const user = new User(
            new Email(dalEntity.displayEmail),
            dalEntity.password,
            urlIds,
            dalEntity._id.toString(),
        );

        return user;
    }

    toDalEntity(user: User): any {
        let urlObjectIds = [];
        for(const id of user.getUrls()) {
            urlObjectIds.push(ObjectId.createFromHexString(id));
        }

        const dal = {
            normalizedEmail: user.getEmail().getNormalized(),
            displayEmail: user.getEmail().getDisplay(),
            password: user.getPassword(),
            urls: urlObjectIds,
        };

        if (user.getId() !== "") {
            dal["_id"] = ObjectId.createFromHexString(user.getId());
        }

        return dal;
    }
}
