import { BadRequestException, Injectable } from '@nestjs/common';
import { ICurrentUser } from 'modules/common/interfaces/currentUser';
import { IDemand } from 'modules/database/interfaces/demand';
import { IProduct } from 'modules/database/interfaces/product';
import { Demand } from 'modules/database/models/demand';

import { DemandRepository } from '../repositories/demand';
import { ProductRepository } from '../repositories/product';

@Injectable()
export class DemandService {
  constructor(private demandRepository: DemandRepository, private productRepository: ProductRepository) {}

  public async save(model: IDemand): Promise<Demand> {
    if (!model.user) {
      throw new BadRequestException('user-required');
    }
    return this.create(model);
  }
  public async saveAllProducts(models: Array<IProduct>, currentUser: ICurrentUser): Promise<Array<IProduct>> {
    if (!models) {
      throw new BadRequestException('product-required');
    }

    const maxDemand = <number>await this.demandRepository.maxId();

    const newDemand = new Demand();
    newDemand.name = `Cesta - ${maxDemand + 1}`;
    newDemand.userId = currentUser.id;
    const entityDemand = await this.demandRepository.insert(newDemand);
    models = models.map(x => {
      x.demandId = entityDemand.id;
      return x;
    });

    const products = await this.productRepository.insertAll(models);
    return products;
  }

  public async findByProducts(idDemand: number): Promise<Array<IProduct>> {
    const products = await this.productRepository.findByProducts(idDemand);
    return products;
  }
  private async create(model: IDemand): Promise<Demand> {
    const demand = await this.demandRepository.insert(model);
    return demand;
  }
}
