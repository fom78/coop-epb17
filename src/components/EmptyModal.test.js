import { render, screen } from '@testing-library/react';
import EmptyModal from './EmptyModal';
import * as AppContext from 'context/UserContext';

describe('/src/components/EmptyModal.js - <EmptyModal> - Component Renders Alternatives', () => {
  beforeEach(() => {

    const user = { "id": "62731fae-f2a1-4c85-bfd6-cc8a753d5b5c", "aud": "authenticated", "role": "authenticated", "email": "primaria17campana@abc.gob.ar", "email_confirmed_at": "2022-04-15T17:39:30.936926Z", "phone": "", "confirmed_at": "2022-04-15T17:39:30.936926Z", "last_sign_in_at": "2022-04-17T10:11:08.512662349Z", "app_metadata": { "provider": "email", "providers": ["email"] }, "user_metadata": {}, "identities": [{ "id": "62731fae-f2a1-4c85-bfd6-cc8a753d5b5c", "user_id": "62731fae-f2a1-4c85-bfd6-cc8a753d5b5c", "identity_data": { "sub": "62731fae-f2a1-4c85-bfd6-cc8a753d5b5c" }, "provider": "email", "last_sign_in_at": "2022-04-15T17:39:30.934393Z", "created_at": "2022-04-15T17:39:30.934442Z", "updated_at": "2022-04-15T17:39:30.934446Z" }], "created_at": "2022-04-15T17:39:30.927295Z", "updated_at": "2022-04-17T10:11:08.514331Z", "isLogged": true, "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjUwNzk1MDY4LCJzdWIiOiI2MjczMWZhZS1mMmExLTRjODUtYmZkNi1jYzhhNzUzZDViNWMiLCJlbWFpbCI6InByaW1hcmlhMTdjYW1wYW5hQGFiYy5nb2IuYXIiLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7fSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQifQ.K_9sMI6K1ghTclt-5kc56r3Y0Rn2QiaIk9pllkA1ieQ", "rol": "admin" }

    jest.spyOn(AppContext, 'useUser')
      .mockImplementation(() => user)
  })

  it('Modal Close: does renders default text button', () => {
    render(<EmptyModal />)
    expect(screen.getByText('Mostrar')).toBeInTheDocument()
  })

  it('Modal Close: does renders text passed', () => {
    render(<EmptyModal buttonText='Nuevo Socio'/>)
    expect(screen.getByText('Nuevo Socio')).toBeInTheDocument()
  })


  // it('open modal if button is clicked', () => {

  //   const { setActualModalOpen } = AppContext.useUser()
  //   const openFn = jest.fn();
  //   const root = document.createElement('div');

  //   render(
  //     <EmptyModal >
  //       {root}
  //     </EmptyModal>,
  //   );
  //   const btnModal = screen.getByRole('button')

  //   const evt = new MouseEvent('click', { bubbles: true });

  //   btnModal.dispatchEvent(evt);
  //   expect(root).toBeInTheDocument()
  // });

  // it('closes modal if document is clicked', () => {

  //   const closeFn = jest.fn();
  //   const root = document.createElement('div');
  //   render(
  //       <EmptyModal >
  //           {root}
  //       </EmptyModal>,
  //       root
  //   );
  //   const evt = new MouseEvent('click', { bubbles: true });
  //   document.dispatchEvent(evt);
  //   expect(root).not.toBeInTheDocument()
  // });

});
