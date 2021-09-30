'use strict';
let imputNombre = $(`#nombre`);
let imputApellido = $(`#apellido`);
let imputDni = $(`#dni`);
let imputAsiento = $(`#asiento`);
let btnEnviar = $(`#btnEnviar`);
let btnReservar = $(`#btnReservar`);
let btnLiberar = $(`#btnLiberar`);
let btnBuscar = $(`#btnBuscar`);
let btnCancelar = $(`#btnCancelar`);
let btnCancelarListar = $(`#btnCancelarListar`);

class Aplications

{
    constructor()
    {
        this.opcion = $(`#opcion`);
        this.selecAsientos = $(`#selecAsientos`);
        this.secMenu = $(`#secMenu`);
        this.secAsientosInfo = $(`#secAsientosInfo`);
        this.secListar = $(`#secListar`);
        this.enfocar();
    }
    
    enfocar()
    {
        this.opcion.val(``);
        this.opcion.focus();
    }

    comprobarOpcion()
    {
        if(this.opcion.val() == 1)
        {
            this.secMenu.addClass(`oculto`);
            this.secAsientosInfo.removeClass(`oculto`);
            this.selecAsientos.removeClass(`oculto`);
            imputDni.removeAttr(`disabled`);
            imputNombre.removeAttr(`disabled`);
            imputApellido.removeAttr(`disabled`);
            btnReservar.removeClass(`oculto`);
            btnLiberar.addClass(`oculto`);
            btnBuscar.addClass(`oculto`);
        }
        else if(this.opcion.val() == 2)
        {
            this.secMenu.addClass(`oculto`);
            this.secAsientosInfo.removeClass(`oculto`);
            this.selecAsientos.removeClass(`oculto`);
            imputDni.attr(`disabled`, true);
            imputNombre.attr(`disabled`, true);
            imputApellido.attr(`disabled`, true);
            btnReservar.addClass(`oculto`);
            btnLiberar.removeClass(`oculto`);
            btnBuscar.addClass(`oculto`);
        }
        else if(this.opcion.val() == 3)
        {
            this.secMenu.addClass(`oculto`);
            this.secAsientosInfo.removeClass(`oculto`);
            this.selecAsientos.addClass(`oculto`);
            imputDni.removeAttr(`disabled`);
            imputDni.focus();
            imputNombre.attr(`disabled`, true);
            imputApellido.attr(`disabled`, true);
            btnReservar.addClass(`oculto`);
            btnLiberar.addClass(`oculto`);
            btnBuscar.removeClass(`oculto`);
        }
        else if(this.opcion.val() == 4)
        {
            this.secMenu.addClass(`oculto`);
            this.secAsientosInfo.addClass(`oculto`);
            this.secListar.removeClass(`oculto`);
            emptyChair.listar();
        }
        else
        {
            alert(`Opcion incorrecta. Vuelva a ingresar`); // mensaje de alerta y validacion de la opcion que se
            this.enfocar();
        }
    }
}

class Pasajero
{
    constructor(nombre, apellido, dni, asiento)
    {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.asiento = asiento;   
    }

    mostrar()
    {
        if(this.nombre != undefined)
        {
            imputNombre.val(this.nombre);
            imputApellido.val(this.apellido);
            imputDni.val(this.dni);
            imputAsiento.val(this.asiento);
        }
        else
        {
            this.limpiarTodo(false);
        }
    }
    limpiarTodo(todo)
    {
        imputNombre.val(``);
        imputApellido.val(``);
        imputDni.val(``);
        if(todo)
        {
            imputAsiento.val(``);
        }
    }
}

