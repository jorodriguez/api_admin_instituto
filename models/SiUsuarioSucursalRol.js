class SiUsuarioSucursalRol {
  
  constructor() {
    this.id = null;    
    this.si_usuario = null;
    this.si_rol = null;
    this.co_sucursal = null;
    this.co_empresa = null;
    this.genero = null;
    this.modifico = null;
    this.fecha_genero = null;
    this.fecha_modifico = null;       
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
  setSiUsuario(siUsuario) {
    this.si_usuario = siUsuario;
    return this;
  }
  setCoSucursal(coSucursal) {
    this.co_sucursal = coSucursal;
    return this;
  }
  setEliminado(eliminado) {
    this.eliminado = eliminado;
    return this;
  }
  build() {
    return {      
      co_empresa: this.co_empresa,
      co_sucursal:this.co_sucursal,
      si_usuario: this.si_usuario,
      genero: this.genero,      
      fecha_genero: this.fecha_genero      
    };
  }  
  buildForUpdate() {
    return {                  
      modifico: this.modifico,      
      fecha_modifico: this.fecha_modifico,      
      eliminado:this.eliminado
    };
  }
}


module.exports = SiUsuarioSucursalRol;