export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class NotFound extends AppError {
  constructor(id: string | undefined) {
    super(`El recurso con id: '${id}' no fue encontrado.`, 404);
  }
}

export class InvalidId extends AppError {
  constructor() {
    super(`El id proporcionado es inválido.`, 400);
  }
}

export class Repeated extends AppError {
  constructor(recurso: string, valor: string) {
    super(`El '${recurso}: '${valor}' ya se encuentra solicitado.`, 400);
  }
}

export class InvalidJson extends AppError {
  constructor(propiedad: string) {
    super(`La propiedad: ${propiedad} es obligatoria.`, 400);
  }
}

export class InvalidFields extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class Unauthorized extends AppError {
  constructor(funcion: string) {
    super(`El usuario no posee permisos para la función: ${funcion}.`, 403);
  }
}

export class InvalidToken extends AppError {
  constructor() {
    super(`El token es obligatorio.`, 401);
  }
}

export class ExpiredToken extends AppError {
  constructor() {
    super(`El token del usuario expiró.`, 498);
  }
}

export class UserNotFounded extends AppError {
  constructor(value: string) {
    super(`El ${value} no fue encontrado en base de datos.`, 401);
  }
}
