import {
  Entity,
  Property,
  OneToOne,
  ManyToOne,
  OneToMany,
  Collection,
  ManyToMany,
  Cascade,
} from "@mikro-orm/core";
import { Especialidades } from "../especialidades/especialidades.entity.js";
import { BaseEntity } from "../../shared/baseEntity.entity.js";
import { Turnos } from "../turnos/turnos.entity.js";
import { Usuarios } from "../../auth/usuarios.entity.js";
import { ObrasSociales } from "../obrasocial/obrasocial.entity.js";

@Entity()
export class Medicos extends BaseEntity {
  @Property({ nullable: false })
  matricula!: string;

  @OneToOne(() => Usuarios, { nullable: false, cascade: [Cascade.ALL] })
  usuario!: Usuarios;

  @Property({ nullable: true })
  telefono?: string;

  @Property({ nullable: true })
  horaDesde?: string;

  @Property({ nullable: true })
  horaHasta?: string;

  @Property({ nullable: true })
  diasAtencion?: string[];

  @ManyToOne(() => Especialidades, { nullable: true })
  especialidad?: Especialidades | null;

  @OneToMany(() => Turnos, (turno) => turno.medico)
  turnos? = new Collection<Turnos>(this);

  @ManyToMany(() => ObrasSociales, (obrasocial) => obrasocial.medicos, {
    owner: true,
  })
  obrasocial? = new Collection<ObrasSociales>(this);
}
