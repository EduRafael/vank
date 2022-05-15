export const DocControllers = {
  created: {
    desc: 'Permite la creación de nuevos usuarios. Validando la existencia del mismo a través de su email.',
    isParams: false,
  },
  updated: {
    ParamName: 'userId',
    desc: 'Permite actualizar el Id tributario y el tipo de moneda asociado al usuario, a partir de su ID',
    type: 'string',
    example: '1',
    isParams: true,
  },
  health: {
    desc: 'Permite verificar que pueda acceder al recursos usuario a través de los endpoint presentados',
    isParams: false,
  },
};
