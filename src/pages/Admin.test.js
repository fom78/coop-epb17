import { fireEvent, render, screen } from '@testing-library/react';
import { useConfig } from 'context/ConfigContext'
import { Admin } from './Admin';

jest.mock("context/ConfigContext");


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


describe('/src/pages/Admin.js - <Admin> - Component Renders Alternatives', () => {
  
  it("loading state", () => {
    useConfig.mockReturnValue({
      loading: true,
      config: {}
    });
    const { container } = render(<Admin />);
    expect(useConfig).toHaveBeenCalled();
    expect(container).toHaveTextContent("Loading");
  });

  it("lists all configs", () => {
    useConfig.mockReturnValue({
      loading: false,
      config
    });
    const { container } = render(<Admin />);
    const btnsEdit = screen.getAllByText('edit')

    expect(useConfig).toBeCalled();
    expect(container).toHaveTextContent("Nombre 999");
    expect(btnsEdit).toHaveLength(15);
  });

  it("Show form when click on edit button", () => {
    useConfig.mockReturnValue({
      loading: false,
      config: config
    });
    const { container } = render(<Admin />);
    
    const btn = screen.getByTestId('btnTest-0')
    fireEvent.click(btn)
    const btnEditar = screen.getByTestId('btnTestEditar')
    expect(container).toHaveTextContent("Coloque el ");
    expect(btnEditar).toBeInTheDocument()
  });

});
