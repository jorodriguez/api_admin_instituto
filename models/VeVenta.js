class VeVenta {
  constructor() {
    this.id = null;
    this.co_empresa = null;
    this.co_sucursal = null;
    this.cat_cliente = null;
    this.genero = null;
    this.modifico = null;
    this.nota_venta = "";
    this.cambio = null;
    this.fecha_genero = null;
    this.folio = "";
    this.fecha_modifico = null;
    this.total = null;
    this.fecha = null;
    this.eliminado = null;
    this.cantidad_articulos = null;
    this.recibido = null;
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
  setCatCliente(catCliente) {
    this.cat_cliente = catCliente;
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
  setNotaVenta(notaVenta) {
    this.nota_venta = notaVenta;
    return this;
  }
  setCambio(cambio) {
    this.cambio = cambio;
    return this;
  }
  setFechaGenero(fechaGenero) {
    this.fecha_genero = fechaGenero;
    return this;
  }
  setFolio(folio) {
    this.folio = folio;
    return this;
  }
  setFechaModifico(fechaModifico) {
    this.fecha_modifico = fechaModifico;
    return this;
  }
  setTotal(total) {
    this.total = total;
    return this;
  }
  setFecha(fecha) {
    this.fecha = fecha;
    return this;
  }
  setEliminado(eliminado) {
    this.eliminado = eliminado;
    return this;
  }
  setCantidadArticulos(cantidadArticulos) {
    this.cantidad_articulos = cantidadArticulos;
    return this;
  }
  setRecibido(recibido) {
    this.recibido = recibido;
    return this;
  }
  build() {
    return {
      id: this.id,
      co_empresa: this.co_empresa,
      co_sucursal: this.co_sucursal,
      cat_cliente: this.cat_cliente,
      genero: this.genero,
      modifico: this.modifico,
      nota_venta: this.nota_venta,
      cambio: this.cambio,
      fecha_genero: this.fecha_genero,
      folio: this.folio,
      fecha_modifico: this.fecha_modifico,
      total: this.total,
      fecha: this.fecha,
      eliminado: this.eliminado,
      cantidad_articulos: this.cantidad_articulos,
      recibido: this.recibido
    };
  }
}
