import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Injectable, Logger } from '@nestjs/common';
import { PostFacade } from 'lib/post/application-services';
import { CreatePostDto } from 'lib/post/application-services/commands/dto';

@Injectable()
export class ConsumerService {
  private readonly logger = new Logger(ConsumerService.name);

  constructor(private readonly postFacade: PostFacade) {}

  @RabbitRPC({
    exchange: 'post',
    routingKey: 'create-post',
    queue: 'create-post',
  })
  private async createPost(post: CreatePostDto) {
    try {
      const createdPost = this.postFacade.commands.createPost(post);
      return createdPost;
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }
}
