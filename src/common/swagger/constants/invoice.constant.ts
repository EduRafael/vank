export const DocControllers = {
  created: {
    desc: 'Permite la creación de nuevos invoices, validando que no se generen duplicados a través del InvoiceID',
    isParams: false,
  },
  health: {
    desc: 'Permite verificar que pueda acceder al recursos usuario a través de los endpoint presentados',
    isParams: false,
  },
  find: {
    desc: `Permite realizar busquedas a través de los filtros **vendorId** del tipo numerico o 
          **invoiceDate** del tipo fecha, con formato **DD-MMM-YY**; ademas de eso permite indicar el formato de moneda que desea utilizar,
          de no indicarlo, se tomará como referencia la moneda del usuario al cual pertenezca el token`,
  },
};
