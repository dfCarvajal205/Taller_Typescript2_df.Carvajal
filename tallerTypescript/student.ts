export class Student {
    name : string;
    codigo: string;
    cedula: string;
    edad: number;
    direccion: string;
    telefono: string;
  
    constructor(nombre: string, codigo: string, cedula: string, edad: number, direccion: string, telefono: string) {
      this.name = nombre;
      this.codigo = codigo;
      this.cedula = cedula;
      this.edad = edad;
      this.telefono = telefono;
      this.direccion = direccion;
    }
  }