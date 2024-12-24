

declare namespace NodeJS {
  interface ProcessEnv {
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_HOST: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      headers: {
        authorization?: string;
        [key: string]: string | undefined;  // Permite otros encabezados de tipo string
      };
    }
  }
}




