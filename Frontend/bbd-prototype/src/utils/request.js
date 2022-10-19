import axios from 'axios';

const backend_base = "http://localhost:3001";

export const get = async(url) => {
  return (await axios.get(`${backend_base}/${url}`)).data;
}
export const post = async(url, body = {}) => {
  return (await axios.post(`${backend_base}/${url}`, body)).data;
}

export const deleteRequest = async(url) => {
  return (await axios.delete(`${backend_base}/${url}`)).data;
}