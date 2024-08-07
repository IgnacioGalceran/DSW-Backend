import {
  Entity,
  Property,
  OneToOne,
  Rel,
  ManyToOne,
  Collection,
} from "@mikro-orm/core";
import { Especialidades } from "../especialidades/especialidades.entity.js";
import { BaseEntity } from "../../shared/baseEntity.entity.js";
import { Roles } from "../../security/roles/roles.entity.js";

@Entity()
export class Medicos extends BaseEntity {
  @Property({ nullable: true })
  uid?: string;

  @Property({ nullable: false })
  matricula!: string;

  @Property({ nullable: false })
  nombre!: string;

  @Property({ nullable: false })
  apellido!: string;

  @Property({ nullable: false })
  telefono!: string;

  @Property({ nullable: false })
  horaDesde!: string;

  @Property({ nullable: false })
  horaHasta!: string;

  @Property({ nullable: false })
  diasAtencion!: string[];

  @ManyToOne(() => Especialidades, { nullable: true })
  especialidad?: Especialidades | null;

  @ManyToOne(() => Roles, { nullable: true })
  rol?: Roles | null;
}
