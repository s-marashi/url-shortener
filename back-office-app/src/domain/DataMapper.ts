export interface DataMapper<DomainEntity> {
  toDomain(dalEntity: any): DomainEntity;
  toDalEntity(entity: DomainEntity): any;
}
