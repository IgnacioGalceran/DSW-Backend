import { TurnosService } from "../src/entities/turnos/turnos.service";
import { Turnos } from "../src/entities/turnos/turnos.entity";
import { Pacientes } from "../src/entities/pacientes/pacientes.entity";
import { Medicos } from "../src/entities/medicos/medicos.entity";
import { Usuarios } from "../src/auth/usuarios.entity";
import { orm } from "./setup";

const crearDatosDePrueba = async () => {
  const em = orm.em.fork();
  const usuarioMedico = em.create(Usuarios, {
    uid: "s23asd5123",
    email: "medico@test.com",
    nombre: "Medico",
    apellido: "Test",
    dni: "40969932",
    tipoDni: "dni",
    verificado: true,
  });

  const medico = em.create(Medicos, {
    matricula: "123456",
    usuario: usuarioMedico,
  });

  const usuarioPaciente = em.create(Usuarios, {
    uid: "sadasd5123",
    email: "paciente@test.com",
    nombre: "Paciente",
    apellido: "Test",
    dni: "40969962",
    tipoDni: "dni",
    verificado: true,
  });

  const paciente = em.create(Pacientes, {
    usuario: usuarioPaciente,
  });

  await em.persistAndFlush([medico, paciente]);

  const turno = em.create(Turnos, {
    fecha: new Date(),
    inicio: "10:00",
    fin: "10:30",
    paciente: paciente,
    medico: medico,
  });

  await em.persistAndFlush(turno);
};

describe("TurnosService", () => {
  let turnosService: TurnosService;

  beforeAll(() => {
    const em = orm.em.fork();
    turnosService = new TurnosService(em);
  });

  beforeEach(async () => {
    const em = orm.em.fork();
    await em.nativeDelete(Pacientes, {});
    await em.nativeDelete(Medicos, {});
    await em.nativeDelete(Turnos, {});
    await crearDatosDePrueba();
  });

  it("debería agregar un nuevo turno", async () => {
    const em = orm.em.fork();
    const pacientes = await em.find(Pacientes, {});
    const paciente = pacientes[0];
    const medicos = await em.find(Medicos, {});
    const medico = medicos[0];

    const turno = {
      fecha: new Date(),
      inicio: "10:00",
      fin: "10:30",
      paciente: { id: paciente.usuario.id?.toString() },
      medico: { id: medico.id?.toString() },
    };

    console.log("turnooo", turno);

    const resultado = await turnosService.add(turno);

    expect(resultado).toBeDefined();
    expect(resultado?.fecha).toEqual(turno.fecha);
    expect(resultado?.inicio).toBe("10:00");
    expect(resultado?.fin).toBe("10:30");
    expect(resultado?.paciente?.id).toBe(paciente?.id);
    expect(resultado?.medico?.id).toBe(medico?.id);
  });

  it("debería devolver todos los turnos", async () => {
    const turnos = await turnosService.findAll();

    console.log("turnosss", turnos);
    expect(turnos).toBeDefined();
    expect(turnos?.length).toBeGreaterThan(0);
  });
  it("debería devolver un turno por su ID", async () => {
    const em = orm.em.fork();
    const turnos = await em.find(Turnos, {});
    let turnoId;

    if (turnos.length > 0) {
      turnoId = turnos[0].id;
    } else {
      console.error("No se encontraron turnos.");
    }

    let turno;

    if (turnoId) {
      turno = await turnosService.findOne({ id: turnoId });
    }

    expect(turno).toBeDefined();
    expect(turno?.id).toBe(turnoId);
  });

  it("debería fallar al crear un turno sin paciente", async () => {
    const em = orm.em.fork();
    const medicos = await em.find(Medicos, {});
    const medico = medicos[0];

    try {
      await turnosService.add({
        fecha: new Date(),
        inicio: "10:00",
        fin: "10:30",
        medico: { id: medico.id },
      });
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(
        "El paciente no fue encontrado en base de datos."
      );
    }
  });

  it("debería evitar la superposición de turnos para un médico", async () => {
    const em = orm.em.fork();
    const medicos = await em.find(Medicos, {});
    const medico = medicos[0];
    const pacientes = await em.find(Pacientes, {});
    const paciente = pacientes[0];

    try {
      await turnosService.add({
        fecha: new Date(),
        inicio: "10:00",
        fin: "10:30",
        paciente: { id: paciente.usuario.id },
        medico: { id: medico.id },
      });

      await turnosService.add({
        fecha: new Date(),
        inicio: "10:15",
        fin: "10:45",
        paciente: { id: paciente.usuario.id },
        medico: { id: medico.id },
      });
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.message).toBe("El médico ya tiene un turno en este horario");
    }
  });
});
