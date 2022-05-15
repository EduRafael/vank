export interface ApiInfoType {
  name: string;
  type?: string;
  example?: string;
}

export interface DataInfoType {
  ParamName?: string | null;
  example?: string;
  type?: string | null;
  desc?: string | null;
  isParams?: boolean;
  response?: any;
  query?: QueryType;
}

interface QueryType {
  name: string;
  example: string;
}
