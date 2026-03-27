import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title?: string;

  @IsNotEmpty()
  @IsString()
  author?: string;

  @IsNotEmpty()
  @IsString()
  publicationDate?: string;
}