class emptyStadium
{
    constructor()
    {
        this.contenedorListar = $(`#contenedorListar`);
        this.tablero = $(`#tablero`);
        this.pasajeros = [];
        this.numAsiento = 0;
        this.crearCeldas(10);
        this.celdas = $(`td`);
        for(let i = 0; i < this.celdas.length; i++)
        {
            this.pasajeros[i] = new Pasajero(undefined, undefined, undefined, undefined);
        }
    }
    redireccionar(event)
    {
        this.numAsiento = (event.target.textContent);
        imputAsiento.val(this.numAsiento);
        this.pasajeros[this.numAsiento - 1].mostrar();
        imputDni.focus();
    }
    reservar()
    {
        if(imputAsiento.val() != `` && imputNombre.val() != `` && imputApellido.val() != `` && imputDni.val() != ``)
        {
            this.pasajeros[this.numAsiento - 1] = new Pasajero(imputNombre.val(), imputApellido.val(), imputDni.val(), this.numAsiento);
            this.pasajeros[0].limpiarTodo(true);
            for(let i in this.celdas)
            {
                if(this.celdas[i].textContent == this.numAsiento)
                {
                    this.celdas[i].classList.add(`pintar`);
                    break;
                }
            }
        }
        else
        {
            alert(`Faltan datos`);
            imputNombre.focus();
        }
    }
    liberar()
    {
        if(this.pasajeros[this.numAsiento - 1].nombre != undefined)
        {
            this.pasajeros[this.numAsiento - 1] = new Pasajero(undefined, undefined, undefined, undefined);
            this.pasajeros[0].limpiarTodo(true);
        }
        for(let i in this.celdas)
        {
            if(this.celdas[i].textContent == this.numAsiento)
            {
                this.celdas[i].classList.remove(`pintar`);
                break;
            }
        }
    }
    buscar()
    {
        for(let i in this.pasajeros)
        {
            if(imputDni.val() == this.pasajeros[i].dni)
            {
                this.pasajeros[i].mostrar();
                break;
            }
            else
            {
                if(i == this.pasajeros.length - 1)
                {
                    this.pasajeros[0].limpiarTodo(true);
                    alert(`No se encontro el DNI`);
                }
            }
        }
        imputDni.focus();
    }
    listar()
    {
        let contenedor = ``;
        for(let i in this.pasajeros)
        {
            if(this.pasajeros[i].nombre != undefined)
            {
                contenedor += `<h4><b>Nombre:</b> ${this.pasajeros[i].nombre}</h4>`;
                contenedor += `<h4><b>Apellido:</b> ${this.pasajeros[i].apellido}</h4>`;
                contenedor += `<h4><b>DNI:</b> ${this.pasajeros[i].dni}</h4>`;
                contenedor += `<h4><b>Asiento:</b> ${this.pasajeros[i].asiento}</h4></br>`;
            }
        }
        this.contenedorListar.html(contenedor);
    }
    crearCeldas(total)
    {
        let numFilas = total/5;
        let numColum = total/2;
        this.tablero.empty();
        for(let i = 0; i < numFilas; i++)
        {
            let fila = $(`<tr>`);
            for(let j = 0; j < numColum; j++)
            {
                let columna = $(`<td>`);
                columna.id = `${i}${j}`;
                columna.text(i * numColum + j + 1);
                columna.addClass(`btn`);
                columna.addClass(`btn-default`);
                columna.click((event) => this.redireccionar(event));
                fila.append(columna);
            }
            this.tablero.append(fila);
        }
    }
}

let emptyChair = new emptyStadium();
let apli = new Aplications();

btnEnviar.click(function(e)
{
    e.preventDefault();
    apli.comprobarOpcion();
});

btnReservar.click(function(e)
{
    e.preventDefault();
    emptyChair.reservar();
    setTimeout(function()
    {
        apli.secMenu.removeClass(`oculto`);
        apli.secAsientosInfo.addClass(`oculto`);
        apli.enfocar();
    }, 500);
});

btnLiberar.click(function(e)
{
    e.preventDefault();
    emptyChair.liberar();
    setTimeout(function()
    {
        apli.secMenu.removeClass(`oculto`);
        apli.secAsientosInfo.addClass(`oculto`);
        apli.enfocar();
    }, 500);
});

btnBuscar.click(function(e)
{
    e.preventDefault();
    emptyChair.buscar();
});

btnCancelar.click(function(e)
{
    e.preventDefault();
    apli.secMenu.removeClass(`oculto`);
    apli.secAsientosInfo.addClass(`oculto`);
    apli.enfocar();
});

btnCancelarListar.click(function(e)
{
    btnCancelar.click();
    apli.secListar.addClass(`oculto`);
});