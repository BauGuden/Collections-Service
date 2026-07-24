import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CollectionsService } from './collections.service';

@Controller()
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}


}
