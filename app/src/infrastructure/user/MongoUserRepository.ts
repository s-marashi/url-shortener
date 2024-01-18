import { injectable, inject } from "inversify";
import { UserRepository } from "../../domain/user/UserRepository";
import { User } from "../../domain/user/User";
import { TYPES } from "../../TYPES";
import { Collection, Db } from "mongodb";
import { UserDataMapper } from "../../infrastructure/user/UserDataMapper";
import { Email } from "../../domain/Email";

export @injectable()
class MongoUserRepository implements UserRepository {
    private collection: Collection;

    constructor(
        @inject(TYPES.Db) private readonly db: Db,
        @inject(TYPES.UserDataMapper) private readonly dataMapper: UserDataMapper
    ) {
        this.collection = db.collection('users');
    }

    async doesExists(email: Email): Promise<boolean> {
        const dbResult = await this.collection.findOne({ normalizedEmail: email.getNormalized() });
        return !!dbResult;
    }

    async save(user: User): Promise<void> {
        const email = user.getEmail();
        const exists = await this.doesExists(email);
        if (!exists) {
            const dbResult = await this.collection.insertOne(this.dataMapper.toDalEntity(user));
            return;
        }
        await this.collection.replaceOne({ normalizedEmail: email.getNormalized() }, this.dataMapper.toDalEntity(user));
    }

    async findOneByEmail(email: Email): Promise<User | null> {
        const dbResult = await this.collection.findOne({ normalizedEmail: email.getNormalized() });
        if (dbResult === null) {
            return null;
        }
        return this.dataMapper.toDomain(dbResult);
    }
}
