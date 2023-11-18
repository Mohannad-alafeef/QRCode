import {Alert} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

export const generatePDF = async (options: any) => {
  return await RNHTMLtoPDF.convert(options);
};
