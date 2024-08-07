import {
  Property,
  Entity,
  ManyToMany,
  Cascade,
  Collection,
} from "@mikro-orm/core";
import { BaseEntity } from "../../shared/baseEntity.entity.js";
import { Medicos } from "../../entities/medicos/medicos.entity.js";
import { Pacientes } from "../../entities/pacientes/pacientes.entity.js";
import { Roles } from "../roles/roles.entity.js";

@Entity()
export class Funciones extends BaseEntity {
  @Property({ nullable: false })
  nombre!: string;

  @ManyToMany(() => Roles, (rol) => rol.funciones)
  roles? = new Collection<Roles>(this);
}
