import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'modules/common/guards/token';
import { ICurrentUser } from 'modules/common/interfaces/currentUser';
import { IProduct } from 'modules/database/interfaces/product';
import { Demand } from 'modules/database/models/demand';
import { Product } from 'modules/database/models/product';

import { DemandRepository } from '../repositories/demand';
import { DemandService } from '../services/demand';
import { ListValidator } from '../validators/demand/list';
import { SaveValidator } from '../validators/demand/save';

@ApiTags('Admin: Demand')
@Controller('/demand')
export class DemandController {
  constructor(private demandRepository: DemandRepository, private demandService: DemandService) {}

  @Get()
  @ApiResponse({ status: 200, type: [Demand] })
  public async list(@Query() model: ListValidator) {
    return this.demandRepository.list(model);
  }

  @Get(':demandId')
  @ApiResponse({ status: 200, type: Demand })
  public async details(@Param('demandId', ParseIntPipe) demandId: number) {
    return this.demandRepository.findById(demandId);
  }

  @Post()
  @ApiResponse({ status: 200, type: Demand })
  public async save(@Body() model: SaveValidator) {
    return this.demandService.save(model);
  }

  @Post('/products')
  @ApiResponse({ status: 200, type: Product })
  public async saveAllProducts(@Body() model: Array<IProduct>, @CurrentUser() currentUser: ICurrentUser) {
    return this.demandService.saveAllProducts(model, currentUser);
  }

  @Get(':demandId/products')
  @ApiResponse({ status: 200, type: Demand })
  public async productsDetails(@Param('demandId', ParseIntPipe) demandId: number) {
    return this.demandService.findByProducts(demandId);
  }
}
