import { IsOptional, IsString, IsUUID } from 'class-validator';
import { UpdatePostDto as IUpdatePostDto } from 'lib/post/application-services/commands/dto';

export class UpdatePostDto implements IUpdatePostDto {
  @IsUUID()
  id: string;

  @IsUUID()
  authorId: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  message?: string;
}
