import {
  Entity,
  Property,
  ManyToMany,
  Cascade,
  ManyToOne,
  Rel,
  Collection,
} from "@mikro-orm/core";
import { BaseEntity } from "../../shared/baseEntity.entity.js";

@Entity()
export class Personas extends BaseEntity {
  @Property({ nullable: false })
  nombre!: string;

  @Property({ nullable: false })
  apellido!: string;

  @Property({ nullable: false })
  idRol!: string;

  @Property({ nullable: false })
  telefono!: string;

  @Property({ nullable: false })
  direccion!: string;

  @Property({ nullable: false })
  idLocalidad!: string;

  // @ManyToOne(() => Rol, { nullable: false })
  // characterClass!: Rel<CharacterClass>

  // @ManyToMany(() => Item, (item) => item.characters, {
  //   cascade: [Cascade.ALL],
  //   owner: true,
  // })
  // items = new Collection<Item>(this)
}

@Entity()
export class Pacientes extends Personas {
  @Property({ nullable: false })
  tipoDni!: string;

  @Property({ nullable: false })
  dni!: string;
}

// export class Medico extends Persona {
// }
