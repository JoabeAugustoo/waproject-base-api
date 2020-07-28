import { Injectable } from '@nestjs/common';
import { IPaginationParams } from 'modules/common/interfaces/pagination';
import { IDemand } from 'modules/database/interfaces/demand';
import { Demand } from 'modules/database/models/demand';
import { Page, Transaction } from 'objection';

@Injectable()
export class DemandRepository {
  public async list(params: IPaginationParams, transaction?: Transaction): Promise<Page<Demand>> {
    let query = Demand.query(transaction)
      .select('*')
      .page(params.page, params.pageSize);

    if (params.orderBy) {
      query = query.orderBy(params.orderBy, params.orderDirection);
    }

    if (params.term) {
      query = query.where(query => {
        return query.where('name', 'ilike', `%${params.term}%`);
      });
    }

    return query;
  }

  public async count(transaction?: Transaction): Promise<Number> {
    const result: any = await Demand.query(transaction)
      .count('id as count')
      .first();

    return Number(result.count);
  }

  public async maxId(transaction?: Transaction): Promise<Number> {
    const result: any = await Demand.query(transaction)
      .max('id as max')
      .first();
    return Number(result.max);
  }

  public async findById(id: number, transaction?: Transaction): Promise<Demand> {
    return Demand.query(transaction)
      .where({ id })
      .first();
  }

  public async insert(model: IDemand, transaction?: Transaction): Promise<Demand> {
    return Demand.query(transaction).insert(model as Demand);
  }
}
