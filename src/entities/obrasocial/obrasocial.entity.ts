import {
  Property,
  Entity,
  OneToMany,
  Cascade,
  Collection,
  ManyToMany,
} from "@mikro-orm/core";
import { BaseEntity } from "../../shared/baseEntity.entity.js";
import { Medicos } from "../medicos/medicos.entity.js";

@Entity()
export class ObrasSociales extends BaseEntity {
  @Property()
  nombre!: string;

  @Property()
  cuit!: string;

  @Property()
  telefono!: string;

  @Property()
  email!: string;

  @Property()
  direccion!: string;

  @ManyToMany(() => Medicos, (medico) => medico.obrasocial, {
    cascade: [Cascade.ALL],
  })
  medicos? = new Collection<Medicos>(this);
}
