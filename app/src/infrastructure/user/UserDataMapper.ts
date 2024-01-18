import { injectable } from "inversify";
import { DataMapper } from "../../domain/DataMapper";
import { User } from "../../domain/user/User";
import { Email } from "../../domain/Email";
import { ObjectId } from "mongodb";

@injectable()
export class UserDataMapper implements DataMapper<User>
{
    toDomain(dalEntity: any): User {
        return new User(
            new Email(dalEntity.displayEmail),
            dalEntity.password,
            dalEntity.urls,
            dalEntity._id.toString(),
        );
    }

    toDalEntity(user: User): any {
        const dal = {
            normalizedEmail: user.getEmail().getNormalized(),
            displayEmail: user.getEmail().getDisplay(),
            password: user.getPassword(),
            urls: user.getUrls(),
        };

        if (user.getId() !== "") {
            dal["_id"] = ObjectId.createFromHexString(user.getId());
        }

        return dal;
    }
}
