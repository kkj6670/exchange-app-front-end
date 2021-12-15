import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class TradeAggregate extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @PrimaryColumn()
  code: string;

  @Column({ type: 'timestamptz' })
  timestamp: Date;

  @Column()
  trade_price: number;

  @Column()
  trade_volume: number;
}
