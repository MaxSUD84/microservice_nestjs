import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IPost } from 'lib/post';

@ObjectType()
export class PostResponse implements Omit<IPost, 'isPublished'> {
  @Field(() => ID, {
    description: 'Идентификатор поста',
  })
  id: string;

  @Field({
    description: 'Заголовок поста',
  })
  title: string;

  @Field({
    description: 'Сообщение поста',
  })
  message: string;

  @Field({
    description: 'Идентификатор автора поста',
  })
  authorId: string;

  @Field({
    description: 'Дата создания поста',
  })
  createdAt: string;

  @Field({
    description: 'Дата обновления поста',
  })
  updatedAt: string;
}
