import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  PrimaryColumn,
  AfterLoad,
} from 'typeorm';

@Entity()
export class Trade extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  market: string;

  @Column({ type: 'timestamptz' })
  timestamp: Date;

  @Column()
  trade_price: number;

  @Column()
  trade_volume: number;

  @Column({ select: true, nullable: false, insert: false, update: false })
  trade_price_volume: number;

  @AfterLoad()
  getTradePriceVolume() {
    this.trade_price_volume = this.trade_price * this.trade_volume;
  }
}
