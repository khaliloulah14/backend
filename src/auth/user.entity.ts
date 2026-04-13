// user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  refreshToken: string; // ← nullable car null après déconnexion
}

// information utilisateur pour l'authentification, avec un nom d'utilisateur et un mot de passe.
// nom,prenom,email,numero telephone,adresse...
