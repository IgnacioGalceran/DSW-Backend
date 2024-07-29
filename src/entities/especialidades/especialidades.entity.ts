import {
  Property,
  Entity,
  OneToMany,
  Cascade,
  Collection,
} from "@mikro-orm/core";
import { BaseEntity } from "../../shared/baseEntity.entity.js";
import { Medicos } from "../medicos/medicos.entity.js";

@Entity()
export class Especialidades extends BaseEntity {
  @Property({ nullable: false })
  nombre!: string;

  @OneToMany(() => Medicos, (medico) => medico.especialidad)
  medicos? = new Collection<Medicos>(this);
}
