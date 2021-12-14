import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @PrimaryColumn()
  code: string;

  @Column()
  nameKr: string;

  @Column()
  nameEn: string;
}
