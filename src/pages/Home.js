import { useUser } from "context/UserContext";

export function Home() {
  const { user } = useUser()
  return (
    <div>
      <p>hola feo</p>
      {user && user.email}
    </div>
  )
}
