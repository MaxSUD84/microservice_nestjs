import { PostRepository } from 'lib/post/providers';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PostAggregate } from 'lib/post/domain';
import { BadRequestException, Logger } from '@nestjs/common';
import { UpdatePostCommand } from './update-post.command';

@CommandHandler(UpdatePostCommand)
export class UpdatePostCommandHandler
  implements ICommandHandler<UpdatePostCommand, PostAggregate>
{
  private readonly logger = new Logger(UpdatePostCommandHandler.name);
  constructor(private readonly postRepository: PostRepository) {}

  async execute({ post }: UpdatePostCommand): Promise<PostAggregate> {
    const existPost = await this.postRepository
      .findOne(post.id)
      .catch((err) => {
        this.logger.error(err);
        return null as PostAggregate;
      });

    if (!existPost) {
      throw new BadRequestException(`Post by id ${post.id} not found!`);
    }

    Object.assign(existPost, post);
    const postAggegate = PostAggregate.create(existPost);
    postAggegate.plainToInstance();
    await this.postRepository.save(postAggegate);
    return postAggegate;
  }
}
