export class NotFound extends Error {
  statusCode: number;

  constructor(id: string | undefined) {
    super(`El recurso con id: '${id}' no fue encontrado.`);
    this.statusCode = 404;
  }
}

export class InvalidId extends Error {
  statusCode: number;

  constructor() {
    super(`El id proporcionado es inválido.`);
    this.statusCode = 400;
  }
}

export class Repeated extends Error {
  statusCode: number;

  constructor(recurso: string, valor: string) {
    super(
      `El ${recurso}: '${valor}' ya se encuentra ingresado en la base de datos.`
    );
    this.statusCode = 400;
  }
}

export class InvalidJson extends Error {
  statusCode: number;

  constructor(propiedad: string) {
    super(`La propiedad: ${propiedad} es obligatoria.`);
    this.statusCode = 400;
  }
}

export class Unauthorized extends Error {
  statusCode: number;

  constructor(funcion: string) {
    super(`El usuario no posee permisos para la función: ${funcion}.`);
    this.statusCode = 401;
  }
}

export class UserNotFounded extends Error {
  statusCode: number;

  constructor() {
    super(`El usuario no fue encontrado en base de datos.`);
    this.statusCode = 401;
  }
}
