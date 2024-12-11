import { MedicoService } from "../src/entities/medicos/medicos.service";
import { Medicos } from "../src/entities/medicos/medicos.entity";
import { Usuarios } from "../src/auth/usuarios.entity";
import { orm } from "./setup";

let em!: any;

const crearDatosDePrueba = async () => {
  let medico = new Medicos();
  let usuarioMedico = new Usuarios();

  usuarioMedico = em.create(Usuarios, {
    uid: "s23asd5123",
    email: "medico@test.com",
    nombre: "Medico",
    apellido: "Test",
    dni: "40969932",
    tipoDni: "dni",
    verificado: true,
  });

  medico = em.create(Medicos, {
    matricula: "123456",
    usuario: usuarioMedico,
  });

  em.persist(usuarioMedico);
  em.persist(medico);

  await em.flush();
};

describe("MedicoService", () => {
  let medicoService: MedicoService;

  beforeAll(() => {
    em = orm.em.fork();
    medicoService = new MedicoService(em);
  });

  beforeEach(async () => {
    await em.nativeDelete(Medicos, {});
    await crearDatosDePrueba();
  });

  it("debería devolver todos los medicos", async () => {
    const medicos = await medicoService.findAll();

    expect(medicos).toBeDefined();
    expect(medicos?.length).toBeGreaterThan(0);
  });

  it("debería devolver un medico por su ID", async () => {
    const medicos = await medicoService.findAll();
    let medicoId;

    if (medicos) medicoId = medicos[0].usuario._id;

    let medico;

    if (medicoId) {
      medico = await medicoService.findOne({ id: medicoId.toString() });
    }

    expect(medico).toBeDefined();
    expect(medico?.usuario._id).toBe(medicoId);
  });

  it("debería borrar medico y usuario asociado al mismo", async () => {
    const medicos = await medicoService.findAll();
    let medicoId;

    if (medicos) medicoId = medicos[0].usuario._id;

    let medico;
    let medicoBorrado;

    if (medicoId)
      medico = await medicoService.remove({
        id: medicoId.toString(),
      });

    expect(medico).toBeDefined();
    expect(medico?.usuario._id).toBe(medicoId);

    try {
      if (medicoId)
        medicoBorrado = await medicoService.findOne({
          id: medicoId.toString(),
        });
    } catch (error: any) {
      expect(error).toBeDefined();
      if (medicoId)
        expect(error.message).toBe(
          `El recurso con id: '${medicoId.toString()}' no fue encontrado.`
        );
      expect(error.statusCode).toBe(404);
    }
  });
});
