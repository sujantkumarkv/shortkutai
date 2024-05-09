import { credential } from "firebase-admin";
import { initializeApp, getApps, getApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const adminCredentials = {
  credential: credential.cert({
    projectId: "shortkutai-389803",
    clientEmail:
      "firebase-adminsdk-ph3bw@shortkutai-389803.iam.gserviceaccount.com",
    privateKey:
      "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC0AxWNP3p7OfOu\nz1krF/9GqkAXAR49KXV3JEaLa85AdknHm+7QuFXwMgnMs6oiNRcfuB3lhNjVbpUO\nkL0FBFAVkdfXIn9gADpR3JrZVuVTpj4iERJl3qmZ7zu4JXnv00p/mg2IKKZ3jC2A\nTAZPiJpbXpfvoQqf9RlMBQEl+LZTjDd6JpOa9+auh7L46EOMumyphQholWeOwytP\nDdhOVkIjahI/6+m7vjsJOfA3bGBQhOey1BZLSAN84lr74ZebSF1rKBjU93JdQX2c\nA8osSK46NfB8h2jvUKgRQUy9ALCaUZkzqg6jI8hifQDSlp7+kzL57wu9M4zVbmHz\n1RErraDxAgMBAAECggEAPWg572PCsAuuZalFFU7L3frQ/yf5/UpJ0HlW+VOu2c2g\nUJAQkTH42wXu0t5NQPsUZtUjmbrOT0y4W24jlPUKLrmARFr30bNyMZ/MUSzz8Suq\nUWu6d3bUK3dxS1m5dYcCCHJwgEzBsNFoajZFBtemNFoaAXxRyAxP819Xq3DjHa+I\n/zUcvMCbNkfNRNjkJmKEPF35z7m7x+24Lz2ynxUAXMxXC+q3o+6CoIcoIXGlKMXL\ng3XIkW8KNAk8nfyDEiN1BjKpCv+w0bqxqEWFLFjcl7NRXBuassCiuaH45nLp1pJL\nheLFGQXLML+7eOaCdYj+/T88FdWwpm7hHZlzbpRFiwKBgQD3kgtFQx8lzTZ1h9JR\npyYwyFN9sTwzKNNnNSCKU95/t/XY1TfMy6gwB6xsTXdhh3StWfr+LCmZLX96kM9u\n9XY+f9XmC1enJHJlg/FLqh5YzsDnCnPB+8CRbOE9jvIrYZ2gHb1Py+blz2Z+mcb/\nriq18qdWuSNysXYTj/E3U3wDWwKBgQC6JCo3MmeC1dIRF08+qmNNn7/uPRT5lziK\nU6ECasI960P+ySWVjCitst78aNuBK8UXFNUhxah7WRjirtXYwms6SO3o0bwCvfhj\nFH3ou8BG57d2XF9GiBH+DduaCIdhYXGHUd3NZyFDZXl5uVFj5TTJp4sFyInXcCnN\nQQKXHVTaowKBgDv4CXjemHXsrqtrmhujVJHuhKLmwsFVu1e9u8MmK7heVFQQ2fJm\nxrfTtAWMAkYCrNWs/SqCghUTu1RyLX0gQmNDTgnqZ3IaVweWHWYJsE4szvdoRcAQ\nfoX7jNf/f1PY0njNm2Tv7F9wjNBP6a9XfgsS20wbjqWirQpyDKktNNYPAoGAEZQK\nvI2xAsUIgn6uCB/1IsZ8TJZOHcfvGfkN0nmcgFZwZGZAe1/yE30526JXYFpu0WAx\nRHAzGfrvA7E5FrA9ihKLDRqJY8Tm6QxtW4YngUquo6nTgYimElTisSgvCL44B2xu\nwtADbybtEtayXfmuQ4Dj+xbWFZdNC0ohYX3unnsCgYBp7N6fPOo+I7UeABkjRP/j\n0e6Bw3WxJZLMXfWqHpR4W4QzY/CU9YIv1bJ95B3Gjzw0dY5J3Vz0rDCkoctKTRpm\nj/47rDGxlupY1gmo7BZBNSeR7uNJpYAVQpj7ccEiaBv2ciZrml23leTZulvje8T2\nLEE4W/0PDcHbmcjGwnRvgA==\n-----END PRIVATE KEY-----\n",
  }),
};

// avoid initializing twice
const firebaseAdminApp =
  getApps().length === 0 ? initializeApp(adminCredentials) : getApp();

export const authAdmin = getAuth(firebaseAdminApp);
