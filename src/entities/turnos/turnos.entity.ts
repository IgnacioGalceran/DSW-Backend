import {
  Entity,
  Property,
  OneToOne,
  OneToMany,
  Rel,
  ManyToOne,
  Collection,
} from "@mikro-orm/core";
import { Especialidades } from "../especialidades/especialidades.entity.js";
import { BaseEntity } from "../../shared/baseEntity.entity.js";
import { Roles } from "../../security/roles/roles.entity.js";
import { ManyToMany } from "@mikro-orm/mongodb";
import { Pacientes } from "../pacientes/pacientes.entity.js";
import { Medicos } from "../medicos/medicos.entity.js";

@Entity()
export class Turnos extends BaseEntity {
  @Property({ nullable: false })
  fecha!: Date;

  @ManyToOne(() => Pacientes, { nullable: true })
  paciente?: Pacientes | null;

  @ManyToOne(() => Medicos, { nullable: true })
  medico?: Medicos | null;
}
