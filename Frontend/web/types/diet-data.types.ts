export interface DietData {
  nome: string;
  idade: number;
  peso_kg: number;
  altura_cm: number;
  sexo: "masculino" | "feminino";
  nivel_atividade: "sedentario" | "2x_semana" | "4x_semana";
  objetivo: "perda_de_peso" | "hipertrofia" | "manter_massa_muscular";
}
