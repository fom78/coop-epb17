import { render, screen } from '@testing-library/react';
// import * as AppContext from "context/ConfigContext";
import { useConfig } from 'context/ConfigContext'
import { Admin } from './Admin';

jest.mock('../context/ConfigContext')

describe('/src/pages/Admin.js - <Admin> - Component Renders Alternatives', () => {
  beforeEach(() => {

    const config = {
      "periodo_actual": "2022",
      "valor_cuota_mensual": "100",
      "valor_cuota_anual": "700",
      "nombre_cooperadora": "Escuela Test Nro 99",
      "valor_emergencias": "600",
      "periodos": [
          "2020",
          "2021",
          "2022",
          "2023"
      ],
      "ultimo_update": "1650033129581",
      "direccion": "Calle Nombre 999 - Ciudad - Buenos Aires",
      "facebook": "https://m.facebook.com/colocarface/",
      "direccion_google_maps": "https://goo.gl/maps/7EKr4yHwh5iFAwU28",
      "telefono_texto": "999-999-9999",
      "telefono_link": "999-999-9998",
      "fecha_inicio_clases": "lunes 2 de marzo de 2022",
      "hora_inicio_manana": "4",
      "hora_inicio_tarde": "13"
  }
  useConfig.mockImplementation(() => config)
    // jest.spyOn(AppContext, 'useConfig')
    //   .mockImplementation(() => config)

    // AppContext.useConfig.mockImplementation(() => config)
  })

  it('Modal Close: does renders default text button', () => {
    render(<Admin />)
    expect(screen.getByText('Configuraciones del Sistema')).toBeInTheDocument()
  })

  // it('Modal Close: does renders text passed', () => {
  //   render(<EmptyModal buttonText='Nuevo Socio'/>)
  //   expect(screen.getByText('Nuevo Socio')).toBeInTheDocument()
  // })



});
