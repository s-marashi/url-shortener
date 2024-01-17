import { injectable } from "inversify";
import { DataMapper } from "../../domain/DataMapper";
import { User } from "../../domain/user/User";
import { Email } from "../../domain/Email";

@injectable()
export class UserDataMapper implements DataMapper<User>
{
    toDomain(dalEntity: any): User {
        return new User(dalEntity.guid, new Email(dalEntity.email), dalEntity.password, dalEntity.urls);
    }

    toDalEntity(user: User): any {
        return {
            'guid': user.getGuid(),
            'email': user.getEmail().toString(),
            'password': user.getPassword(),
            'urls': user.getUrls(),
        }
    }
}
