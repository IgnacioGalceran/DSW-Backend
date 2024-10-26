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

  @Property({ nullable: false })
  inicio!: string;

  @Property({ nullable: false })
  fin!: string;

  @ManyToOne(() => Pacientes, { nullable: false })
  paciente?: Pacientes | null;

  @ManyToOne(() => Medicos, { nullable: false })
  medico?: Medicos | null;
}
