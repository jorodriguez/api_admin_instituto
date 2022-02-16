class CatArticulo {
  constructor() {
    this.id = null;
    this.co_empresa = null;
    this.co_sucursal = null;
    this.cat_marca = null;
    this.genero = null;
    this.modifico = null;
    this.precio = null;
    this.nombre = "";
    this.costo_base = null;
    this.descripcion = "";
    this.fecha_genero = null;
    this.nota_interna = "";
    this.cantidad_existencia = null;
    this.eliminado = null;
    this.stock_minimo = null;
    this.foto = "";
    this.codigo = "";
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
  setCatMarca(catMarca) {
    this.cat_marca = catMarca;
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
  setPrecio(precio) {
    this.precio = precio;
    return this;
  }
  setNombre(nombre) {
    this.nombre = nombre;
    return this;
  }
  setCostoBase(costoBase) {
    this.costo_base = costoBase;
    return this;
  }
  setDescripcion(descripcion) {
    this.descripcion = descripcion;
    return this;
  }
  setFechaGenero(fechaGenero) {
    this.fecha_genero = fechaGenero;
    return this;
  }
  setNotaInterna(notaInterna) {
    this.nota_interna = notaInterna;
    return this;
  }
  setCantidadExistencia(cantidadExistencia) {
    this.cantidad_existencia = cantidadExistencia;
    return this;
  }
  setEliminado(eliminado) {
    this.eliminado = eliminado;
    return this;
  }
  setStockMinimo(stockMinimo) {
    this.stock_minimo = stockMinimo;
    return this;
  }
  setFoto(foto) {
    this.foto = foto;
    return this;
  }
  setCodigo(codigo) {
    this.codigo = codigo;
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
      cat_marca: this.cat_marca,
      genero: this.genero,
      modifico: this.modifico,
      precio: this.precio,
      nombre: this.nombre,
      costo_base: this.costo_base,
      descripcion: this.descripcion,
      fecha_genero: this.fecha_genero,
      nota_interna: this.nota_interna,
      cantidad_existencia: this.cantidad_existencia,
      eliminado: this.eliminado,
      stock_minimo: this.stock_minimo,
      foto: this.foto,
      codigo: this.codigo,
      fecha_modifico: this.fecha_modifico
    };
  }
}
