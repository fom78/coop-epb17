
import Questions from 'components/Questions'
import { useUser } from 'context/UserContext';
export function Faq() {
 const {user} = useUser()
  console.log('roles de usuario');
  console.table(user);

  return (
      <Questions />
  )
}
