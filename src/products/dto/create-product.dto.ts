// create-product.dto.ts
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string; // ✅ correspond à l'entité

  @IsNotEmpty()
  @IsString()
  category: string; // ✅ correspond à l'entité

  @IsNotEmpty()
  @IsNumber()
  price: number; // ✅ correspond à l'entité

  @IsOptional()
  @IsString()
  description?: string; // ✅ correspond à l'entité

  @IsOptional()
  @IsString()
  image?: string; // ✅ correspond à l'entité
}
