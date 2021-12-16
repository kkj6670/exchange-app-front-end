import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class TradeAggregate extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  market: string;

  @Column({ type: 'timestamptz' })
  timestamp: Date;

  @Column()
  trade_price: number;

  @Column()
  candle_acc_trade_price: number;

  @Column()
  candle_acc_trade_volume: number;
}
