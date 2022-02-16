class CatMarca {
  constructor() {
    this.id = null;
    this.co_empresa = null;
    this.genero = null;
    this.modifico = null;
    this.fecha_genero = null;
    this.fecha_modifico = null;
    this.descripcion = "";
    this.nombre = "";
    this.eliminado = null;
  }
  setId(id) {
    this.id = id;
    return this;
  }
  setCoEmpresa(coEmpresa) {
    this.co_empresa = coEmpresa;
    return this;
  }
  setGenero(genero) {
    this.genero = genero;
    return this;
  }
  setModifico(modifico) {
    this.modifico = modifico;
    return this;
  }
  setFechaGenero(fechaGenero) {
    this.fecha_genero = fechaGenero;
    return this;
  }
  setFechaModifico(fechaModifico) {
    this.fecha_modifico = fechaModifico;
    return this;
  }
  setDescripcion(descripcion) {
    this.descripcion = descripcion;
    return this;
  }
  setNombre(nombre) {
    this.nombre = nombre;
    return this;
  }
  setEliminado(eliminado) {
    this.eliminado = eliminado;
    return this;
  }
  build() {
    return {
      id: this.id,
      co_empresa: this.co_empresa,
      genero: this.genero,
      modifico: this.modifico,
      fecha_genero: this.fecha_genero,
      fecha_modifico: this.fecha_modifico,
      descripcion: this.descripcion,
      nombre: this.nombre,
      eliminado: this.eliminado
    };
  }
}
