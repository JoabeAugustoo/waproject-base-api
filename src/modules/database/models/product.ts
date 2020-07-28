import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';

import { IProduct } from '../interfaces/product';
import { Demand } from './demand';

export class Product extends Model implements IProduct {
  @ApiProperty({ type: 'integer' })
  public id: number;
  @ApiProperty({ type: 'integer' })
  public demandId: number;
  @ApiProperty({ type: 'string' })
  public name: string;
  @ApiProperty({ type: 'integer' })
  public amount: number;
  @ApiProperty({ type: 'float' })
  public value: number;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public createdDate: Date;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public updatedDate: Date;

  public demand: Demand;

  public static get tableName(): string {
    return 'Product';
  }

  public static get relationMappings(): any {
    return {
      demand: {
        relation: Model.HasOneRelation,
        modelClass: Demand,
        filter: (query: any) => query.select('id', 'name'),
        join: {
          from: 'Demand.id',
          to: 'Demand.userId'
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
}
