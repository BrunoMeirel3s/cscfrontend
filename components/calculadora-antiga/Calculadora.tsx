"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useFormik } from "formik";
import { MultasJurisCalc, ValoresJurisCalc } from "@/types";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { format, toDate } from "date-fns";

import { InputNumber } from "primereact/inputnumber";

const Calculadora = () => {
  const [dataFinalCalculo, setDataFinalCalculo] = useState("");
  const [numeroProcesso, setNumeroProcesso] = useState("");
  const [credor, setCredor] = useState("");
  const [devedor, setDevedor] = useState("");
  const [indiceAtualizacaoMontaria, setIndiceAtualizacaoMonetaria] =
    useState("");
  const [valores, setValores] = useState<ValoresJurisCalc[]>([]);
  const [multas, setMultas] = useState<MultasJurisCalc[]>([]);
  const [honorarios, setHonorarios] = useState([
    { percentual: 0, descricao: "" },
  ]);
  const [consectarios, setConsectarios] = useState([
    { percentual: 0, descricao: "" },
  ]);
  const [custas, setCustas] = useState([{ valor: 0, data: "", descricao: "" }]);
  const [resultado, setResultado] = useState(0);
  const [tipoJuros, setTipoJuros] = useState<string>("jurosLegais");
  const [jurosIncidentes, setJurosIncidentes] = useState<string>("dataFixa");
  const [dataInicioJuros, setDataInicioJuros] = useState("");
  const [dataFimJuros, setDataFimJuros] = useState("");
  const [porcentagemJuros, setPorcentagemJuros] = useState(0);
  const [tipoMulta, setTipoMulta] = useState("percentual");
  const [porcentagemMulta, setPorcentagemMulta] = useState(0);
  const [valorMulta, setValorMulta] = useState(0);
  const [descricaoMulta, setDescricaoMulta] = useState("");

  const calcularValorCorrigido = (
    valorOriginal: number,
    indice: number
  ): number => {
    // Simulação do cálculo de correção monetária.
    // Em um cenário real, você buscaria os índices correspondentes ao período
    // e aplicaria a fórmula de correção.
    return valorOriginal * (1 + indice / 100);
  };

  const calcularJuros = (
    valorBase: number,
    tipo: string,
    percentual: number,
    dataInicio: Date | null,
    dataFim: Date | null
  ): number => {
    if (tipo === "semJuros") {
      return 0;
    }

    // Simulação do cálculo de juros simples.
    // Em um cenário real, você consideraria o período e a forma de capitalização.
    const dias =
      dataFim && dataInicio
        ? Math.ceil(
            (dataFim.getTime() - dataInicio.getTime()) / (1000 * 3600 * 24)
          )
        : 0;
    const taxaDiaria = percentual / 100 / 30; // Aproximação para taxa mensal

    return tipo === "percentualFixo" ? valorBase * taxaDiaria * dias : 0;
  };

  const calcularMulta = (
    valorBase: number,
    tipo: string,
    percentual: number,
    valorMonetario: number
  ): number => {
    return tipo === "percentual" ? valorBase * (percentual / 100) : valorMonetario;
  };

  const calcular = () => {
    let valorTotalCorrigido = 0;

    valores.forEach((valor) => {
      // Simulação de busca do índice para a data do valor.
      let indiceAplicavel = 5; // Exemplo de índice de 5%

      if(indiceAtualizacaoMontaria === "inpcIpca") {
        if(new Date(valor.dataValor) > new Date("2024-09-01")) {
          indiceAplicavel = 3; // Exemplo de índice de 3% para INPC
        }
      }
      const valorCorrigido = calcularValorCorrigido(valor.valor, indiceAplicavel);

      let juros = 0;
      if (tipoJuros !== "semJuros") {

        /**
          juros = calcularJuros(
          valorCorrigido,
          tipoJuros,
          porcentagemJuros,
          dataInicioJuros,
          dataFimJuros
        );


         */
       
      }

      let multaTotal = 0;
      multas.forEach((multa) => {

        /*
         multaTotal += calcularMulta(
          valorCorrigido,
          tipoMultaSelecionada,
          multa.porcentagem ?? 0,
          multa.valor ?? 0
        );
        */
       
      });

      valorTotalCorrigido += valorCorrigido + juros + multaTotal;
    });

    /*
    
    setResultadoFinal(valorTotalCorrigido);
    
    */

  };

  const formValoresSchema = yup.object().shape({
    id: yup.string(),
    valor: yup
      .number()
      .required("Campo obrigatório")
      .min(0, "Valor deve ser maior que zero"),
    dataValor: yup.date().required("Campo obrigatório"),
    descricaoValor: yup.string(),
  });

  const formValores = useFormik({
    initialValues: {
      id: "",
      valor: 0,
      dataValor: "",
      descricaoValor: "",
    },
    onSubmit: (values) => {
      formValores.resetForm();
      const existingValue = valores.find((valor) => valor.id == values.id);
      if (existingValue) {
        const updatedValores = valores.map((valor) =>
          valor.id == existingValue.id ? { ...valor, ...values } : valor
        );
        setValores(updatedValores);
      } else {
        setValores([
          ...valores,
          {
            id: uuidv4(),
            valor: values.valor,
            dataValor: values.dataValor,
            descricaoValor: values.descricaoValor,
          },
        ]);
      }
    },
    validationSchema: formValoresSchema,
  });

  const columnValor = (valor: ValoresJurisCalc) => {
    return <span> R$ {valor.valor.toLocaleString("pt-BR")}</span>;
  };

  const columnData = (valor: ValoresJurisCalc) => {
    const formatedDate = format(toDate(valor.dataValor), "dd/MM/yyyy");
    return <span>{formatedDate}</span>;
  };

  const removeValue = (id: string) => {
    const newValores = valores.filter((valor) => valor.id !== id);
    setValores(newValores);
  };
  const editValue = (id: string) => {
    const valorToEdit = valores.find((valor) => valor.id === id);
    formValores.setFieldValue("id", valorToEdit?.id);
    formValores.setFieldValue("valor", valorToEdit?.valor);
    formValores.setFieldValue("dataValor", valorToEdit?.dataValor);
    formValores.setFieldValue("descricaoValor", valorToEdit?.descricaoValor);
  };

  const columnAddRemoveValores = (valor: ValoresJurisCalc) => {
    return (
      <div className="flex flex-row gap-4">
        <button
          type="button"
          className="flex justify-center items-center bg-primary-main p-2 rounded"
          onClick={() => editValue(valor.id)}
        >
          <i className="pi pi-pencil text-white"></i>
        </button>
        <button
          type="button"
          className="flex justify-center items-center bg-red-600 p-2 rounded"
          onClick={() => removeValue(valor.id)}
        >
          <i className="pi pi-trash text-white"></i>
        </button>
      </div>
    );
  };
  const formMultasSchema = yup
    .object()
    .shape({
      id: yup.string(),
      valor: yup.number().nullable().min(0, "Valor deve ser maior que zero"),
      porcentagem: yup
        .number()
        .nullable()
        .min(0, "Porcentagem deve ser maior que zero"),
      descricao: yup.string(),
    })
    .test(
      "valor-ou-porcentagem",
      "Informe pelo menos o valor ou a porcentagem",
      function (value) {
        const { valor, porcentagem } = value;
        return valor != null || porcentagem != null;
      }
    );

  const formMultas = useFormik({
    initialValues: {
      id: "",
      valor: 0,
      porcentagem: 0,
      descricaoMulta: "",
    },
    onSubmit: (values) => {
      formMultas.resetForm();
      const existingValue = multas.find((valor) => valor.id == values.id);
      if (existingValue) {
        const updatedMultas = multas.map((multa) =>
          multa.id == existingValue.id ? { ...multa, ...values } : multa
        );
        setMultas(updatedMultas);
      } else {
        setMultas([
          ...multas,
          {
            id: uuidv4(),
            valor: values.valor,
            porcentagem: values.porcentagem,
            descricaoMulta: values.descricaoMulta,
          },
        ]);
      }
    },
    validationSchema: formMultasSchema,
  });

  const columnPorcentagemMulta = (multa: MultasJurisCalc) => {
    return <span>{multa.porcentagem.toLocaleString("pt-BR")} %</span>;
  };
  const columnValorMulta = (multa: MultasJurisCalc) => {
    return <span> R$ {multa.valor.toLocaleString("pt-BR")}</span>;
  };

  const removeMulta = (id: string) => {
    const newMultas = multas.filter((multa) => multa.id !== id);
    setMultas(newMultas);
  };
  const editMulta = (id: string) => {
    const multaToEdit = multas.find((multa) => multa.id === id);
    setTipoMulta(multaToEdit?.valor ? "monetaria" : "percentual");
    formMultas.setFieldValue("id", multaToEdit?.id);
    formMultas.setFieldValue("valor", multaToEdit?.valor);
    formMultas.setFieldValue("porcentagem", multaToEdit?.porcentagem);
    formMultas.setFieldValue("descricao", multaToEdit?.descricaoMulta);
  };

  const columnAddRemoveMultas = (multa: MultasJurisCalc) => {
    return (
      <div className="flex flex-row gap-4">
        <button
          type="button"
          className="flex justify-center items-center bg-primary-main p-2 rounded"
          onClick={() => editMulta(multa.id)}
        >
          <i className="pi pi-pencil text-white"></i>
        </button>
        <button
          type="button"
          className="flex justify-center items-center bg-red-600 p-2 rounded"
          onClick={() => removeMulta(multa.id)}
        >
          <i className="pi pi-trash text-white"></i>
        </button>
      </div>
    );
  };

  const handleChangeTipoMulta = (tipo: string) => {
    setTipoMulta(tipo);
    formMultas.setFieldValue("valor", 0);
    formMultas.setFieldValue("porcentagem", 0);
    formMultas.setFieldValue("descricao", "");
  };

  return (
    <div className="overflow-hidden mt-8">
      <div className="container">
        <h1 className="relative mb-7 pb-5 text-3xl font-bold text-primary-main before:absolute before:bottom-0 before:left-0 before:h-[3px] before:w-[150px] before:bg-background before:content-[''] after:absolute after:bottom-0 after:left-0 after:z-[1] after:h-[3px] after:w-[40px] after:bg-primary-main after:content-['']text-2xl font-bold mb-4">
          Cálculo de atualização monetária
        </h1>
        <div className="">
          <div className="flex justify-end mb-4">
            <Button
              type="submit"
              className="h-auto rounded-none border bg-primary-main px-7 py-[14px] text-base font-bold uppercase text-white transition-colors duration-300 ease-in hover:border-primary-main hover:bg-white hover:text-primary-main"
            >
              Calcular
            </Button>
          </div>
          <div className="flex justify-between mb-4">
            <button className="text-2xl font-bold text-primary-main">
              Configuração do cálculo
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="">
              <label
                htmlFor="dataFinal"
                className="block text-[#333] text-sm font-bold mb-2"
              >
                Data final do cálculo:
              </label>
              <Input
                type="date"
                value={dataFinalCalculo}
                onChange={(e) => setDataFinalCalculo(e.target.value)}
                className="h-12 w-full rounded-none border-DEFAULT border-[#e8e6e6] bg-white px-4 py-2 font-bold text-background placeholder:text-base placeholder:font-normal placeholder:text-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <p className="text-xs text-gray-500 mt-1">
                Deixe em branco para calcular até a data de hoje.
              </p>
            </div>
            <div className="">
              <label
                htmlFor="processo"
                className="block text-[#333] text-sm font-bold mb-2"
              >
                Processo:
              </label>
              <Input
                placeholder="Número do processo (opcional)"
                value={numeroProcesso}
                onChange={(e) => setNumeroProcesso(e.target.value)}
                className="h-12 w-full rounded-none border-DEFAULT border-[#e8e6e6] bg-white px-4 py-2 font-bold text-background placeholder:text-base placeholder:font-normal placeholder:text-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <div>
              <label
                htmlFor="credor"
                className="block text-[#333] text-sm font-bold mb-2"
              >
                Credor:
              </label>
              <Input
                placeholder="Credor (opcional)"
                className="h-12 w-full rounded-none border-DEFAULT border-[#e8e6e6] bg-white px-4 py-2 font-bold text-background placeholder:text-base placeholder:font-normal placeholder:text-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <div>
              <label
                htmlFor="devedor"
                className="block text-[#333] text-sm font-bold mb-2"
              >
                Devedor:
              </label>

              <Input
                placeholder="Devedor (opcional)"
                className="h-12 w-full rounded-none border-DEFAULT border-[#e8e6e6] bg-white px-4 py-2 font-bold text-background placeholder:text-base placeholder:font-normal placeholder:text-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="indice"
              className="block text-[#333] text-sm font-bold mb-2"
            >
              Índice de atualização monetária:
            </label>
            <Select
              onValueChange={(e) => setIndiceAtualizacaoMonetaria(e)}
              defaultValue={"inpcIpca"}
              value={indiceAtualizacaoMontaria}
            >
              <SelectTrigger className="h-12 w-full rounded-none border-DEFAULT border-[#e8e6e6] bg-white px-4 py-2 text-base text-background placeholder:font-normal placeholder:text-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                <SelectValue
                  placeholder="Índice de atualização monetária"
                  className="font-normal"
                />
              </SelectTrigger>
              <SelectContent className="bg-white pointer">
                <SelectItem value="inpcIpca">
                  Índices oficiais TJDFT (INPC até 31/08/2024, IPCA a partir de
                  01/09/2024)
                </SelectItem>
                <SelectItem value="inpc">
                  INPC durante todo o período
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <form onSubmit={formValores.handleSubmit}>
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-primary-main pb-2">
                Valores
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="hidden">
                  <Input
                    type="text"
                    id="id"
                    name="id"
                    value={formValores.values.id}
                    onChange={formValores.handleChange}
                    className="hidden"
                  />
                </div>
                <div>
                  <label
                    htmlFor="devedor"
                    className="block text-[#333] text-sm font-bold mb-2"
                  >
                    Valor:
                  </label>
                  <InputNumber
                    id="valor"
                    name="valor"
                    value={formValores.values.valor}
                    onValueChange={(e) => {
                      formValores.setFieldValue("valor", e.value);
                    }}
                    placeholder="R$"
                    locale="pt-BR"
                    minFractionDigits={2}
                    mode="currency"
                    currency="BRL"
                    className="custom-inputnumber h-12 w-full rounded-none border-DEFAULT border-[#e8e6e6] bg-white px-4 py-2 font-normal text-background placeholder:text-base placeholder:font-normal placeholder:text-background !focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border"
                  />
                </div>
                <div>
                  <label
                    htmlFor="devedor"
                    className="block text-[#333] text-sm font-bold mb-2"
                  >
                    Data do valor:
                  </label>
                  <Input
                    type="date"
                    id="dataValor"
                    name="dataValor"
                    onChange={formValores.handleChange}
                    value={formValores.values.dataValor}
                    className="h-12 w-full rounded-none border-DEFAULT border-[#e8e6e6] bg-white px-4 py-2 font-bold text-background placeholder:text-base placeholder:font-normal placeholder:text-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
                <div>
                  <label
                    htmlFor="devedor"
                    className="block text-[#333] text-sm font-bold mb-2"
                  >
                    Descrição:
                  </label>
                  <Input
                    type="text"
                    id="descricaoValor"
                    name="descricaoValor"
                    onChange={formValores.handleChange}
                    value={formValores.values.descricaoValor}
                    placeholder="Descrição (opcional)"
                    className="h-12 w-full rounded-none border-DEFAULT border-[#e8e6e6] bg-white px-4 py-2 font-bold text-background placeholder:text-base placeholder:font-normal placeholder:text-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
                <div className="flex justify-start items-end">
                  <Button
                    type="submit"
                    className="rounded-none border h-12 bg-primary-main px-7 py-[14px] text-base font-bold uppercase text-white transition-colors duration-300 ease-in hover:border-primary-main hover:bg-white hover:text-primary-main"
                  >
                    {formValores.values.id ? (
                      <span className="flex flex-row justify-center items-center gap-2">
                        <i className="pi pi-pencil text-sm"></i>
                        <span>Editar valor</span>
                      </span>
                    ) : (
                      <span className="flex flex-row justify-center items-center gap-2">
                        <i className="pi pi-plus text-sm"></i>
                        <span>Adicionar Valor</span>
                      </span>
                    )}
                  </Button>
                </div>
              </div>
              {valores && valores.length >= 1 && (
                <DataTable value={valores} className="w-full mt-8" stripedRows>
                  <Column
                    header="Valor"
                    body={(rowData) => columnValor(rowData)}
                  />
                  <Column
                    header="Data"
                    body={(rowData) => columnData(rowData)}
                  />
                  <Column field="descricaoValor" header="Descrição" />
                  <Column
                    header="Ações"
                    body={(rowData) => columnAddRemoveValores(rowData)}
                  />
                </DataTable>
              )}
            </div>
          </form>

          <div className="mb-4">
            <h2 className="text-2xl font-bold text-primary-main pb-2">Juros</h2>
            <label className="block text-[#333] text-sm font-bold mb-2">
              Juros incidentes:
            </label>
            <Select
              onValueChange={(value) => {
                setJurosIncidentes(value);
              }}
              defaultValue={"dataFixa"}
            >
              <SelectTrigger className="h-12 w-full rounded-none border-DEFAULT border-[#e8e6e6] bg-red px-4 py-2 text-base text-background placeholder:font-normal placeholder:text-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                <SelectValue
                  placeholder="Juros incidentes"
                  className="font-normal"
                />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="dataFixa">
                  A partir de uma data fixa
                </SelectItem>
                <SelectItem value="dataValores">
                  A partir da data dos valores
                </SelectItem>
              </SelectContent>
            </Select>
            <label className="block text-[#333] text-sm font-bold mb-2">
              Tipo de juros:
            </label>

            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="jurosLegais"
                name="jurosLegais"
                className="mr-2"
                checked={tipoJuros === "jurosLegais"}
                onChange={() => setTipoJuros("jurosLegais")}
              />

              <label htmlFor="jurosLegais" className="mr-4">
                Juros legais (0,5% até 10/01/2003, 1% a partir de 11/01/2003 e
                Taxa legal a partir de 30/08/2024)
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="percentualFixo"
                name="percentualFixo"
                className="mr-2"
                checked={tipoJuros === "percentualFixo"}
                onChange={() => setTipoJuros("percentualFixo")}
              />
              <label htmlFor="percentualFixo" className="mr-4">
                Percentual fixo
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="semJuros"
                name="semJuros"
                className="mr-2"
                checked={tipoJuros === "semJuros"}
                onChange={() => setTipoJuros("semJuros")}
              />
              <label htmlFor="semJuros" className="mr-4">
                Sem juros
              </label>
            </div>
            {tipoJuros !== "semJuros" && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {tipoJuros === "percentualFixo" && (
                  <div>
                    <label
                      htmlFor="porcentagemJuros"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Porcentagem juros:
                    </label>
                    <InputNumber
                      id="porcentagemJuros"
                      name="porcentagemJuros"
                      value={porcentagemJuros}
                      onValueChange={(e) => {
                        setPorcentagemJuros(e.value ?? 0);
                      }}
                      placeholder="%"
                      locale="pt-BR"
                      minFractionDigits={2}
                      mode="decimal"
                      className="custom-inputnumber h-12 w-full rounded-none border-DEFAULT border-[#e8e6e6] bg-white px-4 py-2 font-normal text-background placeholder:text-base placeholder:font-normal placeholder:text-background !focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border"
                    />
                  </div>
                )}
                {jurosIncidentes == "dataFixa" && (
                  <div>
                    <label
                      htmlFor="dataFim"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Data inicio:
                    </label>
                    <Input
                      id="dataInicioJuros"
                      name="dataInicioJuros"
                      type="date"
                      value={dataInicioJuros}
                      onChange={(e) => setDataInicioJuros(e.target.value)}
                      className="h-12 w-full rounded-none border-DEFAULT border-[#e8e6e6] bg-white px-4 py-2 font-bold text-background placeholder:text-base placeholder:font-normal placeholder:text-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                )}

                <div>
                  <label
                    htmlFor="dataFim"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Data fim:
                  </label>
                  <Input
                    id="dataFimJuros"
                    name="dataFimJuros"
                    type="date"
                    value={dataFimJuros}
                    onChange={(e) => setDataFimJuros(e.target.value)}
                    className="h-12 w-full rounded-none border-DEFAULT border-[#e8e6e6] bg-white px-4 py-2 font-bold text-background placeholder:text-base placeholder:font-normal placeholder:text-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Multas</h2>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tipo de multa:
            </label>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="percentualMulta"
                name="tipoMulta"
                className="mr-2"
                checked={tipoMulta === "percentual"}
                onChange={() => handleChangeTipoMulta("percentual")}
              />
              <label htmlFor="percentualMulta" className="mr-4">
                Percentual
              </label>
              <input
                type="radio"
                id="monetariaMulta"
                name="tipoMulta"
                className="mr-2"
                checked={tipoMulta === "monetaria"}
                onChange={() => handleChangeTipoMulta("monetaria")}
              />
              <label htmlFor="monetariaMulta" className="mr-4">
                Monetária
              </label>
            </div>
            <form
              className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4"
              onSubmit={formMultas.handleSubmit}
            >
              <div className="hidden">
                <Input
                  type="text"
                  id="id"
                  name="id"
                  value={formMultas.values.id}
                  onChange={formMultas.handleChange}
                  className="hidden"
                />
              </div>
              {tipoMulta === "percentual" && (
                <div>
                  <label
                    htmlFor="porcentagemMulta"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Porcentagem multa:
                  </label>
                  <InputNumber
                    id="porcentagemMulta"
                    name="porcentagemMulta"
                    value={formMultas.values.porcentagem}
                    onValueChange={(e) => {
                      formMultas.setFieldValue("porcentagem", e.value);
                    }}
                    placeholder="%"
                    locale="pt-BR"
                    minFractionDigits={2}
                    mode="decimal"
                    className="custom-inputnumber h-12 w-full md:max-w-1/2 rounded-none border-DEFAULT border-[#e8e6e6] bg-white px-4 py-2 font-normal text-background placeholder:text-base placeholder:font-normal placeholder:text-background !focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border"
                  />
                </div>
              )}
              {tipoMulta === "monetaria" && (
                <div>
                  <label
                    htmlFor="porcentagemMulta"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Valor multa:
                  </label>
                  <InputNumber
                    id="valorMulta"
                    name="valorMulta"
                    value={formMultas.values.valor}
                    onValueChange={(e) => {
                      formMultas.setFieldValue("valor", e.value);
                    }}
                    placeholder="%"
                    locale="pt-BR"
                    minFractionDigits={2}
                    mode="currency"
                    currency="BRL"
                    className="custom-inputnumber h-12 w-full md:max-w-1/2 rounded-none border-DEFAULT border-[#e8e6e6] bg-white px-4 py-2 font-normal text-background placeholder:text-base placeholder:font-normal placeholder:text-background !focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border"
                  />
                </div>
              )}
              <div>
                <label
                  htmlFor="descricao"
                  className="block text-[#333] text-sm font-bold mb-2"
                >
                  Descrição:
                </label>
                <Input
                  type="text"
                  id="descricaoMulta"
                  name="descricaoMulta"
                  onChange={formMultas.handleChange}
                  value={formMultas.values.descricaoMulta}
                  placeholder="Descrição (opcional)"
                  className="h-12 w-full rounded-none border-DEFAULT border-[#e8e6e6] bg-white px-4 py-2 font-bold text-background placeholder:text-base placeholder:font-normal placeholder:text-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <div className="flex justify-start items-end">
                <Button
                  type="submit"
                  className="rounded-none border h-12 bg-primary-main px-7 py-[14px] text-base font-bold uppercase text-white transition-colors duration-300 ease-in hover:border-primary-main hover:bg-white hover:text-primary-main"
                >
                  {formMultas.values.id ? (
                    <span className="flex flex-row justify-center items-center gap-2">
                      <i className="pi pi-pencil text-sm"></i>
                      <span>Editar multa</span>
                    </span>
                  ) : (
                    <span className="flex flex-row justify-center items-center gap-2">
                      <i className="pi pi-plus text-sm"></i>
                      <span>Adicionar multa</span>
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>
          {multas && multas.length >= 1 && (
            <DataTable value={multas} className="w-full mt-8" stripedRows>
              <Column
                header="Valor"
                body={(rowData) => columnValorMulta(rowData)}
              />
              <Column
                header="Porcentagem"
                body={(rowData) => columnPorcentagemMulta(rowData)}
              />
              <Column field="descricao" header="Descrição" />
              <Column
                header="Ações"
                body={(rowData) => columnAddRemoveMultas(rowData)}
              />
            </DataTable>
          )}
          {/*
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Honorários</h2>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tipo de honorário:
            </label>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="percentualHonorario"
                name="tipoHonorario"
                className="mr-2"
              />
              <label htmlFor="percentualHonorario" className="mr-4">
                Honorário percentual
              </label>
              <input
                type="radio"
                id="monetarioHonorario"
                name="tipoHonorario"
                className="mr-2"
              />
              <label htmlFor="monetarioHonorario" className="mr-4">
                Honorário monetário
              </label>
            </div>
            {honorarios.map((honorario, index) => (
              <div key={index} className="flex items-center mb-2">
                <Input
                  type="number"
                  className="h-12 w-full rounded-none border-DEFAULT border-[#e8e6e6] bg-white px-4 py-2 font-bold text-background placeholder:text-base placeholder:font-normal placeholder:text-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder="R$"
                />

                <Input
                  type="text"
                  className="h-12 w-full rounded-none border-DEFAULT border-[#e8e6e6] bg-white px-4 py-2 font-bold text-background placeholder:text-base placeholder:font-normal placeholder:text-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder="Descrição (opcional)"
                />
                <Button
                  type="submit"
                  className="h-auto rounded-none border bg-primary-main px-7 py-[14px] text-base font-bold uppercase text-white transition-colors duration-300 ease-in hover:border-primary-main hover:bg-white hover:text-primary-main"
                  onClick={adicionarHonorario}
                >
                  + Adicionar honorários
                </Button>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">
              Consectários (art. 523, § 1º, CPC)
            </h2>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Opções:
            </label>
            <div className="flex flex-col mb-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="multaArt523"
                  name="consectarios"
                  className="mr-2"
                />
                <label htmlFor="multaArt523" className="mr-4">
                  Multa (art. 523 CPC)
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="honorarioArt523"
                  name="consectarios"
                  className="mr-2"
                />
                <label htmlFor="honorarioArt523" className="mr-4">
                  Honorário de cumprimento de sentença (art. 523 CPC)
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="ambasArt523"
                  name="consectarios"
                  className="mr-2"
                />
                <label htmlFor="ambasArt523" className="mr-4">
                  Ambas (multa e honorário art. 523 CPC)
                </label>
              </div>
            </div>
            {consectarios.map((consectario, index) => (
              <div key={index} className="flex items-center mb-2">
                <Input
                  type="number"
                  className="h-12 w-full rounded-none border-DEFAULT border-[#e8e6e6] bg-white px-4 py-2 font-bold text-background placeholder:text-base placeholder:font-normal placeholder:text-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder="R$"
                />

                <Input
                  type="text"
                  className="h-12 w-full rounded-none border-DEFAULT border-[#e8e6e6] bg-white px-4 py-2 font-bold text-background placeholder:text-base placeholder:font-normal placeholder:text-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder="Descrição (opcional)"
                />
                <Button
                  type="submit"
                  className="h-auto rounded-none border bg-primary-main px-7 py-[14px] text-base font-bold uppercase text-white transition-colors duration-300 ease-in hover:border-primary-main hover:bg-white hover:text-primary-main"
                  onClick={adicionarConsectario}
                >
                  + Adicionar ambas (multa e honorário art. 523 CPC)
                </Button>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">
              Custas e outras despesas processuais
            </h2>
            {custas.map((custa, index) => (
              <div key={index} className="flex items-center mb-2">
                <Input
                  type="number"
                  className="h-12 w-full rounded-none border-DEFAULT border-[#e8e6e6] bg-white px-4 py-2 font-bold text-background placeholder:text-base placeholder:font-normal placeholder:text-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder="R$"
                />
                <Input
                  type="date"
                  className="h-12 w-full rounded-none border-DEFAULT border-[#e8e6e6] bg-white px-4 py-2 font-bold text-background placeholder:text-base placeholder:font-normal placeholder:text-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />

                <Input
                  type="text"
                  className="h-12 w-full rounded-none border-DEFAULT border-[#e8e6e6] bg-white px-4 py-2 font-bold text-background placeholder:text-base placeholder:font-normal placeholder:text-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder="Descrição (opcional)"
                />

                <Button
                  type="submit"
                  className="h-auto rounded-none border bg-primary-main px-7 py-[14px] text-base font-bold uppercase text-white transition-colors duration-300 ease-in hover:border-primary-main hover:bg-white hover:text-primary-main"
                  onClick={adicionarCusta}
                >
                  + Adicionar custas
                </Button>
              </div>
            ))}
          </div>
          
          
          */}
          
          <div className="flex justify-end mb-4">

          <Button
            type="submit"
            className="h-auto rounded-none border bg-primary-main px-7 py-[14px] text-base font-bold uppercase text-white transition-colors duration-300 ease-in hover:border-primary-main hover:bg-white hover:text-primary-main"
            onClick={calcular}
          >
            Calcular
          </Button>
          </div>
          
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Resultado</h2>
            <p className="text-lg">{resultado}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculadora;
