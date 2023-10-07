import axios from "axios";

const httpClientPayments = axios.create({
  baseURL: process.env.HOMOLOG_PAY_URL,
});

export default httpClientPayments;
