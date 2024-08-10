import {
  PrimaryKey,
  Entity,
  Property,
  ManyToMany,
  Cascade,
  ManyToOne,
  OneToMany,
  Rel,
  Collection,
} from "@mikro-orm/core";
import { BaseEntity } from "../../shared/baseEntity.entity.js";
import { Roles } from "../../security/roles/roles.entity.js";
import { Turnos } from "../turnos/turnos.entity.js";
import { Usuarios } from "../../auth/usuarios.entity.js";

@Entity()
export class Pacientes extends BaseEntity {
  @ManyToOne(() => Usuarios, { nullable: false, cascade: [Cascade.ALL] })
  usuario!: Usuarios;

  @OneToMany(() => Turnos, (turno) => turno.paciente)
  turnos? = new Collection<Turnos>(this);
}
