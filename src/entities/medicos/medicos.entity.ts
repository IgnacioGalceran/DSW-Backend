import {
  Entity,
  Property,
  OneToOne,
  Rel,
  ManyToOne,
  OneToMany,
  Collection,
} from "@mikro-orm/core";
import { Especialidades } from "../especialidades/especialidades.entity.js";
import { BaseEntity } from "../../shared/baseEntity.entity.js";
import { Roles } from "../../security/roles/roles.entity.js";
import { Turnos } from "../turnos/turnos.entity.js";
import { Usuarios } from "../../auth/usuarios.entity.js";
import { Cascade } from "@mikro-orm/mongodb";

@Entity()
export class Medicos extends BaseEntity {
  @Property({ nullable: false })
  matricula!: string;

  @OneToOne(() => Usuarios, { nullable: false, cascade: [Cascade.ALL] })
  usuario!: Usuarios;

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

  @OneToMany(() => Turnos, (turno) => turno.medico)
  turnos? = new Collection<Turnos>(this);
}
