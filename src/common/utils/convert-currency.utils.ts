import axios from 'axios';
import { Keys } from 'common/enums/keys.enum';
import config from '../../config/index.config';

export const checkRate = async (currency): Promise<number> => {
  try {
    const coin = `${currency}_PHP`;
    const baseUrl = config()[Keys.URL_CURR];
    const apiKey = config()[Keys.API_KEY];

    const url = `${baseUrl}?q=${coin}&compact=ultra&apiKey=${apiKey}`;

    const result = await axios.get(url);

    return result.data[coin];
  } catch (error) {
    console.log(error.message);
    return 1;
  }
};
