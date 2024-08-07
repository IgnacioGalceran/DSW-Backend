import {
  Property,
  Entity,
  OneToMany,
  ManyToMany,
  Cascade,
  Collection,
} from "@mikro-orm/core";
import { BaseEntity } from "../../shared/baseEntity.entity.js";
import { Medicos } from "../../entities/medicos/medicos.entity.js";
import { Pacientes } from "../../entities/pacientes/pacientes.entity.js";
import { Funciones } from "../funciones/funciones.entity.js";

@Entity()
export class Roles extends BaseEntity {
  @Property({ nullable: false })
  nombre!: string;

  @ManyToMany(() => Funciones, "roles", { owner: true })
  funciones? = new Collection<Funciones>(this);

  @OneToMany(() => Medicos, (medico) => medico.rol)
  medicos? = new Collection<Medicos>(this);

  @OneToMany(() => Pacientes, (paciente) => paciente.rol)
  pacientes? = new Collection<Pacientes>(this);
}
