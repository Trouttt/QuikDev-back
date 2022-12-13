import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from 'src/modules/users/entities/user.entity';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.id, {
    cascade: false,
    eager: true,
  })
  @JoinColumn({ name: 'user', referencedColumnName: 'id' })
  user: User;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiPropertyOptional()
  @CreateDateColumn({ name: 'created_at' })
  created_at?: Date;

  @ApiPropertyOptional()
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date;

  @ApiPropertyOptional()
  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at?: Date;
}
