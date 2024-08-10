import {
  Property,
  Entity,
  OneToMany,
  ManyToMany,
  Cascade,
  Collection,
} from "@mikro-orm/core";
import { BaseEntity } from "../../shared/baseEntity.entity.js";
import { Funciones } from "../funciones/funciones.entity.js";
import { Usuarios } from "../../auth/usuarios.entity.js";

@Entity()
export class Roles extends BaseEntity {
  @Property({ nullable: false })
  nombre!: string;

  @ManyToMany(() => Funciones, "roles", { owner: true, cascade: [Cascade.ALL] })
  funciones? = new Collection<Funciones>(this);

  @OneToMany(() => Usuarios, (usuario) => usuario.rol)
  usuarios? = new Collection<Usuarios>(this);
}
