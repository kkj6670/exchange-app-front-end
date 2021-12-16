import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @PrimaryColumn()
  market: string;

  @Column()
  korean_name: string;

  @Column()
  english_name: string;
}
