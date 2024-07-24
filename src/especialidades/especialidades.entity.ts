import { Property, Entity, OneToOne, Rel } from "@mikro-orm/core";
import { BaseEntity } from "../../shared/baseEntity.entity.js";
import { Medicos } from "../medicos/medicos.entity.js";

@Entity()
export class Especialidades extends BaseEntity {
  @Property({ nullable: false })
  descEsp!: string;

  @OneToOne(() => Medicos, (medico) => medico.especialidad)
  medico!: Rel<Medicos>;
}
