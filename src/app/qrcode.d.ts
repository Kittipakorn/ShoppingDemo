declare module 'qrcode' {
  export function toDataURL(text: string, options: any, callback: (err: Error, url: string) => void): void;
}