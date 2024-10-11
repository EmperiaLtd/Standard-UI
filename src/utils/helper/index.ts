import { ProductVariantType } from '../../interfaces';

const ORDER = [
  'one size',
  '0',
  '0.5',
  '1',
  '1.5',
  '2',
  '2.5',
  '3',
  '3.5',
  '4',
  '4.5',
  '5',
  '5.5',
  '6',
  '6.5',
  '7',
  '7.5',
  '8',
  '8.5',
  '9',
  '9.5',
  '10',
  '10.5',
  '11',
  '11.5',
  '12',
  '12.5',
  '13',
  '13.5',
  '14',
  '14.5',
  '15',
  '15.5',
  '16',
  '16.5',
  '17',
  '17.5',
  '18',
  '18.5',
  '19',
  '19.5',
  '20',
  '20.5',
  '21',
  '21.5',
  '22',
  '22.5',
  '23',
  '23.5',
  '24',
  '24.5',
  'xxs',
  'xxs/xs',
  'xs',
  'xs/s',
  's',
  's/m',
  'm',
  'm/l',
  'l',
  'l/xl',
  'xl',
  'xl/xxl',
  'xxl',
  'xxl/xxxl',
  '2xl',
  '2xl/3xl',
];

export const sortSizes = (sizes: ProductVariantType[]) => {
  sizes.sort((a: ProductVariantType, b: ProductVariantType) => {
    const first = a.value.toLowerCase();
    const second = b.value.toLowerCase();

    let nra = parseInt(first);
    let nrb = parseInt(second);

    if (ORDER.indexOf(first) != -1) nra = NaN;
    if (ORDER.indexOf(second) != -1) nrb = NaN;

    if (nrb === 0) return 1;
    if ((nra && !nrb) || nra === 0) return -1;
    if (!nra && nrb) return 1;
    if (nra && nrb) {
      if (nra == nrb) {
        return first.substr(('' + nra).length).localeCompare(first.substr(('' + nra).length));
      } else {
        return nra - nrb;
      }
    } else {
      return ORDER.indexOf(first) - ORDER.indexOf(second);
    }
  });

  return sizes;
};
export const handleCopy = async (text: string) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
      }
      document.body.removeChild(textArea);
    }
  } catch (err) {
    console.error('Async: Could not copy text', err);
  }
};

export const getOpSys = () => {
  let os = '';

  const userAgent = window.navigator.userAgent;
  const platform = window.navigator.platform;
  const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
  const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
  const iosPlatforms = ['iPhone', 'iPad', 'iPod'];

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'IOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (/Linux/.test(platform)) {
    os = 'Linux';
  }

  return os;
};
