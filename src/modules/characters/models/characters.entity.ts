import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import { IsNotEmpty } from 'class-validators';

@Entity('Characters')
export class Characters {
  /**
   *
   * @param _name
   * @param _role
   * @param _school
   * @param _house
   * @param _patronus
   */
  constructor(
    _name: string,
    _role: string,
    _school: string,
    _house: string,
    _patronus: string,
  ) {
    this.name = _name;
    this.role = _role;
    this.school = _school;
    this.house = _house;
    this.patronus = _patronus;
  }
  @PrimaryGeneratedColumn()
  id: string;

  // @IsNotEmpty({ message: 'Name is required' })
  @Column()
  name: string;

  // @IsNotEmpty({ message: 'Role is required' })
  @Column()
  role: string;

  // @IsNotEmpty({ message: 'School is required' })
  @Column()
  school: string;

  // @IsNotEmpty({ message: 'House is required' })
  @Column()
  house: string;

  // @IsNotEmpty({ message: 'Patronus is required' })
  @Column()
  patronus: string;
}
