import Transaccion from "./Transaccion"
import usuarios from "../utils/usuarios.json"
import { useUser } from "../utils/UserContext"
/*
const fetchUser = async () => {
    const res = await fetch('../utils/usuarios.json')
    const data = await res.json()
    // The return value is not serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
      // This will activate the closest error.js Error Boundary
      throw new Error('Failed to fetch data')
    }
    console.log(typeof res)

    return data
}
*/

const HomeTransaccion =  () => {

  return (
    <Transaccion/>
  )
}

export default HomeTransaccion
