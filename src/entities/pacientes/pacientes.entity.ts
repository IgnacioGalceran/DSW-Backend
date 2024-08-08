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

@Entity()
export class Pacientes extends BaseEntity {
  @Property({ nullable: true })
  uid?: string;

  @Property({ nullable: false })
  dni!: string;

  @Property({ nullable: false })
  tipoDni!: string;

  @Property({ nullable: false })
  nombre!: string;

  @Property({ nullable: false })
  apellido!: string;

  @ManyToOne(() => Roles, { nullable: true })
  rol?: Roles | null;

  @OneToMany(() => Turnos, (turno) => turno.paciente)
  turnos? = new Collection<Turnos>(this);
}
