import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nameKr: string;

  @Column()
  nameEn: string;
}

@Entity()
export class Candle extends BaseEntity {
  @Column()
  hight: number;

  @Column()
  volume: number;

  @Column()
  low: number;

  @Column()
  date: number;

  @Column()
  close: number;

  @Column()
  open: number;
}
