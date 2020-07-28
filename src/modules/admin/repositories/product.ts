import { Injectable } from '@nestjs/common';
import { IProduct } from 'modules/database/interfaces/product';
import { Product } from 'modules/database/models/product';
import { Transaction } from 'objection';

@Injectable()
export class ProductRepository {
  public async insert(model: IProduct, transaction?: Transaction): Promise<Product> {
    return Product.query(transaction).insert(model as Product);
  }

  public async insertAll(models: IProduct[], transaction?: Transaction): Promise<Product[]> {
    return Product.query(transaction).insert(models as Product[]);
  }

  public async findByProducts(demandId: number, transaction?: Transaction): Promise<Product[]> {
    return Product.query(transaction)
      .select('*')
      .where({ demandId });
  }
}
