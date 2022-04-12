import { BoardEntity } from 'src/boards/entity/boards.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  userPassword: string;

  @OneToMany((type) => BoardEntity, (BoardEntity) => BoardEntity.user)
  boards: BoardEntity[];
}
