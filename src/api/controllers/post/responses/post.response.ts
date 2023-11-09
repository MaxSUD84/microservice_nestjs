import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IPost } from 'lib/post';
import { v4 } from 'uuid';

export class PostResponse implements Omit<IPost, 'isPublished'> {
  @ApiProperty({
    description: 'Идентификатор поста',
    type: 'string',
    example: v4(),
  })
  id: string;

  @ApiProperty({ description: 'Заголовок поста', type: 'string' })
  title: string;

  @ApiPropertyOptional({ description: 'Сообщение поста', type: 'string' })
  message: string;

  @ApiProperty({
    description: 'Идентификатор автора поста',
    type: 'string',
    example: v4(),
  })
  authorId: string;

  @ApiProperty({
    description: 'Дата создания поста',
    type: 'string',
    example: new Date().toISOString(),
  })
  createdAt: string;

  @ApiProperty({
    description: 'Дата обновления поста',
    type: 'string',
    example: new Date().toISOString(),
  })
  updatedAt: string;
}
