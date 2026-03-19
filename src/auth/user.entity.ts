import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  refreshToken: string;
}

// information utilisateur pour l'authentification, avec un nom d'utilisateur et un mot de passe.
// nom,prenom,email,numero telephone,adresse...
