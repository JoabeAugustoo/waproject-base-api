import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';

import { IDemand } from '../interfaces/demand';
import { User } from './user';
import { Product } from './product';

export class Demand extends Model implements IDemand {
  @ApiProperty({ type: 'integer' })
  public id: number;
  @ApiProperty({ type: 'string' })
  public name: string;
  @ApiProperty({ type: 'integer' })
  public userId?: number;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public createdDate: Date;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public updatedDate: Date;

  @ApiProperty({ nullable: true })
  public products?: Product[];

  public user?: User;

  public static get tableName(): string {
    return 'Demand';
  }

  public static get relationMappings(): any {
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        filter: (query: any) => query.select('id', 'firstName', 'lastName', 'email'),
        join: {
          from: 'User.id',
          to: 'Demand.userId'
        }
      },
      products: {
        relation: Model.HasManyRelation,
        modelClass: Product,
        join: {
          from: 'User.id',
          to: 'Product.demandId'
        }
      }
    };
  }

  public $beforeInsert(): void {
    this.createdDate = this.updatedDate = new Date();
  }

  public $beforeUpdate(): void {
    this.updatedDate = new Date();
  }

  public $formatDatabaseJson(json: any): any {
    return json;
  }

  public $parseDatabaseJson(json: any): any {
    return Model.prototype.$formatDatabaseJson.call(this, json);
  }

  public $formatJson(data: IDemand): IDemand {
    return data;
  }
}
