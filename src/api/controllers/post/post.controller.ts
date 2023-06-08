import { Controller } from '@nestjs/common';
import { PostFacade } from 'lib/post/application-services';

@Controller('post')
export class PostController {
  constructor(private readonly postFacade: PostFacade) {}
}
