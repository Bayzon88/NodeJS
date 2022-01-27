const fs = require("fs");
class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }
  save(objectToAdd) {
    try {
      const data = fs.readFileSync(this.archivo, "utf-8");
    } catch (error) {
      //check si existe archivo
      fs.writeFileSync(this.archivo, "", "utf-8");
    } finally {
      try {
        let objeto = [];
        if (this.getAll() == "") {
          //agregar id al objeto
          const objetoTemp = { ...objectToAdd, id: "1" };
          this.writeTextFile(objeto, objetoTemp);
        } else {
          objeto = JSON.parse(this.getAll());

          const objetoTemp = { ...objectToAdd, id: objeto.length + 1 };
          this.writeTextFile(objeto, objetoTemp);
        }
      } catch (error) {
        throw new Error("Ocurrio un error: " + error);
      }
    }
  }

  getAll() {
    try {
      const data = fs.readFileSync(this.archivo, "utf-8");
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  getById(idNumber) {
    try {
      const objeto = JSON.parse(this.getAll());
      for (let objetos of objeto) {
        if (objetos.id == idNumber) {
          return objetos;
        }
      }
    } catch (error) {
      if (error instanceof TypeError) {
        return "TypeError";
      } else if (error instanceof SyntaxError) {
        return "No hay objetos registrados con ese ID";
      } else {
        return console.log(error);
      }
    }
  }
  deleteById(idNumber) {
    const objeto = JSON.parse(this.getAll());

    const newObjeto = objeto.filter((objetos) => objetos.id != idNumber);
    fs.writeFileSync(this.archivo, JSON.stringify(newObjeto), "utf-8");
  }
  deleteAll() {
    fs.writeFileSync(this.archivo, "", "utf-8");
  }
  writeTextFile(objeto, objetoTemp) {
    objeto.push(objetoTemp);
    fs.writeFileSync(this.archivo, JSON.stringify(objeto), "utf-8");
  }
}

const contenedor = new Contenedor("archivo.txt");

contenedor.save({ nombre: "alvaro", apellido: "beltran" });
contenedor.save({ nombre: "andres", apellido: "beltran" });
contenedor.save({ nombre: "katya", apellido: "meneses" });
console.log(contenedor.getById(3)); // { nombre: "katya", apellido: "meneses" }
console.log(contenedor.getById(7)); // { nombre: "katya", apellido: "meneses" }
// contenedor.deleteById(3);
// contenedor.deleteById(4);
// contenedor.deleteById(5);
console.log(contenedor.getAll());
// contenedor.deleteAll();
