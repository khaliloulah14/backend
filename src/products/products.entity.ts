// product.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column('decimal')
  price: number;

  @Column({ nullable: true }) // ✅ optionnel
  description: string;

  @Column({ nullable: true })
  image: string;
}
