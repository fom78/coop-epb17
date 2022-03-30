import { useUser } from "context/UserContext";

export function Home() {
  const { user } = useUser()
  console.log(user);
  return (
    <div>
      <p>hola feo</p>
      {user && user.email}
    </div>
  )
}
