import { v4 as uuidv4 } from "uuid";

export const GenCodigosTemp = (tiempo)=> {
    const codigo = uuidv4();
    const exp = Math.floor((Date.now() / 1000) + tiempo);
    const data = {
        codigo: codigo,
        exp: exp
    }
    return data
}