//TODO: Lo modelo de esta forma para poder ver si puedo filtrar ademas por los bancos asociados a el usuario
export interface InvoiceFilters {
  vendorId?: number;
  invoiceDate?: string;
  currency?: string;
}

export interface Converter {
  rate?: number;
  currency?: string;
}
