import axios from 'axios';
import {api} from '../Configs/Connection';

export const login = async (auth: {email: string; password: string}) => {
  return await axios
    .post(api + '/Auth', auth, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.data);
};
