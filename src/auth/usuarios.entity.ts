import { Entity, Property, ManyToOne } from "@mikro-orm/core";
import { Especialidades } from "../entities/especialidades/especialidades.entity.js";
import { BaseEntity } from "../shared/baseEntity.entity.js";
import { Roles } from "../security/roles/roles.entity.js";

@Entity()
export class Usuarios extends BaseEntity {
  @Property({ nullable: false })
  uid!: string;

  @Property({ nullable: false })
  nombre!: string;

  @Property({ nullable: false })
  apellido!: string;

  @Property({ nullable: false })
  email!: string;

  @Property({ nullable: false })
  dni!: string;

  @Property({ nullable: false })
  tipoDni!: string;

  @ManyToOne(() => Roles, { nullable: true })
  rol?: Roles | null;
}
