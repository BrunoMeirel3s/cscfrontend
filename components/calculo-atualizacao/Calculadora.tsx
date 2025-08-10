"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { DadosCalculoRevezamento, DialogBodyProps } from "@/types";
import * as yup from "yup";
import * as XLSX from "xlsx";
import { v4 as uuidv4 } from "uuid";
import { format, toDate, parse, isValid } from "date-fns";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputMask } from "primereact/inputmask";
import { InputNumber } from "primereact/inputnumber";
import { ConfirmDialog } from "primereact/confirmdialog";
import { confirmDialog } from "primereact/confirmdialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Dialog } from "primereact/dialog";

const Calculadora = () => {
  const [dataFinalCalculo, setDataFinalCalculo] = useState("");
  const [dataInicialCalculo, setDataInicialCalculo] = useState("");
  const [dataInicialCalculoAtualizacao, setDataInicialCalculoAtualizacao] =
    useState("");
  const [dataFinalCalculoAtualizacao, setDataFinalCalculoAtualizacao] =
    useState("");
  const [dadosCalculoRevezamento, setDadosCalculoRevezamento] = useState<
    DadosCalculoRevezamento[]
  >([]);
  const [dadosCalculoParaExclusao, setDadosCalculoParaExclusao] = useState<
    DadosCalculoRevezamento[]
  >([]);

  const [salarioBase, setSalarioBase] = useState<number | null>(0);
  const [cargaHoraria, setCargaHoraria] = useState<number | null>(180);
  const [horaEntrada, setHoraEntrada] = useState<string>("22:00");
  const [horaSaida, setHoraSaida] = useState<string>("05:00");
  const [percentualAddNoturno, setPercentualAddNoturno] = useState<
    number | null
  >(25);
  const [horaInicialAddNoturno, setHoraInicialAddNoturno] =
    useState<string>("22:00");
  const [horaFinalAddNoturno, setHoraFinalAddNoturno] =
    useState<string>("05:00");
  const [isExcluindoEntradas, setIsExcluindoEntradas] =
    useState<boolean>(false);

  const [errosForm, setErrosForm] = useState<any>({} as any);
  const [indiceAtualizacaoMontaria, setIndiceAtualizacaoMonetaria] =
    useState("");
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState<DialogBodyProps>({
    header: "",
    content: "",
  });

  const calcularHorasTrabalhadas = (
    horaEntrada: string,
    horaSaida: string
  ): number => {
    const parseHora = (hora: string): number => {
      const [hh, mm] = hora.split(":").map(Number);
      return hh * 60 + mm;
    };

    if (
      !horaEntrada ||
      !horaSaida ||
      !validateHorario(horaEntrada) ||
      !validateHorario(horaSaida)
    ) {
      return 0;
    }

    const entradaMinutos = parseHora(horaEntrada);
    const saidaMinutos = parseHora(horaSaida);

    let diferenca = saidaMinutos - entradaMinutos;

    if (diferenca < 0) {
      diferenca += 24 * 60;
    }

    return +(diferenca / 60).toFixed(2); // convert to hours, round to 2 decimals
  };

  const parseHora = (hora: string): number => {
    const [hh, mm] = hora.split(":").map(Number);
    return hh * 60 + mm;
  };

  const calcularHorasAdicionalNoturno = (
    horaEntradaFuncionario: string,
    horaSaidaFuncionario: string,
    horaInicialAddNoturno: string,
    horaFinalAddNoturno: string
  ): number => {
    // Input validation (as before)
    if (
      !horaEntradaFuncionario ||
      !horaSaidaFuncionario ||
      !horaInicialAddNoturno ||
      !horaFinalAddNoturno ||
      !validateHorario(horaEntradaFuncionario) ||
      !validateHorario(horaSaidaFuncionario) ||
      !validateHorario(horaInicialAddNoturno) ||
      !validateHorario(horaFinalAddNoturno)
    ) {
      return 0;
    }

    const entradaFuncionario = parseHora(horaEntradaFuncionario);
    const saidaFuncionario = parseHora(horaSaidaFuncionario);
    const inicioAddNoturno = parseHora(horaInicialAddNoturno);
    const fimAddNoturno = parseHora(horaFinalAddNoturno);

    let totalMinutosAdicionalNoturno = 0;

    // --- Normalization Strategy ---
    // We need to check for overlaps across two 24-hour periods for both the employee's shift
    // and the night additional period.
    // Example: Night shift 22:00-05:00. Employee shift 03:00-07:00.
    // Employee's shift could be 03:00-07:00 (day 1) or 03:00 (day 1) - 07:00 (day 2) if it crossed midnight.
    // The night shift could also be 22:00 (day 0) - 05:00 (day 1).

    // Function to get "end time" in a 48-hour cycle for intervals that cross midnight
    const getNormalizedEndTime = (
      startTime: number,
      endTime: number
    ): number => {
      return endTime < startTime ? endTime + 24 * 60 : endTime;
    };

    // Normalize the night additional interval
    const normalizedInicioAddNoturno = inicioAddNoturno;
    const normalizedFimAddNoturno = getNormalizedEndTime(
      inicioAddNoturno,
      fimAddNoturno
    );

    // Consider the employee's shift for two possible 24-hour periods
    // (Day 1: employee's shift as is, Day 2: employee's shift shifted by 24 hours)
    // This covers cases where the night shift overlaps with the end of one day's work
    // or the beginning of the next day's work if the employee's shift crosses midnight.

    const employeeShiftIntervals = [];

    // 1. Employee shift on "Day 0"
    employeeShiftIntervals.push({
      start: entradaFuncionario,
      end: getNormalizedEndTime(entradaFuncionario, saidaFuncionario),
    });

    // 2. Employee shift starting 24 hours earlier (to catch any overlap with the end of the previous night period)
    // Example: Employee works 23:00-03:00. Night shift is 22:00-05:00.
    // The 23:00-00:00 part of their shift is "day 0" night.
    // The 00:00-03:00 part of their shift is "day 1" night.
    // We need to check the night interval against the employee's shift as if it started earlier.
    if (saidaFuncionario < entradaFuncionario) {
      // If employee's shift crosses midnight
      employeeShiftIntervals.push({
        start: entradaFuncionario - 24 * 60,
        end: saidaFuncionario,
      });
    }

    // Now, calculate overlap for each night interval with the employee's (potentially normalized) shift
    // We need to consider the night interval possibly repeating or existing on "the next day"
    const nightIntervals = [];
    nightIntervals.push({
      start: normalizedInicioAddNoturno,
      end: normalizedFimAddNoturno,
    });
    if (fimAddNoturno < inicioAddNoturno) {
      // If night shift crosses midnight
      // Also consider the "next day" part of the night shift (00:00 to fimAddNoturno)
      nightIntervals.push({ start: 0, end: fimAddNoturno }); // This captures the 00:00-05:00 part directly
    }

    for (const employeeInterval of employeeShiftIntervals) {
      for (const nightInterval of nightIntervals) {
        // Calculate overlap between employee's shift and a night interval
        const overlapStart = Math.max(
          employeeInterval.start,
          nightInterval.start
        );
        const overlapEnd = Math.min(employeeInterval.end, nightInterval.end);

        if (overlapEnd > overlapStart) {
          totalMinutosAdicionalNoturno += overlapEnd - overlapStart;
        }
      }
    }

    // Handle potential double counting if intervals overlap in complex ways (e.g., employee 23:00-01:00, night 22:00-05:00)
    // A simpler way for this specific problem (employee shift overlap with a fixed night period)
    // is to iterate through each minute of the *night period* and check if the employee was working.
    // Let's re-think with that simpler, more robust approach.
    // The previous looping approach for each minute of employee shift was trying to be too clever for wrap-arounds.

    // --- REVISED SIMPLER APPROACH: Iterate through night minutes, check employee's presence ---

    totalMinutosAdicionalNoturno = 0; // Reset for the simpler approach

    // We need to represent the employee's shift correctly over a 48-hour period
    // to check if a specific minute of the night shift falls within it.
    // Example: Employee 23:00 - 02:00 (next day)
    // Normalized to 23:00 - 26:00
    const employeeStart = entradaFuncionario;
    let employeeEnd = saidaFuncionario;
    if (employeeEnd < employeeStart) {
      // If employee shift crosses midnight
      employeeEnd += 24 * 60;
    }

    // Iterate through *potential night minutes* over a 24-hour cycle
    // This covers the main night shift interval (e.g., 22:00 to 05:00)
    // The normalization of the night shift itself (22:00-29:00) already simplifies this.
    for (
      let currentMinute = normalizedInicioAddNoturno;
      currentMinute < normalizedFimAddNoturno;
      currentMinute++
    ) {
      // Check if this current night minute falls within the employee's shift.
      // The employee's shift itself might be across midnight, so we need to check both "days" for the employee.
      // Case 1: Night minute is in the "current" 24h cycle
      if (currentMinute >= employeeStart && currentMinute < employeeEnd) {
        totalMinutosAdicionalNoturno++;
      } else {
        // Case 2: Night minute is in the "next" 24h cycle relative to employee's start,
        // if the employee's shift also crosses midnight.
        // Example: Night 03:00 (of next day), employee 23:00 (prev day) - 04:00 (next day)
        // `currentMinute` will be 3 (or 27 if normalized).
        // `employeeStart` is 23, `employeeEnd` is 28.
        // This check covers `currentMinute` potentially being on the "day after" employeeStart if employee's shift wraps.
        const employeeStartNextDay = employeeStart + 24 * 60;
        const employeeEndNextDay = employeeEnd + 24 * 60;

        if (
          currentMinute >= employeeStartNextDay &&
          currentMinute < employeeEndNextDay
        ) {
          totalMinutosAdicionalNoturno++;
        }
      }
    }

    return +(totalMinutosAdicionalNoturno / 60).toFixed(2);
  };

  const validateHorario = (hora: string): boolean => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(hora);
  };

  const parseLocalDate = (dateStr: string): Date => {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day); // month is 0-based
  };

  function parseLocalDateFlexible(dateStr: string) {
    let parsed = parse(dateStr, "yyyy-MM-dd", new Date());
    if (!isValid(parsed)) {
      parsed = parse(dateStr, "dd/MM/yyyy", new Date());
    }
    return parsed;
  }

  const roundNumber = (value: number, decimals: number = 2): number => {
    return parseFloat(value.toFixed(decimals));
  };

  const gerarDatasPeriodo = () => {
    if (
      !dataInicialCalculo ||
      !dataFinalCalculo ||
      !salarioBase ||
      salarioBase <= 0 ||
      !cargaHoraria ||
      cargaHoraria <= 0 ||
      !horaEntrada ||
      !validateHorario(horaEntrada) ||
      !horaSaida ||
      !validateHorario(horaSaida) ||
      !horaInicialAddNoturno ||
      !validateHorario(horaInicialAddNoturno) ||
      !horaFinalAddNoturno ||
      !validateHorario(horaFinalAddNoturno) ||
      !percentualAddNoturno ||
      percentualAddNoturno < 0 ||
      !indiceAtualizacaoMontaria ||
      indiceAtualizacaoMontaria === "" ||
      !dataFinalCalculoAtualizacao
    ) {
      setErrosForm({
        dataInicialCalculo: !dataInicialCalculo
          ? "Data inicial é obrigatória."
          : "",
        dataFinalCalculo: !dataFinalCalculo ? "Data final é obrigatória." : "",
        salarioBase:
          !salarioBase || salarioBase <= 0 ? "Salário base é obrigatório." : "",
        cargaHoraria:
          !cargaHoraria || cargaHoraria <= 0
            ? "Carga horária é obrigatória."
            : "",
        horaEntrada:
          !horaEntrada || !validateHorario(horaEntrada)
            ? "Hora de entrada é obrigatória e deve estar no formato HH:mm."
            : "",
        horaSaida:
          !horaSaida || !validateHorario(horaSaida)
            ? "Hora de saída é obrigatória e deve estar no formato HH:mm."
            : "",
        horaInicialAddNoturno:
          !horaInicialAddNoturno || !validateHorario(horaInicialAddNoturno)
            ? "Hora inicial do adicional noturno é obrigatória e deve estar no formato HH:mm."
            : "",
        horaFinalAddNoturno:
          !horaFinalAddNoturno || !validateHorario(horaFinalAddNoturno)
            ? "Hora final do adicional noturno é obrigatória e deve estar no formato HH:mm."
            : "",
        percentualAddNoturno:
          !percentualAddNoturno || percentualAddNoturno < 0
            ? "Percentual do adicional noturno é obrigatório e deve ser maior ou igual a 0."
            : "",
        indiceAtualizacaoMontaria:
          !indiceAtualizacaoMontaria || indiceAtualizacaoMontaria === ""
            ? "Índice de atualização monetária é obrigatório."
            : "",
        dataFinalCalculoAtualizacao: !dataFinalCalculoAtualizacao
          ? "Data final de cálculo de atualização é obrigatória."
          : "",
      });
      return;
    }
    setErrosForm({});
    const start = parseLocalDate(dataInicialCalculo);
    const end = parseLocalDate(dataFinalCalculo);
    const dates: string[] = [];
    let current = new Date(start);
    let dadosCalculoRevezamento = [] as DadosCalculoRevezamento[];

    const indice = indiceAtualizacaoMontaria;

    const [anoPeriodoInicial, mesPeriodoInicial, diaPeriodoInicial] =
      dataInicialCalculoAtualizacao
        ? dataInicialCalculoAtualizacao.split("-").map(Number)
        : dataInicialCalculo.split("-").map(Number);

    const [anoPeriodoFinal, mesPeriodoFinal, diaPeriodoFinal] =
      dataFinalCalculoAtualizacao
        ? dataFinalCalculoAtualizacao.split("-").map(Number)
        : format(new Date(), "yyyy-MM-dd").split("-").map(Number);

    const periodoInicial = `${String(mesPeriodoInicial).padStart(2, "0")}/${anoPeriodoInicial}`;
    const periodoFinal = `${String(mesPeriodoFinal).padStart(2, "0")}/${anoPeriodoFinal}`;

    const isPeriodoValido =
      indice == "ipcae"
        ? ipcaEMensal[periodoInicial] !== undefined &&
          ipcaEMensal[periodoFinal] !== undefined
        : inpcIndex[periodoInicial] !== undefined &&
          inpcIndex[periodoFinal] !== undefined;

    if (!isPeriodoValido) {
      const periodoInicialIndice =
        indice == "ipcae"
          ? Object.keys(ipcaEMensal)[0]
          : Object.keys(inpcIndex)[0];
      const periodoFinalIndice =
        indice == "ipcae"
          ? Object.keys(ipcaEMensal).slice(-1)[0]
          : Object.keys(inpcIndex).slice(-1)[0];
      setErrosForm({
        dataInicialCalculoAtualizacao: (
          indice == "ipcae"
            ? ipcaEMensal[periodoInicial] == undefined
            : inpcIndex[periodoInicial] == undefined
        )
          ? "Período inicial inválido."
          : "",
        dataFinalCalculoAtualizacao: (
          indice == "ipcae"
            ? ipcaEMensal[periodoFinal] == undefined
            : inpcIndex[periodoFinal] == undefined
        )
          ? "Período final inválido."
          : "",
        indiceAtualizacaoMontaria:
          "O índice de atualização monetária selecionado não possui dados para o período informado.",
      });
      setIsDialogVisible(true);
      setDialogMessage({
        header: "Período inválido",
        content: `O ${indice == "ipcae" ? "IPCA-E" : "INPC"} ainda não possui índice de atualização divulgado para o período informado. O período deve estar entre ${periodoInicialIndice} e ${periodoFinalIndice}.`,
      });
    }

    while (current <= end) {
      dates.push(format(current, "yyyy-MM-dd"));

      const diasSemana = [
        "Domingo",
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sábado",
      ];

      const salario = roundNumber(salarioBase ?? 0);
      const valorHora = roundNumber(salario / (cargaHoraria ?? 180));
      const valorAcrescimo = roundNumber(
        valorHora * ((percentualAddNoturno ?? 25) / 100)
      );
      const horaEntra = horaEntrada;
      const horaSai = horaSaida;
      const hrInicialAddNoturno = horaInicialAddNoturno;
      const hrFinalAddNoturno = horaFinalAddNoturno;
      const horasAdicionalNoturno = calcularHorasAdicionalNoturno(
        horaEntra,
        horaSai,
        hrInicialAddNoturno,
        hrFinalAddNoturno
      );
      const valorAdicionalNoturno = horasAdicionalNoturno * valorAcrescimo;

      const dataInicialIndice = dataInicialCalculoAtualizacao
        ? format(parseLocalDate(dataInicialCalculoAtualizacao), "dd/MM/yyyy")
        : null;

      const dataFinalIndice = format(
        parseLocalDate(dataFinalCalculoAtualizacao),
        "dd/MM/yyyy"
      );

      const dataAtualLoop = format(current, "dd/MM/yyyy");

      const valorAtualizado =
        indice == "ipcae"
          ? corrigirValorComIPCAE(
              dataInicialIndice ?? dataAtualLoop,
              dataFinalIndice,
              valorAdicionalNoturno
            )
          : corrigirValorComINPC(
              dataInicialIndice ?? dataAtualLoop,
              dataFinalIndice,
              valorAdicionalNoturno
            );
      const valorJurosCompensatorios = aplicarJurosCompensatorios(
        dataInicialIndice ?? dataAtualLoop,
        dataFinalIndice,
        valorAdicionalNoturno
      );
      const valorTotal = roundNumber(
        valorAtualizado + valorJurosCompensatorios
      );

      dadosCalculoRevezamento.push({
        id: uuidv4(),
        dataMes: dataAtualLoop,
        dataExtenso: diasSemana[current.getDay()],
        horaEntrada: horaEntra,
        horaSaida: horaSai,
        horasTrabalhadas: calcularHorasTrabalhadas(horaEntra, horaSai),
        horasAdicionalNoturno: horasAdicionalNoturno,
        valorRemuneracao: salario,
        valorHora: valorHora,
        valorAcrescimo: valorAcrescimo,
        valorAdicionalNoturno: valorAdicionalNoturno,
        valorAdicionalNoturnoAtualizado: valorAtualizado,
        jurosCompensatorios050: valorJurosCompensatorios,
        valorTotal: valorTotal,
      });

      current.setDate(current.getDate() + 1);
    }

    setDadosCalculoRevezamento(dadosCalculoRevezamento);
  };

  const atualizarInfoDadosCalculo = (
    id: string,
    coluna: string,
    valor: any
  ) => {
    setDadosCalculoRevezamento((dados) =>
      dados.map((registro) => {
        if (registro.id == id) {
          const novoRegistro = {
            ...registro,
            [coluna]: valor,
          };
          if (coluna === "horaEntrada" || coluna === "horaSaida") {
            const horaEntrada =
              coluna === "horaEntrada" ? valor : registro.horaEntrada;
            const horaSaida =
              coluna === "horaSaida" ? valor : registro.horaSaida;

            novoRegistro.horasTrabalhadas = calcularHorasTrabalhadas(
              horaEntrada,
              horaSaida
            );

            const horasAdicionalNoturno = calcularHorasAdicionalNoturno(
              horaEntrada,
              horaSaida,
              horaInicialAddNoturno,
              horaFinalAddNoturno
            );

            novoRegistro.horasAdicionalNoturno = horasAdicionalNoturno;
            novoRegistro.valorAdicionalNoturno =
              horasAdicionalNoturno * novoRegistro.valorAcrescimo;
            const indice = indiceAtualizacaoMontaria;
            const dataInicialIndice = dataInicialCalculoAtualizacao
              ? format(
                  parseLocalDate(dataInicialCalculoAtualizacao),
                  "dd/MM/yyyy"
                )
              : null;
            const dataFinalIndice = dataFinalCalculoAtualizacao
              ? format(
                  parseLocalDate(dataFinalCalculoAtualizacao),
                  "dd/MM/yyyy"
                )
              : null;

            const dataAtualLoop = format(
              toDate(novoRegistro.dataMes).toLocaleDateString(),
              "dd/MM/yyyy"
            );

            const dataAtual = format(new Date(), "dd/MM/yyyy");

            const valorAtualizado =
              indice == "ipcae"
                ? corrigirValorComIPCAE(
                    dataInicialIndice ?? dataAtualLoop,
                    dataFinalIndice ?? dataAtual,
                    novoRegistro.valorAdicionalNoturno
                  )
                : corrigirValorComINPC(
                    dataInicialIndice ?? dataAtualLoop,
                    dataFinalIndice ?? dataAtual,
                    novoRegistro.valorAdicionalNoturno
                  );
            novoRegistro.valorAdicionalNoturnoAtualizado = valorAtualizado;
            const valorJurosCompensatorios = aplicarJurosCompensatorios(
              dataInicialIndice ?? dataAtualLoop,
              dataFinalIndice ?? dataAtual,
              valorAtualizado
            );
            const valorTotal = roundNumber(
              valorAtualizado + valorJurosCompensatorios
            );

            novoRegistro.jurosCompensatorios050 = valorJurosCompensatorios;
            novoRegistro.valorTotal = valorTotal;
          }

          if (coluna === "valorRemuneracao") {
            novoRegistro.valorHora = valor / (cargaHoraria ?? 180);
            novoRegistro.valorAcrescimo =
              novoRegistro.valorHora * ((percentualAddNoturno ?? 25) / 100);

            const horasAdicionalNoturno = calcularHorasAdicionalNoturno(
              novoRegistro.horaEntrada,
              novoRegistro.horaSaida,
              horaInicialAddNoturno,
              horaFinalAddNoturno
            );

            novoRegistro.valorAdicionalNoturno =
              horasAdicionalNoturno * novoRegistro.valorAcrescimo;
            const indice = indiceAtualizacaoMontaria;
            const dataInicialIndice = dataInicialCalculoAtualizacao
              ? format(
                  parseLocalDate(dataInicialCalculoAtualizacao),
                  "dd/MM/yyyy"
                )
              : null;
            const dataFinalIndice = format(
              parseLocalDate(dataFinalCalculoAtualizacao),
              "dd/MM/yyyy"
            );
            const dataAtualLoop = format(
              parseLocalDateFlexible(novoRegistro.dataMes),
              "dd/MM/yyyy"
            );
            const valorAtualizado =
              indice == "ipcae"
                ? corrigirValorComIPCAE(
                    dataInicialIndice ?? dataAtualLoop,
                    dataFinalIndice,
                    novoRegistro.valorAdicionalNoturno
                  )
                : corrigirValorComINPC(
                    dataInicialIndice ?? dataAtualLoop,
                    dataFinalIndice,
                    novoRegistro.valorAdicionalNoturno
                  );
            novoRegistro.valorAdicionalNoturnoAtualizado = valorAtualizado;

            const valorJurosCompensatorios = aplicarJurosCompensatorios(
              dataInicialIndice ?? dataAtualLoop,
              dataFinalIndice,
              valorAtualizado
            );
            const valorTotal = roundNumber(
              valorAtualizado + valorJurosCompensatorios
            );

            novoRegistro.jurosCompensatorios050 = valorJurosCompensatorios;
            novoRegistro.valorTotal = valorTotal;
          }

          return novoRegistro;
        }
        return registro;
      })
    );
  };

  const removeDatasSelecionadas = () => {
    const idsParaRemover = dadosCalculoParaExclusao.map((data) => data.id);
    const dadosCalculoCalculoRevezamento = dadosCalculoRevezamento.filter(
      (data) => !idsParaRemover.includes(data.id)
    );
    setDadosCalculoRevezamento(dadosCalculoCalculoRevezamento);
    setIsExcluindoEntradas(false);
    setDadosCalculoParaExclusao([]);
  };

  const columnInputHoraEntrada = (dados: DadosCalculoRevezamento) => {
    return (
      <InputMask
        mask="99:99"
        key={dados.id + "-horaEntrada"}
        value={dados.horaEntrada}
        onChange={(e) => {
          atualizarInfoDadosCalculo(dados.id, "horaEntrada", e.target.value);
        }}
        className="h-8 w-16 border border-solid p-2 font-normal border-neutral-200"
      />
    );
  };

  const columnInputHoraSaida = (dados: DadosCalculoRevezamento) => {
    return (
      <InputMask
        mask="99:99"
        key={dados.id + "-horaSaida"}
        value={dados.horaSaida}
        onChange={(e) => {
          atualizarInfoDadosCalculo(dados.id, "horaSaida", e.target.value);
        }}
        className="h-8 w-16 border border-solid p-2 font-normal border-neutral-200"
      />
    );
  };

  const ColumnSalarioBase = (dados: DadosCalculoRevezamento) => {
    return (
      <InputNumber
        mode="currency"
        key={dados.id + "valorRemuneracao"}
        inputId="valorRemuneracao"
        currency="BRL"
        locale="pt-BR"
        value={dados.valorRemuneracao}
        onChange={(e) =>
          atualizarInfoDadosCalculo(dados.id, "valorRemuneracao", e.value)
        }
        className="w-32 border border-solid border-neutral-200"
        inputClassName="h-8 p-2 font-normal w-full"
        min={0}
      />
    );
  };

  const ColumnGenericValor = (
    dados: DadosCalculoRevezamento,
    columnName: keyof DadosCalculoRevezamento
  ) => {
    const valor = dados[columnName];

    if (typeof valor !== "number") {
      return <span>-</span>;
    }

    return (
      <span>
        {valor.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </span>
    );
  };

  const confirmExclusaoData = () => {
    confirmDialog({
      message: "Você tem certeza que deseja excluir as datas selecionadas?",
      header: "Confirmação",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-warning",
      accept: removeDatasSelecionadas,
      acceptLabel: "Sim",
      rejectLabel: "Não",
    });
  };

  const inpcIndex: Record<string, number> = {
    "01/2020": 0.0019,
    "02/2020": 0.0017,
    "03/2020": 0.0018,
    "04/2020": -0.0023,
    "05/2020": -0.0025,
    "06/2020": 0.003,
    "07/2020": 0.0044,
    "08/2020": 0.0036,
    "09/2020": 0.0087,
    "10/2020": 0.0089,
    "11/2020": 0.0095,
    "12/2020": 0.0146,
    "01/2021": 0.0027,
    "02/2021": 0.0082,
    "03/2021": 0.0086,
    "04/2021": 0.0038,
    "05/2021": 0.0096,
    "06/2021": 0.006,
    "07/2021": 0.0102,
    "08/2021": 0.0088,
    "09/2021": 0.012,
    "10/2021": 0.0116,
    "11/2021": 0.0084,
    "12/2021": 0.0073,
    "01/2022": 0.0067,
    "02/2022": 0.01,
    "03/2022": 0.0171,
    "04/2022": 0.0104,
    "05/2022": 0.0045,
    "06/2022": 0.0062,
    "07/2022": -0.006,
    "08/2022": -0.0031,
    "09/2022": -0.0032,
    "10/2022": 0.0047,
    "11/2022": 0.0038,
    "12/2022": 0.0069,
    "01/2023": 0.0046,
    "02/2023": 0.0077,
    "03/2023": 0.0064,
    "04/2023": 0.0053,
    "05/2023": 0.0036,
    "06/2023": -0.001,
    "07/2023": -0.0009,
    "08/2023": 0.002,
    "09/2023": 0.0011,
    "10/2023": 0.0012,
    "11/2023": 0.001,
    "12/2023": 0.0055,
    "01/2024": 0.0057,
    "02/2024": 0.0081,
    "03/2024": 0.0019,
    "04/2024": 0.0037,
    "05/2024": 0.0046,
    "06/2024": 0.0025,
    "07/2024": 0.0026,
    "08/2024": -0.0014,
    "09/2024": 0.0048,
    "10/2024": 0.0061,
    "11/2024": 0.0033,
    "12/2024": 0.0048,
    "01/2025": 0.0,
    "02/2025": 0.0148,
    "03/2025": 0.0051,
    "04/2025": 0.0048,
    "05/2025": 0.0035,
    "06/2025": 0.0023,
  };

  const ipcaEMensal: Record<string, number> = {
    "02/1992": 0.261,
    "03/1992": 0.2203,
    "04/1992": 0.1983,
    "05/1992": 0.2345,
    "06/1992": 0.2327,
    "07/1992": 0.2101,
    "08/1992": 0.2314,
    "09/1992": 0.2333,
    "10/1992": 0.2548,
    "11/1992": 0.237,
    "12/1992": 0.2349, //
    "01/1993": 0.2947,
    "02/1993": 0.2672,
    "03/1993": 0.2596,
    "04/1993": 0.2734,
    "05/1993": 0.2861,
    "06/1993": 0.2761,
    "07/1993": 0.3067,
    "08/1993": 0.3199,
    "09/1993": 0.3438,
    "10/1993": 0.3517,
    "11/1993": 0.339,
    "12/1993": 0.3669, //
    "01/1994": 0.3917,
    "02/1994": 0.397,
    "03/1994": 0.4363,
    "04/1994": 0.4125,
    "05/1994": 0.4421,
    "06/1994": 0.4465,
    "07/1994": 0.0521,
    "08/1994": 0.05,
    "09/1994": 0.0163,
    "10/1994": 0.019,
    "11/1994": 0.0295,
    "12/1994": 0.0225, //
    "01/1995": 0.0178,
    "02/1995": 0.0122,
    "03/1995": 0.0128,
    "04/1995": 0.0195,
    "05/1995": 0.0277,
    "06/1995": 0.0225,
    "07/1995": 0.0259,
    "08/1995": 0.0149,
    "09/1995": 0.0097,
    "10/1995": 0.0134,
    "11/1995": 0.0146,
    "12/1995": 0.0136, //
    "01/1996": 0.0163,
    "02/1996": 0.012,
    "03/1996": 0.0062,
    "04/1996": 0.007,
    "05/1996": 0.0132,
    "06/1996": 0.0111,
    "07/1996": 0.0137,
    "08/1996": 0.007,
    "09/1996": 0.0011,
    "10/1996": 0.0014,
    "11/1996": 0.0041,
    "12/1996": 0.002, //
    "01/1997": 0.0113,
    "02/1997": 0.0071,
    "03/1997": 0.0059,
    "04/1997": 0.0068,
    "05/1997": 0.005,
    "06/1997": 0.0055,
    "07/1997": 0.0031,
    "08/1997": 0.0017,
    "09/1997": -0.0005,
    "10/1997": 0.0025,
    "11/1997": 0.0007,
    "12/1997": 0.0049, //
    "01/1998": 0.0054,
    "02/1998": 0.0064,
    "03/1998": 0.0039,
    "04/1998": 0.0022,
    "05/1998": 0.0041,
    "06/1998": 0.0034,
    "07/1998": -0.0011,
    "08/1998": -0.0037,
    "09/1998": -0.0044,
    "10/1998": 0.0001,
    "11/1998": -0.0011,
    "12/1998": 0.0013, //
    "01/1999": 0.0068,
    "02/1999": 0.0064,
    "03/1999": 0.0122,
    "04/1999": 0.0078,
    "05/1999": 0.0051,
    "06/1999": -0.0002,
    "07/1999": 0.0079,
    "08/1999": 0.0081,
    "09/1999": 0.0047,
    "10/1999": 0.008,
    "11/1999": 0.0099,
    "12/1999": 0.0091, //
    "01/2000": 0.0065,
    "02/2000": 0.0034,
    "03/2000": 0.0009,
    "04/2000": 0.0047,
    "05/2000": 0.0009,
    "06/2000": 0.0008,
    "07/2000": 0.0078,
    "08/2000": 0.0199,
    "09/2000": 0.0045,
    "10/2000": 0.0018,
    "11/2000": 0.0017,
    "12/2000": 0.006, //
    "01/2001": 0.0063,
    "02/2001": 0.005,
    "03/2001": 0.0036,
    "04/2001": 0.005,
    "05/2001": 0.0049,
    "06/2001": 0.0038,
    "07/2001": 0.0094,
    "08/2001": 0.0118,
    "09/2001": 0.0038,
    "10/2001": 0.0037,
    "11/2001": 0.0099,
    "12/2001": 0.0055, //
    "01/2002": 0.0062,
    "02/2002": 0.0044,
    "03/2002": 0.004,
    "04/2002": 0.0078,
    "05/2002": 0.0042,
    "06/2002": 0.0033,
    "07/2002": 0.0077,
    "08/2002": 0.01,
    "09/2002": 0.0062,
    "10/2002": 0.009,
    "11/2002": 0.0208,
    "12/2002": 0.0305, //
    "01/2003": 0.0198,
    "02/2003": 0.0219,
    "03/2003": 0.0114,
    "04/2003": 0.0114,
    "05/2003": 0.0085,
    "06/2003": 0.0022,
    "07/2003": -0.0018,
    "08/2003": 0.0027,
    "09/2003": 0.0057,
    "10/2003": 0.0066,
    "11/2003": 0.0017,
    "12/2003": 0.0046, //
    "01/2004": 0.0068,
    "02/2004": 0.009,
    "03/2004": 0.004,
    "04/2004": 0.0021,
    "05/2004": 0.0054,
    "06/2004": 0.0056,
    "07/2004": 0.0093,
    "08/2004": 0.0079,
    "09/2004": 0.0049,
    "10/2004": 0.0032,
    "11/2004": 0.0063,
    "12/2004": 0.0084, //
    "01/2005": 0.0068,
    "02/2005": 0.0074,
    "03/2005": 0.0035,
    "04/2005": 0.0074,
    "05/2005": 0.0083,
    "06/2005": 0.0012,
    "07/2005": 0.0011,
    "08/2005": 0.0028,
    "09/2005": 0.0016,
    "10/2005": 0.0056,
    "11/2005": 0.0078,
    "12/2005": 0.0038, //
    "01/2006": 0.0051,
    "02/2006": 0.0052,
    "03/2006": 0.0037,
    "04/2006": 0.0017,
    "05/2006": 0.0027,
    "06/2006": -0.0015,
    "07/2006": -0.0002,
    "08/2006": 0.0019,
    "09/2006": 0.0005,
    "10/2006": 0.0029,
    "11/2006": 0.0037,
    "12/2006": 0.0035, //
    "01/2007": 0.0052,
    "02/2007": 0.0046,
    "03/2007": 0.0041,
    "04/2007": 0.0022,
    "05/2007": 0.0026,
    "06/2007": 0.0029,
    "07/2007": 0.0024,
    "08/2007": 0.0042,
    "09/2007": 0.0029,
    "10/2007": 0.0024,
    "11/2007": 0.0023,
    "12/2007": 0.007, //
    "01/2008": 0.007,
    "02/2008": 0.0064,
    "03/2008": 0.0023,
    "04/2008": 0.0059,
    "05/2008": 0.0056,
    "06/2008": 0.009,
    "07/2008": 0.0063,
    "08/2008": 0.0035,
    "09/2008": 0.0026,
    "10/2008": 0.003,
    "11/2008": 0.0049,
    "12/2008": 0.0029, //
    "01/2009": 0.004,
    "02/2009": 0.0063,
    "03/2009": 0.0011,
    "04/2009": 0.0036,
    "05/2009": 0.0059,
    "06/2009": 0.0038,
    "07/2009": 0.0022,
    "08/2009": 0.0023,
    "09/2009": 0.0019,
    "10/2009": 0.0018,
    "11/2009": 0.0044,
    "12/2009": 0.0038, //
    "01/2010": 0.0052,
    "02/2010": 0.0094,
    "03/2010": 0.0055,
    "04/2010": 0.0048,
    "05/2010": 0.0063,
    "06/2010": 0.0019,
    "07/2010": -0.0009,
    "08/2010": -0.0005,
    "09/2010": 0.0031,
    "10/2010": 0.0062,
    "11/2010": 0.0086,
    "12/2010": 0.0069, //
    "01/2011": 0.0076,
    "02/2011": 0.0097,
    "03/2011": 0.006,
    "04/2011": 0.0077,
    "05/2011": 0.007,
    "06/2011": 0.0023,
    "07/2011": 0.001,
    "08/2011": 0.0027,
    "09/2011": 0.0053,
    "10/2011": 0.0042,
    "11/2011": 0.0046,
    "12/2011": 0.0056, //
    "01/2012": 0.0065,
    "02/2012": 0.0053,
    "03/2012": 0.0025,
    "04/2012": 0.0043,
    "05/2012": 0.0051,
    "06/2012": 0.0018,
    "07/2012": 0.0033,
    "08/2012": 0.0039,
    "09/2012": 0.0048,
    "10/2012": 0.0065,
    "11/2012": 0.0054,
    "12/2012": 0.0069, //
    "01/2013": 0.0088,
    "02/2013": 0.0068,
    "03/2013": 0.0049,
    "04/2013": 0.0051,
    "05/2013": 0.0046,
    "06/2013": 0.0038,
    "07/2013": 0.0007,
    "08/2013": 0.0016,
    "09/2013": 0.0027,
    "10/2013": 0.0048,
    "11/2013": 0.0057,
    "12/2013": 0.0075, //
    "01/2014": 0.0067,
    "02/2014": 0.007,
    "03/2014": 0.0073,
    "04/2014": 0.0078,
    "05/2014": 0.0058,
    "06/2014": 0.0047,
    "07/2014": 0.0017,
    "08/2014": 0.0014,
    "09/2014": 0.0039,
    "10/2014": 0.0048,
    "11/2014": 0.0038,
    "12/2014": 0.0079,
    "01/2015": 0.0089,
    "02/2015": 0.0133,
    "03/2015": 0.0124,
    "04/2015": 0.0107,
    "05/2015": 0.006,
    "06/2015": 0.0099,
    "07/2015": -0.0059,
    "08/2015": 0.0043,
    "09/2015": 0.0039,
    "10/2015": 0.0066,
    "11/2015": 0.0085,
    "12/2015": 0.0118,
    "01/2016": 0.0092,
    "02/2016": 0.0142,
    "03/2016": 0.0043,
    "04/2016": 0.0051,
    "05/2016": 0.0086,
    "06/2016": 0.004,
    "07/2016": 0.0054,
    "08/2016": 0.0045,
    "09/2016": 0.0023,
    "10/2016": 0.0019,
    "11/2016": 0.0026,
    "12/2016": 0.0019,
    "01/2017": 0.0031,
    "02/2017": 0.0054,
    "03/2017": 0.0015,
    "04/2017": 0.0021,
    "05/2017": 0.0024,
    "06/2017": 0.0016,
    "07/2017": -0.0018,
    "08/2017": 0.0035,
    "09/2017": 0.0011,
    "10/2017": 0.0034,
    "11/2017": 0.0032,
    "12/2017": 0.0035,
    "01/2018": 0.0039,
    "02/2018": 0.0038,
    "03/2018": 0.001,
    "04/2018": 0.0021,
    "05/2018": 0.0014,
    "06/2018": 0.0111,
    "07/2018": 0.0064,
    "08/2018": 0.0013,
    "09/2018": 0.0009,
    "10/2018": 0.0058,
    "11/2018": 0.0019,
    "12/2018": -0.0016,
    "01/2019": 0.003,
    "02/2019": 0.0034,
    "03/2019": 0.0054,
    "04/2019": 0.0072,
    "05/2019": 0.0035,
    "06/2019": 0.0006,
    "07/2019": 0.0009,
    "08/2019": 0.0008,
    "09/2019": 0.0009,
    "10/2019": 0.0009,
    "11/2019": 0.0014,
    "12/2019": 0.0105,
    "01/2020": 0.0071,
    "02/2020": 0.0022,
    "03/2020": 0.0002,
    "04/2020": -0.0001,
    "05/2020": -0.0059,
    "06/2020": 0.0002,
    "07/2020": 0.003,
    "08/2020": 0.0023,
    "09/2020": 0.0045,
    "10/2020": 0.0094,
    "11/2020": 0.0081,
    "12/2020": 0.0106,
    "01/2021": 0.0078,
    "02/2021": 0.0048,
    "03/2021": 0.0093,
    "04/2021": 0.006,
    "05/2021": 0.0044,
    "06/2021": 0.0083,
    "07/2021": 0.0072,
    "08/2021": 0.0089,
    "09/2021": 0.0114,
    "10/2021": 0.012,
    "11/2021": 0.0117,
    "12/2021": 0.0078,
    "01/2022": 0.0058,
    "02/2022": 0.0099,
    "03/2022": 0.0095,
    "04/2022": 0.0173,
    "05/2022": 0.0059,
    "06/2022": 0.0069,
    "07/2022": 0.0013,
    "08/2022": -0.0073,
    "09/2022": -0.0037,
    "10/2022": 0.0016,
    "11/2022": 0.0053,
    "12/2022": 0.0052,
    "01/2023": 0.0055,
    "02/2023": 0.0076,
    "03/2023": 0.0069,
    "04/2023": 0.0057,
    "05/2023": 0.0051,
    "06/2023": 0.0004,
    "07/2023": -0.0007,
    "08/2023": 0.0028,
    "09/2023": 0.0035,
    "10/2023": 0.0021,
    "11/2023": 0.0033,
    "12/2023": 0.004,
    "01/2024": 0.0031,
    "02/2024": 0.0078,
    "03/2024": 0.0036,
    "04/2024": 0.0021,
    "05/2024": 0.0044,
    "06/2024": 0.0039,
    "07/2024": 0.003,
    "08/2024": 0.0019,
    "09/2024": 0.0013,
    "10/2024": 0.0054,
    "11/2024": 0.0062,
    "12/2024": 0.0034,
    "01/2025": 0.0011,
    "02/2025": 0.0123,
    "03/2025": 0.0064,
    "04/2025": 0.0043,
    "05/2025": 0.0036,
    "06/2025": 0.0026,
    "07/2025": 0.0033,
  };

  function corrigirValorComIPCAE(
    dataInicio: string,
    dataFim: string,
    valor: number
  ): number {
    const [diaIni, mesIni, anoIni] = dataInicio.split("/").map(Number);
    const [dataIni, mesFim, anoFim] = dataFim.split("/").map(Number);

    let mes = mesIni;
    let ano = anoIni;

    let valorCorrigido = valor;

    while (ano < anoFim || (ano == anoFim && mes <= mesFim)) {
      const chave = `${String(mes).padStart(2, "0")}/${ano}`;
      const indice = ipcaEMensal[chave];

      if (indice !== undefined && indice != 0) {
        valorCorrigido += valorCorrigido * indice;
      }

      mes++;
      if (mes > 12) {
        mes = 1;
        ano++;
      }
    }

    return parseFloat(valorCorrigido.toFixed(2));
  }

  function corrigirValorComINPC(
    dataInicio: string,
    dataFim: string,
    valor: number
  ): number {
    const [diaIni, mesIni, anoIni] = dataInicio.split("/").map(Number);
    const [dataIni, mesFim, anoFim] = dataFim.split("/").map(Number);

    let mes = mesIni;
    let ano = anoIni;
    let valorCorrigido = valor;

    while (ano < anoFim || (ano == anoFim && mes <= mesFim)) {
      const chave = `${String(mes).padStart(2, "0")}/${ano}`;
      const indice = inpcIndex[chave];

      if (indice !== undefined) {
        valorCorrigido += valorCorrigido * indice;
      }

      mes++;
      if (mes > 12) {
        mes = 1;
        ano++;
      }
    }

    return parseFloat(valorCorrigido.toFixed(2));
  }

  function aplicarJurosCompensatorios(
    dataInicio: string,
    dataFim: string,
    valor: number,
    taxaMensal = 0.005
  ): number {
    const [diaIni, mesIni, anoIni] = dataInicio.split("/").map(Number);
    const [diaFim, mesFim, anoFim] = dataFim.split("/").map(Number);

    let mes = mesIni;
    let ano = anoIni;

    if (mes > 12) {
      mes = 1;
      ano += 1;
    }

    let valorCorrigido = valor;

    while (ano < anoFim || (ano === anoFim && mes <= mesFim)) {
      valorCorrigido *= 1 + taxaMensal;

      mes++;
      if (mes > 12) {
        mes = 1;
        ano++;
      }
    }

    return parseFloat(valorCorrigido.toFixed(2));
  }

  const headersMap: Record<string, string> = {
    dataMes: "Data",
    dataExtenso: "Dia da Semana",
    horaEntrada: "Hora Entrada",
    horaSaida: "Hora Saída",
    horasTrabalhadas: "Horas Trabalhadas",
    horasAdicionalNoturno: "Horas Adicional Noturno",
    valorRemuneracao: "Valor Remuneração",
    valorHora: "Valor Hora",
    valorAcrescimo: "Valor Acréscimo 25%",
    valorAdicionalNoturno: "Adicional Noturno",
    valorAdicionalNoturnoAtualizado: "Adicional Noturno Atualizado",
    jurosCompensatorios050: "Juros Compensatórios (0,5%)",
    valorTotal: "Valor Total a Pagar",
  };

  function exportRevezamentoToExcel(
    dados: any[],
    fileName = "revezamento.xlsx"
  ) {
    const keys = Object.keys(headersMap);
    const headerRow = keys.map((k) => headersMap[k]);

    const dataRows = dados.map((obj) => keys.map((key) => obj[key]));

    const aoa = [headerRow, ...dataRows];
    const worksheet = XLSX.utils.aoa_to_sheet(aoa);

    const currencyColumns = keys
      .map((key, index) =>
        key.startsWith("valor") || key.startsWith("juros") ? index : null
      )
      .filter((i) => i !== null) as number[];

    currencyColumns.forEach((colIndex) => {
      for (let row = 2; row <= dados.length + 1; row++) {
        const cellAddress = XLSX.utils.encode_cell({ c: colIndex, r: row - 1 });
        const cell = worksheet[cellAddress];
        if (cell && typeof cell.v === "number") {
          cell.t = "n";
          cell.z = '"R$"#,##0.00';
        }
      }
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Revezamento");

    XLSX.writeFile(workbook, fileName);
  }

  return (
    <>
      <ConfirmDialog />
      <Dialog
        header={dialogMessage.header}
        visible={isDialogVisible}
        style={{ minWidth: `50vw` }}
        onHide={() => {
          if (!isDialogVisible) return;
          setIsDialogVisible(false);
        }}
      >
        <p className="m-0">{dialogMessage.content}</p>
      </Dialog>
      <div className="overflow-hidden mt-8 mb-8">
        <div className={`container ${dadosCalculoRevezamento.length && "2xl"}`}>
          <h1 className="relative mb-7 pb-5 text-3xl font-bold text-primary-main before:absolute before:bottom-0 before:left-0 before:h-[3px] before:w-[150px] before:bg-background before:content-[''] after:absolute after:bottom-0 after:left-0 after:z-[1] after:h-[3px] after:w-[40px] after:bg-primary-main after:content-['']text-2xl font-bold mb-4">
            Cálculo de atualização monetária
          </h1>
          <div>
            <h4 className="text-[#333] text-xl">
              Informe o período a ser calculado
            </h4>
            <div className="flex flex-col md:flex-row cols-1 md:cols-2 mt-4 gap-8">
              <div className="mr-8">
                <label
                  htmlFor="dataInicialCalculo"
                  className="block text-[#333] text-sm font-bold mb-2 border-red-500"
                >
                  Data inicial:
                </label>
                <Input
                  type="date"
                  key={"dataInicialCalculo"}
                  value={dataInicialCalculo}
                  onChange={(e) => setDataInicialCalculo(e.target.value)}
                  className={`
                    h-10 w-48  ${errosForm.dataInicialCalculo ? "border-[--destructive]" : "border-neutral-200"} bg-white px-4 py-2 font-normal text-background placeholder:text-base placeholder:font-normal placeholder:text-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0
                  `}
                />
              </div>
              <div className="">
                <label
                  htmlFor="dataFinalCalculo"
                  className="block text-[#333] text-sm font-bold mb-2"
                >
                  Data final:
                </label>
                <Input
                  type="date"
                  key={"dataFinalCalculo"}
                  value={dataFinalCalculo}
                  onChange={(e) => setDataFinalCalculo(e.target.value)}
                  className={`
                    h-10 w-48  ${errosForm.dataFinalCalculo ? "border-[--destructive]" : "border-neutral-200"} bg-white px-4 py-2 font-normal text-background placeholder:text-base placeholder:font-normal placeholder:text-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0
                  `}
                />
              </div>
            </div>
          </div>
          <div className="mt-4 mb-4">
            <h4 className="text-[#333] text-xl">
              Informe os dados da jornada de trabalho
            </h4>
            <div className="flex flex-col md:flex-row cols-1 md:cols-4 gap-10 mt-4">
              <div className="">
                <label
                  htmlFor="salarioBase"
                  className="block text-[#333] text-sm font-bold mb-2"
                >
                  Salário Base:
                </label>
                <InputNumber
                  mode="currency"
                  key={"salarioBase"}
                  inputId="salarioBase"
                  currency="BRL"
                  locale="pt-BR"
                  value={salarioBase}
                  onChange={(e) => setSalarioBase(e.value)}
                  className={`w-40 h-10 border rounded border-solid ${errosForm.salarioBase ? "border-[--destructive]" : "border-neutral-200"}`}
                  inputClassName="h-10 p-4 bg-transparent font-normal w-full"
                  min={0}
                />
              </div>
              <div className="">
                <label
                  htmlFor="cargaHoraria"
                  className="block text-[#333] text-sm font-bold mb-2"
                >
                  Carga Horaria:
                </label>
                <InputNumber
                  mode="decimal"
                  key={"cargaHoraria"}
                  inputId="cargaHoraria"
                  value={cargaHoraria}
                  onChange={(e) => setCargaHoraria(e.value)}
                  className={`w-40 h-10 border rounded border-solid ${errosForm.cargaHoraria ? "border-[--destructive]" : "border-neutral-200"}`}
                  inputClassName="h-10 p-4 bg-transparent font-normal w-full"
                  min={0}
                  suffix=" horas"
                />
              </div>
              <div className="">
                <label
                  htmlFor="horaEntrada"
                  className="block text-[#333] text-sm font-bold mb-2"
                >
                  Hora Entrada:
                </label>
                <InputMask
                  mask="99:99"
                  key={"horaEntrada"}
                  value={horaEntrada}
                  onChange={(e) => {
                    setHoraEntrada(e.target.value ?? "22:00");
                  }}
                  className={`w-40 h-10 p-4 border rounded border-solid ${errosForm.horaEntrada ? "border-[--destructive]" : "border-neutral-200"}`}
                />
              </div>
              <div className="">
                <label
                  htmlFor="horaSaida"
                  className="block text-[#333] text-sm font-bold mb-2"
                >
                  Hora Saída:
                </label>
                <InputMask
                  mask="99:99"
                  key={"horaSaida"}
                  value={horaSaida}
                  onChange={(e) => {
                    setHoraSaida(e.target.value ?? "05:00");
                  }}
                  className={`w-40 h-10 p-4 border rounded border-solid ${errosForm.horaSaida ? "border-[--destructive]" : "border-neutral-200"}`}
                />
              </div>
            </div>
          </div>
          <div className="mt-4 mb-4">
            <h4 className="text-[#333] text-xl">
              Informe os parâmetros da atualização monetária
            </h4>
            <div className="flex flex-col md:flex-row cols-1 md:cols-3 gap-10 mt-4">
              <div className="">
                <label
                  htmlFor="percentualAddNoturno"
                  className="block text-[#333] text-sm font-bold mb-2"
                >
                  Percentual Adicional Noturno:
                </label>
                <InputNumber
                  mode="decimal"
                  key={"percentualAddNoturno"}
                  inputId="percentualAddNoturno"
                  value={percentualAddNoturno}
                  onChange={(e) => setPercentualAddNoturno(e.value)}
                  className={`w-40 h-10 border rounded border-solid ${errosForm.percentualAddNoturno ? "border-[--destructive]" : "border-neutral-200"}`}
                  inputClassName="h-10 p-4 bg-transparent font-normal w-full"
                  min={0}
                  suffix="%"
                />
              </div>

              <div className="">
                <label
                  htmlFor="dataFinal"
                  className="block text-[#333] text-sm font-bold mb-2"
                >
                  Hora Inicial Adicional Noturno:
                </label>
                <InputMask
                  mask="99:99"
                  key={"horaInicialAddNoturno"}
                  value={horaInicialAddNoturno}
                  onChange={(e) => {
                    setHoraInicialAddNoturno(e.target.value ?? "22:00");
                  }}
                  className={`w-40 h-10 p-4 border rounded border-solid ${errosForm.horaInicialAddNoturno ? "border-[--destructive]" : "border-neutral-200"}`}
                />
              </div>
              <div className="">
                <label
                  htmlFor="dataFinal"
                  className="block text-[#333] text-sm font-bold mb-2"
                >
                  Hora Final Adicional Noturno:
                </label>
                <InputMask
                  mask="99:99"
                  key={"horaFinalAddNoturno"}
                  value={horaFinalAddNoturno}
                  onChange={(e) => {
                    setHoraFinalAddNoturno(e.target.value ?? "05:00");
                  }}
                  className={`w-40 h-10 p-4 border rounded border-solid ${errosForm.horaFinalAddNoturno ? "border-[--destructive]" : "border-neutral-200"}`}
                />
              </div>
            </div>
            <div className="mb-4 mt-4">
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
                <SelectTrigger
                  className={`
                    h-12 w-1/3 rounded-none border-solid 
                    ${errosForm.indiceAtualizacaoMontaria ? "border-[--destructive]" : "border-neutral-200"}
                    bg-white px-4 py-2 text-base text-background placeholder:font-normal 
                    placeholder:text-background focus-visible:outline-none 
                    focus-visible:ring-0 focus-visible:ring-offset-0
                  `}
                >
                  <SelectValue
                    placeholder="Índice de atualização monetária"
                    className="font-normal"
                  />
                </SelectTrigger>
                <SelectContent className="bg-white pointer">
                  <SelectItem value="ipcae">IPCA-e</SelectItem>
                  <SelectItem value="inpc">INPC</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col md:flex-row cols-1 md:cols-2 gap-10 mt-4">
              <div className="">
                <label
                  htmlFor="dataFinal"
                  className="block text-[#333] text-sm font-bold mb-2"
                >
                  Data inicial do cálculo de atualização:
                </label>
                <Input
                  type="date"
                  value={dataInicialCalculoAtualizacao}
                  onChange={(e) =>
                    setDataInicialCalculoAtualizacao(e.target.value)
                  }
                  className={`h-12 rounded-none border-solid ${errosForm.dataInicialCalculoAtualizacao ? "border-[--destructive]" : "border-neutral-200"} bg-white px-4 py-2 font-bold text-background placeholder:text-base placeholder:font-normal placeholder:text-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0`}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Deixe em branco para utilizar a data do movimento
                </p>
              </div>
              <div className="">
                <label
                  htmlFor="dataFinal"
                  className="block text-[#333] text-sm font-bold mb-2"
                >
                  Data final do cálculo de atualização:
                </label>
                <Input
                  type="date"
                  value={dataFinalCalculoAtualizacao}
                  onChange={(e) =>
                    setDataFinalCalculoAtualizacao(e.target.value)
                  }
                  className={`
                    h-12 rounded-none border-solid ${errosForm.dataFinalCalculoAtualizacao ? "border-[--destructive]" : "border-neutral-200"} bg-white px-4 py-2 
                    font-bold text-background placeholder:text-base placeholder:font-normal 
                    placeholder:text-background focus-visible:outline-none 
                    focus-visible:ring-0 focus-visible:ring-offset-0`}
                />
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-col md:flex-row gap-8 mb-6">
            <div className="">
              <Button
                type="button"
                className="h-auto rounded-none border bg-primary-main px-7 py-[14px] text-base font-bold uppercase text-white transition-colors duration-300 ease-in hover:border-primary-main hover:bg-white hover:text-primary-main"
                onClick={() => {
                  gerarDatasPeriodo();
                }}
              >
                Gerar entradas
              </Button>
            </div>
            <div className="">
              {isExcluindoEntradas ? (
                <Button
                  type="button"
                  className="h-auto rounded-none border bg-[--destructive] px-7 py-[14px] text-base font-bold uppercase text-white transition-colors duration-300 ease-in hover:border-[--destructive] hover:bg-white hover:text-[--destructive]"
                  onClick={confirmExclusaoData}
                  disabled={!dadosCalculoParaExclusao.length}
                >
                  <>Confirmar Exclusão</>
                </Button>
              ) : (
                <Button
                  type="button"
                  className="h-auto rounded-none border bg-[--destructive] px-7 py-[14px] text-base font-bold uppercase text-white transition-colors duration-300 ease-in hover:border-[--destructive] hover:bg-white hover:text-[--destructive]"
                  onClick={() => {
                    setIsExcluindoEntradas(true);
                  }}
                >
                  Excluir Entradas
                </Button>
              )}
            </div>

            {isExcluindoEntradas && (
              <div className="">
                <Button
                  type="button"
                  className="h-auto rounded-none border bg-primary-main px-7 py-[14px] text-base font-bold uppercase text-white transition-colors duration-300 ease-in hover:border-primary-main hover:bg-white hover:text-primary-main"
                  onClick={() => {
                    setIsExcluindoEntradas(false);
                    setDadosCalculoParaExclusao([]);
                  }}
                >
                  Cancelar Exclusão
                </Button>
              </div>
            )}
          </div>

          {dadosCalculoRevezamento && dadosCalculoRevezamento.length > 0 && (
            <div className="mt-4">
              <Button
                type="button"
                className="h-auto rounded-none border bg-primary-main px-7 py-[14px] text-base font-bold uppercase text-white transition-colors duration-300 ease-in hover:border-primary-main hover:bg-white hover:text-primary-main"
                onClick={() => {
                  exportRevezamentoToExcel(
                    dadosCalculoRevezamento,
                    `Cálculo de Revezamento - ${format(parseLocalDate(dataInicialCalculo), "dd-MM-yyyy")} à ${format(parseLocalDate(dataFinalCalculo), "dd-MM-yyyy")}.xlsx`
                  );
                }}
              >
                Download Excel
                <i className="pi pi-file-excel ml-2"></i>
              </Button>
            </div>
          )}

          {dadosCalculoRevezamento && dadosCalculoRevezamento.length > 0 && (
            <div id="tableDadosCalculo" className="mt-8">
              <DataTable
                value={dadosCalculoRevezamento}
                removableSort
                showGridlines
                stripedRows
                size="small"
                className="mt-2"
                dataKey={"id"}
                selectionMode={"checkbox"}
                selection={dadosCalculoParaExclusao}
                onSelectionChange={(e) => {
                  setDadosCalculoParaExclusao(e.value);
                }}
              >
                {isExcluindoEntradas && (
                  <Column
                    selectionMode="multiple"
                    headerStyle={{ width: "3rem" }}
                  />
                )}

                <Column sortable field="dataMes" header="Data" />
                <Column field="dataExtenso" header="Dia" />
                <Column
                  field="horaEntrada"
                  header="Hora Entrada"
                  body={columnInputHoraEntrada}
                ></Column>
                <Column
                  field="horaSaida"
                  header="Hora Saída"
                  body={columnInputHoraSaida}
                ></Column>
                <Column field="horasTrabalhadas" header="Total Horas"></Column>
                <Column
                  field="horasAdicionalNoturno"
                  header="Horas Adicional Noturno"
                ></Column>
                <Column
                  field="valorRemuneracao"
                  header="Valor da Remuneração"
                  body={ColumnSalarioBase}
                ></Column>
                <Column
                  field="valorHora"
                  header="Valor da hora"
                  body={(dados) => ColumnGenericValor(dados, "valorHora")}
                ></Column>
                <Column
                  field="valorAcrescimo"
                  header={`Valor Acréscimo ${percentualAddNoturno}%`}
                  body={(dados) => ColumnGenericValor(dados, "valorAcrescimo")}
                ></Column>
                <Column
                  field="valorAdicionalNoturno"
                  header="Valor do Adicional Noturno"
                  body={(dados) =>
                    ColumnGenericValor(dados, "valorAdicionalNoturno")
                  }
                ></Column>
                <Column
                  field="valorAdicionalNoturnoAtualizado"
                  header="Valor do Adicional Noturno Atualizado"
                  body={(dados) =>
                    ColumnGenericValor(dados, "valorAdicionalNoturnoAtualizado")
                  }
                ></Column>
                <Column
                  field="jurosCompensatorios050"
                  header="Juros compensatórios 0,50%"
                  body={(dados) =>
                    ColumnGenericValor(dados, "jurosCompensatorios050")
                  }
                ></Column>
                <Column
                  field="valorTotal"
                  header="Valor do Adicional Noturno + Acrésimo 0,25% Atualizado"
                  body={(dados) => ColumnGenericValor(dados, "valorTotal")}
                ></Column>
              </DataTable>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Calculadora;
