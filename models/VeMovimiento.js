class VeMovimiento {
  constructor() {
    this.id = null;
    this.co_empresa = null;
    this.co_sucursal = null;
    this.cat_tipo_movimiento = null;
    this.cat_articulo = null;
    this.genero = null;
    this.modifico = null;
    this.cantidad_anterior = null;
    this.fecha_genero = null;
    this.cantidad = null;
    this.cantidad_posterior = null;
    this.eliminado = null;
    this.fecha_modifico = null;
  }
  setId(id) {
    this.id = id;
    return this;
  }
  setCoEmpresa(coEmpresa) {
    this.co_empresa = coEmpresa;
    return this;
  }
  setCoSucursal(coSucursal) {
    this.co_sucursal = coSucursal;
    return this;
  }
  setCatTipoMovimiento(catTipoMovimiento) {
    this.cat_tipo_movimiento = catTipoMovimiento;
    return this;
  }
  setCatArticulo(catArticulo) {
    this.cat_articulo = catArticulo;
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
  setCantidadAnterior(cantidadAnterior) {
    this.cantidad_anterior = cantidadAnterior;
    return this;
  }
  setFechaGenero(fechaGenero) {
    this.fecha_genero = fechaGenero;
    return this;
  }
  setCantidad(cantidad) {
    this.cantidad = cantidad;
    return this;
  }
  setCantidadPosterior(cantidadPosterior) {
    this.cantidad_posterior = cantidadPosterior;
    return this;
  }
  setEliminado(eliminado) {
    this.eliminado = eliminado;
    return this;
  }
  setFechaModifico(fechaModifico) {
    this.fecha_modifico = fechaModifico;
    return this;
  }
  build() {
    return {
      id: this.id,
      co_empresa: this.co_empresa,
      co_sucursal: this.co_sucursal,
      cat_tipo_movimiento: this.cat_tipo_movimiento,
      cat_articulo: this.cat_articulo,
      genero: this.genero,
      modifico: this.modifico,
      cantidad_anterior: this.cantidad_anterior,
      fecha_genero: this.fecha_genero,
      cantidad: this.cantidad,
      cantidad_posterior: this.cantidad_posterior,
      eliminado: this.eliminado,
      fecha_modifico: this.fecha_modifico
    };
  }
}
