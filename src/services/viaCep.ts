import { ViaCepResponse } from "../interfaces/viaCepResponse";

export const getAdress = async (cep: string): Promise<ViaCepResponse> => {
  const reponse = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const data = await reponse.json();

  return data
}
