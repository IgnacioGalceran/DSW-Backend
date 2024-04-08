# Propuesta TP DSW

## Grupo

### Integrantes

- legajo - Apellido(s), Nombre(s)

* 00001 - Fonseca, José
* 45337 - Galcerán, Ignacio Agustín
* 00002 - Gómez, Fernando

### Repositorios

- [frontend app](https://github.com/IgnacioGalceran/DSW-Frontend)
- [backend app](https://github.com/IgnacioGalceran/DSW-Backend)

## Tema

### Descripción

Una aplicación de gestión de inventario diseñada para pequeñas empresas de distribución, que les permite administrar eficientemente sus productos, proveedores y cantidad de stock. Simplifica el seguimiento de inventario y la gestión de proveedores.

### Modelo

- [imagen del modelo](https://prnt.sc/YLzB0n9mSmZf)

### Alcance Funcional

#### Alcance Mínimo

| Req               | Detalle                                                                                             |
| :---------------- | :-------------------------------------------------------------------------------------------------- |
| CRUD simple       | 1. CRUD de Productos<br>2. CRUD de Proveedores<br>3. CRUD de Productos_Proveedores                  |
| CRUD dependiente  | 1. CRUD de Categorias {depende de} CRUD de Productos                                                |
| Listado + detalle | 1. Listado de productos con detalles completos<br> 2. Listado de proveedores con detalles completos |
| CUU/Epic          | 1. Realizar un nuevo pedido de productos<br>2. Verificar el estado de un pedido                     |

#### Adicionales para Aprobación

| Req      | Detalle                                                                                               |
| :------- | :---------------------------------------------------------------------------------------------------- |
| CRUD     | 1. CRUD de Pedidos.                                                                                   |
| CUU/Epic | 1. Generar informes de inventario<br>2. Notificar al usuario cuando el stock de un producto esté bajo |

#### Alcance Adicional Voluntario

| Req      | Detalle                                                                                                                       |
| :------- | :---------------------------------------------------------------------------------------------------------------------------- |
| Listados | 1. Historial de pedidos realizados<br>2. Informe de productos más vendidos                                                    |
| CUU/Epic | 1. Procesar devoluciones de productos<br>2. Integración de pagos para realizar pedidos directamente desde la aplicación       |
| Otros    | 1. Generar códigos de barras para los productos<br>2. Escanear códigos de barras para realizar entradas/salidas de inventario |
